// IronHacks Platform
// task.js - Task editor and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { withCookies } from 'react-cookie';
import Showdown from 'showdown';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
//import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
  width: 100%;
  height: ${props => props.theme.containerHeight};
  background-color: ${props => props.theme.backgroundColor};

  .task-div {
    margin-top: 30px;

    h1, h2, h3, h4, h5 {
      color: ${Constants.mainBgColor};
    }

    a {
      font-size: 13px;
    }
  }
`;

const ConverterConfig = {
  tables: true,
  simplifiedAutoLink: true,
  prefixHeaderId: true, //Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section' prefix.
  strikethrough: true, //Enable support for strikethrough syntax. ~~strikethrough~~ as <del>strikethrough</del>
  headerLevelStart: 3, // #foo parse to <h3>foo</h3>
  tasklists: true,
};

class Task extends React.Component {
  constructor(props){
    super(props)

    const { cookies } = props;
    this.state =  {
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
    }
  }

  componentDidMount() {
    this.getTaskDocument();
  }

  getTaskDocument = () => {
    const _this = this;
    const getTask = window.firebase.functions().httpsCallable('getTaskDoc');
    getTask({hackId: this.state.currentHack}).then((result) => {
      if(result.data.task){
        _this.setState({task: result.data.task});
      }else{
        //no task on the response, task not available yet.
        _this.setState({noTask: true});
      }
    });
  }


  decodeBody = (markdown) => {
    const converter = new Showdown.Converter(ConverterConfig);
    return converter.makeHtml(markdown)
  };

  handleClick = () => {
    console.log('Button is cliked!');
  };
  // base64 encoded ascii to ucs-2 string
  atou = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
  };
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <SectionContainer className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 offset-md-2 task-div'>
              {this.state.task && <div dangerouslySetInnerHTML={{__html:this.decodeBody(this.atou(this.state.task))}}/>}
              {this.state.noTask && <h1>Task is not available yet!</h1>}
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(Task);