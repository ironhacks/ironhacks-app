import { Component } from 'react'
import { Loader } from '../../components/loader'
import { MdContentView } from '../../components/markdown-viewer'
import { Row, Col } from '../../components/layout'
import {
  ResultsAdminUserScoreSelector,
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
      finalResults: null,
      participantCount: null,
      submissionCount: null,
      results: null,
      resultsContent: '',
      resultsPublished: {},
      resultStats: null,
      section: this.props.userCohortId ? 'peers' : 'scores',
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

  onSubmissionSelected = async (selected) => {
    if (selected.value === this.state.currentSubmission) {
      return false
    }

    await this.setState({
      currentSubmission: selected.value,
      submissionSelectValue: selected,
    })

    await this.setState({ loading: true })
    await this.getCohortSubmissions()
    await this.getHackResults()
  }

  onAdminUserScoreSelected = (selected) => {
    if (this.state.adminSelectedUser && this.state.adminSelectedUser.value === selected.value) {
      return false
    }

    this.setState({ adminSelectedUser: selected })

    let userResults = this.state.adminResults[selected.value]

    this.setState({ userResults: userResults })
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
    let submissionId = this.state.currentSubmission

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
      let count = 0

      let resultdata = submissionResultsDoc.data()
      let resultcnt = Object.values(resultdata)
      resultcnt.forEach((temp) => {
        if (temp[0].value) {
          count += 1
        }
      })
      this.setState({
        submissionCount: count,
      })
      this.updateLoadingStatus()
    } else {
      this.setState({
        submissionCount: null,
      })
      this.updateLoadingStatus()
    }

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

      if (this.props.userIsAdmin) {
        let adminUserList = Object.keys(results).map((item) => {
          return {
            label: item,
            value: item,
          }
        })

        adminUserList.sort((a, b) => {
          return a.label.localeCompare(b.label)
        })

        this.setState({
          adminResults: results,
          adminUserList: adminUserList,
          // adminSelectedUser: adminUserList[0],
          adminSelectedUser: null,
        })
      }

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
                      name: 'peers',
                      label: 'Your Peers',
                      disabled: this.state.currentSubmission === 'final' ? true : false,
                    },
                    {
                      name: 'scores',
                      label: 'Your Scores',
                      disabled: this.state.currentSubmission === 'final' ? true : false,
                    },
                    // {
                    //   name: 'summary',
                    //   label: 'Stats',
                    //   disabled: this.state.currentSubmission === 'final' ? true : false,
                    // },
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

                {this.props.userIsAdmin && (
                  <ResultsAdminUserScoreSelector
                    selectOptions={this.state.adminUserList}
                    selectValue={this.state.adminSelectedUser}
                    onSelect={this.onAdminUserScoreSelected}
                    disabled={this.state.loading}
                  />
                )}
              </div>
            </div>

            <div className="hack-stats-section flex my-2 px-6">
              {this.props.cohortSettings && this.props.cohortSettings.name && (
                <div className="ml-0 mr-6 text-left">
                  <h3 className="font-bold text-left">Group Name</h3>
                  <div className="fs-5 font-bold cl-amber my-3 text-capitalize">
                    {this.props.cohortSettings.name}
                  </div>
                </div>
              )}

              <div className="ml-0 mr-6 text-center">
                <h3 className="font-bold">Hack Size</h3>
                <div className="fs-5 font-bold cl-cyan my-3">{this.state.participantCount}</div>
              </div>

              <div className="ml-0 mr-6 text-center">
                <h3 className="font-bold">Submission Size</h3>
                <div className="fs-5 font-bold cl-cyan my-3">{this.state.submissionCount}</div>
              </div>

              {this.props.userCohortList && this.props.userCohortList.length > 0 && (
                <div className="mx-6 text-center">
                  <h3 className="font-bold">Group Size</h3>
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
                                    currentSubmission={this.state.currentSubmission}
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
                                    currentSubmission={this.state.currentSubmission}
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
