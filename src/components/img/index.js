import React from 'react';

const FIREBASE_IMAGE_DEFAULT = [
  '1200x675',
  '800x450',
  '360x200',
];

function getImgSet(filename, baseUrl, sizes) {
  return sizes.map((size)=>{
    return `${filename.split('.')[0]}_${size}.${filename.split('.')[1]} ${size.split('x')[0]}w`
  }).join(', \n')
}

function getImgPathSet(imgSet, baseUrl, path) {
  const imgs = imgSet.split(',');
  return imgs.map((img)=>{
    return `${baseUrl}/${path}optim%2F${img.trim().split(' ')[0]}`
  }).join(', \n')
}

function getImgSizes(sizes) {
  return sizes.map((size)=>{
    return `(max-width: ${size.split('x')[0]}px) ${size.split('x')[0]}px`
  }).join(', \n')
}

function Img({
    baseUrl,
    imgClass,
    responsive,
    filePath,
    fileName,
    sizes,
    srcSet,
    alt
  }) {

    const imgSrc = baseUrl ? `${baseUrl}/${filePath}${fileName}` : `${fileName}`;
    const imgAlt = alt ? alt : fileName.split('.')[0].split(/-+|_+/g).join(' ');
    const imgSet = responsive ? getImgSet(fileName, baseUrl, sizes) : null;
    const imgPathSet = responsive ? getImgPathSet(imgSet, baseUrl, filePath) : null;
    const imgSizes = responsive ? getImgSizes(sizes) : null;

  return (
    <img
      src={imgSrc}
      alt={imgAlt}
      sizes={imgSizes}
      srcSet={imgPathSet}
      className={imgClass}
    />
  )
}


Img.defaultProps = {
  sizes: FIREBASE_IMAGE_DEFAULT,
  filePath: '',
}


export { Img }
