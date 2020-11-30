import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Page, Section, Row, Col } from '../../components/layout'
import { MaterialDesignIcon } from '../../components/icons/material-design-icon'
import { InputText, InputNumber } from '../../components/input'
import Select from 'react-select'
import { userMetrics } from '../../util/user-metrics'
import { COUNTRY_CODES, EDUCATION_STATUS, HIGHEST_DEGREE, PROGRAMING_LANGUAGES } from '../../data'

class ProfileEditPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.props.user,

      formData: {
        programmingExperience: {
          bash: null,
          c_cplus: null,
          csharp_dotnet: null,
          d3js: null,
          go: null,
          java: null,
          js_js: null,
          julia: null,
          matlab: null,
          other: null,
          php: null,
          python: null,
          r: null,
          ruby: null,
          sas_stata: null,
          scala: null,
          sql: null,
          vba: null,
        },
        demographicData: {
          highestDegree: { label: '', value: null },
          educationStatus: { label: '', value: null },
          country: { label: '', value: null },
          city: null,
          state: null,
        },
        socialMedia: {
          facebook: null,
          linkedin: null,
          instagram: null,
          github: null,
        },
      },
      degreeSelect: { label: null, value: null },
      educationSelect: { label: null, value: null },
      updateDisabled: false,
    }

    this.getUserProfile()
  }

  componentDidMount() {
    window.firebase.analytics().logEvent('view_profile_edit')
  }

  getUserProfile() {
    window.firebase
      .firestore()
      .collection('users')
      .doc(this.props.user.uid)
      .get()
      .then((result) => {
        let data = result.data()
        if (data.profileData) {
          let exp = Object.assign({}, this.state.formData.programmingExperience, data.profileData.programmingExperience)

          let soc = Object.assign({}, this.state.formData.socialMedia, data.profileData.socialMedia)

          let dem = Object.assign({}, this.state.formData.demographicData, data.profileData.demographicData)

          this.setState({
            formData: {
              ...this.state.formData,
              programmingExperience: exp,
              socialMedia: soc,
              demographicData: dem,
            },
            degreeSelect: '',
            educationSelect: '',
          })
        }
      })
  }

  updateProfileData = () => {
    let urlSearch = new URLSearchParams(this.props.location.search)
    let isNewUser = urlSearch.get('newuser')

    console.log('is new user', isNewUser)

    window.firebase
      .firestore()
      .collection('users')
      .doc(this.props.user.uid)
      .update({
        profileData: this.state.formData,
      })
      .then(() => {
        window.firebase.analytics().logEvent('update_profile')
        userMetrics({ event: 'update_profile' })

        if (isNewUser) {
          this.props.history.push('/hacks')
        } else {
          this.props.history.push('/profile')
        }
      })
  }

  socialInputChanged = (name, value) => {
    let social = this.state.formData.socialMedia
    social[name] = value

    this.setState({
      formData: {
        ...this.state.formData,
        socialMedia: social,
      },
    })
  }

  experienceInputChanged = (name, value) => {
    let experience = this.state.formData.programmingExperience
    experience[name] = value
    this.setState({
      formData: {
        ...this.state.formData,
        programmingExperience: experience,
      },
    })
  }

  demographicSelectInputChanged = (name, data) => {
    let demographic = this.state.formData.demographicData
    demographic[name] = data
    this.setState({
      formData: {
        ...this.state.formData,
        demographicData: demographic,
      },
    })
  }

  demographicTextInputChange = (name, data) => {
    let demographic = this.state.formData.demographicData
    demographic[name] = data
    this.setState({
      formData: {
        ...this.state.formData,
        demographicData: demographic,
      },
    })
  }

  render() {
    return (
      <Page
        user={this.props.user}
        userIsAdmin={this.props.userIsAdmin}
        pageTitle="IronHacks | Edit User Profile"
        pageDescription="Edit your IronHacks User Profile"
        pageUrl="https://ironhacks.com/profile/edit"
      >
        <Section sectionClass="pt-10">
          <Row rowClass="ml-0">
            <Col colClass="">
              <div className="flex">
                <div className="mr-6">
                  {this.props.user.provider[0].photoURL ? (
                    <img className="profile__img" alt="User Profile" src={this.props.user.provider[0].photoURL} />
                  ) : (
                    <span className="profile__initials">{this.props.user.profileLetters}</span>
                  )}
                </div>

                <div className="user-data">
                  <h2 className="h2 py-2 font-bold">Update Profile Info</h2>
                  <h2 className="h2 profile__name mb-2">{this.props.user.displayName}</h2>
                  <div className="mb-2">
                    <MaterialDesignIcon name="key" /> UserId: {this.props.user.userId}{' '}
                  </div>
                  <div className="mb-2">
                    <MaterialDesignIcon name="email" /> Email: {this.props.user.email}{' '}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Section>

        <Section sectionClass="py-5 mb-4" containerClass="flex flex-wrap justify-content-around">
          <Row rowClass="ml-0 flex-1 min-w-400">
            <Col colClass="">
              <h3 className="h3 py-2 font-bold">Social Media Profiles</h3>

              <InputText
                containerClass="flex py-1 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="linkedin"
                label="LinkedIn"
                icon="linkedin"
                iconClass="pr-2"
                value={this.state.formData.socialMedia.linkedin || ''}
                onInputChange={this.socialInputChanged}
              />

              <InputText
                containerClass="flex py-1 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="facebook"
                label="Facebook"
                icon="facebook"
                iconClass="pl-1 pr-2"
                value={this.state.formData.socialMedia.facebook || ''}
                onInputChange={this.socialInputChanged}
              />

              <InputText
                containerClass="flex py-1 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="instagram"
                label="Instagram"
                icon="instagram"
                iconClass="pr-2"
                value={this.state.formData.socialMedia.instagram || ''}
                onInputChange={this.socialInputChanged}
              />

              <InputText
                containerClass="flex py-1 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="github"
                label="Github"
                icon="github"
                iconClass="pr-2"
                value={this.state.formData.socialMedia.github || ''}
                onInputChange={this.socialInputChanged}
              />

              <h3 className="h3 mt-2 py-2 font-bold">Current Student?</h3>

              <Select
                options={EDUCATION_STATUS}
                value={this.state.formData.demographicData.educationStatus}
                onChange={(value) => this.demographicSelectInputChanged('educationStatus', value)}
              />

              <h3 className="h3 mt-2 py-2 font-bold">Highest degree earned</h3>

              <Select
                options={HIGHEST_DEGREE}
                value={this.state.formData.demographicData.highestDegree}
                onChange={(value) => this.demographicSelectInputChanged('highestDegree', value)}
              />

              <h3 className="h3 mt-2 py-2 font-bold">Country</h3>

              <Select
                options={COUNTRY_CODES}
                value={this.state.formData.demographicData.country}
                onChange={(value) => this.demographicSelectInputChanged('country', value)}
              />

              <InputText
                containerClass="flex py-1 mt-4 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="city"
                label="City"
                icon="map"
                iconClass="pr-2"
                value={this.state.formData.demographicData.city || ''}
                onInputChange={this.demographicTextInputChange}
              />

              <InputText
                containerClass="flex py-1 flex-between"
                inputClass="mx-2 flex-2"
                labelClass="flex-1"
                name="state"
                label="State"
                icon="map"
                iconClass="pr-2"
                value={this.state.formData.demographicData.state || ''}
                onInputChange={this.demographicTextInputChange}
              />
            </Col>
          </Row>

          <Row rowClass="flex-1 mr-0 min-w-400">
            <Col>
              <h3 className="h3 py-2 font-bold">Programming Experience</h3>

              <p>How much experience (in months) do you have with the following:</p>

              {PROGRAMING_LANGUAGES.map((item, index) => (
                <InputNumber
                  containerClass="flex py-1 flex-between"
                  value={this.state.formData.programmingExperience[item.value] || 0}
                  inputClass="mx-2 flex-1"
                  key={index}
                  label={item.label}
                  labelClass="flex-1"
                  max={60}
                  min={0}
                  name={item.value}
                  onInputChange={this.experienceInputChanged}
                />
              ))}
            </Col>
          </Row>
        </Section>

        <Section>
          <Row rowClass="flex justify-content-center bg-grey-lt2 py-4 mr-5 mb-5">
            <button
              className="btn btn- bg-primary px-8"
              onClick={this.updateProfileData}
              disabled={this.state.updateDisabled}
            >
              Submit
            </button>
          </Row>
        </Section>
      </Page>
    )
  }
}

export default withRouter(ProfileEditPage)
