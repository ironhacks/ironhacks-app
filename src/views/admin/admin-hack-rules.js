import { Component } from 'react'
import MarkdownEditor from '../../components/markdown-editor'
import { userMetrics } from '../../util/user-metrics'
import { saveSuccessModal } from '../../components/alerts'
import { Section } from '../../components/layout'

class AdminHackRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: this.props.previousDocument || '',
    }
  }

  updateHackRules = async () => {
    this.setState({ loading: true })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .update({
        rules: this.state.content,
      })

    userMetrics({
      event: 'rules-updated',
      hackId: this.props.hackId,
    })

    saveSuccessModal()

    this.setState({ loading: false })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Rules`}</h2>

          <MarkdownEditor
            editorLayout="tabbed"
            onEditorChange={(value) => this.setState({ content: value })}
            value={this.state.content}
          />

          <div className="flex flex-align-center flex-between py-2">
            <a href={`/hacks/${this.props.hackSlug}/rules`} target="_blank" rel="noopener noreferrer">
              View live document
            </a>

            <div className="btn btn-sm bg-primary px-8" onClick={this.updateHackRules}>
              Publish
            </div>
          </div>
        </Section>
      </>
    )
  }
}

export default AdminHackRules
