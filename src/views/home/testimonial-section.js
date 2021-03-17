import { Row, Col } from '../../components/layout'

const testimonialData = [
  {
    name: 'Dhruvi Shah',
    association: 'India',
    bio: 'Protect Purdue Challenge Participant',
    quote:
      'The takeaway from the hackathon was that I could interact with everyone, but the energy was so healthy and holistic in the way things progressed. We wanted to create a societal impact and not just get to the top. You can literally get inspired by other solutions and then try to implement in your own model. This is a better way to go about it.',
    image: '/assets/img/dhruvi-shah.jpg',
  },
  {
    name: 'Senthamizhan V',
    association: 'IIT Madras',
    bio: '1st Place Protect Purdue Challenge',
    quote:
      "The very important [takeaway] is that we don't have to slap another network on every problem we come across... we in data science should focus more on explainability of machine learning models than going for better and better accuracy... public health officials won't ask us for 90% accuracy, but they will ask how this works... so we should be able to explain to them.",
    image: '/assets/img/senthamizhan-v.jpg',
  },
  {
    name: 'Feny Patel',
    association: 'Purdue University',
    bio: '1st Place August 2020 Challenge',
    image: '/assets/img/feny-patel.jpg',
    quote:
      'The excitement to know how my model would perform after every round kept me enthused till the end! These predictions can give insights into social distancing norms and implement necessary precautions.',
  },
  {
    image: '/assets/img/harsha-pavuluri.jpg',
    name: 'Harsha Pavuluri',
    association: 'Purdue University',
    quote:
      'My greatest experience was being able to try on algorithms I never use. I also had the freedom to experiment, instead of defaulting to certain known models due to crunching code within 24 hours like typical hackathons.',
    bio: '2nd Place August 2020 Challenge',
  },
]

const Testimonial = ({ name, association, bio, image, quote }) => {
  return (
    <div className="my-5 py-3">
      <div className="flex">
        <img
          src={image}
          style={{ width: 80, height: 80, borderRadius: '50%', marginRight: '1em' }}
          alt={name}
        />

        <div className="font-italic">"{quote}"</div>
      </div>

      <div className="my-4 fs-m1 text-right">
        - {name} ({association}), {bio}
      </div>
    </div>
  )
}

const TestimonialSection = () => {
  return (
    <Row rowClass={'py-6 w-70p mx-auto'}>
      <Col>
        <h2 className="title section__title h2 text-center mb-4">
          <span className="font-extrabold">TESTIMONIALS</span>
        </h2>

        <h3 className="h3 font-bold mb-2">What do prior participants say?</h3>

        {testimonialData.map((item, index) => (
          <Testimonial
            key={index}
            name={item.name}
            image={item.image}
            association={item.association}
            quote={item.quote}
            bio={item.bio}
          />
        ))}
      </Col>
    </Row>
  )
}

export { TestimonialSection }
