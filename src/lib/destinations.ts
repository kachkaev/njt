import { ResolvedDestination, DestinationConfig, JsonObject } from "../types";
import LRU from "lru-cache";
import fetch from "./fetch";
import { parse as parseUrl } from "url";
import hostedGitInfo from "hosted-git-info";

const packageMetadataCache = new LRU<string, JsonObject | Error>({
  max: 10000,
  maxAge: 1000 * 60,
});

const getPackageMetadata = async (packageName: string): Promise<JsonObject> => {
  if (!packageMetadataCache.has(packageName)) {
    packageMetadataCache[packageName] = await (
      await fetch(`https://registry.npmjs.com/${packageName}`)
    ).json();
    try {
    } catch (e) {
      packageMetadataCache[packageName] = e;
    }
  }
  const result = packageMetadataCache[packageName];
  if (result instanceof Error) {
    throw result;
  }
  return result;
};

// Inspired by https://github.com/npm/cli/blob/0a0fdff3edca1ea2f0a2d87a0568751f369fd0c4/lib/repo.js#L37-L50
const handleUnknownHostedUrl = (url: string): string | undefined => {
  try {
    const idx = url.indexOf("@");
    if (idx !== -1) {
      url = url.slice(idx + 1).replace(/:([^\d]+)/, "/$1");
    }
    const parsedUrl = parseUrl(url);
    const protocol = parsedUrl.protocol === "https:" ? "https:" : "http:";
    return (
      protocol +
      "//" +
      (parsedUrl.host || "") +
      parsedUrl.path.replace(/\.git$/, "")
    );
  } catch (e) {}
};

const getRepoUrl = async (
  packageName: string,
  { skipDirectoryTrimming }: { skipDirectoryTrimming?: boolean } = {},
): Promise<string> => {
  // Reference implementation: https://github.com/npm/cli/blob/latest/lib/repo.js
  const packageMetadata = await getPackageMetadata(packageName);
  const rawUrl = packageMetadata.repository["url"];
  const info = hostedGitInfo.fromUrl(rawUrl);
  let result = info ? info.browse() : handleUnknownHostedUrl(rawUrl);

  // Some packages (e.g. babel and babel-cli) mistakenly specify repository URL with directory. It needs to be trimmed
  if (!skipDirectoryTrimming) {
    console.log("result 1", result);
    result = result.replace(
      /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(.*)/i,
      "https://github.com/$1/$2",
    );
  }
  return result;
};

const destinationConfigs: DestinationConfig[] = [
  {
    keywords: ["c"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl) {
        return `${repoUrl}/blob/master/CHANGELOG.md`;
      }
    },
  },
  {
    keywords: ["g"],
    generateUrl: async (packageName) => {
      return await getRepoUrl(packageName, {
        skipDirectoryTrimming: true,
      });
    },
  },

  {
    keywords: ["h", "w", "d"],
    generateUrl: async (packageName) => {
      // Reference implementation: https://github.com/npm/cli/blob/latest/lib/docs.js
      const packageMetadata = await getPackageMetadata(packageName);

      return typeof packageMetadata?.homepage === "string"
        ? packageMetadata.homepage
        : undefined;
    },
  },
  {
    keywords: ["i", "b"],
    generateUrl: async (packageName) => {
      // Reference implementation: https://github.com/npm/cli/blob/latest/lib/bugs.js
      const packageMetadata = await getPackageMetadata(packageName);
      var directUrl =
        packageMetadata.bugs &&
        (typeof packageMetadata.bugs === "string"
          ? packageMetadata.bugs
          : packageMetadata.bugs["url"]);
      if (directUrl) {
        return directUrl;
      }
      const repoUrl = await getRepoUrl(packageName);

      if (repoUrl) {
        return `${repoUrl}/issues`;
      }
      return repoUrl;
    },
  },
  {
    keywords: ["n", ""],
    generateUrl: (packageName) => `https://npmjs.com/package/${packageName}`,
  },
  {
    keywords: ["p", "m"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl && repoUrl.includes("://github.com")) {
        return `${repoUrl}/pulls`;
      } else if (repoUrl && repoUrl.includes("://gitlab.com")) {
        return `${repoUrl}/merge_requests`;
      }
      return repoUrl;
    },
  },
  {
    keywords: ["r"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl && repoUrl.includes("://github.com")) {
        return `${repoUrl}/releases`;
      } else if (repoUrl && repoUrl.includes("://gitlab.com")) {
        return `${repoUrl}/-/tags`;
      }
      return repoUrl;
    },
  },
  {
    keywords: ["s"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName, {
        skipDirectoryTrimming: true,
      });
      const packageMetadata = await getPackageMetadata(packageName);
      const sourceDirectory = packageMetadata.repository["directory"];
      if (repoUrl && sourceDirectory) {
        return `${repoUrl}/tree/master/${sourceDirectory}`;
      }
      return repoUrl;
    },
  },
  {
    keywords: ["t"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl && repoUrl.includes("://github.com")) {
        return `${repoUrl}/tags`;
      } else if (repoUrl && repoUrl.includes("://gitlab.com")) {
        return `${repoUrl}/-/tags`;
      }
      return repoUrl;
    },
  },
  {
    keywords: ["v"],
    generateUrl: (packageName) =>
      `https://npmjs.com/package/${packageName}?activeTab=versions`,
  },
  {
    keywords: ["u"],
    generateUrl: (packageName) => `https://unpkg.com/browse/${packageName}/`,
  },
  {
    keywords: ["y"],
    generateUrl: (packageName) => `https://yarnpkg.com/package/${packageName}`,
  },
];

const destinationConfigByKeyword: Record<
  string,
  DestinationConfig
> = destinationConfigs.reduce((result, destinationConfig) => {
  destinationConfig.keywords.forEach((keyword) => {
    if (result[keyword]) {
      throw new Error(
        `Keyword ${keyword} is used in more than one destination`,
      );
    }
    result[keyword] = destinationConfig;
  });
  return result;
}, {});

export const resolveDestination = async (
  packageName: string,
  destinationKeyword = "",
): Promise<ResolvedDestination> => {
  try {
    const url = await destinationConfigByKeyword[
      destinationKeyword
    ].generateUrl(packageName);
    if (!url) {
      throw new Error("Unexpected empty URL");
    }
    return {
      outcome: "success",
      url,
    };
  } catch {
    return {
      outcome: "success",
      url: await destinationConfigByKeyword[""].generateUrl(packageName),
    };
  }
};
