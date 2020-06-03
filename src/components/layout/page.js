import React from 'react'
import { Header } from './header'
// import Meta from './meta'
import { Footer } from './footer'
// import { useSiteMetadata } from '../../hooks/use-site-metadata'

class Content extends React.Component {
  render() {
    return (
      <main className={'main'}>
        <div className={'main_container'}>
          {this.props.children}
        </div>
      </main>
    )
  }
}

// <Meta title={title} />
const Page = ({ title, siteTitle, children }) => {
  // const { siteTitle } = useSiteMetadata()
  return (
    <>
      <Header siteTitle={siteTitle} />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}

// <Meta title={title} />
const BlankPage = ({ title, children }) => {
  return (
    <>
      <Content>{children}</Content>
    </>
  )
}

// <Meta title={title} />
const LandingPage = ({ title, children }) => {
  // const { siteTitle } = useSiteMetadata()
  return (
    <>
      <Content>{children}</Content>
      <Footer footerClass="bg-grey-dk4 cl-grey-lt1" />
    </>
  )
}

export { Page, BlankPage, LandingPage }
