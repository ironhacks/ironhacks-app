import React from 'react'
import { Card, Accordion, Badge, Button } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

const stateColor = (state, issue) => {
  if (issue.created_by === 'Manthan Keim') {
    return 'primary'
  } else if (issue.created_by === 'Matt Harris') {
    return 'info'
  } else if (issue.created_by === 'Sabine') {
    return 'success'
  } else if (issue.created_by === 'Elizabeth') {
    return 'secondary'
  } else if (issue.created_by === 'Bryan Herbert') {
    return 'danger'
  } else if (issue.created_by === 'Feny Patel') {
    return 'dark'
  } else if (issue.created_by === 'RCODI') {
    return 'warning'
  } else {
    return 'light'
  }
}

function IssueItem({ issue, deletenote }) {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={issue.noteId}>
        <img
          src={issue.photo_url}
          alt="user_photo"
          width="29"
          height="29"
          style={{ borderRadius: 50, marginRight: 5 + 'px' }}
        />
        <Badge variant={stateColor(issue.state, issue)}>
          {issue.noteId} Created on {issue.created_at} by {issue.created_by}
        </Badge>{' '}
        {issue.title || ''}
        <Button
          onClick={() => deletenote(issue.noteId)}
          variant="outline-danger"
          style={{ marginLeft: 5 + 'px' }}
          className="float-right"
        >
          Delete
        </Button>
        <Link to={`notes/${issue.noteId}/edit`}>
          <Button variant="outline-info" style={{ marginRight: 5 + 'px' }} className="float-right">
            Edit
          </Button>
        </Link>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={issue.noteId}>
        <Card.Body>
          <ReactMarkdown source={issue.content} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default IssueItem
