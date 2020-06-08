import React from 'react';
import Showdown from 'showdown';

// prefixHeaderId  Add a prefix to the generated header ids.
// Passing a string will prefix that string to the header id.
// Setting to true will add a generic 'section' prefix.
// strikethrough  Enable support for strikethrough syntax.
// ~~strikethrough~~ as <del>strikethrough</del>
// headerLevelStart  foo parse to <h3>foo</h3>



class HackTask extends React.Component {
  constructor(props) {
    super(props);

    this.mdConfig = {
      tables: true,
      simplifiedAutoLink: true,
      prefixHeaderId: true,
      strikethrough: true,
      headerLevelStart: 3,
      tasklists: true,
    }

    this.converter = new Showdown.Converter(this.mdConfig);

  }

  // Decode Markdown to HTML
  decodeBody(markdown) {
    return this.converter.makeHtml(markdown)
  }

  parseTask(task) {

    let decoded = this.decodeText(task);
    let text = this.safeText(decoded);

    return this.decodeBody(text);
  }

  decodeText(encoded) {
    return window.atob(encoded);
  }

  safeText(text){
    return decodeURIComponent(escape(text));
  }


  render() {
    if (!this.props.task) {
      return (
        <h1>Task is not available yet!</h1>
      )
    }

    return (
      <div className={'content_area'}
        dangerouslySetInnerHTML={{
          __html: this.parseTask(this.props.task)
        }}
      />
    )
  }
}

export { HackTask }
