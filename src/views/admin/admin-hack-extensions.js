import { Component } from 'react';
import { InputText, InputCheckbox } from '../../components/input';
import { Section, Row } from '../../components/layout';

/// CALENDAR OPTIONS
// -----------------
//https://calendar.google.com/calendar/embed?
// height=600
// wkst=1
// bgcolor=%23ffffff
// ctz=America%2FNew_York
// src=dXRuNWRuaG1tN2JncmppcnJuMXVmNHYzODRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
// ---> btoa('utn5dnhmm7bgrjirrn1uf4v384@group.calendar.google.com')
// src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t
// ---> bota('addressbook#contacts@group.v.calendar.google.com')
// color=%23D50000
// color=%2333B679
// showTitle=0
// showNav=0
// showDate=0
// showPrint=0
// showTabs=0
// showCalendars=0
// showTz=1
// mode=AGENDA


class AdminHackExtensions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      syncing: false,
      submitDisabled: false,
      extensionData: {
        gcalendar_src: this.props.data.gcalendar_src || '',
        gcalendar_page: this.props.data.gcalendar_page || false,
        gcalendar_overview: this.props.data.gcalendar_overview || false,

      }
    }
  }

  onDataChanged = (name, value) => {
    let extensionData = this.state.extensionData;
    extensionData[name] = value
    console.log(extensionData);
    this.setState({extensionData: extensionData})
  };

  onCalendarDataChanged(data){
    let extensionData = this.state.extensionData;
    this.setState({
      extensionData : {
        ...extensionData,
        gcalendar: data,
      }
    })
  }

  onOptionChanged(name, value){
    let extensions = this.state.extensionData;
    extensions[name] = value;
    this.setState({extensionData: extensions})
  }

  submitExtensions = () => {
    if (this.state.syncing) {
      return false
    }

    this.setState({
      syncing: true,
      submitDisabled: true,
    })

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({
        extensions: this.state.extensionData,
      })
      .then(() => {
        console.log('submit sucessful');
        this.setState({
          syncing: false,
          submitDisabled: false,
        })
        window.location.reload();
      })
  };

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">
            {`${this.props.hackName} Extensions`}
          </h2>

          <h3 className="h3 py-3">
            Google Calendar Integration
          </h3>

          <InputCheckbox
            label="Show Calendar Page"
            name="gcalendar_page"
            onInputChange={(name, value)=>this.onDataChanged('gcalendar_page', value)}
            isChecked={this.state.extensionData.gcalendar_page}
            disabled={this.state.syncing}
          />

          <InputCheckbox
            label="Show Calendar on Overview Page"
            name="gcalendar_overview"
            onInputChange={(name, value)=>this.onDataChanged('gcalendar_overview', value)}
            isChecked={this.state.extensionData.gcalendar_overview}
            disabled={this.state.syncing}
          />

          <InputText
            containerClass="flex py-1 flex-between"
            inputClass="mx-2 flex-3"
            labelClass="flex-1"
            name="gcalendar_src"
            label="Calendar Src"
            value={this.state.extensionData.gcalendar_src || ''}
            onInputChange={(name, value)=>this.onDataChanged('gcalendar_src', value)}
          />

          </Section>

          <Section>
            <Row rowClass="flex justify-content-center bg-grey-lt2 py-4 mr-5 mb-5">
              <button
                className="btn btn- bg-primary px-8"
                onClick={this.submitExtensions}
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

export default AdminHackExtensions;
