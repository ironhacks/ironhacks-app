import { Component } from 'react'

// NOTES:
// https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization

class TwitterTimeline extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.twttr.widgets.load(
      document.getElementById('twitter-timeline')
    )
  }

  render() {
    return (
      <div id="twitter-timeline" className="twitter-timeline-container">
        <a
          className="twitter-timeline"
          data-dnt={this.props.dnt}
          data-theme={this.props.theme}
          data-chrome="noheader, nofooter"
          href={this.props.src}
        />
      </div>
    )
  }
}

TwitterTimeline.defaultProps = {
  theme: 'light',
  dnt: true,
  buttonClass: '',
}


export { TwitterTimeline }
