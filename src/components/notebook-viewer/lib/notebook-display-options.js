import React from 'react';
import {
  Col,
  Row,
  Switch,
} from 'antd';



class NotebookDisplayOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      nbtype: 'python',
    }
  }

  themeChanger(ev) {
    const darkTheme = {
      ed_theme: 'darkTheme',
      text_ed_theme: 'monokai',
      background_theme: 'black',
      background_text_theme: 'white',
      background_input_theme: '#272822',
      background_output_theme: '#2F3129',
    }

    const lightTheme = {
      ed_theme: 'lightTheme',
      text_ed_theme: 'kuroir',
      background_theme: 'white',
      background_text_theme: 'black',
      background_input_theme: '#E8E9E8',
      background_output_theme: '#F1F1F2',
    }

    if (ev) {
      this.setState(darkTheme);
    } else {
      this.setState(lightTheme)
    }
  }

  gutterChanger(ev) {
    if (ev) {
      this.setState({gutterVisible: true})
    }
    else {
      this.setState({gutterVisible: false})
    }
  }

  render(){
    return (
      <Row>
        <Col span={1}/>
        <Col span={20}>
          <Tag
            color='blue'
            style={{ float: 'left' }}
          >
            {this.props.loading ? 'Unknown' : this.props.nbtype}
          </Tag>

          <Switch
            style={{margin: '0px 5px'}}
            defaultChecked
            checkedChildren='dark theme'
            unCheckedChildren='light theme'
            onChange={this.themeChanger.bind(this)}
          />

          <Switch
            style={{ margin: '0px 5px' }}
            checkedChildren='gutter visilbe'
            unCheckedChildren='gutter hidden'
            onChange={this.gutterChanger.bind(this)}
          />
        </Col>
        <Col span={1}/>
      </Row>
    )
  }
}

export { NotebookDisplayOptions }
