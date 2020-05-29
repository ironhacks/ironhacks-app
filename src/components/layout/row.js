import React from "react"
import PropTypes from "prop-types"
import { mergeClasses } from "./lib/layoutUtils"

const Row = (props) => {
  const { rowClass, children } = props
  const baseClass = props.flex ? "flex-row" : "row"
  return (
    <div className={mergeClasses(baseClass, rowClass)}>{children}</div>
  )
}

Row.defaultProps = {
  rowClass: null,
  flex: false,
}

Row.propTypes = {
  rowClass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flex: PropTypes.oneOfType([PropTypes.boolean]),
  children: PropTypes.node.isRequired,
}

export { Row }
