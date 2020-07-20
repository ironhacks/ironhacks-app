import React from 'react';
import { Page, Section, Row, Col } from '../../components/layout';
import { MaterialDesignIcon } from '../../components/icons/material-design-icon';
import { InputText, InputNumber } from '../../components/input';
import Select from 'react-select';
import '../../styles/css/profile.css';

import { COUNTRY_CODES } from '../../data';

const EDUCATION_STATUS = [
  { label: 'Yes', value: 'student_yes' },
  { label: 'No', value: 'student_no' },
]
const HIGHEST_DEGREE = [
  { label: 'Less than high school degree', value: 'hs_or_less'},
  { label: 'High school graduate (high school diploma or equivalent including GED)', value: 'hs_equiv'},
  { label: 'Some college but no degree', value: 'come_college'},
  { label: 'Associate degree in college (2-year)', value: 'assoc_degree'},
  { label: 'Bachelor\'s degree in college (4-year)', value: 'bach_degree'},
  { label: 'Master\'s degree', value: 'masters_degree'},
  { label: 'Doctoral degree', value: 'pdf_degree'},
  { label: 'Professional degree (JD, MD)', value: 'prof_degree'},
]

const PROGRAMING_LANGUAGES = [
  { label: 'Bash', value: 'bash' },
  { label: 'C/C++', value: 'c_cplus' },
  { label: 'C#/.NET', value: 'csharp_dotnet' },
  { label: 'D3.js', value: 'd3js' },
  { label: 'Go', value: 'go' },
  { label: 'Java', value: 'java' },
  { label: 'Javascript/Typescript', value: 'js_js' },
  { label: 'Julia', value: 'julia' },
  { label: 'MATLAB', value: 'matlab' },
  { label: 'Other', value: 'other' },
  { label: 'PHP', value: 'php' },
  { label: 'Python', value: 'python' },
  { label: 'R', value: 'r' },
  { label: 'Ruby', value: 'ruby' },
  { label: 'SAS/STATA', value: 'sas_stata' },
  { label: 'Scala', value: 'scala' },
  { label: 'SQL', value: 'sql' },
  { label: 'Visual Basic/VBA', value: 'vba' },
]

class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props);

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
          python:null,
          r: null,
          ruby: null,
          sas_stata: null,
          scala: null,
          sql: null,
          vba: null,
        },
        demographicData: {
          highestDegree: null,
          educationStatus: null,
          city: null,
          state: null,
          country: null,
        },
        socialMedia: {
          facebook: null,
          linkedin: null,
          instagram: null,
        }
      },
      degreeSelect: { label: null, value: null },
      educationSelect: { label: null, value: null },
      updateDisabled: false,
    };

    this.getUserProfile()

    this.experienceInputChanged = this.experienceInputChanged.bind(this);
    this.socialInputChanged = this.socialInputChanged.bind(this);
    this.demographicDegreeInputChanged = this.demographicDegreeInputChanged.bind(this);
    this.demographicEductationInputChange = this.demographicEductationInputChange.bind(this);
    this.updateProfileData = this.updateProfileData.bind(this);
  }

  componentDidMount() { }

  getUserProfile() {
    window.firebase.firestore()
      .collection('users')
      .doc(this.props.user.uid)
      .get()
      .then((result)=>{
        let data = result.data();
        if (data.profileData) {
          let exp = Object.assign(
            {},
            this.state.formData.programmingExperience,
            data.profileData.programmingExperience,
          );

          let soc = Object.assign(
            {},
            this.state.formData.socialMedia,
            data.profileData.socialMedia,
          );

          let dem = Object.assign(
            {},
            this.state.formData.demographicData,
            data.profileData.demographicData,
          );

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

  updateProfileData() {
    window.firebase.firestore()
      .collection('users')
      .doc(this.props.user.uid)
      .update({
        profileData: this.state.formData
      })
      .then(()=>{
        console.log('success');
        window.location = '/profile';
      })
  }

  socialInputChanged(name, value) {
      let social = this.state.formData.socialMedia;
      social[name] = value;

      this.setState({
        formData: {
          ...this.state.formData,
          socialMedia : social,
        }
      })
      console.log(this.state.formData);
  }

  experienceInputChanged(name, value) {
    let experience = this.state.formData.programmingExperience;
    experience[name] = value;

    this.setState({
      formData: {
        ...this.state.formData,
        programmingExperience : experience,
      }
    })
  }

  demographicDegreeInputChanged(name, data) {
    let demographic = this.state.formData.demographicData;
    demographic[name] = data;
    this.setState({
      formData: {
        ...this.state.formData,
        demographicData : demographic,
      },
    })
  }

  demographicEductationInputChange(name, data) {
    let demographic = this.state.formData.demographicData;
    demographic[name] = data;

    this.setState({
      formData: {
        ...this.state.formData,
        demographicData : demographic,
      },
    })

    console.log(name, data);
  }

  render() {
    return (
      <Page
        user={this.props.user}
        userIsAdmin={this.props.userIsAdmin}
      >
      <Section sectionClass="pt-10">
        <Row rowClass="ml-0">
          <Col colClass="">
            <div className="flex">
              <div className="mr-6">
                {this.props.user.provider[0].photoURL ? (
                  <img
                    className="profile__img"
                    alt="User Profile"
                    src={this.props.user.provider[0].photoURL}
                  />
                ) : (
                  <span className="profile__initials">
                    {this.props.user.profileLetters}
                  </span>
                )}
              </div>

              <div className='user-data'>
                <h2 className="h2 py-2 font-bold">Update Profile Info</h2>

                <h2 className="h2 profile__name mb-2">{this.props.user.displayName}</h2>

                <div className="mb-2"><MaterialDesignIcon name="key"/> UserId: {this.props.user.userId} </div>

                <div className="mb-2"><MaterialDesignIcon name="email"/> Email: {this.props.user.email} </div>
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

              <h3 className="h3 mt-2 py-2 font-bold">Current Student?</h3>

              <Select
                options={EDUCATION_STATUS}
                value={this.state.formData.demographicData.educationStatus}
                onChange={(value)=>this.demographicEductationInputChange('educationStatus', value)}
              />

              <h3 className="h3 mt-2 py-2 font-bold">Highest degree earned</h3>

              <Select
                options={HIGHEST_DEGREE}
                value={this.state.formData.demographicData.highestDegree}
                onChange={(value)=>this.demographicDegreeInputChanged('highestDegree', value)}
              />

              <h3 className="h3 mt-2 py-2 font-bold">Country</h3>

              <Select
                options={COUNTRY_CODES}
                value={this.state.formData.demographicData.country}
                onChange={(value)=>this.demographicDegreeInputChanged('country', value)}
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
                onChange={(value)=>this.demographicDegreeInputChanged('city', value)}
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
                onChange={(value)=>this.demographicDegreeInputChanged('state', value)}
              />

            </Col>
          </Row>

          <Row rowClass="flex-1 mr-0 min-w-400">
            <Col>
              <h3 className="h3 py-2 font-bold">Programming Experience</h3>

              <p>
                How much experience (in months) do you have with the following:
              </p>

              {PROGRAMING_LANGUAGES.map((item, index)=>(
                <InputNumber
                  containerClass="flex py-1 flex-between"
                  value={this.state.formData.programmingExperience[item.value] || ''}
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


export default ProfileEditPage;
