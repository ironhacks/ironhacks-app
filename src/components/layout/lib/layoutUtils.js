// Cleanly merges combination of classes as string
// and classList array types.
// Returns unique className string
//
// Example
//    mergeClasses("", "test", ["1", "2'"], "test testA testB")
///  "test 1 2' testA testB"
//
const mergeClasses = (...args) => {
  var results = []
  for (let arg of args) {
    if (typeof arg === "string") {
      results.push(...arg.split(" "))
    }
    if (Array.isArray(arg)) {
      results.push(...arg)
    }
  }
  return [...new Set(results)].join(" ").trim()
}

export { mergeClasses }
