/**
 * Check if provided "value":
 * - is undefined
 * - is null
 * - is object and has 0 elements
 * - is an empty string \
 * and return true if any of the condition is met
 *
 * @param {*} value
 */
const isEmpty = (value: Object | string | undefined | null): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;
