import { Row, Col } from '../../components/layout'
import { Img } from '../../components/img'

const FeatureCard = ({ image, title, description }) => {
  return (
    <div className="card bd-0">
      <Img
        responsive={false}
        baseUrl={
          'https://firebasestorage.googleapis.com/v0/b/the-ironhacks-platform-dev.appspot.com/o'
        }
        filePath={'media%2Fimg%2Foptim%2F'}
        fileName={image}
        alt={title}
        imgClass="card__image bd-0 mb-0 depth-2"
      />
      <div className="card__content bg-inherit">
        <h3 className="title example_card__title font-bold my-3">{title}</h3>
        <p className="description example_card__description">{description}</p>
      </div>
    </div>
  )
}

FeatureCard.defaultProps = {
  image: '',
  title: 'Project Title',
  description: 'Project Description',
}

const FeaturesSection = () => {
  let featureList = [
    {
      title: ' CHALLENGES',
      description: ' Easy access to past, current, and future challenges',
      image: 'feature-challenges_360x200.jpg?alt=media&token=0b790c23-cd16-4de1-8596-a0ff7e401a43',
    },
    {
      title: 'WORKSPACE',
      description:
        'A workspace that integrates to Jupyter Lab and Big Query that allows you to hack in the cloud with no set-up time and costs',
      image: 'feature-workspace_360x200.jpg?alt=media&token=24ecc8da-d207-4f87-ab7f-45b0d62861bf',
    },
    {
      title: 'FEEDBACK',
      description:
        "A dashboard with real-time ratings about your submissions as well as access to your peer's solutions.",
      image: 'feature-feedback_360x200.jpg?alt=media&token=4c9f8c18-4c62-4948-ae0d-186220542121',
    },
  ]

  return (
    <>
      <Row>
        <h2 className="title section__title h2 text-center mb-5 font-bold">
          KEY <span className="font-extrabold">FEATURES</span>
        </h2>
      </Row>

      <Row rowClass="card_row" flex={true}>
        {featureList.map((item, index) => (
          <Col key={index} colClass="card_col">
            <FeatureCard title={item.title} description={item.description} image={item.image} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export { FeaturesSection }
