import { useEffect } from 'react'
import { Row, Col } from '../../components/layout'
import { userMetrics } from '../../util/user-metrics'

const CalendarView = ({ data }) => {
  useEffect(() => {
    userMetrics({ event: 'view_calendar' })
  })

  const gcalendar_src = data ? data.gcalendar_src : ''
  const iframe = `<iframe
    title="Event Calendar"
    src="${gcalendar_src}"
    style="border-width: 0; width:100%;"
    height="600"
    frameBorder="0"
    scrolling="no"></iframe>
`

  return (
    <Row>
      <Col>
        <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: iframe }} />
      </Col>
    </Row>
  )
}

export default CalendarView
