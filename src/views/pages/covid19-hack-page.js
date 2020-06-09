import React from 'react';
import { Link } from 'react-router-dom';

import { LandingPage, Section, Row, Col } from '../../components/layout';
import upcomingImg from '../../assets/img/upcoming-covid19-cta.png'
import socialDistancingImg from '../../assets/img/social-distancing.png'
import styled from 'styled-components'
import { Theme } from '../../theme';

const colors = Theme.COLORS;
const LoginButton = styled(Link)`
  padding: 10px 10px;
  margin-right: 4px;
  margin-top: 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  color: black;
  background-color: none;
  border: 2px solid black;
  trasition: color: 0.5s;

  &:hover {
    background-color: ${(props) => props.theme.hoverTextColor};
    color: ${colors.invertedHighlightedTextColor};
    text-decoration: none;
  }
`;


class UpcomingHackPage extends React.Component {
  render() {
    return (
      <LandingPage pageClass="home_page">

        <Section sectionClass="bg-primary">
          <Row rowClass="mb-2">
            <Col colClass="text-center">
              <img src={upcomingImg} alt="Upcoming Hack" className="banner_img"/>
            </Col>
          </Row>
          <Row>

          <Col colClass='flex-1 mt-5'>
            <h1 className={'h1 site-title'}>
              <span className="font-light">COVID19 </span>
              <span className="font-extrabold">IRONHACK</span>
            </h1>

            <h2 className="mb-3 mt-1">
              Hack for innovation and join the open data movement.
            </h2>

            <LoginButton to='/login?mode=select'>Sign up here now</LoginButton>
            <LoginButton to='/login'>Sign in</LoginButton>
          </Col>
          </Row>

        </Section>

        <Section sectionClass="">
          <Row rowClass="py-2">
            <Col>
              <h2 className="h2 my-1 font-bold">Civic Challenge</h2>

              <h3 className="h3 font-bold mb-2">Overview:</h3>

              <p>
                Welcome future IronHackers! Join us as we launch an open
                data hack to solve civic challenges during the Covid-19
                pandemic. Use your skills and knowledge in programming,
                statistics and data visualization to create useful models
                for policymakers across the U.S. who make critical decisions
                for their citizens each day. Use our research-based and
                proven platform to collaborate and learn from others'
                solutions to create an optimal model!
              </p>

              <img src={socialDistancingImg}/>

            </Col>
          </Row>

          <Row rowClass="py-2">
            <Col>
              <h3 className="h3 font-bold mb-2">
                How it works:
              </h3>
              <p>
                Our IronHacks platform uses a multiphase process where hackers
                build a version of their solution and then submit it for review.
                After each phase, the submission is judged through an objective
                algorithmic process as well as expert human judges for certain
                components. Hackers can see their standing compared to others
                and iterate their own work in the next phases.
              </p>
            </Col>
          </Row>

          <Row rowClass="py-2">
            <Col>
              <h3 className="h3 font-bold mb-2">
                Description:
              </h3>
              <p>
                Using open datasets, hackers will develop a descriptive analysis
                of economic and workforce impact in communities in the U.S. due to
                Covid-19.  Next, visualizations will be created to highlight critical
                elements related to the specific subtasks (to be available once hackers
                are registered). Finally, a modeling task will allow hackers to
                provide critical Covid-19 insights to relevant policymakers.
              </p>
            </Col>
          </Row>

          <Row rowClass="py-2">
            <Col>
              <h3 className="h3 font-bold mb-2">
                Timeline:
              </h3>

              <ul className="pl-2">
                <li>
                  <strong>June 9th:</strong> Registration Opens
                </li>
                <li>
                  <strong>June 15th:</strong> Training Kickoff
                </li>
                <li>
                  <strong>June 22nd:</strong> Start of Hack(Virtual Kickoff)/Phase 1
                </li>
                <li>
                  <strong>June 24th:</strong> Phase 1 ends
                </li>
                <li>
                  <strong>June 25th:</strong> Judging Round 1 & Leaderboard update
                </li>
                <li>
                  <strong>June 26th:</strong> Start Phase 2
                </li>
                <li>
                  <strong>June 28th:</strong> Phase 2 ends
                </li>
                <li>
                  <strong>June 29th-30th:</strong> Judging Round 2 (Expert judges) & Leaderboard update
                </li>
                <li>
                  <strong>July 1st:</strong> Phase 3 starts
                </li>
                <li>
                  <strong>July 3:</strong> Phase 3 ends
                </li>
                <li>
                  <strong>July 5-6:</strong> Judging Round 3 & Leaderboard update
                </li>
                <li>
                  <strong>July 7th:</strong> Winners announced at Virtual Awards Ceremony
                </li>
              </ul>
            </Col>
          </Row>

          <Row rowClass="py-2">
            <Col>
              <h2 className="h3 font-bold mb-2">
                Incentives:
              </h2>

              <ul>
                <li>Prize Money</li>
                <li>Partner Swag</li>
                <li>Hosted Trainings</li>
                <li>Promotion of Winners through Partner channels</li>
              </ul>
            </Col>
          </Row>

          <Row rowClass="py-2">
            <Col>
              <h2 className="h3 font-bold mb-2">
                Partnership Opportunities:
              </h2>

              <ul>
                <li>
                  Host a Training Session
                </li>
                <li>
                  Logo Placement
                </li>
                <li>
                  Support via financial award sponsorship
                </li>
                <li>
                  Support via in-kind sponsorship (swag, participation in events, promotions)
                </li>
              </ul>
            </Col>
          </Row>
        </Section>
      </LandingPage>
    )
  }
}

export default UpcomingHackPage;
