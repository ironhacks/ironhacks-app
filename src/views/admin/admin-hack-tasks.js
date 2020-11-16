import { Component } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userMetrics } from '../../util/user-metrics'
import { InputSelect } from '../../components/input';

class AdminHackTasks extends Component {
  constructor(props) {
    super(props);

    let displayOptions = this.props.displayOptions

    this.state = {
      tasks: [],
      loading: true,
      defaultTask: this.props.defaultTask || null,
      cohortTasks: null,
      taskPublished: displayOptions.taskEnabled || false,
      taskSelect: [],
    }
  }

  componentDidMount(){
    this.getTasks()
  }

  getTasks = async () => {
    let taskSelect = this.state.taskSelect
    let tasks = []

    const taskList = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .get()

    taskList.docs.forEach((task, i) => {
      let taskData = task.data()
      tasks.push({
        taskId: task.id,
        taskTitle: taskData.title
      })

      taskSelect.push({
        label: taskData.title || 'Untitled Task',
        name: task.id,
      })
    })

    this.setState({
      tasks: tasks,
      loading: false
    })
  }

  publishTask = () => {
    if (this.state.loading) {
      return false
    }

    this.setState({loading: true})

    let taskPublished = !this.state.taskPublished
    let displayOptions = this.props.displayOptions
    displayOptions.taskEnabled = taskPublished

    userMetrics({
      event: taskPublished ? 'task-published' : 'task-unpublished',
      hackId: this.props.hackId,
    })

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .set({
        displayOptions: displayOptions,
      }, {merge: true})
      .then(()=>{
        this.setState({
          loading: false,
          taskPublished: taskPublished,
        })
      })
  }

  updateDefaultTask = (name, data) => {
    this.setState({loading: true})
    this.setState({[name]: data})

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .set({
        defaultTask: data,
      }, {merge: true})
      .then(()=>{
        this.setState({loading: false})
      })
  }

  deleteTask = async (taskId) => {
    let tasks = this.state.tasks;
    tasks = tasks.filter(task=>{ return task.taskId !== taskId })

    await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tasks')
      .doc(taskId)
      .delete()

    this.setState({tasks})

    userMetrics({
      event: 'task-deleted',
      taskId: taskId,
      hackId: this.props.hackId,
    })
  }

  showConfirmDeleteModal = (taskId) => {
    this.setState({loading: true})

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to delete this task.</p>
        <code>${taskId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    })
    .then((result) => {
      if (result.value) {
        this.deleteTask(taskId)
      } else {
        this.setState({loading: false})
      }
    })
  }

  render() {
    return (
        <>
          <Link to="tasks/new">
            <div className="button py-1 px-2 bg-primary font-bold fs-m2">
              + New Task Doc
            </div>
          </Link>

          <InputSelect
            name="defaultTask"
            label="Default Task"
            containerClass="flex align-items-center my-2"
            labelClass="mr-2"
            inputClass="flex-1"
            options={this.state.taskSelect}
            value={this.state.defaultTask}
            onInputChange={this.updateDefaultTask}
            disabled={this.state.loading}
          />


          <h3 className="my-3">
            Task Documents:
          </h3>

          <div className="flex flex-align-center pb-2 border-bottom">
          {this.state.taskPublished ? (
            <>
              <div className='font-italic'>
                Task page is visible now
              </div>
              <div
                className='btn-sm button ml-auto bg-secondary cl-white'
                onClick={this.publishTask}
              >
                Unpublish Task
              </div>
            </>
          ) : (
            <>
              <div className='font-italic'>
                Task page is not visible now
              </div>

              <div
                className='btn-sm button ml-auto bg-info cl-white'
                onClick={this.publishTask}
              >
                Publish Task
              </div>
            </>
          )}
          </div>

          {this.state.tasks.map((task,index)=>(
            <div
              className="flex flex-between flex-align-center my-2"
              key={index}>
              <Link
                to={`tasks/${task.taskId}/edit`}
                >
                {task.taskTitle || 'Untitled Task'}
              </Link>

              <div className="flex flex-between">
                <div
                  className={'btn btn-sm btn-danger flex-self-start mr-2 fs-m3'}
                  onClick={()=>this.showConfirmDeleteModal(task.taskId)}
                  >
                  Delete Task
                </div>

                <Link
                  to={`tasks/${task.taskId}/edit`}
                  className={'btn btn-sm btn-success flex-self-end fs-m3'}
                  >
                  Edit Task
                </Link>
              </div>
            </div>
          ))}
      </>
    );
  }
}

export default AdminHackTasks;
