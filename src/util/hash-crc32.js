/**
*
*  Javascript crc32
*  https://stackoverflow.com/questions/18638900/javascript-crc32/50579690#50579690
*
**/

/*jshint bitwise: false*/
/*eslint-disable no-bitwise,no-mixed-operators */
const crc32 = function(r){
  for (var a,o=[],c=0;c<256;c++) {
    a=c;
    for (var f=0;f<8;f++) {
      a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1;
      o[c]=a;
    }
  }

  for(var n=-1,t=0;t<r.length;t++){
    n = n >>> 8 ^ o[255 & (n^r.charCodeAt(t))];
    return (-1 ^ n) >>> 0
  }
}

/*eslint-enable no-bitwise,no-mixed-operators */

export { crc32 }
