import React from 'react';
import { Section } from '../../components/layout';
import { VariableSizeList as List } from 'react-window';
import { InputText, InputCheckbox } from '../../components/input';
import randomTeamname from '../../services/random-teamname';


class CohortListUser extends React.Component {
  constructor(props) {
    super(props);
    this.ListItem = this.ListItem.bind(this);
  }

  ListItem({ index, style }) {
    return (
      <div style={style}>
        {index + 1}. {this.props.dataList[index]}
      </div>
    )
  }
  render() {
    return (
      <List
        itemCount={this.props.dataList.length}
        itemSize={(()=>{return 30})}
        height={200}
        width={'100%'}
        data={this.props.dataList}
      >
      {this.ListItem}
      </List>
    )
  }
}

function removeListItem(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1, list.length)];
}

class AdminHackRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.ListItemUser = this.ListItemUser.bind(this);

    this.state = {
      data: '',
      addDisabled: Date.parse(this.props.hackData.startDate) > Date.now(),
      assignDisabled: false,
      cohorts: [],
      cohortList: [],
      registeredUsers: [],
    }

    this.addCohort = this.addCohort.bind(this)
    this.saveCohorts = this.saveCohorts.bind(this)
    this.deleteCohort = this.deleteCohort.bind(this)
    this.getSettings = this.getSettings.bind(this)
    this.assignCohorts = this.assignCohorts.bind(this)
  }

  componentDidMount() {
    this.getSettings();
    this.getRegisteredUsers();
  }

  ListItemUser({ index, style }) {
    let user = this.state.registeredUsers[index];
    return (
      <div style={style}>
        {index + 1}. {user.name}
      </div>
    )
  }

  async getUserData(userRef) {
    const user = await userRef.get()
    console.log(user.id, JSON.stringify(user.data()));
    return user;
  }

  getRegisteredUsers(){
    window.firebase.firestore()
    .collection('hacks')
    .doc(this.props.hackId)
    .collection('registration')
    .doc('participants')
    .get()
    .then(doc=>{
      let data = doc.data();
      let users = Object.keys(data).map((key, i) => {
        let user = data[key];
        // this.getUserData(user.ref);
        return {
          userId: key,
          ref: user.ref,
          name: user.alias,
        }
      }).filter(el=>{ return el.name })

      this.setState({registeredUsers: users});
    })
  }

  getSettings() {
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
            assignDisabled: true,
          });
        }
      });
  }

  addCohort(){
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
  }

  handleCohortInputChange(index, name, value) {
    return false;
  }

  handleCohortPropertyInputChange(index, name, value) {
    let cohorts = this.state.cohorts;
    cohorts[index].properties[name] = value;
    this.setState({cohorts: cohorts})
  }

  deleteCohort(index){
    let cohorts = this.state.cohorts
    let updatedCohorts = [
      ...cohorts.slice(0, index),
      ...cohorts.slice(index + 1, cohorts.length)
    ]
    this.setState({
      cohorts: updatedCohorts,
    })
  }

  assignCohorts() {
    let list = this.state.registeredUsers;
    const groups = {};
    this.state.cohorts.forEach((group, i) => {
      groups[group.id] = [];
    });

    if (Object.keys(groups).length === 0) {
      return false;
    }

    while (list.length > 0) {
      Object.keys(groups).forEach((group)=>{
        if (list.length > 0){
          let index = Math.floor(Math.random() * list.length);
          groups[group].push(list[index]);
          list = removeListItem(list, index);
        }
      })
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
  }


  saveCohorts() {
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
  }

  render() {
    return (
        <>
          <h2>
            {this.props.hackData.name} Registration
          </h2>

          <Section sectionClass="py-2">
            <h2>
              User Cohorts
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
              Registered Users: {this.state.registeredUsers.length}
            </h3>

            {this.state.registeredUsers ? (
              <List
                itemCount={this.state.registeredUsers.length}
                itemSize={(()=>{return 30})}
                height={300}
                width={400}
                data={this.state.registeredUsers}
              >
                {this.ListItemUser}
              </List>
            ):(
              <p>No registered users</p>
            )}

            <h3 className="h3 py-2">
              Cohorts
            </h3>

            <div className="admin-cohort-list flex flex-wrap">
              {this.state.cohortList && (
                Object.keys(this.state.cohortList).map((item, index)=>(
                  <div
                    className={'mx-auto mb-2 max-w-350 w-50p '}
                    key={item}
                  >
                    <div className="card p-2 bg-blue-grey-lt4 border-0">
                      <h3 className="h3 font-bold">{item}</h3>
                      <CohortListUser
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

export default AdminHackRegistration;
