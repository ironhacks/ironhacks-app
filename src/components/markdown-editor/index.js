import { Component } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import './css/react-mde-all.css';

// function loadSuggestions(text) {
//   return new Promise((accept, reject) => {
//     setTimeout(() => {
//       const suggestions = [
//         {
//           preview: '// HACK:hackId',
//           value: '@hack',
//         },
//         {
//           preview: 'rcodi purdue',
//           value: '@rcodi',
//         },
//       ].filter(i => i.preview.toLowerCase().includes(text.toLowerCase()))
//       accept(suggestions)
//     }, 250)
//   })
// }

class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mdeState: {
        markdown: this.props.withContent ? this.props.withContent : '',
      },
      textHmtl: '',
      selectedTab: 'write', // write|preview
      value: this.props.withContent ? this.props.withContent : '',
    };


    this.mdConfig = {
      tables: true,
      ghCodeBlocks: true,
      simpleLineBreaks: true,
      requireSpaceBeforeHeadingText: true,
      simplifiedAutoLink: true,
      prefixHeaderId: true,
      strikethrough: true,
      tasklists: true,
    }

    this.converter = new Showdown.Converter(this.mdConfig);
  }

  _setValue(_value) {
    this.setState({ value: _value })
  }

  setSelectedTab(tabId) {
    this.setState({ selectedTab: tabId })
  }

  handleValueChange(value) {
    this.props.onEditorChange(value);
  };

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
        generateMarkdownPreview={md=>Promise.resolve(this.converter.makeHtml(md))}
        onTabChange={tabid => this.setSelectedTab(tabid)}
        onChange={value => this.handleValueChange(value)}
        readOnly={this.props.disabled}
      />
    );
  }
}

MarkdownEditor.defaultProps = {
  height: 500,
  disabled: false,
}

export default MarkdownEditor;
