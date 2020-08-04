import React from 'react';
import { Redirect } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';
import Separator from '../../util/separator';
import Button from '../../util/button.js';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const styles = Theme.STYLES.AppSectionTheme;

const SectionContainer = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.containerHeight};
  background-color: ${(props) => props.theme.backgroundColor};

  h1 {
    &:first-child {
      margin: 30px 0 0 0;
    }
  }

  overflow: auto;

  input {
    border: 1px solid gray;
    border-radius: 4px;
    background-color: lightgray;
    padding-left: 10px;
  }

  .finish-cancel-button-container {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    height: 50px;
  }
`;

class AdminNewHackPage extends React.Component {
  _timeoutID;

  constructor(props) {
    super(props);
    this.state = {
      hackName: '',
      startDate: new Date(),
      isCreateEnable: true,
      mustNavigate: false,
    };

    this.onHackStartDateChanged = this.onHackStartDateChanged.bind(this);
    this.hackNameEventHandler = this.hackNameEventHandler.bind(this);
    this.createHack = this.createHack.bind(this);
  }


  onHackStartDateChanged(value){
    this.setState({startDate: value})
  }

  hackNameEventHandler(event) {
    this.setState({
      hackName: event.target.value,
      isCreateEnable: event.target.value ? false : true,
    })
  }

  createHack() {
    const hackInstance = {
      name: this.state.hackName,
      startDate: this.state.startDate,
      tutorial: {
        doc: '',
        created: new Date(),
      },
      task: {
        doc: '',
        created: new Date(),
      },
    };

    this.setState({ hack: hackInstance });

    window.firebase.firestore()
      .collection('hacks')
      .add(hackInstance)
      .then((docRef)=>{
        const hackId = docRef.id;
        this.setState({
          mustNavigate: true,
          hackId: hackId
        });
        window.location = `/admin/hacks/${hackId}`;
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    if (this.state.mustNavigate) {
      return (
        <Redirect
          to={{
            pathname: '/admin/hacks/' + this.state.hackName,
            state: {
              hack: this.state.hack,
              hackId: this.state.hackId
            },
          }}
        />
      );
    }
    return (
      <ThemeProvider theme={styles}>
        <SectionContainer className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h1>Create a new Hack</h1>
              <Separator primary />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8 offset-md-2'>
              <h2>Hack name</h2>
              <input
                type='text'
                placeholder='Hack Name'
                onChange={this.hackNameEventHandler}
              />
              <Separator />
            </div>
          </div>

          <div className='row'>
            <div className='col-md-7 offset-md-2'>
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
            </div>
          </div>

          <div className='row'>
            <div className='col-md-8 offset-md-2 finish-cancel-button-container'>
              <Button
                primary
                width='150px'
                margin='0 0 0 15px'
                onClick={this.createHack}
                disabled={this.state.isCreateEnable}
              >
                Create Hack
              </Button>
              <Button width='150px'>
                Cancel
              </Button>
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default AdminNewHackPage;
