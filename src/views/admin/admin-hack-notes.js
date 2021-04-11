import { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { userMetrics } from '../../util/user-metrics'
import { Section } from '../../components/layout'
import IssueItem from './IssueItem'
import { Accordion } from 'react-bootstrap'

class AdminNotes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
    }
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = async () => {
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('notes')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        noteId: item.id,
        ...item.data(),
      })
    })

    // title
    // created
    // updated
    // result.sort((a,b)=>{ return a.created.localeCompare(b.created) })
    result
      .sort((a, b) => {
        return a.created.localeCompare(b.created)
      })
      .reverse()

    // result.sort((a,b)=>{ return b.title.localeCompare(a.title) })
    // result.sort((a,b)=>{ return b.created.localeCompare(a.created) })
    this.setState({ notes: result })
  }

  deleteNote = async (noteId) => {
    let notes = this.state.notes
    notes = notes.filter((note) => {
      return note.noteId !== noteId
    })

    await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('notes')
      .doc(noteId)
      .delete()

    this.setState({
      notes: notes,
      loading: false,
    })

    userMetrics({
      event: 'note-deleted',
      taskId: noteId,
      hackId: this.props.hackId,
    })
  }

  showConfirmDeleteModal = (noteId) => {
    this.setState({ loading: true })

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this note.</p>
        <code>${noteId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        this.deleteNote(noteId)
      } else {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    return (
      <>
        <Section sectionClass="py-2">
          <h2 className="h3 font-bold">{`${this.props.hackName} Notes`}</h2>

          <Link to="notes/new">
            <div className="button py-1 px-2 bg-primary font-bold fs-m2">+ New Note</div>
          </Link>

          <h3 className="my-3">Notes:</h3>

          <div className="row">
            <div className="col-12">
              <Accordion defaultActiveKey="0">
                {this.state.notes.map((item, index) => (
                  <IssueItem issue={item} key={index} deletenote={this.showConfirmDeleteModal} />
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
      </>
    )
  }
}

export default AdminNotes
