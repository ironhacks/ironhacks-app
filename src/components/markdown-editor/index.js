import { Component } from 'react'
import ReactMde from 'react-mde'
import Showdown from 'showdown'
import showdownKatex from 'showdown-katex'
import './css/react-mde-all.css'

class MarkdownEditor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mdeState: {
        markdown: this.props.withContent ? this.props.withContent : '',
      },
      textHmtl: '',
      selectedTab: 'write', // write|preview
      value: this.props.withContent ? this.props.withContent : '',
    }

    this.mdConfig = {
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

    this.converter = new Showdown.Converter(this.mdConfig)
  }

  _setValue(_value) {
    this.setState({ value: _value })
  }

  setSelectedTab(tabId) {
    this.setState({ selectedTab: tabId })
  }

  handleValueChange(value) {
    this.props.onEditorChange(value)
  }

  render() {
    return (
      <ReactMde
        value={this.props.value}
        layout={this.props.editorLayout}
        classes={{
          preview: 'content_area',
        }}
        selectedTab={this.state.selectedTab}
        minEditorHeight={this.props.height}
        generateMarkdownPreview={(md) => Promise.resolve(this.converter.makeHtml(md))}
        onTabChange={(tabid) => this.setSelectedTab(tabid)}
        onChange={(value) => this.handleValueChange(value)}
        readOnly={this.props.disabled}
      />
    )
  }
}

MarkdownEditor.defaultProps = {
  height: 500,
  disabled: false,
}

export default MarkdownEditor
