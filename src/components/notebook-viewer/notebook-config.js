import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/seti.css'
import 'codemirror/mode/python/python'
// import 'codemirror/mode/r/r';
// import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/css/css';
// import 'codemirror/addon/lint/lint';
// import 'codemirror/addon/lint/json-lint';
// import 'codemirror/addon/lint/javascript-lint';
// import 'codemirror/addon/lint/lint.css';
// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/hint/javascript-hint';
// import 'codemirror/addon/hint/css-hint';
// import 'codemirror/addon/hint/xml-hint';
// import 'codemirror/addon/edit/matchbrackets';
// import 'codemirror/addon/edit/matchtags';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/closetag';

const editorOptions = {
  highlightSelectedWord: false,
  highlightActiveLine: false,
  tabSize: 2,
  showPrintMargin: false,
  readOnly: true,
  highlightGutterLine: false,
  useWorker: false,
  wrapBehavioursEnabled: true,
  wrap: true,
}

export default editorOptions
