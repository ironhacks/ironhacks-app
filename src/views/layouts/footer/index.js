import React from 'react';
import './assets/footer.css';


class Footer extends React.Component {
  render() {
    return (
      <footer className="footer site_footer">
        <div
          className={'footer_container'}
          style={{
            margin: '0 auto',
            maxWidth: 'var(--page-width)',
            paddingTop: '2rem'
          }}>

          <div
            className="footer_block"
            style={{
              marginLeft: '3rem'
            }}>
            <span>Version 2.0.1</span>
          </div>

          <div
            className='footer_block'
            style={{
              marginRight: '3rem'
            }}>
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
}

export { Footer }
