import { Component } from 'react'
import PropTypes from 'prop-types'

class SvgImgContainer extends Component {
  constructor(props) {
    super(props)
    this.baseClass = 'svgimg'
    this.containerClass = this.props.containerClass
  }

  render() {
    const _classes = [this.baseClass, this.containerClass].join(' ').trim()
    return <div className={_classes}>{this.props.children}</div>
  }
}

SvgImgContainer.defultProps = {
  containerClass: '',
}

SvgImgContainer.propTypes = {
  containerClass: PropTypes.string,
  children: PropTypes.node.isRequired,
}

class SvgImg extends Component {
  constructor(props) {
    super(props)
    this.containerClass = this.props.containerClass
    this.imgClasses = ['svgimg__svg', this.props.imgClass].join(' ').trim()
    this.imgComponent = this.props.imgComponent
  }

  render() {
    return (
      <SvgImgContainer containerClass={this.containerClass}>
        {this.imgComponent({ className: this.imgClasses })}
      </SvgImgContainer>
    )
  }
}

SvgImg.defultProps = {
  baseClass: 'svg-img',
  containerClass: '',
  imgClass: '',
}

SvgImg.propTypes = {
  baseClass: PropTypes.string,
  containerClass: PropTypes.string,
  imgClass: PropTypes.string,
}

export { SvgImg }
