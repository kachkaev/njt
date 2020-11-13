import { parseQuery } from "../parse-query";

const tests = [
  {
    input: "",
    output: ["", undefined],
  },
  {
    input: "njt g",
    output: ["njt", "g"],
  },
  {
    input: "njt",
    output: ["njt", undefined],
  },
  {
    input: "njt ",
    output: ["njt", undefined],
  },
  {
    input: "njt test",
    output: ["njt", "test"],
  },
  {
    input: "njt search g",
    output: ["njt search", "g"],
  },
  {
    input: "@njt/test g",
    output: ["@njt/test", "g"],
  },
  {
    input: "@njt/test",
    output: ["@njt/test", undefined],
  },
  {
    input: "@njt/test search g",
    output: ["@njt/test search", "g"],
  },
];

describe("parseQuery", () => {
  tests.forEach((test) => {
    it(`should handle: "${test.input}"`, () => {
      expect(parseQuery(test.input)).toEqual(test.output);
    });
  });
});
