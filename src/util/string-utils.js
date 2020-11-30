function encodeDocument(string) {
  let safeString = unescape(encodeURIComponent(string))
  return window.btoa(safeString)
}

function decodeDocument(encoded) {
  let decoded = window.atob(encoded)
  return decodeURIComponent(escape(decoded))
}

function upperCaseWord(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export { upperCaseWord, decodeDocument, encodeDocument }
