import { useState } from 'react'
import { LandingPage, Section, Row, Col } from '../../components/layout'
import { LoginButton } from '../../components/buttons'
import { List } from '../../components/list'
import { Img } from '../../components/img'
import FsLightbox from 'fslightbox-react'

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
      <Row>
        <Col>
          <h2 className="h2 font-bold mb-2">Testimonials</h2>
        </Col>
      </Row>
      <Row rowClass="card_row" flex={true}>
        <Col colClass="card_col">
          <div className="card example_card" style={{ cursor: 'pointer' }} onClick={() => openLightboxOnSlide(1)}>
            <Img
              responsive={false}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2Foptim%2F'}
              fileName={'video-thumb-indiana-mph_360x200.png?alt=media&token=483bb5df-a703-4740-9b34-3c1a925b3899'}
              alt={'Indiana Management Performance Hub'}
              imgClass="card__image bd-0 mb-0 depth-2"
              imgStyle={{ objectFit: 'cover' }}
            />
            <div className="card__content bd-0 bg-inherit">
              <h3 className="title example_card__title font-bold my-3 px-2">Indiana Management Performance Hub</h3>
            </div>
          </div>
        </Col>

        <Col colClass="card_col">
          <div className="card example_card" style={{ cursor: 'pointer' }} onClick={() => openLightboxOnSlide(2)}>
            <Img
              responsive={false}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2Foptim%2F'}
              fileName={'video-thumb-indiana-dwd_360x200.png?alt=media&token=ef219088-5ead-4c95-ad86-d6f144e9752c'}
              alt={'Indiana Management Performance Hub'}
              imgClass="card__image bd-0 mb-0 depth-2"
              imgStyle={{ objectFit: 'cover' }}
            />
            <div className="card__content bd-0 bg-inherit">
              <h3 className="title example_card__title font-bold my-3 px-2">Indiana Dept. of Workforce Development</h3>
            </div>
          </div>
        </Col>
      </Row>

      <FsLightbox
        toggler={lightboxController.toggler}
        sources={['https://www.youtube.com/watch?v=6LBzLqVIc-0', 'https://www.youtube.com/watch?v=QXptoKzR1Vk']}
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
      pageUrl="https://ironhacks.com/covid19"
    >
      <Section sectionClass="bg-blue-lt1 py-5">
        <Row rowClass="mb-2">
          <Col colClass="text-center">
            <Img
              responsive={true}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2F'}
              fileName={'upcoming-covid19-cta.png?alt=media&token=06c537fe-c97a-47dd-bbd8-ebf03ae0f4b9'}
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
              <span className="font-light">A Series of Global COVID-19 Data Science Challenges</span>
            </h1>

            <h2 className="mb-3 mt-1">Hack for innovation to solve global challenges.</h2>

            <LoginButton to="/login?mode=select">Sign up here now</LoginButton>

            <LoginButton to="/login">Sign in</LoginButton>
          </Col>
        </Row>
      </Section>

      <Section sectionClass="py-5">
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 my-4 font-bold">What are the COVID-19 Data Science Challenges?</h2>

            <p>
              COVID-19 is upending our health, our social communities, and our economy. The Research Center for Open
              Digital Innovation (RCODI) has set forth to launch an IronHacks series to facilitate governments and
              citizens in making the right decisions as we are moving through this pandemic. Leaders in our country who
              are responsible for protecting their citizens' welfare and quality of life face difficult questions, such
              as: When and where do citizens expose themselves and others the most to COVID-19 risk? Which regions and
              industries are predicted to suffer the most from COVID-19, both economically as well as socially?
            </p>

            <p>
              Today, we have more, increasingly granular, and actual data available to answer those questions: Daily
              updated mobility and location data collected via our mobile phones, visitor counts at core places,
              regional spending data, unemployment claims, etc. However, it takes the collective effort of a crowd of
              IronHackers to turn this data into something useful and develop models that help us predict and explore
              the social and economic impact of COVID-19 at granular level.
            </p>

            <p>
              In Summer and Fall 2020, we invite aspiring data scientists to join the IronHacks crowd in a COVID-19 Data
              Science Challenge to predicting COVID-19 impacts. You can watch our recent{' '}
              <a href="https://www.youtube.com/watch?v=ta5i7_I5VT8&feature=youtu.be" className="link--underline">
                Info Sessions
              </a>{' '}
              or{' '}
              <a
                href="https://purdue-student.webex.com/purdue-student/onstage/g.php?MTID=eaabc17b783525278246fc7b228261b3a"
                className="link--underline"
              >
                sign-up
              </a>{' '}
              for upcoming ones to learn more about the COVID-19 data science challenges here.
            </p>
          </Col>
        </Row>
      </Section>

      <Section sectionClass="videos_section">
        <VideoSection />
      </Section>

      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What will participants create during this IronHacks?</h2>

            <p>
              The COVID-19 Data Science Challenges will focus on prediction tasks and data visualizations. We will
              provide our IronHacks participants with access to a selection of large and granular datasets related to
              COVID-19 incidents as well as social and economic effects. Equipped with this data, participants will work
              in the IronHacks workspace with JupyterLab and access to BigQuery to create novel and useful statistical
              models and visualizations using Python and R. Participants will submit Jupyter notebooks and their outputs
              (html and markdown files).
            </p>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">How will participants be evaluated?</h2>

            <p>Each participant's notebook will be evaluated in several dimensions, such as:</p>

            <List
              items={[
                'Accuracy of the prediction',
                'Quality and usefulness of the result presentation (data visualization)',
                'Quality of the software code',
              ]}
            />

            <p>The evaluation criteria and scorecard will be released at the start of the competition.</p>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What will the IronHacks offer?</h2>

            <p>
              IronHacks is a global virtual open data hacking platform that allows users to participate in a high-energy
              IronHacks competition. The IronHacks platform offers participants a no setup workspace with{' '}
              <strong>JupyterLab</strong> and <strong>BigQuery</strong> integration and many powerful features to create
              novel and useful models and visualizations, such as tutorials and a personal dashboard. After
              registration, participants can warm-up until sufficient participants have joined to launch the
              competition. After the start of the competition, a multiphase process will start. Each challenge moves
              through a four-phased process after a registration and warm-up phase.
            </p>

            <ul className="list">
              <li>
                <strong>Registration and warm-up phase:</strong> If you have registered for one of the Challenges that
                are available, you will have the opportunity to warm-up using our tutorials.
              </li>

              <li>
                <strong>Start of Competition followed by multiphase process:</strong> The competition starts based on
                invitation, followed by 3 interim and one final submission.
              </li>

              <ul className="list">
                <li>
                  <strong>3 interim submissions:</strong> At three interim submission points, you will receive immediate
                  feedback on your current standing, giving you the opportunity to improve over time.
                </li>
                <li>
                  <strong>Final submission:</strong> There will be a final forth submission before we identify the
                  winners.
                </li>
              </ul>

              <li>
                <strong>Award ceremony:</strong> At a virtual award ceremony we will announce the winners.
              </li>
            </ul>

            <Img
              responsive={true}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com'}
              filePath={'o/media%2Fimg%2F'}
              fileName={'ironhacks-process.jpg?alt=media&token=0b68c710-36fb-4992-9c02-604dff758a5e'}
              alt="Key Parnters"
              imgClass="banner_img my-3"
            />
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What skills are needed?</h2>

            <p>
              This IronHacks is not limited to data science experts! We are calling on all of those people who are
              interested in battling the pandemic and who have the interest and initiative to learn and iterate quickly
              over the multiphase hack timeline. Basic knowledge of statistics, Python and R is required. But even if
              you are a beginner or you feel a little rusty in Python or R, you should not shy away. You can use our
              tutorials to warm up.
            </p>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What can I gain?</h2>

            <p>
              We offer a range of cool prizes and recognition to our IronHackers! Winning hackers will have the
              opportunity to be eligible for cash prizes. In total, we will award <strong>$3000</strong> in our COVID-19
              Data Science Challenges. From Improvement Spirit, to Best Solution, there is a chance for everyone to gain
              fame, connect with top-level organizations, and be recognized for their excellent solutions to the
              COVID-19 Data Science Challenge!
            </p>

            <List
              items={[
                'Certificate: In addition to the awards, every student is granted to a digital certificate for participation with logos of the sponsors.',
                'Showcases: We will publish selected models  www.ironhacks.com at the end of the competition. In addition, our partners will also feature the best solutions on their website.',
                'Global recognition: The RCODI team and its partners will promote your work via social media.',
                'Fellowship opportunity: Selected participants will have the opportunity to discuss a fellowship at RCODI.',
              ]}
            />
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">What is the timeline?</h2>

            <p>Each hack runs for about 3 to 4 weeks!</p>

            <List
              items={[
                <p>
                  <strong>COVID-19 Data Science Challenge Summer 2020:</strong> This challenge has opened for
                  registration. However, the competition has not yet started. The task will be announced in the week of
                  August 11, 2020. Registration will close after the first submission phase. So what are you waiting
                  for? Register now and find out more!
                </p>,
                <p>
                  <strong>COVID-19 Data Science Challenge Fall 2020:</strong> This challenge has not yet opened yet. We
                  plan to open this challenge on September 29th, 2020.
                </p>,
              ]}
            />
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              How can I stay informed about the start of the COVID-19 Data Science Challenge?
            </h2>

            <ul className="list">
              <li>
                Sign up on{' '}
                <a className="link--underline" href="https://ironhacks.com">
                  ironhacks.com
                </a>{' '}
                to learn more about each challenge and their timeline.
              </li>

              <li>
                Watch our recent our publicly accessible{' '}
                <a className="link--underline" href="https://youtu.be/vnT587J-wis">
                  Info Sessions.
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">Why should organizations partner with us?</h2>

            <p>
              By partnering with us for the IronHacks COVID-19 Data Science Challenge, organizations have the
              opportunity to take collective action and help society to cope with the COVID-19 pandemic.
            </p>

            <List
              items={[
                "Leverage our network and reach to promote your organization's commitment to social good",
                'Connect with top talent in the areas of data and computational social science',
                'Work with us and define new data science challenges related to topics and data of your interest.',
              ]}
            />

            <p>
              Join forces with us for this chance to create impact with data-driven insights that help policymakers
              create real change for citizens in the face of the pandemic!
            </p>

            <p>
              <strong>Would you like to support us directly?</strong> You can contact us at{' '}
              <strong>opendigital@purdue.edu</strong> for monetary or in-kind donations to the Research Center for Open
              Digital Innovation at Purdue University.
            </p>
          </Col>
        </Row>

        <Row rowClass="mb-2">
          <h2 className="h2 font-bold my-2">Core Partners</h2>

          <Col colClass="text-center">
            <Img
              responsive={true}
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com'}
              filePath={'o/media%2Fimg%2F'}
              fileName={'ironhacks-partners-2020.jpg?alt=media&token=fa199ce5-bd90-48ac-acdd-8ea979fecb17'}
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

export default UpcomingHackPage
