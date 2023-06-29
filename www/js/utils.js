/**
 * Transforms body of a fetch raw response to a JSON object
 * @param {object} apiRaw - Fetch raw response
 * @param {object} apiJson - Body of fetch response transformed to JSON
 */
function apiToJson(apiRaw) {
  return apiRaw.json();
}

/**
 * Saves to localStorage a JSON string
 * @param {string} key - Key identifier
 * @param {any} value - Value to store
 */
function guardarLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves from localStorage a JSON parsed object
 * @param {string} key - Key identifier
 * @param {any} defaultValue - Default value if not key present
 */
function cargarLocalStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

/**
 * Creates an encoded url with params
 * @param {string} url - The base url
 * @param {object} params - Params in key-value structure
 * @return {string} Encoded url with params
 */
function buildUrl(url, params) {
  const urlObj = new URL(url);
  if (params) {
    urlObj.search = new URLSearchParams(params).toString();
  }

  return urlObj;
}

/**
 * Convert URLSearchParams to object
 * @param {URLSearchParams} params - The base url
 * @return {object} Params key-value separated
 */
function paramsToObject(params) {
  const result = {};
  for (const [key, value] of params.entries()) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}

function removeHash(str) {
  return str.replace("#", "");
}

/**
 * Retrieves params from url
 * @param {string} url - The base url
 * @return {object} Decoded params
 */
function getUrlParams(url) {
  const decodedUrl = decodeURI(removeHash(url));
  const urlObj = new URL(decodedUrl);
  return paramsToObject(urlObj.searchParams);
}
