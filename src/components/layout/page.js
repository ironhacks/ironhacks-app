import React from 'react'
import { Header } from './header'
// import Meta from './meta'
import { Footer } from './footer'
// import { useSiteMetadata } from '../../hooks/use-site-metadata'

class Content extends React.Component {
  render() {
    return (
      <main className={'main'}>
        {this.props.children}
      </main>
    )
  }
}

// <Meta title={title} />
const Page = ({ user, pageClass, pageFooter, userIsAdmin, children }) => {
  const classes = ['page', pageClass].join(' ').trim();
  const displayName = user.displayName || 'IH';
  return (
    <>
      <Header
        user={user}
        displayName={displayName}
        isAdmin={userIsAdmin}
      />
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
      {pageFooter && (
        <Footer />
      )}
    </>
  )
}

Page.defaultProps = {
  pageClass: '',
  pageFooter: false,
  isAdmin: false,
  displayName: '',
  user: {},
}


// <Meta title={title} />
const BlankPage = ({ pageClass, children }) => {
  const classes = ['page', pageClass].join(' ').trim();
  return (
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
  )
}

BlankPage.defaultProps = {
  pageClass: '',
}


// <Meta title={title} />
const LandingPage = ({ pageClass, children }) => {
  const classes = ['page', pageClass].join(' ').trim();
  return (
    <>
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
      <Footer footerClass="bg-grey-dk4 cl-grey-lt1" />
    </>
  )
}


LandingPage.defaultProps = {
  pageClass: '',
}

export { Page, BlankPage, LandingPage }
