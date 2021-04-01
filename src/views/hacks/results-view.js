import { Component } from 'react'
import { Loader } from '../../components/loader'
import { MdContentView } from '../../components/markdown-viewer'
import { Row, Col } from '../../components/layout'
import {
  ResultsFinalSection,
  ResultsSectionSelector,
  ResultsSubmissionSelector,
  ResultsScoresSection,
  ResultsSummarySection,
  CohortSubmissionsSummary,
  CohortSubmissionsNotebook,
} from '../../components/results'
import { fire2Ms } from '../../util/date-utils'
import { getArrayStats } from '../../util/stats'

function getMetrics(data) {
  let metrics = []

  ;[
    ...new Set(
      Object.values(data).map((item, index) => {
        return item
          .map((key, i) => {
            return key.label
          })
          .join(',')
      })
    ),
  ]
    .map((list) => {
      return list.split(',')
    })
    .forEach((metric) => {
      metrics = [...new Set([...metrics, ...metric])]
    })

  return metrics
}

class ResultsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      loadingCohorts: false,
      loadingResults: false,
      filterUsers: [],
      currentSubmission: null,
      selectedPhase: 0,
      finalResults: null,
      participantCount: null,
      cohortCount: null,
      results: null,
      resultsContent: '',
      resultsPublished: {},
      resultStats: null,
      section: 'scores',
      submissionData: null,
      submissionSelectOptions: [],
      submissionSelectValue: {},
      submissions: [],
      cohortSubmissions: [],
      userResults: null,
    }
  }

  componentDidMount = async () => {
    await this.getSubmissionInfo()
    await this.getParticipantsList()
    this.getResultsContent()
    this.getHackResults()
    this.getCohortSubmissions()
    this.getResultsFinal()
  }

  getResultsContent = async () => {
    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('settings')
      .get()

    let data = doc.data()
    if (data) {
      if (this.state.submissionSelectOptions && data.isPublished) {
        let submissionSelectOptions = this.state.submissionSelectOptions
        submissionSelectOptions.map((item, i) => {
          if (!data.isPublished[item.value]) {
            item.isDisabled = true
          }
          return item
        })

        if (data.isPublished.final) {
          submissionSelectOptions.push({
            label: 'Final',
            value: 'final',
          })
        }
        this.setState({ submissionSelectOptions: submissionSelectOptions })
      }

      this.setState({
        resultsContent: data.content,
        resultsPublished: data.isPublished || {},
      })
    }
  }

  getSubmissionInfo = async () => {
    let submissions = []

    let submissionsDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('submissions')
      .doc('settings')
      .get()

    let submissionsData = submissionsDoc.data()

    if (submissionsData) {
      for (let submission of Object.keys(submissionsData)) {
        submissions.push(submissionsData[submission])
      }

      submissions.sort((a, b) => {
        return fire2Ms(a.deadline) - fire2Ms(b.deadline)
      })

      let submissionSelectOptions = submissions.map((item) => {
        return {
          label: item.name,
          value: item.submissionId,
        }
      })

      this.setState({
        submissions: submissions,
        currentSubmission: submissions[0].submissionId,
        submissionSelectValue: submissionSelectOptions[0],
        submissionSelectOptions: submissionSelectOptions,
      })
    }
  }

  getParticipantsList = async () => {
    let participants = {}

    let doc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('participants')
      .get()

    let data = doc.data()
    if (data) {
      for (let participant of Object.keys(data)) {
        participants[participant] = {
          userId: participant,
          alias: data[participant].alias,
          ref: data[participant].ref,
        }
      }
    }

    this.setState({ participants: participants })
  }

  updateLoadingStatus = () => {
    if (this.state.loadingCohorts || this.state.loadingResults) {
      this.setState({ loading: true })
    } else {
      this.setState({ loading: false })
    }
  }

  onPhaseSelection = async (phase, submissionId) => {
    if (phase === this.state.selectedPhase) {
      return false
    }

    await this.setState({
      selectedPhase: phase,
      currentSubmission: submissionId,
    })

    if (submissionId !== 'final') {
      this.setState({ loading: true })
      this.getCohortSubmissions()
      this.getHackResults()
    }
  }

  onSubmissionSelected = async (selected) => {
    if (selected.value === this.state.currentSubmission) {
      return false
    }

    this.setState({
      currentSubmission: selected.value,
      submissionSelectValue: selected,
    })

    this.setState({ loading: true })
    this.getCohortSubmissions()
    this.getHackResults()
  }

  getResultsFinal = async () => {
    let finalDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc('final')
      .get()

    if (finalDoc.exists) {
      let finalData = finalDoc.data()
      this.setState({ finalResults: finalData })
    }
  }

  getCohortSubmissions = async () => {
    this.setState({ loadingCohorts: true })

    let cohortSubmissions = []

    if (this.props.userCohortList && this.props.userCohortList.length > 0) {
      for (let userId of this.props.userCohortList) {
        let doc = await window.firebase
          .firestore()
          .collection('hacks')
          .doc(this.props.hackId)
          .collection('submissions')
          .doc(this.state.currentSubmission)
          .collection('users')
          .doc(userId)
          .get()

        if (doc.exists) {
          let userName
          if (this.state.participants[doc.id]) {
            userName = this.state.participants[doc.id].alias
          }
          cohortSubmissions.push({
            userId: userId,
            name: userName,
            ...doc.data(),
          })
        }
      }

      this.setState({
        cohortSubmissions: cohortSubmissions,
        loadingCohorts: false,
      })
      this.updateLoadingStatus()
    } else {
      this.setState({ loadingCohorts: false })
      this.updateLoadingStatus()
    }
  }

  getHackResults = async () => {
    let submisison = this.state.submissions[this.state.selectedPhase]
    if (!submisison) {
      return false
    }
    let submissionId = submisison.submissionId

    this.setState({ loadingResults: true })

    let adminList = this.state.filterUsers
    if (adminList.length === 0) {
      let adminsRef = await window.firebase
        .firestore()
        .collection('admins')
        .get()

      adminsRef.docs.forEach((item, index) => {
        adminList.push(item.id)
      })

      this.setState({ filterUsers: adminList })
    }

    let submissionResultsDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('results')
      .doc(submissionId)
      .get()

    if (submissionResultsDoc.exists) {
      let submissionResultsData = submissionResultsDoc.data()

      let resultsIds = Object.keys(submissionResultsData).filter((item) => {
        return !adminList.includes(item)
      })

      let results = {}
      resultsIds.forEach((result, i) => {
        results[result] = submissionResultsData[result]
      })

      this.setState({
        participantCount: Object.keys(results).length,
        userResults: results[this.props.userId],
      })

      let metrics = getMetrics(submissionResultsData)

      let values = {}
      metrics.forEach((metric) => {
        values[metric] = []
      })

      // CONVERT LIST OF RESULTS TO SET OF KEYS AND ARRAY OF VALUES
      Object.values(submissionResultsData).forEach((user) => {
        user.forEach((item) => {
          values[item.label].push(item.value)
        })
      })

      // FILTER NULL (AND/OR FALSE) VALUES FROM THE VALUE LIST
      Object.keys(values).forEach((key) => {
        values[key] = values[key].filter((item) => {
          return item
        })
      })

      let stats = {}

      Object.keys(values).forEach((key) => {
        stats[key] = getArrayStats(values[key])
      })

      this.setState({
        resultStats: stats,
        loadingResults: false,
      })
      this.updateLoadingStatus()
    } else {
      this.setState({
        resultStats: null,
        userResults: null,
        loadingResults: false,
      })
      this.updateLoadingStatus()
    }
  }

  render() {
    return (
      <Row>
        <Col>
          <div className="top-container pb-4">
            <div className="results-controls flex flex-between mt-2">
              <div>
                <ResultsSectionSelector
                  selected={this.state.section}
                  callback={(id) => this.setState({ section: id })}
                  sections={[
                    {
                      name: 'scores',
                      label: 'Your Scores',
                      disabled: this.state.currentSubmission === 'final' ? true : false,
                    },
                    {
                      name: 'peers',
                      label: 'Your Peers',
                      disabled: this.state.currentSubmission === 'final' ? true : false,
                    },
                  ]}
                />
              </div>

              <div className="">
                {this.state.submissions && (
                  <ResultsSubmissionSelector
                    selectOptions={this.state.submissionSelectOptions}
                    selectValue={this.state.submissionSelectValue}
                    currentSubmission={this.state.currentSubmission}
                    onSelect={this.onSubmissionSelected}
                    disabled={this.state.loading}
                  />
                )}
              </div>
            </div>

            <div className="hack-stats-section flex my-2 px-6">
              {/*this.state.submissionSelectValue && (
                <div className="ml-0 mr-4 text-center">
                  <h3 className="font-bold">Selected Phase</h3>
                  <div className="fs-5 font-bold cl-amber my-3">
                    Phase {this.state.selectedPhase + 1}
                  </div>
                </div>
              )*/}

              <div className="ml-0 mr-6 text-center">
                <h3 className="font-bold">Number of Hackers</h3>
                <div className="fs-5 font-bold cl-cyan my-3">{this.state.participantCount}</div>
              </div>

              {this.props.userCohortList && this.props.userCohortList.length > 0 && (
                <div className="mx-6 text-center">
                  <h3 className="font-bold">Cohort Size</h3>
                  <div className="fs-5 font-bold cl-pink my-3">
                    {this.props.userCohortList.length}
                  </div>
                </div>
              )}
            </div>

            <div className="selected-section">
              {this.state.loading ? (
                <div className="results-loader">
                  <Loader status="Fetching results..." />
                </div>
              ) : (
                <>
                  {this.state.currentSubmission === 'final' ? (
                    <>
                      {this.state.finalResults ? (
                        <ResultsFinalSection
                          userId={this.props.userId}
                          scores={this.state.finalResults}
                          submission={this.state.userSubmission}
                        />
                      ) : (
                        <h2 className="border text-center font-bold py-2">No final results yet.</h2>
                      )}
                    </>
                  ) : (
                    <>
                      {/* SCORES TAB */}
                      {this.state.section === 'scores' && (
                        <>
                          {this.state.userResults ? (
                            <ResultsScoresSection
                              userId={this.props.userId}
                              scores={this.state.userResults}
                              submission={this.state.userSubmission}
                            />
                          ) : (
                            <h2 className="border text-center font-bold py-2">
                              No results for this submission.
                            </h2>
                          )}

                          {this.state.resultsContent && (
                            <div className="bd-1 cl-grey m-4 p-4">
                              <MdContentView
                                enableTracking={true}
                                content={this.state.resultsContent}
                                encoded={false}
                                emptyText=""
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* SUMMARY TAB */}
                      {this.state.section === 'summary' && (
                        <>
                          {this.state.resultStats ? (
                            <ResultsSummarySection
                              participantCount={this.state.participantCount}
                              summary={this.state.resultStats}
                            />
                          ) : (
                            <h2 className="border text-center font-bold py-2">
                              No results for this submission.
                            </h2>
                          )}
                        </>
                      )}

                      {/* PEERS TAB */}
                      {this.state.section === 'peers' && (
                        <>
                          {/* PEERS TAB - NOTEBOOK VERSION */}
                          {this.props.cohortSettings &&
                            this.props.cohortSettings.showNotebooks &&
                            this.state.currentSubmission !== 'final' && (
                              <>
                                {this.state.cohortSubmissions ? (
                                  <CohortSubmissionsNotebook
                                    participantData={this.state.cohortSubmissions}
                                  />
                                ) : (
                                  <h2 className="border text-center font-bold py-2">
                                    No results for this submission.
                                  </h2>
                                )}
                              </>
                            )}

                          {/* PEERS TAB - SUMMARY VERSION */}
                          {this.props.cohortSettings &&
                            this.props.cohortSettings.showSummaries &&
                            this.state.currentSubmission !== 'final' && (
                              <>
                                {this.state.cohortSubmissions ? (
                                  <CohortSubmissionsSummary
                                    participantData={this.state.cohortSubmissions}
                                  />
                                ) : (
                                  <h2 className="border text-center font-bold py-2">
                                    No results for this submission.
                                  </h2>
                                )}
                              </>
                            )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default ResultsView
