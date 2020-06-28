import React from 'react';
import { Row, Col } from '../../components/layout'
import { SvgIcon } from '../../components/svg'
import {
  AccountSvg,
  SettingSvg,
  CommentSvg,
} from '../../components/svg/jsx'

class FaqSection extends React.Component {
  render() {
    return (
      <Row flex={true} rowClass={['py-20', 'text-center']}>
        <Col>
          <div className="col_header p-5">
            <SvgIcon
              flex={true}
              iconComponent={AccountSvg}
              containerClass={'bg-primary icon--circle c-white'}
              iconClass={'icon_scale-70'}
             />
         </div>

         <h3>WHY SHOULD I PARTICIPATE?</h3>

          <p>
            In IronHacks, you learn new skills, win prizes ($$$), get exposed to
            tech organizations, and win internships. Most importantly, you become
            part of a global movement of open data to make an impact in areas such
            as safety, health, or travel.
          </p>
        </Col>

      <Col colClass="">
        <div className="col_header p-5">
        <SvgIcon
          flex={true}
          containerClass={'bg-primary icon--circle c-white'}
          iconComponent={CommentSvg}
          iconClass={'icon_scale-60'}
         />
        </div>

       <h3>WHAT IS IRONHACKS?</h3>
        <p>
          IronHacks is a unique one month, 5-stage innovative hacking program
          for individuals who want to create impact from open data. During the
          iterative hacking process, you will learn new skills, have the chance
          to learn from others, and receive feedback from IronHacks experts!
          Turn your ideas into web apps that make data actionable and useful!
        </p>
      </Col>


      <Col colClass="">
        <div className="col_header p-5">
          <SvgIcon
            flex={true}
            containerClass={'bg-primary icon--circle c-white'}
            iconComponent={SettingSvg}
            iconClass={'icon_scale-70'}
           />
        </div>

        <h3>HOW CAN I GET INVOLVED?</h3>

        <p>
          There are many ways to get involved: As hack participants, as industry
          sponsor, or as researcher. To learn more about upcoming hacks, please
          send an email to opendigital@purdue.edu.
        </p>
      </Col>
      </Row>
    );
  }
}


export { FaqSection }
