import React from "react"
import { Header } from "./header"
import Meta from "./meta"
import { Footer } from "./footer"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

class Content extends React.Component {
  render() {
    return (
      <main className={"page-content"}>
        <div className={"container page_container"}>{this.props.children}</div>
      </main>
    )
  }
}

const Page = ({ title, children }) => {
  const { siteTitle } = useSiteMetadata()
  return (
    <>
      <Meta title={title} />
      <Header siteTitle={siteTitle} />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}


const BlankPage = ({ title, children }) => {
  return (
    <>
      <Meta title={title} />
      <Content>{children}</Content>
    </>
  )
}

const LandingPage = ({ title, children }) => {
  const { siteTitle } = useSiteMetadata()
  return (
    <>
      <Meta title={title} />
      <Content>{children}</Content>
      <Footer />
    </>
  )
}

export { Page, BlankPage, LandingPage }
