import { useState } from 'react';
import { LandingPage, Section, Row, Col } from '../../components/layout';
import { LoginButton } from '../../components/buttons';
import { List } from '../../components/list';
import { Img } from '../../components/img';
import FsLightbox from 'fslightbox-react';

function VideoSection() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number
    })
  }

  return (
    <>
    <Row>
      <Col>
        <h2 className="h2 font-bold mb-2">
          Testimonials
        </h2>
      </Col>
    </Row>
    <Row rowClass="card_row" flex={true}>
      <Col colClass="card_col">
        <div className="card example_card" style={{cursor: 'pointer'}} onClick={() => openLightboxOnSlide(1)}>
          <Img
            responsive={false}
            baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
            filePath={'media%2Fimg%2Foptim%2F'}
            fileName={'video-thumb-indiana-mph_360x200.png?alt=media&token=483bb5df-a703-4740-9b34-3c1a925b3899'}
            alt={'Indiana Management Performance Hub'}
            imgClass="card__image bd-0 mb-0 depth-2"
            imgStyle={{objectFit: 'cover'}}
          />
          <div className="card__content bd-0 bg-inherit">
            <h3 className="title example_card__title font-bold my-3 px-2">Indiana Management Performance Hub</h3>
          </div>
        </div>
      </Col>

      <Col colClass="card_col">
        <div className="card example_card" style={{cursor: 'pointer'}} onClick={() => openLightboxOnSlide(2)}>
          <Img
            responsive={false}
            baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
            filePath={'media%2Fimg%2Foptim%2F'}
            fileName={'video-thumb-indiana-dwd_360x200.png?alt=media&token=ef219088-5ead-4c95-ad86-d6f144e9752c'}
            alt={'Indiana Management Performance Hub'}
            imgClass="card__image bd-0 mb-0 depth-2"
            imgStyle={{objectFit: 'cover'}}
          />
          <div className="card__content bd-0 bg-inherit">
            <h3 className="title example_card__title font-bold my-3 px-2">Indiana Dept. of Workforce Development</h3>
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
              baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
              filePath={'media%2Fimg%2F'}
              fileName={'upcoming-covid19-cta.png?alt=media&token=06c537fe-c97a-47dd-bbd8-ebf03ae0f4b9'}
              imgClass="banner_img mb-4"
              alt="Upcoming Hack"
            />
          </Col>
        </Row>

        <Row rowClass="pb-6">
          <Col colClass='flex-1 my-5'>
            <h1 className={'h1 site-title'}>
              <span className="font-extrabold">IronHacks 2020: </span><br/>
              <span className="font-light">A Series of Global COVID-19 Data Science Challenges</span>
            </h1>

            <h2 className="mb-3 mt-1">
              Hack for innovation to solve global challenges.
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
              What are the COVID-19 Data Science Challenges?
            </h2>

            <p>
              COVID-19 is upending our health, our social communities, and our economy. The Research Center for Open Digital Innovation (RCODI) has set forth to launch an IronHacks series to facilitate governments and citizens in making the right decisions as we are moving through this pandemic. Leaders in our country who are responsible for protecting their citizens' welfare and quality of life face difficult questions, such as: When and where do citizens expose themselves and others the most to COVID-19 risk? Which regions and industries are predicted to suffer the most from COVID-19, both economically as well as socially?
            </p>

            <p>
              Today, we have more, increasingly granular, and actual data available to answer those questions: Daily updated mobility and location data collected via our mobile phones, visitor counts at core places, regional spending data, unemployment claims, etc. However, it takes the collective effort of a crowd of IronHackers to turn this data into something useful and develop models that help us predict and explore the social and economic impact of COVID-19 at granular level.
            </p>

            <p>
              In Summer 2020 we held our first COVID-19 Data Science Challenge with exciting results from our participants. You can check out their results here on our website and see how they created useful visualizations to help our partners and citizens understand the impact of COVID-19 at particular brands in the State of Indiana.
            </p>

            <p>
              For Fall 2020, we are launching our second hack and invite aspiring data scientists to join the IronHacks crowd in a COVID-19 Data Science Challenge to predict COVID-19 impacts and <a href="http://www.protect.purdue.edu">Protect Purdue!</a> This hack will directly inform the leadership team of the important Protect Purdue initiative to understand the impacts of the virus on our local campus and surrounding community.
            </p>

            <p>
              To learn more about the process, you can watch our recent <a href="https://www.youtube.com/watch?v=ta5i7_I5VT8&feature=youtu.be">Info Sessions</a> or sign-up for upcoming events as we announce them to learn more about the COVID-19 Data Science Challenges.
            </p>
          </Col>
        </Row>
      </Section>

      <Section sectionClass="videos_section">
        <VideoSection/>
      </Section>

      <Section>
        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              What will participants create during this IronHacks?
            </h2>

            <p>
              The Fall 2020: COVID-19 Data Science Challenge to Protect Purdue will focus on prediction tasks and real-time data visualizations. We will provide our IronHacks participants with access to a selection of large and granular datasets related to COVID-19 incidents as well as social and economic effects. Equipped with this data, participants will work in the IronHacks workspace with JupyterLab and access to BigQuery to create novel and useful statistical models and visualizations using Python and R. Participants will submit Jupyter notebooks and their outputs (html and markdown files).
            </p>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              How will participants be evaluated?
            </h2>

            <p>
              Each participant's notebook will be evaluated in several dimensions. Examples are:
            </p>

            <List
              items={[
                'The accuracy of your model\'sprediction (e.g. mean squared error)',
                'Your effort to explore a variety of solutions (data, models, etc.)',
                'Quality and usefulness of the presentation and interpretation of your data/models in a final interactive report (including data visualization)',
                'Quality of the software code',
              ]}
            />

            <p>
              More details on the evaluation criteria will be released at the start of the competition.
            </p>

          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>

            <h2 className="h2 font-bold mb-2">
              What will the IronHacks offer?
            </h2>

            <p>
              IronHacks is a global virtual open data hacking platform that allows users to participate in a high-energy IronHacks competition. The IronHacks platform offers participants a no setup workspace with JupyterLab and BigQuery integration and many powerful features to create novel and useful models and visualizations. It also offers training and tutorials, as well as a personal dashboard to view scores and progress through the competition. After registration, participants can warm-up, practice their skills and query sample datauntil sufficient participants have joined to launch the competition. After the start of the competition, a multiphase process will start. Each challenge moves through these phases after a registration and warm-up phase.
            </p>

            <ul className="list">
              <li>
                <strong>Registration and warm-up phase:</strong> If you have registered for one of the Challenges that are available, you will have the opportunity to warm-up using our tutorials.
              </li>

              <li>
                <strong>Start of Competition followed by multiphase process:</strong> The competition starts based on invitation, followed by 3 interim and one final submission.
              </li>

                <ul className="list">
                  <li>
                    <strong>3 interim submissions:</strong> At three interim submission points, you will receive immediate feedback on your current standing, giving you the opportunity to improve over time.
                  </li>
                  <li>
                    <strong>Final submission:</strong> There will be a final forth submission before we identify the winners.
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

            <h2 className="h2 font-bold mb-2">
              What skills are needed?
            </h2>

            <p>
              This IronHacks calls for the participation of all kinds of data scientists trained in various disciplines. Neither do you have to be a machine learning expert, nor do you have to be trained in epidemiology. We are calling on all of those people who are interested in using data to support information policy making - and helping governments and leaders like the Protect Purdue team in battling the pandemic. In particular, we encourage those who  have ane interest to learn and  iterate quickly over the multiphase hack. Basic knowledge of statistics as well as programming inPython and R is required. But even if you are a beginner or you feel a little rusty in Python or R, you should not shy away. You can use our tutorials to warm up.
            </p>

          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              What can I gain?
            </h2>

            <p>
              We offer a range of cool prizes and recognition to our IronHackers! Winning hackers will have the opportunity to be eligible for cash prizes. In total, we will award up to <strong>$3000</strong> for the COVID-19 Data Science Challenge to Protect Purdue. From Improvement Spirit, to Best Solution, there is a chance for everyone to gain fame, connect with top-level organizations, and be recognized for their excellent solutions to the COVID-19 Data Science Challenge!
            </p>

            <List
              items={[
                'Certificate: In addition to the awards, every student is granted to a digital certificate for participation with logos of the sponsors.',
                'Showcases: We will publish selected models www.ironhacks.com at the end of the competition. In addition, our partners will also feature the best solutions on their website.',
                'Global recognition: The RCODI team and its partners will promote your work via social media.',
                'Fellowship opportunity: Selected participants will have the opportunity to discuss a fellowship at RCODI.',
              ]}
            />
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              What is the timeline?
            </h2>

            <p>
              Each hack runs for about 3 to 4 weeks!
            </p>

            <List
              items={[
                <p><strong>COVID-19 Data Science Challenge Summer 2020:</strong> This challenge is complete. Check out the results here!.</p>,
                <p><strong>COVID-19 Data Science Challenge Fall 2020:</strong> This challenge will open for registration in mid-November. Sign up here at ironhacks.com to create your user profile and to receive email notifications about when you can register to save your spot in the competition.</p>
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
                Sign up on <a className="link--underline" href="https://ironhacks.com">ironhacks.com</a> to learn more about the upcoming Protect Purdue Challenge and other future challenges and timelines.
              </li>
              <li>
                Reach out to us with any questions at <a href="mailto:ironhacks.team@gmail.com">ironhacks.team@gmail.com</a> or on Twitter <a href="https://twitter.com/Purdue_RCODI">@Purdue_RCODI</a>
              </li>
              <li>
                Watch our recent publicly accessible <a className="link--underline" href="https://youtu.be/vnT587J-wis">Info Sessions.</a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row rowClass="py-2">
          <Col>
            <h2 className="h2 font-bold mb-2">
              Why should organizations partner with us?
            </h2>

            <p>
              By partnering with us for the IronHacks COVID-19 Data Science Challenge, organizations have the opportunity to take collective action and help society to cope with the COVID-19 pandemic.
            </p>

            <List
              items={[
                'Leverage our network and reach to promote your organization\'s commitment to social good',
                'Connect with top talent in the areas of data and computational social science',
                'Work with us and define new data science challenges related to topics and data of your interest',
              ]}
            />

            <p>
              Join forces with us for this chance to create impact with data-driven insights that help policymakers create real change for citizens in the face of the pandemic!
            </p>

            <p>
              <strong>Would you like to support us directly?</strong> You can contact us at <strong>ironhacks.team@gmail.com</strong> for monetary or in-kind donations to the Research Center for Open Digital Innovation at Purdue University.
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
};

export default UpcomingHackPage;
