import React from 'react';
import Separator from '../../util/separator.js';
import {
  InputText,
  InputCheckbox,
  InputTextarea,
  InputSelect,
} from '../../components/input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Section, Row } from '../../components/layout';
import { upperCaseWord } from '../../util/string-utils';

var fire2Date = (fireDate) => {
  if (!fireDate){
    return '';
  }

  let secs = fireDate.seconds || 0;
  let nsecs = fireDate.nanoseconds || 0;

  return new Date((secs * 1000) + (nsecs / 1000000)).toISOString();
}

class AdminHackSettings extends React.Component {
  constructor(props) {
    super(props);
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
    } = props.hackData;

    let defaultDisplayOptions = {
      forumEnabled: false,
      calendarEnabled: false,
      taskEnabled: false,
      tutorialEnabled: false,
      resultsEnabled: false,
      rulesEnabled: false,
      submissionsEnabled: false,
      quizEnabled: false,
    }

    let parsedDate = startDate;
    if (startDate.seconds) {
      parsedDate = new Date(Date.parse(fire2Date(startDate)))
    } else {
      parsedDate = new Date(Date.parse(startDate));
    }

    this.state = {
      whitelist: whitelist || [''],
      displayOptions: Object.assign({}, defaultDisplayOptions, displayOptions),
      registrationOpen: registrationOpen || false,
      registrationSurvey: registrationSurvey || '',
      hackPublished: hackPublished || false,
      hackBannerImg: hackBannerImg || '',
      hackName: name || '',
      hackDifficulty: difficulty || null,
      hackDescription: description || '',
      hackSlug: hackSlug || '',
      hackThumbImg: hackThumbImg || '',
      syncing: false,
      submitDisabled: false,
      startDate: startDate ? parsedDate : new Date(),
    }
  }

  onHackStartDateChanged = value => {
    this.setState({startDate: value})
  };

  onHackBannerImgChanged = (name, value) => {
    this.setState({hackBannerImg: value})
  };

  onHackThumbImgChanged = (name, value) => {
    this.setState({hackThumbImg: value})
  };

  onHackDifficultyChanged = (name, value) => {
    this.setState({hackDifficulty: value})
  };

  onRegistrationSurveyChanged = (name, value) => {
    console.log(name, value);
    this.setState({registrationSurvey: value})
  };

  onHackNameChanged = (name, value) => {
    this.setState({hackName: value})
  };

  onHackDescriptionChanged = (name, value) => {
    this.setState({hackDescription: value})
  };

  onHackSlugChanged = (name, value) => {
    this.setState({hackSlug: value})
  };

  onDisplayOptionsChanged = (name, value) => {
    let display = this.state.displayOptions;
    display[name] = value;
    this.setState({displayOptions: display})
  };

  onRegistrationOpenChanged = (name, value) => {
    if (this.state.syncing) {
      return false;
    }
    this.setState({syncing: true})

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({registrationOpen: value})
      .then(() => {
        this.setState({
          registrationOpen: value,
          syncing: false,
        })
      })
  };

  onHackPublishedChanged = (name, value) => {
    if (this.state.syncing) {
      return false
    }
    this.setState({syncing: true})

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({hackPublished: value})
      .then(() => {
        this.setState({
          hackPublished: value,
          syncing: false
        })
      })
  };

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
    };

    const filterDescription = (text) => {
      return text.replace(/[^a-zA-Z0-9-.,()"'/ ]/g, '')
    };

    const filterUrl = (path) => {
      return path.toLowerCase()
        .replace(/[^a-zA-Z0-9- ]/g, '')
        .replace(/ /g, '-')
    }

    let hackBannerImg = this.state.hackBannerImg.trim();
    let hackThumbImg = this.state.hackThumbImg.trim();
    let hackDifficulty = this.state.hackDifficulty;
    let hackName = filterText(this.state.hackName.trim());
    let hackDescription = filterDescription(this.state.hackDescription.trim());
    let displayOptions = this.state.displayOptions;
    let hackSlug = filterUrl(this.state.hackSlug.trim());
    let registrationSurvey = this.state.registrationSurvey.trim();
    let startDate = this.state.startDate;

    if (!this.state.hackSlug) {
      hackSlug = filterUrl(hackName);
    }

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({
        description: hackDescription,
        difficulty: hackDifficulty,
        displayOptions: displayOptions,
        hackBannerImg: hackBannerImg,
        hackSlug: hackSlug,
        hackThumbImg: hackThumbImg,
        name: hackName,
        registrationSurvey: registrationSurvey,
        startDate: startDate.toISOString(),
      })
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
          submitDisabled: false,
          syncing: false,
        })
        window.location.reload();
      })
  };

  render() {
    return (
      <>
        <h2>
          {this.props.hack.name} Settings
        </h2>

        <Separator primary />

        <Section sectionClass="py-2">
          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="hack_name"
            label="Name"
            value={this.state.hackName || ''}
            onInputChange={this.onHackNameChanged}
          />

          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="hack_slug"
            label="Slug"
            value={this.state.hackSlug || ''}
            onInputChange={this.onHackSlugChanged}
          />

          <InputSelect
            name="hack_dificulty"
            containerClass="flex align-items-center"
            labelClass="mr-2"
            inputClass="flex-1"
            label="Dificulty"
            value={this.state.hackDifficulty}
            options={[
              {label: 'Beginner', name: 'beginner'},
              {label: 'Intermediate', name: 'intermediate'},
              {label: 'Advanced', name: 'advanced'},
            ]}
            onInputChange={this.onHackDifficultyChanged}
          />

          <InputTextarea
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="hack_description"
            label="Description"
            value={this.state.hackDescription || ''}
            onInputChange={this.onHackDescriptionChanged}
          />


          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-2"
            labelClass="flex-1"
            name="hackRegistration"
            label="Registration Survey"
            icon="image"
            iconClass="pl-1 pr-2"
            value={this.state.registrationSurvey}
            onInputChange={this.onRegistrationSurveyChanged}
          />


          <h3 className="h3 py-2">
            Hack Media
          </h3>

          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-2"
            labelClass="flex-1"
            name="hack_banner"
            label="Hack Banner Image URL"
            icon="image"
            iconClass="pl-1 pr-2"
            value={this.state.hackBannerImg || ''}
            onInputChange={this.onHackBannerImgChanged}
          />

          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-2"
            labelClass="flex-1"
            name="hack_thumb"
            label="Hack Image Thumbnail"
            icon="image"
            iconClass="pl-1 pr-2"
            value={this.state.hackThumbImg || ''}
            onInputChange={this.onHackThumbImgChanged}
          />

          <h2 className="h2 pt-3">
            Hack Options
          </h2>

          <InputCheckbox
            label="Hack Published"
            name="hackPublished"
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

          <h3 className="h3 my-2" style={{verticalAlign: 'center'}}>
            Display Options
          </h3>

          {Object.keys(this.state.displayOptions).map((key, index)=>(
            <InputCheckbox
              key={index}
              label={upperCaseWord(key.replace('Enabled', ' Enabled'))}
              name={key}
              onInputChange={this.onDisplayOptionsChanged}
              isChecked={this.state.displayOptions[key]}
              disabled={this.state.syncing}
            />
          ))}
        </Section>

        <Section sectionClass="py-2">
          <div className="flex align-content-center py-2">
            <h3 className="h3 my-0 mr-2" style={{verticalAlign: 'center'}}>
              Start Date
            </h3>

            <DatePicker
              selected={this.state.startDate}
              onChange={this.onHackStartDateChanged}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              timeCaption="time"
              timeIntervals={60}
            />
          </div>


        </Section>

        <Section>
          <Row rowClass="flex justify-content-center bg-grey-lt2 py-4 mr-5 mb-5">
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

export default AdminHackSettings;
