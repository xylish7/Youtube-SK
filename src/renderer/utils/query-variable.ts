/**
 * Parse a quersy string returing an object in which the key is
 * the parameter and the value is the value
 *
 * Example:
 * hello=1&another=2
 *
 * returns {hello: 1, another: 2}
 *
 * @param queryString
 */
const parseQuery = (queryString: string) => {
  let query: any = {};
  let pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

export default parseQuery;
