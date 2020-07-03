import React from 'react';
import Showdown from 'showdown';

// prefixHeaderId  Add a prefix to the generated header ids.
// Passing a string will prefix that string to the header id.
// Setting to true will add a generic 'section' prefix.
// strikethrough  Enable support for strikethrough syntax.
// ~~strikethrough~~ as <del>strikethrough</del>
// headerLevelStart  foo parse to <h3>foo</h3>

class MdContentView extends React.Component {
  constructor(props) {
    super(props);

    this.mdConfig = {
      tables: true,
      simplifiedAutoLink: true,
      prefixHeaderId: true,
      strikethrough: true,
      headerLevelStart: 1,
      tasklists: true,
    }

    this.converter = new Showdown.Converter(this.mdConfig);
  }


  parseContent(content) {
    if (!content){
      return `<h2>${this.props.emptyText}</h2>`;
    }

    if (this.props.encoded) {
      let decoded = this.decodeText(content);
      let text = this.safeText(decoded);
      return this.decodeBody(text);
    } else {
      return this.decodeBody(content);
    }
  }

  decodeBody(markdown) {
    return this.converter.makeHtml(markdown)
  }

  decodeText(encoded) {
    return window.atob(encoded);
  }

  safeText(text){
    return decodeURIComponent(escape(text));
  }

  render() {
    return (
      <div className={'content_area'}
        dangerouslySetInnerHTML={{
          __html: this.parseContent(this.props.content)
        }}
      />
    )
  }
}

MdContentView.defaultProps = {
  emptyText: 'Content is not available yet',
}

export { MdContentView }
