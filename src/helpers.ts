import { ResolvedDestination, DestinationConfig } from "./types";

const destinationConfigs: DestinationConfig[] = [
  {
    keywords: ["n", "npm", ""],
    generateUrl: (packageName) => `https://npmjs.com/package/${packageName}`,
  },
  {
    keywords: ["v", "version", "versions"],
    generateUrl: (packageName) =>
      `https://npmjs.com/package/${packageName}?activeTab=versions`,
  },
  {
    keywords: ["y", "yarn"],
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
    return {
      outcome: "success",
      url: await destinationConfigByKeyword[destinationKeyword].generateUrl(
        packageName,
      ),
    };
  } catch {
    return {
      outcome: "success",
      url: await destinationConfigByKeyword[""].generateUrl(packageName),
    };
  }
};
