import React from 'react';
import { VariableSizeList as List } from 'react-window';

class AdminUtilsUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userCount: 0,
      users: [],
    }
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    let adminsRef = await window.firebase.firestore()
      .collection('admins')
      .get()

    let adminList = [];

    adminsRef.docs.forEach((item, index) => {
      adminList.push(item.id);
    })

    let usersDoc = await window.firebase.firestore()
      .collection('users')
      .get()

    const MAX_USERS = 10;
    let maxDocs = Math.min(usersDoc.docs.length, MAX_USERS);
    let users = [];

    for (var count = 0; count < maxDocs; count++) {
      let user = usersDoc.docs[count];
      let userDoc = await user.ref.get();
      users.push({
        isAdmin: adminList.includes(user.id),
        userId: user.id,
        userRef: user.ref,
        ...userDoc.data()
      })
    }

    let result = [];
    for (let user of users){
       result.push([
         user.email,
         user.name,
         user.userId,
       ].join(',  '))
    }

    console.log(result.join('\n'))

    this.setState({
      userCount: usersDoc.size,
      users: users,
    })

  };

  UserListItem = ({ index, style }) => {
    let user = this.state.users[index];
    return (
      <div style={style}>
        <span>{index + 1}.</span>
        <span>{user.name}</span>
        <span><em>({user.alias})</em></span>
        <span>&lt;{user.email}&gt;</span>
        {user.isAdmin && (
          <span className="badge font-bold">(admin)</span>
        )}
        <div
          className="badge btn btn-outline-danger ml-3"
          onClick={()=>{ console.log('click')}}
          >
          delete
        </div>
      </div>
    )
  };

  render() {
    return (
      <div>
        <h2 className="pb-2">
          Admin User Utils
        </h2>

        <div className="flex font-bold">
          <div className="mr-1">#.</div>
          <div className="mr-4">Name</div>
          <div className="mr-4"><em>(Alias)</em></div>
          <div className="mr-0">&lt;Email&gt;</div>
        </div>
        <List
          itemCount={this.state.users.length}
          itemSize={(()=>{return 30})}
          height={500}
          width={'100%'}
          data={this.state.users}
        >
          {this.UserListItem}
        </List>
      </div>
    );
  }
}

export { AdminUtilsUsers }
