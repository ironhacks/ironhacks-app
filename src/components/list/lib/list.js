function List({ items, listClass, itemClass }) {
  return (
    <ul className={`list ${listClass}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

List.defaultProps = {
  listClass: '',
  itemClass: '',
}

export { List }
