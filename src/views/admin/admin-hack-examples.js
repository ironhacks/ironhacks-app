import { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Accordion } from 'react-bootstrap'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'
import { AdminHackExampleItem } from '../../components/admin/admin-hack-example-item'

class AdminExamples extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examples_summary: [],
      examples_notebook: [],
    }
  }

  componentDidMount() {
    this.getExamplesSummary()
    this.getExamplesNotebook()
  }

  getExamplesSummary = async () => {
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_summary')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        exampleId: item.id,
        ...item.data(),
      })
    })

    // title
    // created
    // updated
    // result.sort((a,b)=>{ return a.created.localeCompare(b.created) })
    // result
    //   .sort((a, b) => {
    //     return a.created.localeCompare(b.created)
    //   })
    //   .reverse()

    // result.sort((a,b)=>{ return b.title.localeCompare(a.title) })
    // result.sort((a,b)=>{ return b.created.localeCompare(a.created) })
    this.setState({ examples_summary: result })
  }

  getExamplesNotebook = async () => {
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples_notebook')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        exampleId: item.id,
        ...item.data(),
      })
    })

    this.setState({ examples_notebook: result })
  }

  deleteExample = async (exampleId) => {
    let examples = this.state.examples
    examples = examples.filter((example) => {
      return example.exampleId !== exampleId
    })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('examples')
      .doc(exampleId)
      .delete()

    this.setState({
      examples: examples,
      loading: false,
    })

    userMetrics({
      event: 'example-deleted',
      taskId: exampleId,
      hackId: this.props.hackId,
    })
  }

  showConfirmDeleteModal = (exampleId) => {
    this.setState({ loading: true })

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this example.</p>
        <code>${exampleId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.deleteNote(exampleId)
      } else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Examples`}</h2>
          <Link to="examples/new_summary">
            <div className="button py-1 px-2 bg-primary font-bold fs-m2">+ New Summary</div>
          </Link>
          &nbsp;
          <Link to="examples/new_notebook">
            <div className="button py-1 px-2 bg-primary font-bold fs-m2">+ New Notebook</div>
          </Link>
          <h3 className="my-3">Example Summary:</h3>
          <div className="row">
            <div className="col-12">
              <Accordion defaultActiveKey="0">
                {this.state.examples_summary.map((item, index) => (
                  <AdminHackExampleItem
                    note={item}
                    key={index}
                    deletenote={this.showConfirmDeleteModal}
                  />
                ))}
              </Accordion>
            </div>
          </div>
          <h3 className="my-3">Example Notebook:</h3>
          <div className="row">
            <div className="col-12">
              <Accordion defaultActiveKey="0">
                {this.state.examples_notebook.map((item, index) => (
                  <AdminHackExampleItem
                    note={item}
                    key={index}
                    deletenote={this.showConfirmDeleteModal}
                  />
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
        {}
      </>
    )
  }
}

export default AdminExamples
