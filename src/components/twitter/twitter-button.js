function TwitterButton({ buttonClass, hashtag }) {
  return (
      <div className="twitter-button">
        <a
          href={`https://twitter.com/intent/tweet?hashtags=${hashtag}&ref_src=twsrc%5Etfw&tw_p=tweetbutton`}
          className={['twitter-button', buttonClass].join('').trim()}
        >
        <i/>
        <span>Tweet #{hashtag}</span>
      </a>
    </div>
  )
}

TwitterButton.defaultProps = {
  hashtag: 'IronHacks',
  buttonClass: '',
}


export { TwitterButton }
