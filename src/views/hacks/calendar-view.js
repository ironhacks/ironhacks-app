import React from 'react';
import { Row, Col } from '../../components/layout';

const CalendarView = ({data}) => {
  const gcalendar_src = data ? data.gcalendar_src : '';
  const iframe = `<iframe
  title="Event Calendar"
  src="${gcalendar_src}"
  style="border-width: 0;"
  width="400"
  height="600"
  frameBorder="0"
  scrolling="no"></iframe>
`;

  return (
      <Row>
        <Col>
          <div dangerouslySetInnerHTML={ {__html: iframe}} />
        </Col>
      </Row>
  )
}

export default CalendarView
