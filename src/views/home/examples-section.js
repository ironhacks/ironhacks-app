import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

const ExampleCard = (
  {
    image,
    title,
    description,
  },
) => {
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
  );
};

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
          description="Use open data and develop an app that helps citizens in finding cheap and seasonally fresh vegetables from local markets."
          image={'topics-food.jpg?alt=media&token=ca701f32-1fdf-4072-9687-308522c2a24e'}
        />
      </Col>

      <Col>
        <ExampleCard
          title="AFFORDABLE HOUSING"
          description="Build a website with interactive visualizations that helps new students in finding safe and affordable housing near their university."
          image={'topics-workforce.jpg?alt=media&token=e91e8ebe-c247-4259-9c1a-2c8ffe843ad8'}
        />
      </Col>

      <Col>
        <ExampleCard
          title="WORKFORCE ANALYTICS"
          description="Use workforce data to explore factors that affect successful career paths."
          image={'topics-housing.jpg?alt=media&token=8b0152d8-5fdd-49c9-bb2c-35f94361c8c5'}
        />
      </Col>
    </Row>
    </>
  )
};


export { ExamplesSection }
