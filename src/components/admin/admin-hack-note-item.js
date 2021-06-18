import React from 'react'
import { Card, Accordion, Badge, Button } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

const stateColor = (state, note) => {
  if (note.created_by === 'Manthan Keim') {
    return 'primary'
  } else if (note.created_by === 'Matt Harris') {
    return 'info'
  } else if (note.created_by === 'Sabine Brunswicker') {
    return 'success'
  } else if (note.created_by === 'Elizabeth') {
    return 'secondary'
  } else if (note.created_by === 'Bryan Jacobs') {
    return 'danger'
  } else if (note.created_by === 'Feny Patel') {
    return 'dark'
  } else if (note.created_by === 'RCODI') {
    return 'warning'
  } else {
    return 'light'
  }
}

function AdminHackNoteItem({ note, deletenote }) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={note.noteId} className="flex">
        <div className="note-info flex flex-1">
          <img
            src={note.photo_url}
            alt="user_photo"
            width="29"
            height="29"
            style={{ borderRadius: 50, marginRight: '.5em', marginTop: '.1em' }}
          />
          <div className="">
            <div className="pr-2 font-bold">{note.title || ''}</div>
            <Badge variant={stateColor(note.state, note)}>
              Created {note.created_at} by {note.created_by}
            </Badge>
          </div>
        </div>

        <div className="note-actions">
          <Link to={`notes/${note.noteId}/edit`}>
            <Button
              variant="outline-info"
              size="sm"
              style={{ marginRight: 5 + 'px' }}
              className="`"
            >
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => deletenote(note.noteId)}
            variant="outline-danger"
            size="sm"
            style={{ marginLeft: 5 + 'px' }}
            className=""
          >
            Delete
          </Button>
        </div>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={note.noteId}>
        <Card.Body>
          <ReactMarkdown source={note.content} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export { AdminHackNoteItem }
