import { Component } from 'react';
import { Loader } from '../../components/loader';
import { MdContentView }  from '../../components/markdown-viewer';
import { Row, Col } from '../../components/layout';
import {
  ResultsFinalSection,
  ResultsSectionSelector,
  ResultsSubmissionSelector,
  ResultsScoresSection,
  ResultsPeersSection,
  ResultsSummarySection,
} from '../../components/results';
import { fire2Ms } from '../../util/date-utils';
import { getArrayStats } from '../../util/stats';

function getMetrics(data) {
  let metrics = [];
  [...new Set(
    Object.values(data).map((item,index)=>{
      return item.map((key,i)=>{
        return key.label
      })
      .join(',')
    })
  )]
  .map((list)=>{
    return list.split(',')
  })
  .forEach((metric)=>{
    metrics= [...new Set([...metrics, ...metric])]
  })

  return metrics;
}

class ResultsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSubmission: null,
      cohorts: {},
      cohortSettings: {},
      finalResults: null,
      loading: true,
      participantCount: null,
      results: null,
      resultsContent: '',
      resultsPublished: {},
      resultStats: null,
      section: 'scores',
      selectedPhase: 0,
      submissionData: null,
      submissions: [],
      userResults: null,
    }
  }

  componentDidMount() {
    this.getResultsContent()
    this.getSubmissionInfo()
    this.getCohorts()
    this.getParticipantsList()
    this.getHackResults()

    // TODO: if all submissions are closed then check
    this.getResultsFinal()
  }

  getResultsContent = async () => {
    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .get()

    let data = doc.data()

    if (data) {
      this.setState({
        resultsContent: data.content,
        resultsPublished: data.isPublished || {},
      })
    }
  }

  getSubmissionInfo = async () => {
    let submissions = []

    let submissionsDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .get()

    let submissionsData = submissionsDoc.data();

    if (submissionsData)  {
      for (let submission of Object.keys(submissionsData)){
        submissions.push(submissionsData[submission]);
      }

      submissions.sort((a,b)=>{
        return fire2Ms(a.deadline) - fire2Ms(b.deadline)
      })

      this.setState({submissions: submissions})
    }
  }

  getCohorts = async () => {
    let cohortListDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('cohorts')
      .get()

    let cohortList = cohortListDoc.data()
    this.setState({cohorts: cohortList})

    let cohortSettingsDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('settings')
      .get()

    let cohortSettings = cohortSettingsDoc.data()
    this.setState({cohortSettings: cohortSettings})
  }

  getParticipantsList = async () => {
    let participants = {}

    let doc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('participants')
      .get()

    let data = doc.data();

    for (let participant of Object.keys(data)){
      participants[participant] = {
        userId: participant,
        alias: data[participant].alias,
        ref: data[participant].ref,
      }
    }

    this.setState({
      participants: participants,
    })
  };


  onPhaseSelection = (phase, submissionId) => {
    this.setState({selectedPhase: phase});
    if (phase === 'final') {
      // this.getResultsFinal();
    } else {
      this.getHackResults();
    }
  };

  getResultsFinal = async () => {
    let finalDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('final')
      .get()

    if (finalDoc.exists) {
      let finalData = finalDoc.data();
      this.setState({finalResults: finalData})
    } else {
      console.log('no final');
    }

  };

  getHackResults = async () => {
    let adminsRef = await window.firebase.firestore()
      .collection('admins')
      .get()

    let adminList = [];

    adminsRef.docs.forEach((item, index) => {
      adminList.push(item.id);
    })

    let submisison = this.state.submissions[this.state.selectedPhase]
    if (! submisison) {
      return false
    }

    let submissionId = submisison.submissionId;

    this.setState({currentSubmission:  submissionId})

    let submissionsCollection = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc(this.state.currentSubmission)
      .collection('users')
      .get()

    let submissions = [];

    submissionsCollection.docs.forEach(doc=>{
      // REMOVE USER SUBMISSION FROM PEER SET
      if (doc.id === this.props.userId) {
        this.setState({
          userSubmission: doc.data()
        })
      // REMOVE ADMIN USERS FROM PEER SET
      } else if (!adminList.includes(doc.id)) {
        let userName;
        if (this.state.participants[doc.id]){
          userName  = this.state.participants[doc.id].alias
        }
        submissions.push({
          userId: doc.id,
          name: userName,
          ...doc.data()
        })
      }
    })

    if (submissions.length > 0){
      this.setState({submissionData: submissions})
    } else {
      this.setState({submissionData: null})
    }

    let submissionResultsDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc(submissionId)
      .get()

    if (submissionResultsDoc.exists) {
      let submissionResultsData = submissionResultsDoc.data();

      let resultsIds = Object.keys(submissionResultsData).filter((item)=>{
        return ! adminList.includes(item)
      })

      let results = {};
      resultsIds.forEach((result, i) => {
        results[result] = submissionResultsData[result];
      });

      this.setState({
        participantCount: Object.keys(results).length,
        userResults: results[this.props.userId],
      })

      let metrics = getMetrics(submissionResultsData);

      let values = {};
      metrics.forEach ((metric)=>{
        values[metric] = [];
      })

      // CONVERT LIST OF RESULTS TO SET OF KEYS AND ARRAY OF VALUES
      Object.values(submissionResultsData).forEach((user)=>{
        user.forEach((item)=>{
          values[item.label].push(item.value)
        })
      })

      // FILTER NULL (AND/OR FALSE) VALUES FROM THE VALUE LIST
      Object.keys(values).forEach((key)=>{
        values[key] = values[key].filter((item)=> {return item})
      })

      let stats = {};

      Object.keys(values).forEach((key)=>{
        stats[key] = getArrayStats(values[key])
      })

      this.setState({ resultStats: stats })
    } else {
      this.setState({
        resultStats: null,
        userResults: null,
      })
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Row>
        <Col>
          <div className='top-container pb-4'>
            <h1 className="h2 font-bold pt-2 mb-0">Dashboard</h1>

            <div className="results-controls flex flex-between my-2">
              <div>
                <h3 className="font-bold text-center">
                  Select the results section.
                </h3>

                <ResultsSectionSelector
                  selected={this.state.section}
                  callback={id=>this.setState({section: id})}
                  sections={[
                    {name: 'scores', label: 'Your Scores', disabled: this.state.selectedPhase === 'final' ? true : false},
                    {name: 'peers', label: 'You Peers', disabled: this.state.selectedPhase === 'final' ? true : false},
                    {name: 'summary', label: 'Summary', disabled: this.state.selectedPhase === 'final' ? true : false},
                  ]}
                />
              </div>

              <div className="">
              {this.state.submissions && (
                <>
                <h3 className="font-bold text-center">
                  Select the phase you want to view.
                </h3>

                <ResultsSubmissionSelector
                  resultsPublished={this.state.resultsPublished}
                  phases={this.state.submissions}
                  finalResults={this.state.finalResults}
                  selectedPhase={this.state.selectedPhase}
                  onClick={this.onPhaseSelection}
                />
                </>
              )}
              </div>
            </div>

            <div className='selected-section'>
              {this.state.loading ? (
                <div className='results-loader'>
                  <Loader status='Fetching results...' />
                </div>
              ):(
              <>
              {this.state.selectedPhase === 'final' ? (
                  <>
                    {this.state.finalResults ? (
                      <ResultsFinalSection
                        userId={this.props.userId}
                        scores={this.state.finalResults}
                        submission={this.state.userSubmission}
                      />
                    ) : (
                      <h2 className='border text-center font-bold py-2'>
                        No final results yet.
                      </h2>
                    )}
                  </>
              ):(
                <>
                {this.state.section === 'scores' && (
                  <>
                    {this.state.userResults ? (
                      <ResultsScoresSection
                        userId={this.props.userId}
                        scores={this.state.userResults}
                        submission={this.state.userSubmission}
                      />
                    ) : (
                      <h2 className='border text-center font-bold py-2'>
                        No results for this submission.
                      </h2>
                    )}
                  </>
                )}

                {this.state.section === 'summary' && (
                    <>
                      {this.state.resultStats ? (
                        <ResultsSummarySection
                          participantCount={this.state.participantCount}
                          summary={this.state.resultStats}
                        />
                      ) : (
                        <h2 className='border text-center font-bold py-2'>
                          No results for this submission.
                        </h2>
                      )}
                    </>
                )}

                {this.state.section === 'peers' && (
                    <>
                      {this.state.submissionData ? (
                        <ResultsPeersSection
                          participantData={this.state.submissionData}
                        />
                      ) : (
                        <h2 className='border text-center font-bold py-2'>
                          No results for this submission.
                        </h2>
                      )}
                    </>
                )}
              </>
              )}
              </>
            )}
            </div>

            <MdContentView
              content={this.state.resultsContent}
              encoded={false}
              emptyText="Results Doc not available yet."
            />
          </div>
        </Col>
      </Row>
    )
  }
}

export default ResultsView;
