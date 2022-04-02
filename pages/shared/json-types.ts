// https://github.com/microsoft/TypeScript/issues/1897#issuecomment-557057387
export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;
export type JsonObject = { [member: string]: JsonValue };
export type JsonArray = JsonValue[];
