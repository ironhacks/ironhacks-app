import Showdown from 'showdown'

const InfoBanner = (props) => {
  const bannerConfig = {
    tables: false,
    noHeaderId: true,
    simplifiedAutoLink: true,
    prefixHeaderId: false,
    strikethrough: true,
    headerLevelStart: 2,
    tasklists: false,
    openLinksInNewWindow: true,
    emoji: true,
  }

  let bannerClass = 'info-banner'

  if (props.bannerClass) {
    bannerClass += ' ' + props.bannerClass
  }

  let bannerStyle = {
    color: props.color,
    backgroundColor: props.bg_color
  }

  const converter = new Showdown.Converter(bannerConfig)

  const convertToHtml = (md) => {
    return converter.makeHtml(md)
  }

  return (
    <div className={bannerClass}>
      <div className="info-banner__container" style={bannerStyle}>
        <div className="info-banner__content"
          dangerouslySetInnerHTML={{
            __html: convertToHtml(props.content)
          }}
        />
      </div>
    </div>
  )
}

InfoBanner.defaultProps = {
  color: '#000000',
  bg_color: '#bdbdbd',
  bannerClass: null,
}

export { InfoBanner }
