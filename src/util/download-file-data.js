function downloadFileData({ data, name }) {
  if (!data) {
    return false
  }

  let el = window.document.createElement('a')
  el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data))
  el.setAttribute('download', name)
  el.style.display = 'none'
  window.document.body.appendChild(el)
  el.click()
  window.document.body.removeChild(el)
}

export { downloadFileData }
