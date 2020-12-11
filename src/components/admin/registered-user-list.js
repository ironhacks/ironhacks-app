import { VariableSizeList as List } from 'react-window'
import { Link } from 'react-router-dom'
import { userMetrics } from '../../util/user-metrics'
import Swal from 'sweetalert2'

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

    window.firebase
      .firestore()
      .collection('users')
      .doc(user.userId)
      .update({
        hacks: window.firebase.firestore.FieldValue.arrayRemove(hackId),
      })

    let cohortsDoc = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('cohorts')
      .get()

    let cohorts = cohortsDoc.data()
    let updatedCohorts = {}

    Object.keys(cohorts).forEach((cohortId) => {
      if (cohorts[cohortId].includes(user.userId)) {
        updatedCohorts[cohortId] = cohorts[cohortId].filter((item) => {
          return item !== user.userId
        })
      } else {
        updatedCohorts[cohortId] = cohorts[cohortId]
      }
    })

    window.firebase
      .firestore()
      .collection('hacks')
      .doc(hackId)
      .collection('registration')
      .doc('cohorts')
      .update(updatedCohorts)

    userMetrics({
      event: 'remove_registered_user',
      userId: user.userId,
      hackId: hackId,
    })

    let newList = [...list.slice(0, index), ...list.slice(index + 1, list.length)]

    onRemove(newList)
  }

  const confirmRemove = (userIndex) => {
    let user = registeredUsers[userIndex]

    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p>Confirm you want to remove this user.</p>
        <code>${user.userId}</code>`,
      icon: 'question',
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.value) {
        removeUser(userIndex)
      }
    })
  }

  const RegisteredUserListItem = ({ index, style }) => {
    let user = registeredUsers[index]

    return (
      <div style={style}>
        <span>{index + 1}.</span>

        <span className="ml-1">
          <Link to={`/profile/u/${user.userId}`}>{user.name}</Link>
        </span>

        <span className="ml-1">
          <em>({user.hackAlias})</em>
        </span>

        <span className="ml-1">&lt;{user.email}&gt;</span>

        {user.isAdmin && <span className="badge font-bold">(admin)</span>}

        <div className="badge btn btn-outline-danger ml-3" onClick={() => confirmRemove(index)}>
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
          if (window.innerWidth >= 1000) {
            return 30
          } else {
            return 60
          }
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
