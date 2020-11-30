function MaterialDesignIcon({ name, iconClass, ...props }) {
  return <i className={`zmdi zmdi-${name} ${iconClass}`} {...props} />
}
MaterialDesignIcon.defaultProps = {
  name: '',
  iconClass: '',
}
export { MaterialDesignIcon }
