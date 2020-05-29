import React from 'react';
import Showdown from 'showdown';

// prefixHeaderId  Add a prefix to the generated header ids.
// Passing a string will prefix that string to the header id.
// Setting to true will add a generic 'section' prefix.
// strikethrough  Enable support for strikethrough syntax.
// ~~strikethrough~~ as <del>strikethrough</del>
// headerLevelStart  foo parse to <h3>foo</h3>

const ConverterConfig = {
  tables: true,
  simplifiedAutoLink: true,
  prefixHeaderId: true,
  strikethrough: true,
  headerLevelStart: 3,
  tasklists: true,
};


class HackTask extends React.Component {

  // Decode Markdown to HTML
  decodeBody(markdown) {
    const converter = new Showdown.Converter(ConverterConfig);
    return converter.makeHtml(markdown);
  };

  // base64 encoded ascii to ucs-2 string
  atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
  };

  render() {
    if (!this.props.task) {
      return (
        <h1>Task is not available yet!</h1>
      )
    }

    return (
      <div dangerouslySetInnerHTML={{
        __html: this.decodeBody(this.atou(this.props.task))
      }}/>
    )
  }
}

export { HackTask }
