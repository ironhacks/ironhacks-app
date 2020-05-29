import React from "react"

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer site_footer">
        <div
          className={"footer_container"}
          style={{
            margin: `0 auto`,
            maxWidth: `var(--page-width)`,
            paddingTop: '2rem'
          }}>

          <div
            style={{ marginLeft: `3rem`}}
            className="footer_block"
            >
            <span>Version 2.0.1</span>
          </div>

          <div
            style={{ marginRight: `3rem`}}
            className="footer_block"
          >
            <div>RESEARCH CENTER FOR OPEN DIGITAL INNOVATION | RCODI</div>
            <div>
              All rigths reserved IronHacks&#169; {new Date().getFullYear()}
            </div>
          </div>

        </div>
      </footer>
    )
  }
}

export { Footer }
