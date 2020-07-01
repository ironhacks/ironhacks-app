import React from 'react';
import Separator from '../../util/separator.js';
import { InputCheckbox } from '../../components/input/checkbox';
import { VariableSizeList as List } from 'react-window';
import AdminHackWhitelist from './admin-hack-whitelist';
import { Section } from '../../components/layout';
import moment from 'moment';

class AdmSettingsSection extends React.Component {
  constructor(props) {
    super(props);
    const { whitelist, registrationOpen } = props.hackData;

    this.state = {
      whitelist: whitelist || [''],
      registrationOpen: registrationOpen || false,
      syncing: false,
    }

    this.updateHackSettings = this.updateHackSettings.bind(this);
    this.ListItemUser = this.ListItemUser.bind(this);
    this.ListItemPhase = this.ListItemPhase.bind(this);
    this.onRegistrationOpenChanged = this.onRegistrationOpenChanged.bind(this);
  }

  onRegistrationOpenChanged(value) {
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
          syncing: false
        })
      })
  }

  updateHackSettings(whitelist) {
    this.setState({
      loading: true
    });

    const firestore = window.firebase.firestore();
    const batch = firestore.batch();
    const hackId = this.props.hackId;

      whitelist.forEach((email) => {
        if (!email) {
          return false;
        }

        let userWhitelist = window.firebase
          .firestore
          .FieldValue
          .arrayUnion(hackId);

        const data = {
          whitelist: userWhitelist,
        }

        const whitelistDoc = window.firebase.firestore()
          .collection('whitelists')
          .doc(email);

        batch.set(whitelistDoc, data, {
          merge: true
        })
      })

    const hackWhiteListObject = {
      whitelist: whitelist,
    }

    const hackRef = firestore
      .collection('adminHackData')
      .doc(this.props.hackId)

    batch.set(hackRef, hackWhiteListObject, { merge: true });

    batch
      .commit()
      .then(() => {
        this.setState((prevState, props) => {
          prevState.whitelist = whitelist;
          return {
            hack: prevState.hack,
            loading: false
          }
        })
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      })
  }

  ListItemUser({ index, style }) {
    return (
      <div style={style}>
        {index + 1}. {this.props.hack.registeredUsers[index]}
      </div>
    )
  }

  ListItemPhase({ index, style }) {
    let phase = this.props.hack.phases[index];
    let phaseIndex = phase.index ? phase.index + 1 : index + 1;
    let codeStartDate = phase.codingStartDate ? moment(phase.codingStartDate.seconds).format('MMM Do') : 'n/a';
    let codeEndDate = phase.codingStartEnd ? moment(phase.codingStartEnd.seconds).format('Do YYYY') : 'n/a';
    let evalStartDate = phase.evaluationStartDate ? moment(phase.evaluationStartDate.seconds).format('MMM Do') : 'n/a';
    let evalEndDate = phase.evaluationStartend ? moment(phase.evaluationStartend.seconds).format('Do YYYY') : 'n/a';

    return (
      <div style={style}>
        Phase {phaseIndex}<br/>
        <strong>Coding</strong>: {codeStartDate}-{codeEndDate}<br/>
        <strong>Evaluation</strong>: {evalStartDate}-{evalEndDate}
      </div>
    )
  }

  render() {
    return (
      <>
        <h2>
          {this.props.hack.name}'s Settings
        </h2>

        <Separator primary />


        <Section sectionClass="py-2">
          <h2 className="h2">
            Hack Options
          </h2>

          <InputCheckbox
            name="Registration Open"
            onInputChanged={this.onRegistrationOpenChanged}
            isChecked={this.state.registrationOpen}
            disabled={this.state.syncing}
          />
        </Section>

        <Section sectionClass="py-2">

            <h3 className="h3 py-2">
              Hack Phases
            </h3>

            <List
              itemCount={this.props.hack.phases.length}
              itemSize={(()=>{return 90})}
              height={this.props.hack.phases.length % 4 * 90}
              width={400}
              data={this.props.hack.phases}
            >
              {this.ListItemPhase}
            </List>
          </Section>

          <Section sectionClass="py-2">
            <h3 className="h3 py-2">
              Registered Users
            </h3>

            <List
              itemCount={this.props.hack.registeredUsers.length}
              itemSize={(()=>{return 30})}
              height={300}
              width={400}
              data={this.props.hack.registeredUsers}
            >
              {this.ListItemUser}
            </List>
          </Section>

          <Section sectionClass="py-2">
            <h3 className="h3 py-2">
              Hack Whitelist
            </h3>

            <p>
              The white list is an email list that the defines which users are allow
              to register and participate in a hack (like a participants list).
              Please introduce the list of emails. You can separate them by commas
              (,) whitespaces or by pressing intro. You can also copy-paste them
              directly from excel.
            </p>

            <AdminHackWhitelist
              onSaveSettings={this.updateHackSettings}
              whitelist={this.state.whitelist}
            />
          </Section>


      </>
    );
  }
}

export default AdmSettingsSection;
