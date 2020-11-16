import { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { userMetrics } from '../../util/user-metrics'

class AdminTutorials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: []
    }
  }

  componentDidMount() {
    this.getTutorials()
  }

  getTutorials = async () => {
    let result = []
    let snap = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        tutorialId: item.id,
        ...item.data()
      })
    })

    this.setState({tutorials: result})
  }

  deleteTutorial = async (tutorialId) => {
    let tutorials = this.state.tutorials;
    tutorials = tutorials.filter(tutorial=>{ return tutorial.tutorialId !== tutorialId })

    await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .doc(tutorialId)
      .delete()

    this.setState({
      tutorials: tutorials,
      loading: false
    })

    userMetrics({
      event: 'tutorial-deleted',
      taskId: tutorialId,
      hackId: this.props.hackId,
    })
  }

  showConfirmDeleteModal = (tutorialId) => {
    this.setState({loading: true})

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this tutorial.</p>
        <code>${tutorialId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.value) {
        this.deleteTutorial(tutorialId)
      } else {
        this.setState({loading: false})
      }
    })
  }

  render() {
    return (
        <>
          <Link to="tutorials/new">
            <div className="button py-1 px-2 bg-primary font-bold fs-m2">
              + New Tutorial
            </div>
          </Link>

          <h3 className="my-3">
            Tutorials:
          </h3>

        {this.state.tutorials.map((item,index)=>(
          <div
            className="flex flex-between flex-align-center my-2"
            key={index}>
            <Link to={`tutorials/${item.tutorialId}/edit`}>
              {item.title || 'Untitled'}
            </Link>

            <div className="flex flex-between">
              <div
                className={'btn btn-sm btn-danger flex-self-start mr-2 fs-m3'}
                onClick={()=>this.showConfirmDeleteModal(item.tutorialId)}
                >
                Delete
              </div>

              <Link
                to={`tutorials/${item.tutorialId}/edit`}
                className={'btn btn-sm btn-success flex-self-end fs-m3'}
                >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </>
    )
  }
}

export default AdminTutorials;
