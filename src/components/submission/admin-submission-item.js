import React from 'react';
import { Link } from 'react-router-dom';
import { fire2Date } from '../../util/date-utils';
import { MdContentView } from '../../components/markdown-viewer';

function AdminSubmissionItem({submissionIndex, submissionData, onDeleteSubmisison=false}) {
  let { deadline } = submissionData;

  if (deadline.seconds) {
    deadline = fire2Date(submissionData.deadline);
  }

  let files = submissionData.files.map((item, index)=>{
    return `${item.required ? '*' : ''}${item.name}`
  })

  let fields = submissionData.fields.map((item, index)=>{
    return {
      title: item.title,
      required: item.required,
    }
  })

  const onDelete = () => {
    if (onDeleteSubmisison) {
      onDeleteSubmisison()
    }
  }

  return (
    <div className="admin-submission card p-3 mb-3">
      <div className="flex"><span className="font-bold mr-1">Name:</span>{submissionData.name || ''}</div>
      <div className="flex"><span className="font-bold mr-1">Deadline: </span> {deadline.toISOString()}</div>
      <div className="flex"><span className="font-bold mr-1">Survey: </span> {submissionData.survey}<br/></div>
      <div className=""><span className="font-bold mr-1">Description: </span></div>

      <MdContentView
        content={submissionData.description}
        encoded={false}
        emptyText="Submission Description not available yet."
      />

      <div className="mb-1"><span className="font-bold mr-1">Fields: </span></div>
      <ol className="list mb-2">
      {fields.map((item, index)=>(
        <li
          key={index}
          className="mb-1 ml-2"
          >
            {`${item.title}`}
            {item.required ? (<span className="ml-1 badge font-italic">(required)</span>) : (null)}
          </li>
      ))}
      </ol>

      <div className="flex">
        <span className="font-bold mr-1">Files:</span>{files.join(', ')}<br/>
      </div>

      <div className="flex flex-between mt-2">
        <div
          className={'btn btn-sm btn-danger flex-self-start'}
          onClick={onDelete}
          >
          Delete Submission
        </div>

        <Link
          to={`./submissions/edit/${submissionData.submissionId}`}
          className={'btn btn-sm btn-success flex-self-end'}
          >
          Edit Submission
        </Link>
      </div>
    </div>
  )
}


export { AdminSubmissionItem }
