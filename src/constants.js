//CSS color constants
export const mainBgColor = '#FFCE35';
export const buttonHighlightedBgColor = '#E6B92F'
export const mainTextColor = 'black';
export const invertedTextColor = 'white';
export const highlightedTextColor = 'white';
export const invertedHighlightedTextColor = 'black';

export const universalBorderRadius = "4px";

export const LoaderTheme = {
  loaderFrontColor: mainBgColor,
  loaderFrontColorDark: '#212529',
  loaderBackgroundColor: '#C7C3B7',
  sectionBackgroundColor: '#EEEDE9',
}
//LANDING
export const LandingTheme = {
  containerHeight: "100vh",
  backgroundColor: mainBgColor,
  textColor: "black",
};
//HEADER
export const HeaderTheme = {
  // Header Container:
  containerHeight: '50px',
  backgroundColor: mainBgColor,
  textColor: mainTextColor,
  hoverTextColor: highlightedTextColor
}
//FOOTER
export const FooterTheme = {
  // Header Container:
  containerHeight: '50px',
  backgroundColor: mainBgColor,
  textColor: mainTextColor,
  hoverTextColor: highlightedTextColor
}
//MAIN SECTION THEME
export const AppSectionTheme = {
  containerHeight: "calc(100vh - " + HeaderTheme.containerHeight + " - " + FooterTheme.containerHeight + ")",
  backgroundColor: "white",
  textColor: "black",
  hoverTextColor: highlightedTextColor
};
//LOGIN
export const LoginTheme = {
  containerHeight:'100vh;',
  backgroundColor: "white",
  textColor: "black"
};
//ADMIN
export const adminInnerSectionsTheme = {
  containerHeight: "100%",
  backgroundColor: "white",
  textColor: "black",
  hoverTextColor: highlightedTextColor
}
//FORUM
export const forumHeaderColor = '#D2DDC9';
export const threadPreviewBgColor = '#FEF8ED';
export const threadPreviewHighlightedBgColor = '#fff1c7';
export const threadPreviewBottomMargin = '5px';
export const commentViewBottomMargin = '5px';

export const ThreadPreviewTheme = {
  backgroundColor: threadPreviewBgColor,
  highlightedTextBgColor: threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: "110px",
}

export const CommentViewTheme = {
  backgroundColor: threadPreviewBgColor,
  highlightedTextBgColor: threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: 'auto',
}

export const ReactionsViewTheme = {
  backgroundColor: '#E6E6E6',
}

//Sponsor banner
export const SponsorBannerTheme = {
  backgroundColor: 'white',
  containerHeight: "125px",
}

//QUIZZES
export const QuizzesTheme = {
  backgroundColor: 'white',
  containerHeight: "125px",
}
// Error 404
export const Error404Theme = {
  containerHeight:'100vh;',
  backgroundColor: "white",
  textColor: "black"
}
//Proyect Editor
export const cloudFunctionsDevEndPoint = 'localhost:5000';
export const cloudFunctionsProdEndPoint = 'https://us-central1-ironhacks-platform-dev.cloudfunctions.net';

export const projectEditorBgColor = '#24282A';

//-- Alerts constructors: --
export const createNewFileFlowAlertContent = (validator) => {
  return {
    title: "Create new file",
    html: `Please insert the full path of the new file. Folder are created automatically as needed, so you only have to write the relative path, for example:<br/><br/>
    <strong>js/example.js</strong><br/><br/>
    This will create a folder called 'js', and a file called 'example.js' with in it.
    Remember to write the file extention as well. <strong>'folder' and 'file'</strong> are not valid names.`,
    input: 'text',
    inputValue: 'File path',
    inputValidator: validator,
    confirmButtonText: 'Create file',
    confirmButtonColor: mainBgColor,
    showCancelButton: true,
    cancelButtonColor: '#70867b',
    cancelButtonText: 'Cancel',
    showCloseButton: true,
    allowOutsideClick: false
  }
}

export const surveyRedirecAlertContent = {
  title: "Push to evaluation",
  text: "Before push your final commit for this phase, you must fill the phase survey.",
  confirmButtonText: 'Go to survey',
  confirmButtonColor: mainBgColor,
  showCancelButton: true,
  cancelButtonColor: '#70867b',
  cancelButtonText: 'Cancel',
  showCloseButton: true,
  allowOutsideClick: false
}

export const pushSurveyAlertContent = (url) => {
  return {
    title: 'Evaluation push survey',
    html: `<iframe src='${url}' title='Qualtrics survey'/>`,
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: 'surveyAlert',
  }
}

export const preSurveyAlertContent = (url) => {
  return {
    title: 'Pre survey UNAL',
    html: `<iframe src='${url}' title='Qualtrics survey'/>`,
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: 'surveyAlert',
  }
}

export const commitContentAlertContent = {
  title: "Push to evaluation",
  text: "Please enter bellow a short message describing mayor changes since your last phase or just describing what you add to the project.",
  confirmButtonText: 'Send',
  confirmButtonColor: mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
  input: 'text',
  inputPlaceholder: 'Commit message',
  inputValidator: (value) => {
    return !value && 'You need to write a commit message!'
  }
};

export const successFinalCommitAlert = (phase) => {
  return {
    title: "Success",
    type: "success",
    text: 'Thanks for making your final commit for phase ' + phase + '! Your app will be considered for evaluation! Stay tuned and wait for feedback in your dashboard!' ,
    confirmButtonText: 'Ok',
    confirmButtonColor: mainBgColor,
    showCloseButton: true,
    allowOutsideClick: false,
  }
};

export const successNoFinalCommitAlertContent = {
  title: "Success",
  type: "success",
  text: 'You have just commited your code to github! Congratulations!\nRemember: To submit your app for grading you have to make a final commit (select yes)',
  confirmButtonText: 'OK',
  confirmButtonColor: mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
};

export const commitCanceledAlertContent = {
  title: "Error",
  type: "error",
  text: "Your commit was canceled.",
  confirmButtonText: 'Ok',
  confirmButtonColor: mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
};

export const loadingAlertContent = {
  title: "Sending...",
  text: "This can take up to 10 senconds, don't close this tab.",
  showCloseButton: false,
  showConfirmButton: false,
  allowOutsideClick: false,
};

export const personalFeddbackTheme = {
  technology: {
    backgroundColor: '#9AC247',
    lightBackgroundColor: '#d3e4af',
  },
  analytics: {
    backgroundColor: '#40AA69',
    lightBackgroundColor: '#9acf93'
  },
  visualization: {
    backgroundColor: '#018B7D',
    lightBackgroundColor: '#7ac2ba',
  },
}