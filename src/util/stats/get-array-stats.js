
export function getArrayStats(list) {
  let delta = [];
  let sum = 0;
  let deltaSum = 0;
  let count = list.length;

  list.sort((a,b)=>{ return a - b})

  let median = list[Math.floor(count / 2)];
  let range = [Math.min(...list), Math.max(...list)];

  list.forEach((item)=>{sum = sum + item});
  let mean = (sum / count);

  list.forEach((item)=>{delta.push(Math.abs(item - mean))});
  delta.forEach((item)=>{deltaSum = deltaSum + item});
  let deltaMean = (deltaSum / count);

  let stdRange = [
    (mean - deltaMean - deltaMean),
    (mean + deltaMean + deltaMean),
  ]

  return {
    count,
    deltaMean,
    mean,
    median,
    range,
    sum,
    stdRange
  }
}
