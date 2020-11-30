import PropTypes from 'prop-types'
import { mergeClasses } from './lib/layoutUtils'

const Section = ({ id, sectionClass, align, containerClass, children }) => {
  let defaultClass = 'section'
  const defaultContainerClass = 'container section_container'

  if (id) {
    defaultClass += ` ${id}_section`
  }

  if (align) {
    if (align === 'center') {
      defaultClass += ' flex flex-align-center'
    } else if (align === 'horiz') {
      defaultClass += ' flex flex-center'
    } else if (align === 'both') {
      defaultClass += ' flex flex-center flex-align-center'
    } else {
      defaultClass += ' flex flex-center flex-align-center'
    }
  }

  return (
    <section id={id} className={mergeClasses(defaultClass, sectionClass)}>
      <div className={mergeClasses(defaultContainerClass, containerClass)}>{children}</div>
    </section>
  )
}

Section.defaultProps = {
  id: null,
  containerClass: null,
  sectionClass: null,
  valign: false,
  align: 'center',
}

Section.propTypes = {
  id: PropTypes.string,
  align: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  sectionClass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  containerClass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
}

export { Section }
