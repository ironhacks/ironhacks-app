import React from 'react';
import styled from 'styled-components';
import Separator from '../../util/separator.js';
import { InputCheckbox } from '../../components/input/checkbox';
import AdminHackWhitelist from './admin-hack-whitelist';


// Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: 100%;
  padding: 25px 50px 50px 50px;

  input {
    width: 100%;
    max-height: 45px;
  }

  .new-item-list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;


class AdmSettingsSection extends React.Component {
  constructor(props) {
    super(props);
    const { whitelist, registrationOpen } = props.hackData;
    console.log('hackData', props.hackData);
    console.log('registrationOpen', registrationOpen);

    this.state = {
      whitelist: whitelist || [''],
      registrationOpen: registrationOpen || false,
      syncing: false,
    }

    // this.hackRef = window.firebase.firestore()
    //       .collection('hacks')
    //       .doc(this.hackId);

    this.updateHackSettings = this.updateHackSettings.bind(this);
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

      console.log('onRegistrationOpenChanged', value);
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

    console.log('hackRef', hackRef);

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

  render() {
    return (
      <SectionContainer>
        <h2>{this.props.hack.name}'s Settings</h2>
        <Separator primary />

        <h2 className="h2">
          Options
        </h2>

        <InputCheckbox
          name="Registration Open"
          onInputChanged={this.onRegistrationOpenChanged}
          isChecked={this.state.registrationOpen}
          disabled={this.state.syncing}
        />

        <div>
          <h3>Hack Data:</h3>

          <pre style={{
            width: '100%',
            whiteSpace: 'break-spaces',
            padding: 0,
            margin: 0,
            position: 'relative',
          }}>
            {JSON.stringify(this.props.hack, null, '  ')}
          </pre>
        </div>

        <h3>
          <label htmlFor='whitelist'>White List</label>
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
      </SectionContainer>
    );
  }
}

export default AdmSettingsSection;
