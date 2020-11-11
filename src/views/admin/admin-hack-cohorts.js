import { Component } from 'react';
import { Section } from '../../components/layout';
import { InputText, InputCheckbox, InputSelect } from '../../components/input';
import randomTeamname from '../../services/random-teamname';
import { AdminCohortListItem } from '../../components/admin';

function removeListItem(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
}


class AdminHackCohorts extends Component {
  constructor(props) {
    super(props);


    this.state = {
      data: '',
      loading: false,
      addDisabled: Date.parse(this.props.hackData.startDate) > Date.now(),
      assignDisabled: false,
      cohorts: [],
      cohortList: [],
      registeredUsers: [],
      registeredUsersData: null,
      tasks: [],
      defaultTask: this.props.defaultTask || null,
      taskSelect: [],
    }
  }


  componentDidMount() {
    this.getRegistrationSettings()
    this.getRegistrationCohorts()
    this.getRegisteredUsers()
    this.getHackTasks()
  }


  getHackTasks = async () => {
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


  updateCohortTask = (name, data) => {
    this.setState({loading: true})
    this.setState({[name]: data})
    // window.firebase.firestore()
    //   .collection('hacks')
    //   .doc(this.props.hackId)
    //   .set({
    //     defaultTask: data,
    //   }, {merge: true})
    //   .then(()=>{
    //     this.setState({loading: false})
    //   })
  }

  getRegistrationSettings = async () => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('settings')
      .get()
      .then(doc=>{
        let data = doc.data();
        if (data) {
          this.setState({
            cohorts: Object.values(data),
          });
        }
      })
  }

  getRegistrationCohorts = async () => {
    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('cohorts')
      .get()
      .then((doc)=>{
        let data = doc.data();
        if (data) {
          this.setState({
            cohortList: data,
            // assignDisabled: true,
            assignDisabled: false,
          });
        }
      });
  };


  getRegisteredUsers = async () => {
    let adminList = []
    let users = [];

    let adminsSnap = await window.firebase.firestore()
      .collection('admins')
      .get()

    adminsSnap.docs.forEach((item, index) => {
      adminList.push(item.id)
    })

    let participantDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('participants')
      .get()

      let data = participantDoc.data();
      if (!data) { return false }

      this.setState({registeredUsersData: data});

      for (let id of Object.keys(data)) {
        let user = data[id];
        users.push({
          isAdmin: adminList.includes(id),
          userId: id,
          userRef: user.ref,
          hackAlias: user.alias,
        })
      }

      users.sort((a,b)=>{ if (a.isAdmin) { return -1 } else { return 1 } })

      this.setState({registeredUsers: users});
  }

  addCohort = () => {
    let cohorts = this.state.cohorts;
    let cohortName = randomTeamname();
    let cohortId = [
      cohortName.replace(/ /g, '-').toLowerCase(),
      Math.floor(Math.random()*100).toString().padStart(2,'0')
    ].join('-');

    cohorts.push({
      id: cohortId,
      name: cohortName,
      properties: {
        forumEnabled: true,
        sharingEnabled: true,
        realNames: false,
      },
    });
    this.setState({cohorts: cohorts});
  };

  handleCohortInputChange(index, name, value) {
    return false;
  }

  handleCohortPropertyInputChange(index, name, value) {
    let cohorts = this.state.cohorts;
    cohorts[index].properties[name] = value;
    this.setState({cohorts: cohorts})
  }

  deleteCohort = index => {
    let cohorts = this.state.cohorts
    let updatedCohorts = [
      ...cohorts.slice(0, index),
      ...cohorts.slice(index + 1, cohorts.length)
    ]
    this.setState({
      cohorts: updatedCohorts,
    })
  };

  assignCohorts = () => {
    let userlist = this.state.registeredUsers;

    // DO NOT ASSIGN ADMIN USERS TO THE PARTICIPANT COHORT
    userlist = userlist.filter(user=>{ return !user.isAdmin })

    // USERS ARE ORDERED BY EMAIL FOR DISPLAY
    // RESORTING ON USERID WHICH IS RANDOMLY GENERATED
    // SHUFFLES THE LIST BEFORE SORTING INTO GROUPS
    userlist.sort((a,b)=>{ return a.userId.localeCompare(b.userId) })

    const groups = {};
    this.state.cohorts.forEach((group, i) => {
      groups[group.id] = [];
    })

    if (Object.keys(groups).length === 0) {
      return false;
    }

    while (userlist.length > 0) {
      for (var i = 0; i < Object.keys(groups).length; i++) {
        if (userlist.length > 0){
          let group = Object.keys(groups)[i];
          let index = Math.floor(Math.random() * userlist.length);
          groups[group].push(userlist[index].userId);
          userlist = removeListItem(userlist, index);
        }
      }
    }
    this.setState({cohortList: groups});

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('cohorts')
      .set(groups)
      .then(()=>{
        this.setState({syncing: false});
        console.log('cohorts saved');
      })
  };

  saveCohorts = () => {
    this.setState({syncing: true});
    let cohorts = this.state.cohorts;
    let cohortData = {};
    cohorts.forEach((cohort, index) => {
      cohortData[cohort.id] = cohort;
    });

    window.firebase.firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('registration')
      .doc('settings')
      .set(cohortData)
      .then(()=>{
        this.setState({syncing: false});
        window.location.reload();
      })
  };

  render() {
    return (
        <>
          <h2>
            {this.props.hackData.name} Registration
          </h2>

          <Section sectionClass="py-2">
            <h2>
              Cohorts Settings
            </h2>

            {this.state.cohorts.map((item, index)=>(
              <div
                key={index}
                style={{
                  padding: '1em',
                  border: '1px solid rgba(0,0,0,.3)',
                  marginTop: '1em',
                }}>
                <InputText
                  containerClass="flex py-1 flex-between"
                  inputClass="flex-2 text-capitalize"
                  labelClass="flex-1"
                  name="cohort_name"
                  label="Cohort Name"
                  icon="tag"
                  iconClass="pl-1 pr-2"
                  value={item.name || ''}
                  onInputChange={(name, value)=>this.handleCohortInputChange(index, name, value)}
                  disabled={true}
                />

                <h3 className="fs-m1 font-bold">
                  Cohort Options
                </h3>

                <InputSelect
                  name="task"
                  label="Cohort Task"
                  containerClass="flex align-items-center my-2"
                  labelClass="mr-2 my-0"
                  inputClass="flex-1"
                  options={this.state.taskSelect}
                  value={item.properties.task}
                  onInputChange={(name, value)=>this.handleCohortPropertyInputChange(index, name, value)}
                  disabled={this.state.loading}
                />

                <div className="flex mt-1">
                  <InputCheckbox
                    name="forumEnabled"
                    label="Forum Enabled"
                    containerClass="flex flex-align-center badge badge-light border"
                    labelClass="order-2"
                    inputClass="order-1 mr-1"
                    isChecked={item.properties.forumEnabled}
                    disabled={this.state.syncing}
                    onInputChange={(name, value)=>this.handleCohortPropertyInputChange(index, name, value)}
                  />

                  <InputCheckbox
                    name="sharingEnabled"
                    label="Sharing Enabled"
                    containerClass="flex flex-align-center badge badge-light border ml-2"
                    labelClass="order-2"
                    inputClass="order-1 mr-1"
                    isChecked={item.properties.sharingEnabled}
                    disabled={this.state.syncing}
                    onInputChange={(name, value)=>this.handleCohortPropertyInputChange(index, name, value)}
                  />

                  <button
                    className={'btn btn-sm btn-danger flex-self-end ml-auto'}
                    onClick={()=>this.deleteCohort(index)}
                    disabled={this.state.syncing}
                  >
                    Delete Cohort
                  </button>
                </div>
              </div>
            ))}

            <p>
              *You will be unable to make changes to user cohorts after the hack starting date.
            </p>

            <button
              className={'btn btn-outline-dark'}
              disabled={this.state.addDisabled || this.state.syncing}
              onClick={this.addCohort}
            >
              +Add Cohort
            </button>

            <button
              className={'ml-2 btn btn-success'}
              disabled={this.state.syncing}
              onClick={this.saveCohorts}
            >
              Save Settings
            </button>

          </Section>

          <Section sectionClass="py-2">

            <h3 className="h3 py-2">
              Cohorts
            </h3>

            <h3 className="h3 py-2">
              Registered Users: {this.state.registeredUsers.length}
            </h3>

            <p><em>*Admin users are not added to user cohorts</em></p>

            <div className="admin-cohort-list flex flex-wrap">
              {this.state.cohortList && (
                Object.keys(this.state.cohortList).map((item, index)=>(
                  <div
                    className={'mx-auto mb-2 max-w-350 w-50p '}
                    key={item}
                  >
                    <div className="card p-2 bg-blue-grey-lt4 border-0">
                      <h3 className="h3 font-bold">{item}</h3>
                      <AdminCohortListItem
                        dataList={this.state.cohortList[item]}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

          <button
            className={'ml-2 btn btn-info'}
            disabled={this.state.syncing || this.state.assignDisabled}
            onClick={this.assignCohorts}
          >
            Assign Users
          </button>


          </Section>
      </>
    )
  }
}

export default AdminHackCohorts;
