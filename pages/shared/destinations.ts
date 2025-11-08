import hostedGitInfo from "hosted-git-info";
import { LRUCache } from "lru-cache";

import type { JsonObject } from "./json-types";

export type SuccessfullyResolvedDestination = {
  outcome: "success";
  url: string;
};

export type UnresolvedDestination = {
  outcome: "error";
  error: string;
};

export type ResolvedDestination =
  | SuccessfullyResolvedDestination
  | UnresolvedDestination;

export type DestinationConfig = {
  keywords: string[];
  generateUrl: (
    packageName: string,
  ) => Promise<string | undefined> | string | undefined;
};

const packageMetadataCache = new LRUCache<string, JsonObject | Error>({
  max: 10_000,
  ttl: 1000 * 60,
});

async function getPackageMetadata(packageName: string): Promise<JsonObject> {
  if (!packageMetadataCache.has(packageName)) {
    const response = await fetch(`https://registry.npmjs.com/${packageName}`);
    packageMetadataCache.set(
      packageName,
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: replace with zod
      (await response.json()) as JsonObject,
    );
  }
  const result = packageMetadataCache.get(packageName);
  if (result instanceof Error) {
    throw result;
  } else if (!result) {
    throw new Error(`Unexpected empty cache for ${packageName}`);
  }

  return result;
}

// Inspired by https://github.com/npm/cli/blob/0a0fdff3edca1ea2f0a2d87a0568751f369fd0c4/lib/repo.js#L37-L50
function handleUnknownHostedUrl(url: string): string | undefined {
  try {
    const idx = url.indexOf("@");
    const fixedUrl =
      idx === -1 ? url : url.slice(idx + 1).replace(/:(\D+)/, "/$1");
    const parsedUrl = new URL(fixedUrl);
    const protocol = parsedUrl.protocol === "https:" ? "https:" : "http:";

    return `${protocol}//${parsedUrl.host || ""}${(
      parsedUrl.pathname || ""
    ).replace(/\.git$/, "")}`;
  } catch {
    return undefined;
  }
}

async function getRepoUrl(
  packageName: string,
  { skipDirectoryTrimming }: { skipDirectoryTrimming?: boolean } = {},
): Promise<string | undefined> {
  // Reference implementation: https://github.com/npm/cli/blob/latest/lib/repo.js
  const packageMetadata = await getPackageMetadata(packageName);
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: replace with zod
  const rawUrl = (packageMetadata["repository"] as JsonObject)["url"];
  if (typeof rawUrl !== "string") {
    return undefined;
  }
  const info = hostedGitInfo.fromUrl(rawUrl);
  let result = info ? info.browse() : handleUnknownHostedUrl(rawUrl);

  // Some packages (e.g. babel and babel-cli) mistakenly specify repository URL with directory. It needs to be trimmed
  if (!skipDirectoryTrimming && result) {
    result = result.replace(
      /^https:\/\/github\.com\/([^/]+)\/([^/]+).*/i,
      "https://github.com/$1/$2",
    );
  }

  return result;
}

function isGitHub(url: string) {
  return url.includes("://github.com");
}

function isGitLab(url: string) {
  return url.includes("://gitlab.com");
}

const destinationConfigs: DestinationConfig[] = [
  {
    keywords: ["b"],
    generateUrl: (packageName) =>
      `https://bundlephobia.com/result?p=${packageName}`,
  },
  {
    keywords: ["c"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);

      if (!repoUrl) {
        return;
      }

      const [, githubOwner, githubRepo] =
        repoUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+).*/i) ?? [];

      // Covers GitHub repos
      if (githubOwner && githubRepo) {
        const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents`;

        let contents: JsonObject[] = [];
        try {
          const response = await fetch(apiUrl);
          // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: replace with zod
          contents = (await response.json()) as JsonObject[];
        } catch {
          // noop
        }

        for (const item of contents) {
          if (
            typeof item["name"] === "string" &&
            /^changelog/i.test(item["name"]) &&
            typeof item["html_url"] === "string"
          ) {
            return item["html_url"];
          }
        }
      }

      // Fallback even if was not found above
      return `${repoUrl}/blob/HEAD/CHANGELOG.md`;
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

      return typeof packageMetadata["homepage"] === "string"
        ? packageMetadata["homepage"]
        : undefined;
    },
  },
  {
    keywords: ["i"],
    generateUrl: async (packageName) => {
      // Reference implementation: https://github.com/npm/cli/blob/latest/lib/bugs.js
      const packageMetadata = await getPackageMetadata(packageName);
      const bugsField = packageMetadata["bugs"];
      const directUrl =
        typeof bugsField === "string"
          ? bugsField
          : typeof bugsField === "object" &&
              bugsField &&
              "url" in bugsField &&
              typeof bugsField["url"] === "string"
            ? bugsField["url"]
            : undefined;
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
      if (repoUrl && isGitHub(repoUrl)) {
        return `${repoUrl}/pulls`;
      } else if (repoUrl && isGitLab(repoUrl)) {
        return `${repoUrl}/merge_requests`;
      }

      return repoUrl;
    },
  },
  {
    keywords: ["r"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl && isGitHub(repoUrl)) {
        return `${repoUrl}/releases`;
      } else if (repoUrl && isGitLab(repoUrl)) {
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
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- TODO: replace with zod
      const sourceDirectory = (packageMetadata["repository"] as JsonObject)[
        "directory"
      ];
      if (repoUrl && typeof sourceDirectory === "string") {
        return `${repoUrl}/tree/master/${sourceDirectory}`;
      }

      return repoUrl;
    },
  },
  {
    keywords: ["t"],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);
      if (repoUrl && isGitHub(repoUrl)) {
        return `${repoUrl}/tags`;
      } else if (repoUrl && isGitLab(repoUrl)) {
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
  {
    keywords: ["."],
    generateUrl: async (packageName) => {
      const repoUrl = await getRepoUrl(packageName);

      if (repoUrl && isGitHub(repoUrl)) {
        return repoUrl.replace("://github.com", "://github.dev");
      }

      if (repoUrl && isGitLab(repoUrl)) {
        return repoUrl.replace("://gitlab.com", "://gitlab.com/-/ide/project");
      }

      return repoUrl;
    },
  },
];

const destinationConfigByKeyword: Record<string, DestinationConfig> = {};

for (const destinationConfig of destinationConfigs) {
  for (const keyword of destinationConfig.keywords) {
    if (destinationConfigByKeyword[keyword]) {
      throw new Error(
        `Keyword ${keyword} is used in more than one destination`,
      );
    }
    destinationConfigByKeyword[keyword] = destinationConfig;
  }
}

export async function resolveDestination(
  rawPackageName: string,
  rawDestination = "",
): Promise<ResolvedDestination> {
  const packageName = rawPackageName
    .toLowerCase()
    .replace("https://www.npmjs.com/package/", "") // https://www.npmjs.com/package/@types/react-dom
    .replace(/\?activeTab=\w+$/, "") // https://www.npmjs.com/package/@types/react-dom?activeTab=versions
    .replace(/\/v\/[\w.-]+/, "") // https://www.npmjs.com/package/@types/react-dom/v/18.0.9
    .replace("https://yarnpkg.com/package/", "") // https://yarnpkg.com/package/@types/react-dom
    .replace(
      // eslint-disable-next-line regexp/no-unused-capturing-group -- TODO: investigate
      /^https:\/\/unpkg.com\/browse\/(@?[\w.-]+(\/[\w.-]+)?)@([\w.-]+)\/$/, // https://unpkg.com/browse/@types/react-dom@18.0.9/
      "$1",
    );

  try {
    const url =
      await destinationConfigByKeyword[
        rawDestination[0]?.toLowerCase() ?? ""
      ]?.generateUrl(packageName);
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
      url:
        (await destinationConfigByKeyword[""]?.generateUrl(rawPackageName)) ??
        "",
    };
  }
}
