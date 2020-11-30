import { Component } from 'react'
import { Row, Col } from '../../components/layout'
import { Link } from 'react-router-dom'
import { MaterialDesignIcon } from '../../components/icons'

class TutorialListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutorials: [],
    }
  }

  componentDidMount() {
    this.getTutorials()
  }

  getTutorials = async () => {
    let result = []
    let snap = await window.firebase
      .firestore()
      .collection('hacks')
      .doc(this.props.hackId)
      .collection('tutorials')
      .get()

    snap.docs.forEach((item, i) => {
      result.push({
        tutorialId: item.id,
        ...item.data(),
      })
    })

    // title
    // created
    // updated
    // result.sort((a,b)=>{ return a.created.localeCompare(b.created) })
    result.sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    // result.sort((a,b)=>{ return b.created.localeCompare(a.created) })

    this.setState({ tutorials: result })
  }

  render() {
    return (
      <Row>
        <Col>
          <h3 className="h3 font-bold">Tutorials</h3>

          {this.state.tutorials.length > 0 ? (
            this.state.tutorials.map((item, index) => (
              <div key={index}>
                <Link to={`/hacks/${this.props.hackSlug}/tutorials/${item.tutorialId}`}>
                  <div className="flex flex-align-center ml-1 my-2">
                    <MaterialDesignIcon name="assignment" />
                    <div className="pl-1">{item.title}</div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No tutorials availble</p>
          )}
        </Col>
      </Row>
    )
  }
}

export default TutorialListView
