import { userMetrics } from './user-metrics'

function downloadFileUrl({ url, name, label = 'file' }) {
  if (!url) {
    return false
  }

  window.firebase.analytics().logEvent('download_file', { type: label })
  userMetrics({
    event: 'download_file',
    data: {
      fileType: label,
      filePath: url,
    },
  })
  console.log('url', url)
  fetch(url, {
    method: 'GET',
    // mode: 'cors', // no-cors, *cors, same-origin
    // headers: [
    //   ['Access-Control-Allow-Origin', 'http://localhost:3000'],
    //   ['Content-Type', 'application/x-ipynb+json'],
    //   ['Content-Type', 'application/json'],
    //   ['Content-Type', 'text/plain'],
    //   ['Content-Type', 'text/html'],
    //   ['Content-Type', 'text/csv'],
    // ]
  })
    .then((response) => response.text())
    .then((fileContents) => {
      let el = window.document.createElement('a')
      el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents))
      el.setAttribute('download', name)
      el.style.display = 'none'
      window.document.body.appendChild(el)
      el.click()
      window.document.body.removeChild(el)
    })
    .catch((error) => console.error(error))
}

export { downloadFileUrl }
