/**
 * Function to create a single random string
 * @param len Length of the random string
 * @returns random string.
 */
const generateSingleId = (length: number) =>
  Math.random()
    .toString(36)
    .substring(2, length + 1);

/**
 * Function to generate a unique ID from a given list of Id(s).
 * A function to generate a custom id could also be passed for greater
 * customizability
 * @param ids array of available Id(s)
 * @param fn custom function for an ID generation
 * @param length desired length of the generated Id(s). default: 4
 */
const generateUniqueId = (
  ids: string[] = [],
  fn?: (arg: string) => string,
  length: number = 4,
): string => {
  const defaultFn = (value: string) => value;
  const idGenerator = fn || defaultFn;

  if (ids.length > 0) {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const temp = idGenerator(generateSingleId(length));
      if (!ids.includes(temp)) {
        return temp;
      }
    }
  }

  return idGenerator(generateSingleId(length));
};

export { generateUniqueId, generateSingleId };
