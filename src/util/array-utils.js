export function removeArrayItem(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1, list.length)]
}
