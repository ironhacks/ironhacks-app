import { VariableSizeList as List } from 'react-window'

function AdminRegisteredUserList({ registeredUsers, hackId, onRemove }) {
  const removeUser = async (index) => {
    let list = registeredUsers
    let user = list[index]

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('participants')
      .update({
        [user.userId]: window.firebase.firestore.FieldValue.delete(),
      })

    let newList = [...list.slice(0, index), ...list.slice(index + 1, list.length)]

    onRemove(newList)
  }

  const RegisteredUserListItem = ({ index, style }) => {
    let user = registeredUsers[index]
    return (
      <div style={style}>
        <span>{index + 1}.</span>
        <span>{user.name}</span>
        <span>
          <em>({user.hackAlias})</em>
        </span>
        <span>&lt;{user.email}&gt;</span>
        {user.isAdmin && <span className="badge font-bold">(admin)</span>}
        <div className="badge btn btn-outline-danger ml-3" onClick={() => removeUser(index)}>
          remove
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex font-bold">
        <div className="mr-1">#.</div>
        <div className="mr-4">Name</div>
        <div className="mr-4">
          <em>(Alias)</em>
        </div>
        <div className="mr-0">&lt;Email&gt;</div>
      </div>
      <List
        itemCount={registeredUsers.length}
        itemSize={() => {
          return 30
        }}
        height={300}
        width={'100%'}
        data={registeredUsers}
      >
        {RegisteredUserListItem}
      </List>
    </div>
  )
}

export { AdminRegisteredUserList }
