// IronHacks Platform
// createThread.js - Editor to create a new Thread 
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
//Styled components
import styled, {ThemeProvider} from 'styled-components';
//Custom Constants
import * as Constants from '../../../constants.js';
//Custom components
import MarkdownEditor from '../markdownEditor/markdownEditor.js';

const theme = Constants.AppSectionTheme;

//Section container
const SectionContainer = styled('div')`
	width: 100%;
	height: ${props => props.theme.containerHeight};
	background-color: ${props => props.theme.backgroundColor};
`;
//Title controls
const TitleRow = styled('div')`
	width: 100%;
	margin-top: 10px;
`;
//Publish controls row
const PublishControlsRow = styled('div')`
	width 100%;
	height: 70px;
	padding: 15px 0 15px 0;
	display: flex;
	flex-direction: row-reverse;

	button {
		height: 100%;
	}
`;
//Title intpu
const TitleInput = styled('input')`
  width: 50%;
  height: 30px;
  background-color: #F2F2F2;
  border: 1px solid #999999;
  border-radius: ${Constants.universalBorderRadius};
  padding-left: 10px;
  margin-bottom: 10px;

`;


class NewThread extends React.Component {
	
	render() {
		return (
			<ThemeProvider theme={theme}>
				<form>
					<SectionContainer className='container-fluid d-flex flex-column'>
						<div className='row'>
							<TitleRow className='col-md-10 offset-md-1'>
								<h1>New Thread</h1>
								<p>	Bellow you will find a <strong><i>Markdown Editor</i></strong>, so you can style your Thread using Markdown syntax (If you don't know Markdown, please check <a target="_blank" rel="noopener noreferrer" href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet">this!</a>). Write on the left, you will see the preview on the right.</p>
								<TitleInput type='text' placeholder='Thread Title..'/>
							</TitleRow>
						</div>
						<div className='row flex-grow-1'>
							<div className='col-md-10 offset-md-1'>
								<MarkdownEditor editorLayout='horizontal'/>
							</div>
						</div>
						<div className='row'>
							<PublishControlsRow className='col-md-10 offset-md-1'>
								<button>Submit</button>
							</PublishControlsRow>
						</div>
					</SectionContainer>
				</form>
			</ThemeProvider>
		);
	}
}

export default NewThread;