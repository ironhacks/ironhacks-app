
export const getMIME = (type) => {
  const mime = {
    css: 'text/css',
    csv: 'text/plain',
    gif: 'image/gif',
    html: 'text/html',
    img: 'image/jpeg',
    js: 'text/javascript',
    md: 'text/markdown',
    png: 'image/png',
    svg: 'image/svg+xml',
    txt: 'text/plain',
  }

  if (mime.hasOwnProperty(type)) {
    return mime[type];
  } else {
    return false;
  }
}
