import { Link } from 'react-router-dom';
import { fire2Date } from '../../util/date-utils';

function AdminSubmissionItem({
  submissionIndex,
  submissionData,
  onDeleteSubmisison=false
}) {

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

  let { deadline } = submissionData

  if (deadline.seconds) {
    deadline = fire2Date(submissionData.deadline)
  }

  let files = submissionData.files.map((item, index)=>{
    return `${item.required ? '*' : ''}${item.name}`
  })

  const onDelete = () => {
    if (onDeleteSubmisison) {
      onDeleteSubmisison()
    }
  }

  const CardRow = ({name, value}) => (
    <div className="flex card_row">
      <span className="font-bold mr-1 card_row__name">{name}:</span>
      <span className="card_row__value">{value}</span>
    </div>
  )

  const CardBtn = ({action, btnClass, name}) => (
    <div
      className={['btn btn-sm', btnClass].join(' ').trim()}
      onClick={action}
    >
      {name}
    </div>
  )

  return (
    <div className="admin-submission card p-3 mb-3">
      <CardRow name={'Name'} value={submissionData.name || ''} />
      <CardRow name={'Deadline'} value={deadline.toLocaleString('en-us', timeFormatOptions) || ''} />
      <CardRow name={'Files'} value={files.join(', ') || ''} />

      <div className="flex flex-between mt-2">
        <CardBtn
          action={onDelete}
          name={'Delete Submission'}
          btnClass={'btn-danger flex-self-start'}
        />
        <Link
          to={`./submissions/edit/${submissionData.submissionId}`}
          className={'flex-self-end'}
          >
          <CardBtn
            action={()=>{return false}}
            name={'Edit Submission'}
            btnClass={'btn-success'}
          />
        </Link>
      </div>
    </div>
  )
}


export { AdminSubmissionItem }
