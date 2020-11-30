import { Component } from 'react'
import PropTypes from 'prop-types'

// <IconComponent className={["svg_icon__svg", iconClasses].join(" ")} />

class SvgIconContainer extends Component {
  constructor(props) {
    super(props)
    this.size = this.props.size
    this.baseClass = this.props.flex ? 'flexicon' : 'svgicon'
    this.containerClass = this.props.containerClass
  }
  render() {
    const { children } = this.props
    const _classes = [this.baseClass, this.containerClass].join(' ').trim()
    return <i className={_classes}>{children}</i>
  }
}

SvgIconContainer.defultProps = {
  containerClass: '',
  size: '1em',
  flex: false,
}

SvgIconContainer.propTypes = {
  containerClass: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.node.isRequired,
  flex: PropTypes.bool,
}

class SvgIcon extends Component {
  constructor(props) {
    super(props)
    this.containerClass = this.props.containerClass
    this.baseClass = this.props.flex ? 'flexicon__svg' : 'svgicon__svg'
    this.iconClass = [this.baseClass, this.props.iconClass].join(' ').trim()
    this.iconComponent = this.props.iconComponent
    this.size = this.props.size
  }

  render() {
    return (
      <SvgIconContainer
        flex={this.props.flex}
        style={{ height: this.props.size, width: this.props.size }}
        containerClass={this.containerClass}
      >
        {this.iconComponent({ className: this.iconClass })}
      </SvgIconContainer>
    )
  }
}

SvgIcon.defultProps = {
  baseClass: 'svg_icon',
  containerClass: '',
  iconClass: '',
  size: '1em',
  flex: false,
}

SvgIcon.propTypes = {
  baseClass: PropTypes.string,
  containerClass: PropTypes.string,
  size: PropTypes.string,
  flex: PropTypes.bool,
  iconClass: PropTypes.string,
  iconComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
}

export { SvgIcon }
