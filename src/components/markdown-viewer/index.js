import { Component } from 'react'
import Showdown from 'showdown'
import showdownKatex from 'showdown-katex'
import { userMetrics } from '../../util/user-metrics'

class MdContentView extends Component {
  constructor(props) {
    super(props)

    const mdConfig = {
      headerLevelStart: 1,
      prefixHeaderId: true,
      requireSpaceBeforeHeadingText: true,
      simpleLineBreaks: false,
      simplifiedAutoLink: true,
      strikethrough: true,
      openLinksInNewWindow: true,
      tables: true,
      tasklists: true,
      extensions: [
        showdownKatex({
          delimiters: [{ left: '$$', right: '$$', display: false }],
        }),
      ],
    }

    this.converter = new Showdown.Converter(mdConfig)
  }

  trackClicks(e) {
    if (e.target && e.target.tagName === 'A') {
      userMetrics({
        event: 'click_link',
        linkTarget: e.target.href,
        linkText: e.target.text,
      })
    }
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
        onClick={this.props.enableTracking ? this.trackClicks : null}
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
  enableTracking: false,
}

export { MdContentView }
