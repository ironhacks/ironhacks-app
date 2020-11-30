import { Link } from 'react-router-dom'
import { fire2Date } from '../../util/date-utils'

function AdminSubmissionItem({ submissionIndex, submissionData, onDeleteSubmisison = false }) {
  let timeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: true,
    timeZoneName: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }

  let enabledClass = [
    'badge flex flex-align-center fs-m1 py-1 px-2',
    submissionData.enabled ? 'badge-success' : 'badge-warning',
  ].join(' ')

  let { deadline } = submissionData

  if (deadline.seconds) {
    deadline = fire2Date(submissionData.deadline)
  }

  let files = submissionData.files.map((item, index) => {
    return `${item.required ? '*' : ''}${item.name}`
  })

  const onDelete = () => {
    if (onDeleteSubmisison) {
      onDeleteSubmisison()
    }
  }

  const CardRow = ({ name, value }) => (
    <div className="flex card_row">
      <span className="font-bold mr-1 card_row__name">{name}:</span>
      <span className="card_row__value fs-m1">{value}</span>
    </div>
  )

  const CardBtn = ({ action, btnClass, name }) => (
    <div className={['btn btn-sm fs-m1', btnClass].join(' ').trim()} onClick={action}>
      {name}
    </div>
  )

  return (
    <div className="admin-submission card p-3 mb-3 depth-1 bg-grey-lt2">
      <div className="flex flex-between">
        <h3 className="h4 font-extrabold">{submissionData.name || ''}</h3>
        <div className={enabledClass}>{submissionData.enabled ? 'Enabled' : 'Not Enabled'}</div>
      </div>

      <CardRow
        name={'Deadline'}
        value={deadline.toLocaleString('en-us', timeFormatOptions) || ''}
      />
      <CardRow name={'Files'} value={files.join(', ') || ''} />
      <div className="flex flex-between mt-2">
        <CardBtn action={onDelete} name={'Delete'} btnClass={'btn-outline-danger'} />
        <Link to={`./submissions/edit/${submissionData.submissionId}`}>
          <CardBtn
            action={() => {
              return false
            }}
            name={'Edit'}
            btnClass={'bg-grey-dk1 cl-white px-2'}
          />
        </Link>
      </div>
    </div>
  )
}

export { AdminSubmissionItem }
