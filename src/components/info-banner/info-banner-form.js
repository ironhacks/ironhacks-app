import { Component } from 'react'
import DatePicker from 'react-datepicker'
import { SliderPicker } from 'react-color'
import { InfoBanner } from './info-banner'
import { InputText } from '../input'
import 'react-datepicker/dist/react-datepicker.css'

class InfoBannerForm extends Component {
  constructor(props) {
    super(props)
    this.defaultBanner = {
      content: '**Example:** :+1: [with link](https://ironhacks.com)',
      starts_at: null,
      ends_at: null,
      color: '#000000',
      bg_color: '#bdbdbd',
      active: true,
      message: null,
    }

    this.MAX_LENGTH = 1024

    this.state = this.defaultBanner
  }

  onBannerDataChanged = (name, value) => {
    this.setState({ [name]: value })
  }

  setBannerDarkTheme = () => {
    this.setState({ color: '#ffffff' })
  }

  setBannerLightTheme = () => {
    this.setState({ color: '#000000' })
  }

  resetBannerData = () => {
    this.setState({ ...this.defaultBanner })
  }

  validateBanner = () => {
    if (!this.state.starts_at || !this.state.ends_at) {
      this.setState({ message: 'Both start date and end date are required' })
      return false
    }
    return true
  }

  onCreateBanner = () => {
    if (this.props.onCreate) {
      let bannerData = {
        content: this.state.content,
        starts_at: this.state.starts_at,
        ends_at: this.state.ends_at,
        color: this.state.color,
        bg_color: this.state.bg_color,
        active: this.state.active,
      }

      let isValid = this.validateBanner()
      if (isValid) {
        this.props.onCreate(bannerData)
        this.resetBannerData()
      }
    }
  }

  onEditCanceled = () => {
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  onUpdateBanner = () => {
    if (this.props.onUpdate) {
      let bannerData = {
        content: this.state.content,
        starts_at: this.state.starts_at,
        ends_at: this.state.ends_at,
        color: this.state.color,
        bg_color: this.state.bg_color,
        active: this.state.active,
      }

      let isValid = this.validateBanner()
      if (isValid) {
        this.props.onUpdate(bannerData)
      }
    }
  }

  render() {
    return (
      <div className="info-banner-form">
        <div className="info-banner-form__header">
          <InfoBanner content={this.state.content} color={this.state.color} bg_color={this.state.bg_color} />
        </div>

        <div className="info-banner-form__main">
          <div className="flex my-2">
            <div className="mr-2">Theme:</div>

            <div className="btn badge bg-dark cl-white" onClick={this.setBannerDarkTheme}>
              Dark
            </div>

            <div className="btn badge bd-1 ml-1" onClick={this.setBannerLightTheme}>
              Light
            </div>
          </div>

          <InputText
            containerClass="flex flex-between my-4"
            inputClass="pl-2 flex-3"
            labelClass="flex-1"
            name="content"
            label="Message"
            value={this.state.content || ''}
            onInputChange={(name, value) => this.onBannerDataChanged(name, value)}
          />

          <div className="my-6">
            <SliderPicker
              color={this.state.bg_color}
              onChange={(color) => {
                this.onBannerDataChanged('bg_color', color.hex)
              }}
            />
          </div>

          <div className="flex my-4">
            <span className="mr-2 flex-1">Starts at</span>
            <div className="flex-3">
              <DatePicker
                selected={this.state.starts_at}
                onChange={(value) => {
                  this.onBannerDataChanged('starts_at', value)
                }}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd h:mm aa"
                timeCaption="time"
                timeIntervals={15}
              />
            </div>
          </div>

          <div className="flex my-4">
            <span className="mr-2 flex-1">Ends at</span>
            <div className="flex-3">
              <DatePicker
                selected={this.state.ends_at}
                onChange={(value) => {
                  this.onBannerDataChanged('ends_at', value)
                }}
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd h:mm aa"
                timeCaption="time"
                timeIntervals={15}
              />
            </div>
          </div>
        </div>

        <div className="info-banner-form__footer">
          {this.state.message && <p className="flex flex-center font-italic cl-red my-2">{this.state.message}</p>}

          <div className="flex justify-content-center bg-grey-lt2 py-2">
            <button className="btn btn-sm bg-primary px-8" onClick={this.onCreateBanner} disabled={this.props.disabled}>
              Create Banner
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export { InfoBannerForm }
