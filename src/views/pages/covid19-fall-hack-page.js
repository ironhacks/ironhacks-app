import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LandingPage, Section, Row, Col } from '../../components/layout'
import { LoginButton } from '../../components/buttons'
import { TwitterButton, TwitterTimeline } from '../../components/twitter'
import { List } from '../../components/list'
import { Img } from '../../components/img'
import FsLightbox from 'fslightbox-react'
import fenyPatel from '../../assets/img/feny-patel.jpeg'
import harshaPavuluri from '../../assets/img/harsha-pavuluri.jpg'

function VideoSection() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  })

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    })
  }

  return (
    <>
      <Row rowClass="card_row" flex={true}>
        <Col colClass="card_col">
          <div
            className="card example_card"
            style={{ cursor: 'pointer' }}
            onClick={() => openLightboxOnSlide(1)}
          >
            <Img
              responsive={false}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2Foptim%2F'}
              fileName={
                'video-thumb-indiana-mph_360x200.png?alt=media&token=483bb5df-a703-4740-9b34-3c1a925b3899'
              }
              alt={'Indiana Management Performance Hub'}
              imgClass="card__image bd-0 mb-0 depth-2"
              imgStyle={{ objectFit: 'cover' }}
            />
            <div className="card__content bd-0 bg-inherit">
              <h3 className="title example_card__title font-bold my-3 px-2">
                Indiana Management Performance Hub
              </h3>
            </div>
          </div>
        </Col>

        <Col colClass="card_col">
          <div
            className="card example_card"
            style={{ cursor: 'pointer' }}
            onClick={() => openLightboxOnSlide(2)}
          >
            <Img
              responsive={false}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2Foptim%2F'}
              fileName={
                'video-thumb-indiana-dwd_360x200.png?alt=media&token=ef219088-5ead-4c95-ad86-d6f144e9752c'
              }
              alt={'Indiana Management Performance Hub'}
              imgClass="card__image bd-0 mb-0 depth-2"
              imgStyle={{ objectFit: 'cover' }}
            />
            <div className="card__content bd-0 bg-inherit">
              <h3 className="title example_card__title font-bold my-3 px-2">
                Indiana Dept. of Workforce Development
              </h3>
            </div>
          </div>
        </Col>
      </Row>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={[
          'https://www.youtube.com/watch?v=6LBzLqVIc-0',
          'https://www.youtube.com/watch?v=QXptoKzR1Vk',
        ]}
        slide={lightboxController.slide}
      />
    </>
  )
}

const UpcomingHackPage = () => {
  return (
    <LandingPage
      pageTitle="IronHacks | COVID-19 Challenge"
      pageDescription="A Global COVID-19 Data Science Challenge powered by IronHacks"
      pageUrl="https://ironhacks.com/covid19-2020-fall"
    >
      <Section sectionClass="bg-blue-lt1 py-5">
        <Row rowClass="mb-2">
          <Col colClass="text-center">
            <Img
              responsive={true}
              baseUrl={
                'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'
              }
              filePath={'media%2Fimg%2F'}
              fileName={
                'covid19-fall-hack-cta-2.png?alt=media&token=e3f36e30-06f1-4ee4-893a-d7b22ccf7858'
              }
              imgClass="banner_img mb-4"
              alt="Upcoming Hack"
            />
          </Col>
        </Row>

        <Row rowClass="pb-6">
          <Col colClass="flex-1 my-5">
            <h1 className={'h1 site-title'}>
              <span className="font-extrabold">IronHacks 2020: </span>
              <br />
              <span className="font-light">
                A Series of Global COVID-19 Data Science Challenges
              </span>
            </h1>

            <LoginButton to="/login?mode=select">Sign up here now</LoginButton>

            <LoginButton to="/login">Sign in</LoginButton>
          </Col>
        </Row>
      </Section>

      <Section sectionClass="pt-5">
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 my-4 font-bold">Why the COVID-19 Data Science Challenges?</h2>

            <p>
              COVID-19 is upending our health, our social communities, and our economy. The Research
              Center for Open Digital Innovation (RCODI) has set forth to launch an IronHacks series
              to help leaders in making the right decisions as we are moving through this pandemic.
              Leaders in our country who are responsible for protecting their citizens' welfare and
              quality of life face difficult questions, such as: When and where do citizens expose
              themselves and others the most to COVID-19 risk? Which regions and places (stores,
              restaurants, etc.) are predicted to be hotspots for social crowding increasing the
              risk of virus spread?
            </p>

            <p>
              Today, we have more, increasingly granular, and actual data available to answer those
              questions: Daily updated mobility and location data collected via our mobile phones,
              visitor counts at core places, regional spending data, unemployment claims, etc.
              However, it takes the collective effort of a crowd of IronHackers to turn this data
              into something useful and develop models that help us predict and explore the social
              and economic impact of COVID-19 at granular level.
            </p>

            <p>
              Watch the videos of two leaders in the State of Indiana to learn why they need YOU as
              soldiers of the COVID-19 pandemic behind the screen.
            </p>
          </Col>

          <VideoSection />
        </Row>
      </Section>
      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What are the Challenges about?</h2>
            <p>
              Our COVID-19 Data Science Challenges invite participants to build statistical models
              and visualizations that monitor and predict social movement behavior during the
              COVID-19 pandemic over time. The goal is to predict weekly patterns of movement and
              social interaction in our local communities to understand COVID-19 risks.
            </p>

            <List
              items={[
                "August 2020 COVID-19 Data Science Challenge: This first COVID-19 Data Science Challenge focuses on predicting the foot traffic at major brands (e.g. Target, Domino's Pizza etc.). The goal is to foresee which brands are experiencing the greatest surge in visitors.",
                "Fall 2020 COVID-19 Data Science Challenge: Protect Purdue. This challenge asks participants to monitor and predict weekly foot traffic at thousands of places of interests (e.g. restaurants, stores, churches) in the Greater West-Lafayette. It responds to a statement made by Purdue's Leadership team: that COVID-19 risk is not necessarily arising in campus buildings but, rather, emerging from off-campus social gatherings like in restaurants, shops, etc.",
              ]}
            />

            <p>
              Participants have access to BIG actual, granular and temporal data they typically do
              not have access to: Data about social distancing behavior, foot traffic, COVID-19
              incidents, as well as executive orders. This data is also used by state governments in
              the US as well scientists who try to understand social movements during COVID-19
              pandemic.
            </p>

            <p>
              Equipped with this data, participants will work in the IronHacks workspace with
              JupyterLab and access to BigQuery to create novel and useful statistical models and
              visualizations using Python and R. Participants will submit Jupyter notebooks and
              their outputs (html and markdown files).
            </p>
          </Col>
        </Row>
      </Section>

      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What do prior participants say?</h2>

            <div className="my-5">
              <div className="flex">
                <img
                  src={fenyPatel}
                  style={{ width: 60, height: 60, borderRadius: '50%', marginRight: '1em' }}
                  alt="Feny Patel"
                />
                <div className="font-italic">
                  "The excitement to know how my model would perform after every round kept me
                  enthused till the end! These predictions can give insights into social distancing
                  norms and implement necessary precautions."
                </div>
              </div>
              <div className="my-4">
                Feny Patel, August 2020 Challenge first-place winner and Purdue University student.
              </div>
            </div>

            <div className="my-5">
              <div className="flex">
                <img
                  src={harshaPavuluri}
                  style={{ width: 60, height: 60, borderRadius: '50%', marginRight: '1em' }}
                  alt="Harsha Pavuluri"
                />
                <div className="font-italic">
                  "My greatest experience was being able to try on algorithms I never use. I also
                  had the freedom to experiment, instead of defaulting to certain known models due
                  to crunching code within 24 hours like typical hackathons."
                </div>
              </div>
              <div className="my-4">
                Harsha Pavuluri, the August 2020 Challenge second-place winner and Purdue University
                student.
              </div>
            </div>
          </Col>
        </Row>
      </Section>
      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">How will participants be evaluated?</h2>

            <p>
              Each participant's notebook will be evaluated in several dimensions. Examples are:
            </p>

            <List
              items={[
                "The accuracy of your model'sprediction (e.g. mean squared error)",
                'Your effort to explore a variety of solutions (data, models, etc.)',
                'Quality and usefulness of the presentation and interpretation of your data/models in a final interactive report (including data visualization)',
                'Quality of the software code',
              ]}
            />

            <p>
              More details on the evaluation criteria will be released at the start of the
              competition.
            </p>
          </Col>
        </Row>
      </Section>

      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">How does the process work?</h2>

            <p>
              IronHacks is a global virtual open data hacking platform that allows users to
              participate in a high-energy IronHacks competition. The IronHacks platform offers
              participants a no setup workspace with <strong>JupyterLab</strong> and{' '}
              <strong>BigQuery</strong>
              integration and many powerful features to create novel and useful models and
              visualizations. It also offers training and tutorials, as well as a personal dashboard
              to view scores and progress through the competition. After registration, participants
              can warm-up, practice their skills and query sample data until sufficient participants
              have joined to launch the competition. After the start of the competition, a
              multiphase process will start. Each challenge moves through the following phases.
            </p>

            <ul className="list">
              <li>
                <strong>Registration and warm-up phase:</strong> If you have registered for one of
                the Challenges that are available, you will have the opportunity to warm-up using
                our tutorials.
              </li>

              <li>
                <strong>Start of competition followed by multiphase process:</strong> The
                competition starts based on invitation, usually followed by multiple interim and one
                final submission
              </li>

              <ul className="list">
                <li>
                  <strong>Interim submissions:</strong> At multiple interim submission points, you
                  will receive immediate feedback on your current standing, giving you the
                  opportunity to improve over time.
                </li>
                <li>
                  <strong>Final submission:</strong> There will be a final submission before we
                  identify the winners.
                </li>
              </ul>
            </ul>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What is the timeline?</h2>

            <p>Each hack runs for about 3 to 4 weeks!</p>

            <List
              items={[
                <p>
                  <strong>COVID-19 Data Science Challenge Summer 2020:</strong> This challenge is
                  complete. Check out the results here!
                </p>,
                <p>
                  <strong>COVID-19 Data Science Challenge Fall 2020: Protect Purdue:</strong> There
                  will be two challenges - one focused on Python and one focused on R. These
                  challenges will open for registration on November 18th. We plan to acceptopen for
                  submissions a week later.
                </p>,
              ]}
            />
          </Col>
        </Row>

        <Row rowClass="py-4">
          <Col>
            <h2 className="h2 font-bold mb-4">How to participate?</h2>

            <ul className="list">
              <li>
                Sign up on{' '}
                <a className="link-underline" href="https://ironhacks.com">
                  ironhacks.com
                </a>{' '}
                to learn more about the upcoming Protect Purdue Challenge and other future
                challenges and timelines.
              </li>
              <li>
                Reach out to us with any questions by sending us an{' '}
                <a
                  href="mailto:c562462b.groups.purdue.edu@amer.teams.ms"
                  target="_blank"
                  className="text-underline"
                >
                  email
                </a>
              </li>
              <li>
                Watch our recent publicly accessible{' '}
                <a
                  className="link--underline"
                  href="https://www.youtube.com/watch?v=vnT587J-wis&feature=youtu.be"
                >
                  Info Sessions.
                </a>
              </li>
              <li>
                Check our event calendar for upcoming{' '}
                <a
                  className="link--underline"
                  href="https://calendar.google.com/calendar/u/0?cid=MzJwcTRhYjVxbjgyczAxc3VhZzNwMW82M2dAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
                >
                  Info Sessions
                </a>{' '}
                (held via Webex or Google meets) and other deadlines.
              </li>
              <li>
                And do not forget to Register for one of the Challenges (R or Python) to save your
                space in the competition. Registration has opened!
              </li>
            </ul>
          </Col>
        </Row>

        <Row rowClass="w-70p mx-auto mt-2 mb-10">
          <Col>
            <h2 className="h2 text-center font-bold my-4">What people are saying?</h2>

            <div className="flex flex-center my-3">
              <TwitterButton hashtag="IronHacks" />
            </div>

            <div
              style={{
                maxHeight: '500px',
                overflow: 'auto',
                zoom: 1.5,
              }}
            >
              <TwitterTimeline src="https://twitter.com/__matt_harris__/lists/ironhacks-com-14752?ref_src=twsrc%5Etfw" />
            </div>
          </Col>
        </Row>

        <Row rowClass="bg-primary my-4">
          <Col colClass="flex flex-center flex-align-center">
            <Link to="/login" className="bd-1 btn cl-black font-bold my-0 my-3">
              Sign up now
            </Link>
          </Col>
        </Row>

        <Row rowClass="my-4">
          <h2 className="h2 font-bold mt-6 text-center">Core Partners</h2>

          <Col colClass="text-center">
            <Img
              responsive={true}
              baseUrl={
                'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com'
              }
              filePath={'o/media%2Fimg%2F'}
              fileName={
                'ironhacks-partners-2020.jpg?alt=media&token=fa199ce5-bd90-48ac-acdd-8ea979fecb17'
              }
              alt="Key Parnters"
              imgClass="banner_img mb-4"
            />
          </Col>
        </Row>

        <Row>
          <Col colClass="text-center pb-5">
            <div>
              <small>
                IronHacks is an initiative of the Research Center for Open Digital Innovation
                (RCODI).
              </small>
            </div>

            <div>
              <small>
                It is financially supported by the National Science Foundation (Award #1462044).
              </small>
            </div>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <p>
              <strong>Would you like to support us directly?</strong> You can contact us at{' '}
              <a
                href="mailto:c562462b.groups.purdue.edu@amer.teams.ms"
                target="_blank"
                className="text-underline"
              >
                <strong>here</strong>
              </a>{' '}
              partnership with the Research Center for Open Digital Innovation at Purdue University.
            </p>
          </Col>
        </Row>
      </Section>
    </LandingPage>
  )
}

export default UpcomingHackPage
