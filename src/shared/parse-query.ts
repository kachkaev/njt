export const parseQuery = (
  query: string,
): [packageOrSearch: string, destination: string | undefined] => {
  const chunks = query
    .split(" ")
    .filter((chunk) => chunk.length)
    .reverse();

  const [head, ...tail] = chunks.length > 1 ? chunks : [undefined, ...chunks];

  const packageOrSearch = tail.reverse().join(" ");
  const destination = head;

  return [packageOrSearch, destination];
};
