// IronHacks Platform
// tutorial.js - Tutorial editor and visualizer
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import { withCookies } from 'react-cookie';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Showdown (markdown converter)
import Showdown from 'showdown';
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
  overflow: auto;

  .tutorial-div {
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

class Tutorial extends React.Component {
  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      hackName: '',
      currentHack: cookies.get('currentHack') || null,
      forum: cookies.get('currentForum') || null,
    }
  }

  componentDidMount() {
    this.getTutorialDocument();
  }

  getTutorialDocument = () => {
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    firestore.collection("hacks")
    .doc(this.state.currentHack)
    .get()
    .then((doc) => {
      if(doc.data().tutorial){
        _this.setState({tutorial: doc.data().tutorial, hackName: doc.data().name});
      }else{
        //no task on the response, task not available yet.
        _this.setState({noTutorial: true});
      }
    })
    .catch(function(error) {
      console.error("Error getting documents: ", error);
    });
  };

  decodeBody = (markdown) => {
    const converter = new Showdown.Converter(ConverterConfig);
    return converter.makeHtml(markdown)
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
            <div className='col-md-8 offset-md-2 tutorial-div'>
              {this.state.tutorial && <div dangerouslySetInnerHTML={{__html:this.decodeBody(this.atou(this.state.tutorial.doc))}}/>}
              {this.state.noTutorial && <h1>Task is not available yet!</h1>}
            </div>
          </div>
        </SectionContainer>
      </ThemeProvider>
    );
  }
}

export default withCookies(Tutorial);