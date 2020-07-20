import React from 'react';
import { Link } from 'react-router-dom';
import { LandingPage, Section, Row, Col } from '../../components/layout';
import { Img } from '../../components/img';
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
      <LandingPage>

        <Section sectionClass="bg-blue-lt1 py-5">
          <Row rowClass="mb-2">
            <Col colClass="text-center">
              <Img
                responsive={true}
                baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
                filePath={'media%2Fimg%2F'}
                fileName={'upcoming-covid19-cta.png?alt=media&token=7fc34889-ce67-4b46-8e42-250efb8d66c0'}
                imgClass="banner_img mb-4"
                alt="Upcoming Hack"
              />
            </Col>
          </Row>

          <Row rowClass="pb-6">
            <Col colClass='flex-1 my-5'>
              <h1 className={'h1 site-title'}>
                <span className="font-extrabold">IronHacks Summer 2020: </span><br/>
                <span className="font-light">A Global COVID-19 Data Science Challenge</span>
              </h1>

              <h2 className="mb-3 mt-1">
                Hack for innovation and join the open data movement.
              </h2>

              <LoginButton to='/login?mode=select'>
                Sign up here now
              </LoginButton>

              <LoginButton to='/login'>
                Sign in
              </LoginButton>
            </Col>
          </Row>

        </Section>

        <Section sectionClass="py-5">
          <Row rowClass="py-2">
            <Col>
              <h2 className="h2 my-4 font-bold">
                What is the COVID-19 Data Science Challenge?
              </h2>

              <p>
                COVID-19 is upending our health, our social communities, and our economy. The Research Center for Open Digital Innovation (RCODI) has set forth to launch an IronHacks to facilitate governments and citizens in making the right decisions as we are moving through this pandemic. Leaders in our country who are responsible for protecting their citizens' welfare and quality of life face difficult questions, such as: When and where do citizens expose themselves and others the most to COVID-19 risk? Which regions and industries are predicted to suffer the most from COVID-19, both economically as well as socially?
              </p>

              <p>
                Today, we have more, increasingly granular, and actual data available to answer those questions: Daily updated mobility and location data collected via our mobile phones, visitor counts at core places, regional spending data, unemployment claims, etc. However, it takes the collective effort of a crowd of IronHackers to turn this data into something useful and develop models that help us predict and explore the social and economic impact of COVID-19 at granular level.
              </p>

              <p>
                For Summer 2020, we invite every individual around the world to join the IronHacks crowd in a COVID-19 Data Science Challenge to develop the best and the most novel solution for predicting COVID-19 impacts.
              </p>

            </Col>
          </Row>

          <Row>
            <Col>
              <iframe
                title="MPH IronHacks Welcome Video"
                style={{
                  margin: '1em auto 3em',
                  display: 'block',
                }}
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/6LBzLqVIc-0"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                />
            </Col>
          </Row>


          <Row rowClass="">
            <Col>
              <h2 className="h2 font-bold my-2">
                What will participants create during this IronHacks?
              </h2>

              <p>
                We will provide our IronHacks participants with access to a selection of large and granular datasets related to COVID-19 incidents as well as social and economic effects. We specifically curated a selection of social and economic data that can be identified at a granular geographic level (Zip code/specific location). Equipped with this data, participants will work in a Jupyter notebook lab environment to create novel and useful statistical models and visualizations using Python, R or Julia. The challenge will focus on two aspects: data visualization, as well as prediction. Indeed, the weekly prediction of COVID-19 impacts such as crowding at core places as well as economic spending will be at the core of statistical models and data visualizations. The participants’ notebooks and their outputs (html and markdown files) will be a central component of a submission.
              </p>




              <h2 className="h2 font-bold my-2">
                How will participants be evaluated?
              </h2>

              <p>Each participant's notebook will be evaluated in several dimensions: </p>

              <ul className="list">
                <li>Quality and usefulness of the data visualization</li>
                <li>Accuracy of the prediction</li>
                <li>Quality and reproducibility of the software code </li>
              </ul>

              <p>
                The evaluation criteria and scorecard will be released along with the Task Statement at the start of the Hack.
              </p>

              <h2 className="h2 font-bold my-2">
                How does IronHacks work?
              </h2>

              <p>
                IronHacks is a global virtual open data hacking platform that allows users to participate in a high-energy IronHacks competition. The IronHacks platform offers participants a no setup programming environment and many powerful features to create novel and useful models and visualizations, such as a social coding editor, along with an individual and a community dashboard.
              </p>

              <h2 className="h2 font-bold my-2">
                What skills are needed?
              </h2>

              <p>
                This IronHacks is not limited to programming or data science experts! We are recruiting anyone around the world, from our network of students and alumni to data science communities online. We are calling on all of those people who are interested in open data for social good and who have the interest and initiative to learn and iterate quickly over the multiphase hack timeline. Basic knowledge of statistics, Python, R or Julia is required. But even if you are a beginner or you feel a little rusty in Python or R, you should not shy away. You can use the informational training period to get up to speed and explore some of tutorials that we will be sharing. You will be contributing great value towards this challenge and you will gain new skills along the way.
              </p>

              <h2 className="h2 font-bold my-2">
                What can I gain?
              </h2>

              <p>
                We offer a range of cool prizes and recognition to our IronHackers! Winning hackers will have the opportunity to be eligible for cash prizes. From Improvement Spirit, to Best Solution, there is a chance for everyone to gain fame, connect with top-level organizations, and be recognized for their excellent solutions to the COVID-19 Data Science Challenge!
              </p>

              <ul className="list">
                  <li>
                    $3000 in Total Prize Money across different categories (e.g. Best Solution, Improvement Spirit)
                  </li>
                  <li>
                    A certificate signed by the RCODI team and logos of our partners
                  </li>
                  <li>
                    A virtual award ceremony with presence of local and global partners
                   </li>
                  <li>
                    Podcast interviews and feature presentation of the best solutions in media and press
                  </li>
                  <li>
                    Promotion through partner channels
                  </li>
                  <li>
                    Internship at RCODI to prepare future IronHacks
                  </li>
              </ul>
            </Col>
          </Row>

          <Row rowClass="py-3">
            <Col>
              <h2 className="h2 font-bold my-2">
                What is the timeline?
              </h2>

              <p>
                We are in the process of finalizing our timeline in collaboration with our partners. Here is a tentative schedule:
              </p>

              <ul className="list">
                <li>
                  Sign-up phase for COVID-19 and Information/Training Period will tentatively start in mid-July. During this period we will release informational materials, launch virtual events/webinars to introduce you the IronHacks platform, the process, and some central details you need to succeed during the challenge.
                </li>
                <li>
                  Launch of Hack/Start of Competition: After a few days of training/information sessions, we will start a high-energy 4-phase IronHacks competition by releasing the Task and the Evaluation Metrics.
                </li>
                <li>
                  Iterative hacking phases: The challenge will run through 4 phases between 14 to 30 days (see sample timeline below). After a high-energy "hacking" phase, we will evaluate and score your application using a combination of automated and human evaluation techniques. Our judges will have deep experience in data visualization.
                </li>
                <li>
                  End of IronHacks Summer 2020: We will end with a Virtual Awards Ceremony to showcase the winning solutions! We expect to award our winners beginning/mid of August.
                </li>
              </ul>

              <p>
                <Img
                  responsive={true}
                  baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
                  filePath={'media%2Fimg%2F'}
                  fileName={'upcoming-hack-timeline.jpg?alt=media&token=074ea992-ed9b-414c-8760-3a0dce39d053'}
                  imgClass="py-4"
                  alt="Upcoming Hack Timeline"
                />
              </p>

              <h2 className="h2 font-bold my-2">
                How can stay informed about the start of the COVID-19 Data Science Challenge?
              </h2>

              <p>
                To keep informed, register now on www.ironhacks.com. Once the COVID-19 Data Science Challenge is open for sign-ups, we
                will send all registered users an email.
              </p>

              <h2 className="h2 font-bold my-2">
                Why should organizations partner with us?
              </h2>

              <p>
                By partnering with us for the IronHacks COVID-19 Data Science Challenge, organizations have the opportunity to take collective action and help society to cope with the COVID-19 pandemic. You will be able to connect with our global network and contribute to open science initiatives while creating local solutions for policymakers and citizens:
              </p>

              <ul className="list">
                <li>
                  Participate in the COVID-19 Challenge and gain direct insights about current and future COVID-19 impacts
                </li>

                <li>
                  Leverage our network and reach to promote your organization's commitment to social good
                </li>

                <li>
                  Connect with top talent in the areas of data and computational social science
                </li>

                <li>
                  Contribute to scientific discovery with real-world impact
                </li>
              </ul>

              <p>
                Join forces with us for this chance to create impact with data-driven insights that help policymakers create real change for citizens in the face of the pandemic!
              </p>

            </Col>
          </Row>

          <Row rowClass="mb-2">

            <h2 className="h2 font-bold my-2">
              Core Partners
            </h2>

            <Col colClass="text-center">
              <Img
                responsive={true}
                baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
                filePath={'media%2Fimg%2F'}
                fileName={'upcoming-covid19-partners.jpg?alt=media&token=367cbef2-c62b-4938-841d-5165d9d0da84'}
                alt="Key Parnters"
                imgClass="banner_img mb-4"
              />
            </Col>
          </Row>

          <Row>
            <Col colClass="text-center pb-5">
              <div>
                <small>IronHacks is an initiative of the Research Center for Open Digital Innovation (RCODI).</small>
              </div>

              <div>
                <small>It is financially supported by the National Science Foundation (Award #1462044).</small>
              </div>
            </Col>
          </Row>
        </Section>
      </LandingPage>
    )
  }
}

export default UpcomingHackPage;
