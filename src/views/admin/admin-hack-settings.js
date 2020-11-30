import { Component } from 'react'
import { AdminImageUpload } from '../../components/admin'
import { InputText, InputCheckbox, InputTextarea, InputSelect } from '../../components/input'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Section, Row } from '../../components/layout'
import { upperCaseWord } from '../../util/string-utils'

var fire2Date = (fireDate) => {
  if (!fireDate) {
    return ''
  }

  let secs = fireDate.seconds || 0
  let nsecs = fireDate.nanoseconds || 0

  return new Date(secs * 1000 + nsecs / 1000000).toISOString()
}

class AdminHackSettings extends Component {
  constructor(props) {
    super(props)
    const {
      hackBannerImg,
      description,
      difficulty,
      name,
      hackPublished,
      hackSlug,
      startDate,
      hackThumbImg,
      registrationOpen,
      registrationSurvey,
      displayOptions,
      whitelist,
    } = props.hackData

    let defaultDisplayOptions = {
      calendarEnabled: false,
      forumEnabled: false,
      rulesEnabled: false,
      taskEnabled: false,
      submissionsEnabled: false,
      resultsEnabled: false,
      tutorialsEnabled: false,
    }

    // NOTE: Some display options are moving
    // to dedicated pages and should not be
    // controlled from this interface
    this.excludeDisplayOptions = ['taskEnabled', 'quizEnabled']

    let parsedDate = startDate
    if (startDate.seconds) {
      parsedDate = new Date(Date.parse(fire2Date(startDate)))
    } else {
      parsedDate = new Date(Date.parse(startDate))
    }

    this.state = {
      whitelist: whitelist || [''],
      displayOptions: Object.assign({}, defaultDisplayOptions, displayOptions),
      registrationOpen: registrationOpen || false,
      registrationSurvey: registrationSurvey || '',
      hackPublished: hackPublished || false,
      hackBannerImg: hackBannerImg || '',
      hackBannerUpload: null,
      hackThumbImg: hackThumbImg || '',
      hackThumbUpload: null,
      hackName: name || '',
      hackDifficulty: difficulty || null,
      hackDescription: description || '',
      hackSlug: hackSlug || '',
      syncing: false,
      submitDisabled: false,
      startDate: startDate ? parsedDate : new Date(),
    }
  }

  onInputChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onBannerFileAdded = (file) => {
    this.setState({ hackBannerUpload: file[0] })
    this.uploadBannerFile()
  }

  onThumbFileAdded = (file) => {
    this.setState({ hackThumbUpload: file[0] })
    this.uploadThumbFile()
  }

  onHackStartDateChanged = (value) => {
    this.setState({ startDate: value })
  }

  onHackDifficultyChanged = (name, value) => {
    this.setState({ hackDifficulty: value })
  }

  onDisplayOptionsChanged = (name, value) => {
    let display = this.state.displayOptions
    display[name] = value
    this.setState({ displayOptions: display })
  }

  onRegistrationOpenChanged = (name, value) => {
    if (this.state.syncing) {
      return false
    }

    this.setState({ syncing: true })

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({ registrationOpen: value })
      .then(() => {
        this.setState({
          registrationOpen: value,
          syncing: false,
        })
      })
  }

  onHackPublishedChanged = (name, value) => {
    if (this.state.syncing) {
      return false
    }
    this.setState({ syncing: true })

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({ hackPublished: value })
      .then(() => {
        this.setState({
          hackPublished: value,
          syncing: false,
        })
      })
  }

  uploadBannerFile = () => {
    if (!this.state.hackBannerUpload) {
      return false
    }

    this.setState({
      submitDisabled: true,
      syncing: true,
    })

    var storageRef = window.firebase.storage().ref()
    var bannerImageRef = storageRef.child(`/media/hacks/${this.props.hackId}/${this.state.hackBannerUpload.name}`)

    bannerImageRef.put(this.state.hackBannerUpload).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        window.firebase
          .firestore()
          .collection('hacks')
          .doc(this.props.hackId)
          .set({ hackBannerImg: downloadURL }, { merge: true })
          .then(() => {
            this.setState({
              hackBannerImg: downloadURL,
              submitDisabled: false,
              syncing: false,
            })
          })
      })
    })
  }

  uploadThumbFile = () => {
    if (!this.state.hackThumbUpload) {
      return false
    }

    this.setState({
      submitDisabled: true,
      syncing: true,
    })

    var storageRef = window.firebase.storage().ref()
    var bannerImageRef = storageRef.child(`/media/hacks/${this.props.hackId}/${this.state.hackThumbUpload.name}`)

    bannerImageRef.put(this.state.hackThumbUpload).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((downloadURL) => {
        window.firebase
          .firestore()
          .collection('hacks')
          .doc(this.props.hackId)
          .set({ hackThumbImg: downloadURL }, { merge: true })
          .then(() => {
            this.setState({
              hackThumbImg: downloadURL,
              submitDisabled: false,
              syncing: false,
            })
          })
      })
    })
  }

  submitSettings = () => {
    if (this.state.syncing) {
      return false
    }

    this.setState({
      syncing: true,
      submitDisabled: true,
    })

    const filterText = (text) => {
      return text.replace(/[^a-zA-Z0-9- ]/g, '')
    }

    const filterDescription = (text) => {
      return text.replace(/[^a-zA-Z0-9-.,()"'/ ]/g, '')
    }

    const filterUrl = (path) => {
      return path
        .toLowerCase()
        .replace(/[^a-zA-Z0-9- ]/g, '')
        .replace(/ /g, '-')
    }

    let hackBannerImg = this.state.hackBannerImg.trim()
    let hackThumbImg = this.state.hackThumbImg.trim()
    let hackDifficulty = this.state.hackDifficulty
    let hackName = filterText(this.state.hackName.trim())
    let hackDescription = filterDescription(this.state.hackDescription.trim())
    let displayOptions = this.state.displayOptions
    let hackSlug = filterUrl(this.state.hackSlug.trim())
    let registrationSurvey = this.state.registrationSurvey.trim()
    let startDate = this.state.startDate

    if (!this.state.hackSlug) {
      hackSlug = filterUrl(hackName)
    }

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .set(
        {
          description: hackDescription,
          difficulty: hackDifficulty,
          displayOptions: displayOptions,
          hackSlug: hackSlug,
          hackThumbImg: hackThumbImg,
          name: hackName,
          registrationSurvey: registrationSurvey,
          startDate: startDate.toISOString(),
        },
        { merge: true }
      )
      .then(() => {
        this.setState({
          displayOptions: displayOptions,
          hackBannerImg: hackBannerImg,
          hackDescription: hackDescription,
          hackDifficulty: hackDifficulty,
          hackName: hackName,
          hackSlug: hackSlug,
          hackThumbImg: hackThumbImg,
          registrationSurvey: registrationSurvey,
          startDate: startDate,
          updateComplete: true,
          submitDisabled: false,
          syncing: false,
        })
      })
  }

  render() {
    return (
      <>
        <Section sectionClass="pt-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Settings`}</h2>

          <AdminImageUpload
            disabled={this.state.submissionDisabled}
            onFilesChanged={this.onBannerFileAdded}
            initialImage={this.state.hackBannerImg}
            maxFiles={1}
          />

          <InputText
            containerClass="mb-1 flex"
            inputClass="fs-m3 font-bold flex-1"
            labelClass="hide"
            name="hackBannerImg"
            label="Hack Banner Image Url"
            disabled={true}
            value={this.state.hackBannerImg || ''}
            onInputChange={this.onInputChange}
          />
        </Section>

        <Section sectionClass="pt-2">
          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="ml-2 pl-1 flex-3"
            labelClass="flex-1"
            name="hackName"
            label="Name"
            value={this.state.hackName || ''}
            onInputChange={this.onInputChange}
          />
          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="ml-2 pl-1 flex-3"
            labelClass="flex-1"
            name="hackSlug"
            label="Slug"
            value={this.state.hackSlug || ''}
            onInputChange={this.onInputChange}
          />
          <InputTextarea
            containerClass="flex py-1 flex-between"
            inputClass="ml-2 pl-1 flex-3"
            labelClass="flex-1"
            name="hackDescription"
            label="Description"
            value={this.state.hackDescription || ''}
            onInputChange={this.onInputChange}
          />
        </Section>

        <Section>
          <div className="flex  mt-2 flex-1">
            <div className="flex-0 pr-2">
              <h3 className="h4 py-2 font-bold">Hack Media</h3>

              <AdminImageUpload
                disabled={this.state.submissionDisabled}
                onFilesChanged={this.onThumbFileAdded}
                initialImage={this.state.hackThumbImg}
                containerClass="dropzone_container max-w-100 fs-m5"
                infoText="Thumb Image"
                infoSize="100 x 100"
                maxFiles={1}
              />

              <InputText
                containerClass="fs-m5 font-bold"
                inputClass="max-w-100"
                labelClass="hide"
                name="hackThumbImg"
                label="Hack Image Thumbnail"
                disabled={true}
                value={this.state.hackThumbImg || ''}
                onInputChange={this.onInputChange}
              />
            </div>

            <div className="pl-10 flex-1">
              <h3 className="h4 py-2 font-bold mb-1">Hack Options</h3>

              <InputCheckbox
                label="Hack Published"
                name="hackPublished"
                containerClass=""
                onInputChange={this.onHackPublishedChanged}
                isChecked={this.state.hackPublished}
                disabled={this.state.syncing}
              />

              <InputCheckbox
                label="Registration Open"
                name="registrationOpen"
                onInputChange={this.onRegistrationOpenChanged}
                isChecked={this.state.registrationOpen}
                disabled={this.state.syncing}
              />

              <div className="flex flex-align-center">
                <h3 className="h4 pr-2 my-0">Opening Date</h3>

                <DatePicker
                  className="fs-m2"
                  selected={this.state.startDate}
                  onChange={this.onHackStartDateChanged}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="time"
                  timeIntervals={60}
                />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="h4 py-2 font-bold mb-1">Display Options</h3>
              <div className="fs-m1 px-3 pt-2 bg-grey-lt2">
                {Object.keys(this.state.displayOptions).map((key, index) => {
                  if (!this.excludeDisplayOptions.includes(key)) {
                    return (
                      <InputCheckbox
                        key={index}
                        label={upperCaseWord(key.replace('Enabled', ' Enabled'))}
                        name={key}
                        onInputChange={this.onDisplayOptionsChanged}
                        isChecked={this.state.displayOptions[key]}
                        disabled={this.state.syncing}
                      />
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </Section>

        <Section sectionClass="pt-2">
          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="ml-2 pl-1 flex-3"
            labelClass="flex-1"
            name="registrationSurvey"
            label="Registration Survey"
            icon="image"
            iconClass="pl-1 pr-2"
            value={this.state.registrationSurvey}
            onInputChange={this.onInputChange}
          />
          <InputSelect
            name="hack_dificulty"
            containerClass="flex align-items-center"
            inputClass="ml-1 flex-3"
            labelClass="flex-1"
            label="Dificulty"
            value={this.state.hackDifficulty}
            onInputChange={this.onHackDifficultyChanged}
            options={[
              { label: 'Beginner', name: 'beginner' },
              { label: 'Intermediate', name: 'intermediate' },
              { label: 'Advanced', name: 'advanced' },
            ]}
          />
        </Section>

        <Section>
          <Row rowClass="flex justify-content-center bg-grey-lt2 py-3 mb-10 mt-2">
            <button
              className="btn btn- bg-primary px-8"
              onClick={this.submitSettings}
              disabled={this.state.submitDisabled}
            >
              Submit
            </button>
          </Row>
        </Section>
      </>
    )
  }
}

export default AdminHackSettings
