import React from 'react';
import { Section, Row } from '../../components/layout';
import Separator from '../../util/separator.js';
import { VariableSizeList as List } from 'react-window';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InputText } from '../../components/input';


class AdminSubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        deadline: '',
        name: '',
      },
    }

    this.onFormDataChanged = this.onFormDataChanged.bind(this);
    this.addSubmission = this.addSubmission.bind(this);
  }

  onFormDataChanged(name, value){
    console.log(name, value);
    let form = this.state.formData;
    form[name] = value;
    this.setState({formData: form})
  }

  addSubmission() {
    if (this.props.onCreate) {
      let data = this.state.formData;
      this.props.onCreate(data);
    }
  }

  render() {
    return (
      <>
      <Row rowClass="py-2">
        <h3 className="font-bold h3" style={{verticalAlign: 'center'}}>
          New Submission
        </h3>

        <InputText
          containerClass="flex py-1 flex-between"
          inputClass="mx-2 flex-1"
          labelClass="flex-1 h4"
          name="name"
          label="Name"
          value={this.state.formData.name || ''}
          onInputChange={this.onFormDataChanged}
        />

        <div className="flex py-1 flex-between">

          <h3 className="h4">
            Submission Deadline
          </h3>

          <div className="pr-2">
            <DatePicker
              selected={this.state.formData.deadline}
              onChange={(value)=>this.onFormDataChanged('deadline', value)}
            />
          </div>
        </div>
      </Row>

      <Row rowClass="flex justify-content-center bg-grey-lt2 py-4 mr-5 mb-5">
        <button
          className="btn btn- bg-primary px-8"
          onClick={this.addSubmission}
        >
          Add Submission
        </button>
      </Row>
      </>
    )
  }
}


class AdminHackSubmissions extends React.Component {
  constructor(props) {
    super(props);

    const { phases } = props.hackData;

    this.state = {
      phases: phases || [],
    }

    this.onDataChanged = this.onDataChanged.bind(this);
    this.ListItemPhase = this.ListItemPhase.bind(this);
    this.newSubmission = this.newSubmission.bind(this);
  }

  onDataChanged(value) {
    console.log(value);
  }

  newSubmission(data) {
    let phases = this.state.phases;
    phases.push(data);
    this.setState({phases: phases});
    console.log(this.state.phases);
  }


  ListItemPhase({index, style}) {
    // console.log('date', value, value.toISOString());
    let phase = this.state.phases[index];

    if (phase.deadline) {
      // V2 PHASE SUBMISSION
      let name = phase.name ? phase.name : '';
      let deadline = phase.deadline ? phase.deadline.toISOString() : 'n/a';
      return (
        <div style={style}>
          Name: {name}<br/>
          <strong>Submission Deadline</strong>: {deadline}
        </div>
      )

    } else {
      // LEGACY PHASE SUBMISSION
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
  }

  render() {
    return (
        <Section>
          <Row>
          <h2>
            {this.props.hackData.name} Submissions
          </h2>

          <Separator primary />
          </Row>
          <Row>
            <List
              itemCount={this.state.phases.length}
              itemSize={(()=>{return 90})}
              height={this.state.phases.length % 4 * 90}
              width={400}
              data={this.state.phases}
            >
              {this.ListItemPhase}
            </List>
          </Row>

          <AdminSubmissionForm
            onCreate={this.newSubmission}
          />

      </Section>
    );
  }
}

export default AdminHackSubmissions;
