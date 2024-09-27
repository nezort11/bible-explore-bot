/*
 * Credit https://gist.github.com/MrChocolatine/367fb2a35d02f6175cc8ccb3d3a20054
 */

// In TS, interfaces are "open" and can be extended
interface Date {
  /**
   * Give a more precise return type to the method `toISOString()`:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
   */
  toISOString(): DateISO;
}

export type Year = `${number}${number}${number}${number}`;
export type Month = `${number}${number}`;
export type Day = `${number}${number}`;
export type Hours = `${number}${number}`;
export type Minutes = `${number}${number}`;
export type Seconds = `${number}${number}`;
export type Milliseconds = `${number}${number}${number}`;

/**
 * Represent a string like `2021-01-08`
 */
type DateISODate = `${Year}-${Month}-${Day}`;

/**
 * Represent a string like `14:42:34.678`
 */
type DateISOTime = `${Hours}:${Minutes}:${Seconds}.${Milliseconds}`;

/**
 * Represent a string like `2021-01-08T14:42:34.678Z` (format: ISO 8601).
 *
 * It is not possible to type more precisely (list every possible values for months, hours etc) as
 * it would result in a warning from TypeScript:
 *   "Expression produces a union type that is too complex to represent. ts(2590)
 */
export type DateISO = `${DateISODate}T${DateISOTime}Z`;
