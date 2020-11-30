import { Component } from 'react'
import Showdown from 'showdown'

// prefixHeaderId  Add a prefix to the generated header ids.
// Passing a string will prefix that string to the header id.
// Setting to true will add a generic 'section' prefix.
// strikethrough  Enable support for strikethrough syntax.
// ~~strikethrough~~ as <del>strikethrough</del>
// headerLevelStart  foo parse to <h3>foo</h3>

class MdContentView extends Component {
  constructor(props) {
    super(props)

    const mdConfig = {
      tables: true,
      simplifiedAutoLink: true,
      prefixHeaderId: true,
      strikethrough: true,
      headerLevelStart: 1,
      tasklists: true,
      // extensions: [],
    }

    this.converter = new Showdown.Converter(mdConfig)
    // this.converter.setFlavor('github');
  }

  parseContent(content) {
    if (!content) {
      return `<h2>${this.props.emptyText}</h2>`
    }

    if (this.props.encoded) {
      let decoded = this.decodeText(content)
      let text = this.safeText(decoded)
      return this.decodeBody(text)
    } else {
      return this.decodeBody(content)
    }
  }

  decodeBody(markdown) {
    return this.converter.makeHtml(markdown)
  }

  decodeText(encoded) {
    return window.atob(encoded)
  }

  safeText(text) {
    return decodeURIComponent(escape(text))
  }

  render() {
    const classes = `content_area ${this.props.containerClass}`
    return (
      <div
        className={classes.trim()}
        dangerouslySetInnerHTML={{
          __html: this.parseContent(this.props.content),
        }}
      />
    )
  }
}

MdContentView.defaultProps = {
  emptyText: 'Content is not available yet',
  containerClass: '',
}

export { MdContentView }
