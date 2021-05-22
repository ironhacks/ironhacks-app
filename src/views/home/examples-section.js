import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

const ExampleCard = ({ image, title, description }) => {
  return (
    <div className="card example_card">
      <Img
        responsive={true}
        baseUrl={'https://firebasestorage.googleapis.com/v0/b/ironhacks-c406a.appspot.com/o'}
        filePath={'media%2Fimg%2F'}
        fileName={image}
        alt={title}
        imgClass="card__image bd-0 mb-0 depth-2"
      />
      <div className="card__content bd-0 bg-inherit">
        <h3 className="title example_card__title font-bold my-3">{title}</h3>
        <p className="description example_card__description">{description}</p>
      </div>
    </div>
  )
}

ExampleCard.defaultProps = {
  image: '',
  title: 'Project Title',
  description: 'Project Description',
}

const ExamplesSection = () => {
  return (
    <>
      <Row>
        <h2 className="title section__title h2 text-center mb-4 font-bold">
          PAST <span className="font-extrabold">IRONHACKS</span>
        </h2>
      </Row>

      <Row rowClass="card_row" flex={true}>
        <Col colClass="card_col">
          <ExampleCard
            title="HEALTHY LIVING"
            description="Use open data to develop an app that helps citizens find  cheap and seasonally fresh vegetables from local markets."
            image={'topics-food.jpg?alt=media&token=ca701f32-1fdf-4072-9687-308522c2a24e'}
          />
        </Col>

        <Col>
          <ExampleCard
            title="AFFORDABLE HOUSING"
            description="Build a website with interactive visualizations that helps new students to find safe and affordable housing near their university."
            image={'topics-workforce.jpg?alt=media&token=e91e8ebe-c247-4259-9c1a-2c8ffe843ad8'}
          />
        </Col>

        <Col>
          <ExampleCard
            title="COVID-19 DATA SCIENCE CHALLENGE"
            description="Predict COVID-19 rates in places of interest in real-time."
            image={'topics-covid.jpg?alt=media&token=000aea48-7aa3-43c5-86ae-f7740756c6a4'}
          />
        </Col>
      </Row>
    </>
  )
}

export { ExamplesSection }
