import React from 'react'
import { mergeClasses } from './lib/layoutUtils'


const footerContainerStyles = {
  margin: '0 auto',
  maxWidth: 'var(--page-width)',
};

const Footer = (props) => {
  const { footerClass } = props
  const baseClass = 'footer site_footer'
  return (
    <footer className={mergeClasses(baseClass, footerClass)}>
      <div className={'footer_container py-3'} style={footerContainerStyles}>
        <div className='footer_block' style={{ marginLeft: '3rem'}}>
          <div>
            <span>Version 2.1.1</span>
          </div>
        </div>

        <div className='footer_block' style={{ marginRight: '3rem'}}>
          <div>
            RESEARCH CENTER FOR OPEN DIGITAL INNOVATION | RCODI
          </div>
          <div>
            All rights reserved IronHacks&#169; {new Date().getFullYear()}
          </div>
        </div>

      </div>
    </footer>
  )
}
export { Footer }
