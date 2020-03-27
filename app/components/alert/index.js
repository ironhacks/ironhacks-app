import Colors from '../Theme/Colors';


export const createNewFileFlowAlertContent = (validator) => {
  return {
    title: 'Create new file',
    html: `Please insert the full path of the new file. Folder are created automatically as needed,
        so you only have to write the relative path, for example:<br/><br/>
        <strong>js/example.js</strong><br/><br/>
        This will create a folder called 'js', and a file called 'example.js' with in it.
        Remember to write the file extention as well. <strong>'folder' and 'file'</strong> are
        not valid names.`,
    input: 'text',
    inputValue: 'File path',
    inputValidator: validator,
    confirmButtonText: 'Create file',
    confirmButtonColor: Colors.mainBgColor,
    showCancelButton: true,
    cancelButtonColor: '#70867b',
    cancelButtonText: 'Cancel',
    showCloseButton: true,
    allowOutsideClick: false,
  };
};

export const surveyRedirecAlertContent = {
  title: 'Push to evaluation',
  text: 'Before push your final commit for this phase, you must fill the phase survey.',
  confirmButtonText: 'Go to survey',
  confirmButtonColor: Colors.mainBgColor,
  showCancelButton: true,
  cancelButtonColor: '#70867b',
  cancelButtonText: 'Cancel',
  showCloseButton: true,
  allowOutsideClick: false,
};

export const pushSurveyAlertContent = (url) => {
  return {
    title: 'Evaluation push survey',
    html: `<iframe src='${url}' title='Qualtrics survey'/>`,
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: 'surveyAlert',
  };
};

export const preSurveyAlertContent = (url) => {
  return {
    title: 'Resgistration survey',
    html: `<iframe src='${url}' title='Qualtrics survey'/>`,
    showCloseButton: true,
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: 'surveyAlert',
  };
};

export const commitContentAlertContent = {
  title: 'Push to evaluation',
  text: 'Please enter bellow a short message describing mayor changes since your last phase or just describing what you add to the project.',
  confirmButtonText: 'Send',
  confirmButtonColor: Colors.mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
  input: 'text',
  inputPlaceholder: 'Commit message',
  inputValidator: (value) => {
    return !value && 'You need to write a commit message!';
  },
};

export const successFinalCommitAlert = (phase) => {
  return {
    title: 'Success',
    type: 'success',
    text: 'Thanks for making your final commit for phase ' + phase +
        '! Your app will be considered for evaluation! Stay tuned and wait for feedback in your dashboard!',
    confirmButtonText: 'Ok',
    confirmButtonColor: Colors.mainBgColor,
    showCloseButton: true,
    allowOutsideClick: false,
  };
};

export const successNoFinalCommitAlertContent = {
  title: 'Success',
  type: 'success',
  text: 'You have just commited your code to github! Congratulations!\nRemember: To submit your app for grading you have to make a final commit (select yes)',
  confirmButtonText: 'OK',
  confirmButtonColor: Colors.mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
};

export const commitCanceledAlertContent = {
  title: 'Error',
  type: 'error',
  text: 'Your commit was canceled.',
  confirmButtonText: 'OK',
  confirmButtonColor: Colors.mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
};


export const onSuccessAlertContent = {
  title: 'Success',
  type: 'success',
  text: 'Your project is ready to be evaluated.',
  confirmButtonText: 'OK',
  confirmButtonColor: Colors.mainBgColor,
  showCloseButton: true,
  allowOutsideClick: false,
};


export const loadingAlertContent = {
  title: 'Sending...',
  text: 'This can take up to 10 senconds, don\'t close this tab.',
  showCloseButton: false,
  showConfirmButton: false,
  allowOutsideClick: false,
};
