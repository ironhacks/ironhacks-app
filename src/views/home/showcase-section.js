import React from 'react';
import { Row, Col } from '../../components/layout'
import { ShowcaseCard } from '../../components/showcase';
import './assets/css/showcase-section.css';

// https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o/media%2Fimg%02F

const app1 = 'showcase-2018-spring-ialemusm.jpg?alt=media&token=565a83f1-4856-45cc-a7df-75e2aa309019';
const app2 = 'showcase-2018-spring-juaccardenasgom.jpg?alt=media&token=c9629701-90fd-4e19-860d-768203a8520b';
const app3 = 'showcase-2018-spring-nmcasasr.jpg?alt=media&token=93408b28-fbdd-4442-8005-e1e10e604cb4';
const app4 = 'showcase-2019-spring-crabaqueropi.jpg?alt=media&token=44abab77-4cd3-44f4-802c-512ca59a976c';
const app5 = 'showcase-2019-spring-difcortesgu.jpg?alt=media&token=9db74619-c923-42cc-8d46-57342b6e1f66';
const app6 = 'showcase-2019-spring-jdrodriguezrui.jpg?alt=media&token=4dee8dc2-f34f-4db2-a0b1-f0de520deafa';


class ShowcaseSection extends React.Component {
  render() {
    return (
      <>
      <Row>
        <Col>
        <h2 className="title section__title h2 text-center mb-4">
          <span className="font-extrabold">SHOWCASES</span>
        </h2>
        <p>
          In prior years, IronHackers with no coding experience produced
          interactive visualizations within 10 to 21 days! Explore some of
          the showcases of students who participated in an affordable housing challenge.
        </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>
            <strong>Civic Challenge: </strong>
            Find me a safe and affordable district to live in near the NYU Stern School of
            Business, New York.
          </p>

          <p>
            <strong>Description: </strong>
            In this IronHacks Challenge, students developed a mashup that integrated,
            analyzed and interactively displayed open data to support hypothetical new
            students by evaluating and ranking the 59 habitable districts in New York City.
            Mashups used a diverse set of decision parameters (metrics) to find the Top 10
            districts based on single parameters and the Top 3 districts based on the average
            of three key parameters of safety, affordability and distance to NYU Stern.
          </p>

        </Col>
      </Row>
      <Row>
        <div className="cards max-w-900 m-auto">
          <ShowcaseCard
            image={app6}
            title={'Comparing made easy'}
            description={'A full page web design to enhance user experience and interactivity with extra points of interest around NYU'}
            url={'https://ironhacks.github.io/showcase-2019-spring-jdrodriguezrui'}
            likes={'2,115'}
          />
          <ShowcaseCard
            image={app1}
            date={'Spring-2018'}
            tags={''}
            video={'https://www.youtube.com/watch?v=Syf6vlotgEQ'}
            author={'Ivan Lemus'}
            title={'Ivan NYU Stern'}
            description={'This app utilizes a simple design to highlight the most safe and affordable housing near NYU Stern'}
            url={'https://ironhacks.github.io/showcase-2018-spring-ialemusm'}
            likes={'1,993'}
          />

          <ShowcaseCard
            image={app2}
            title={'Projectsito'}
            description={'This winning app utilizes clean, modern design and visualizations to hightlight safe and affordable housing'}
            url={'https://ironhacks.github.io/showcase-2018-spring-juaccardenasgom/'}
            likes={'1,775'}
          />

          <ShowcaseCard
            image={app3}
            title={'Nomadic'}
            description={'This app utilizes simple design and functionality to achieve the core goals of the hack with an interactive dashboard'}
            url={'https://ironhacks.github.io/showcase-2018-spring-nmcasasr'}
            likes={'1,880'}
          />

          <ShowcaseCard
            image={app4}
            title={'NYU-HOME'}
            description={'This app highlights a large interactive map with sleek styling to showcase safe and affordable housing near NYU'}
            url={'https://ironhacks.github.io/showcase-2019-spring-crabaqueropi'}
            likes={'2,002'}
          />

          <ShowcaseCard
            image={app5}
            title={'NYU Simplicity'}
            description={'This app features a full screen map with simple overlay design elements to highlight affordable housing'}
            url={'https://ironhacks.github.io/showcase-2019-spring-difcortesgu'}
            likes={'2,002'}
          />

        </div>
       </Row>
      </>
    );
  }
}

export { ShowcaseSection }
