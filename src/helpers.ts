import { ResolvedDestination } from "./types";

export const resolveDestination = async (
  packageName,
  destination,
): Promise<ResolvedDestination> => {
  return {
    outcome: "success",
    url: `https://npmjs.com/package/${packageName}`,
  };
};
