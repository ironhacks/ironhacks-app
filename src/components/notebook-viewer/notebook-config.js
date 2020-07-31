import './style.css';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-chaos';

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

export default editorOptions;
