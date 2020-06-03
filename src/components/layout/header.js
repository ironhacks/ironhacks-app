import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'gatsby'
import { Link } from 'react-router-dom'

const Header = ({ siteTitle }) => (
  <header
    className={'site-header'}
    style={{
      backgroundColor: 'var(--color-primary)',
      marginBottom: '1.45rem',
    }}
  >
    <div
      className={'header_container'}
      style={{
        margin: '0 auto',
        maxWidth: 'var(--page-width)',
        padding: '1.45rem 0',
      }}
    >
      <div
        className={'site-logo'}
        style={{
          marginLeft: '3rem',
        }}>

        <Link to='/'
          style={{
            backgroundColor: 'var(--color-black)',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}>
            {siteTitle}
          </Link>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export { Header }
