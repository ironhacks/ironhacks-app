import React from "react"
import PropTypes from "prop-types"
import { mergeClasses } from "./lib/layoutUtils"

const Col = (props) => {
  const { colClass, children } = props
  const defaultClass = "col"

  return (
    <div className={mergeClasses(defaultClass, colClass)}>{children}</div>
  )
}

Col.defaultProps = {
  rowClass: null,
  flex: false,
}

Col.propTypes = {
  colClass: PropTypes.oneOfType([PropTypes.string]),
  flex: PropTypes.oneOfType([PropTypes.boolean]),
  children: PropTypes.node.isRequired,
}

export { Col }
