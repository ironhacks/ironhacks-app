import React from 'react';
// import styled from 'styled-components';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import './css/react-mde-all.css';
//
// const Editor = styled(ReactMde)`
//   height: 500px;
//   max-height: 500px;
//   padding-top: 1px;
//   position: relative;
//   width: 100%;
// `;

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

class MarkdownEditor extends React.Component {
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
    this.md2Html = this.md2Html.bind(this);
  }


  md2Html(md) {
    return this.converter.makeHtml(md)
  }

  _setValue(_value) {
    this.setState({ value: _value })
  }

  setSelectedTab(tabId) {
    this.setState({ selectedTab: tabId })
  }

  handleValueChange(value) {
    this._setValue(value)
    this.props.onEditorChange(value);
  };

  render() {
    return (
      <ReactMde
        layout={this.props.editorLayout}
        onChange={value => this.handleValueChange(value)}
        selectedTab={this.state.selectedTab}
        value={this.state.value}
        onTabChange={tabid => this.setSelectedTab(tabid)}
        generateMarkdownPreview={md => Promise.resolve(this.md2Html(md))}
      />
    );
  }
}

export default MarkdownEditor;
