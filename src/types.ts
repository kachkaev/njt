// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-557057387
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [member: string]: JsonValue };
export type JsonArray = JsonValue[];

export interface SuccessfullyResolvedDestination {
  outcome: "success";
  url: string;
}

export interface UnresolvedDestination {
  outcome: "error";
  error: string;
}

export type ResolvedDestination =
  | SuccessfullyResolvedDestination
  | UnresolvedDestination;

export interface DestinationConfig {
  keywords: string[];
  generateUrl: (
    packageName: string,
  ) => Promise<string | undefined> | string | undefined;
}
