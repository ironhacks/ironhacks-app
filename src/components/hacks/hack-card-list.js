import { Component } from 'react'
import { HackCard, PreviousHackCard, HackSignupCard } from './hack-card'

class HackCardList extends Component {
  constructor(props) {
    super(props)
    this.emptyText = this.props.emptyText || 'There are no hacks available.'
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <div className="py-5 mb-2">
          <span className="font-italic ml-2">{this.emptyText}</span>
        </div>
      )
    } else {
      return (
        <ul className="hack_card_list">
          {this.props.hacks.map((hack, index) => (
            <li key={hack.hackId} className="hack_card_list__item w-full" index={index}>
              <HackCard
                name={hack.name}
                hackId={hack.hackId}
                thumbImg={hack.hackThumbImg}
                slug={hack.hackSlug}
                description={hack.description}
                startDate={hack.startDate}
                difficulty={hack.difficulty}
              />
            </li>
          ))}
        </ul>
      )
    }
  }
}

class PreviousHackCardList extends Component {
  constructor(props) {
    super(props)
    this.emptyText = this.props.emptyText || 'There are no hacks available.'
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <div className="py-5">
          <span className="empty-list">{this.emptyText}</span>
        </div>
      )
    } else {
      return (
        <ul className="hack_card_list">
          {this.props.hacks.map((hack, index) => (
            <li key={hack.hackId} className="hack_card_list__item w-full" index={index}>
              <PreviousHackCard
                name={hack.name}
                hackId={hack.hackId}
                thumbImg={hack.hackThumbImg}
                slug={hack.hackSlug}
                description={hack.description}
                startDate={hack.startDate}
                difficulty={hack.difficulty}
              />
            </li>
          ))}
        </ul>
      )
    }
  }
}

class HackSignupCardList extends Component {
  constructor(props) {
    super(props)
    this.emptyText = this.props.emptyText || 'There are no hacks available.'
  }

  render() {
    if (!this.props.hacks || this.props.hacks.length === 0) {
      return (
        <div className="py-5">
          <span className="empty-list">{this.emptyText}</span>
        </div>
      )
    } else {
      return (
        <ul className="hack_card_list">
          {this.props.hacks.map((hack, index) => (
            <li key={hack.hackId} className="hack_card_list__item w-full" index={index}>
              <HackSignupCard
                name={hack.name}
                hackId={hack.hackId}
                thumbImg={hack.hackThumbImg}
                slug={hack.hackSlug}
                description={hack.description}
                startDate={hack.startDate}
                difficulty={hack.difficulty}
              />
            </li>
          ))}
        </ul>
      )
    }
  }
}

export { PreviousHackCardList, HackCardList, HackSignupCardList }
