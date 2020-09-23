import React from 'react';
import {
  Card,
  Spin,
  Col,
  Row,
  Typography,
} from 'antd';
import ReactMarkdown from 'react-markdown';
import editorOptions from './notebook-config';
import { NotebookCodeCell } from './lib/notebook-cell-code';
import { NotebookErrorCell } from './lib/notebook-error';
import { NotebookImg } from './lib/notebook-img';
import { NotebookImgCell } from './lib/notebook-cell-img';
import { NotebookMdCell } from './lib/notebook-cell-md';
import { NotebookStdOut } from './lib/notebook-cell-stdout';
import { NotebookText } from './lib/notebook-text';
import { NotebookHeader } from './lib/notebook-header';
import './style.css';


// ---
// <NotebookViewer
//   title='Jupyter as a Blog!'
//   subtitle='I've always wanted to publish my jupyter notebooks as blogs. Finally I can.'
//   coverImg='https://notionpress.com/blog/wp-content/uploads/2018/06/Cover-design.png'
//   //file={ipynb}
//   file='https://raw.githubusercontent.com/jakevdp/PythonDataScienceHandbook/master/notebooks/00.00-Preface.ipynb'
// />
//


class NotebookViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fpath: '',
      fbase_path: '',
      ed_theme: 'lightTheme',
      text_ed_theme: 'chaos',
      background_theme: 'white',
      background_text_theme: 'black',
      background_input_theme: '#E8E9E8',
      background_output_theme: '#F1F1F2',
      loading: true,
      notebook_json: null,
      placeholder_component: 'Loading....',
      gutterVisible: true
    }

    this.notebookWidth = '900px';

    this.getNotebookFile = this.getNotebookFile.bind(this);
  }



  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');
    return !!pattern.test(str);
  }

  async getNotebookFile() {
    if (this.props.file) {
      var fbase = this.props.file.split('/');
      fbase.pop();

      this.setState({
        fpath: this.props.file,
        fbase_path: fbase.join('/') + '/'
      })

      await fetch(this.props.file)
        .then((r) => r.text())
        .then(async (text) => {
          try {
            var notebook_json = JSON.parse(text)
            this.setState({
              notebook_json: notebook_json,
              loading: false,
              placeholder_component: 'Notebook loaded'
            })
          } catch (error) {
            console.log('error', error);

            this.setState({
              notebook_json: {
                'message': 'Unable to parse .ipynb file'
              },
              loading: false,
              placeholder_component: 'Oops! We have problem opening the notebook'
            })
        }
      })
    }
  }

  async componentDidMount() {
    this.getNotebookFile();
  }

  parseSource(source) {
    return source.join('');
  }

  parseMD(source) {
    var cell_content = [];

    for (var code in source) {
      var rgx = new RegExp(/src="(.*?)"/);
      var new_source = source[code];
      var old_source = source[code].match(rgx);

      if (!!old_source && !this.validURL(old_source[1])) {
        new_source = source[code].replace(
          /src="(.*?)"/,
          'src="' + this.state.fbase_path + old_source[1] + '"'
        )
      } else {
        var rgx2 = new RegExp(/!\[(.*?)\]\((.*?)[\s|)]/);
        var s2 = source[code].match(rgx2);

        if (s2 && !this.validURL(s2[2])) {
          new_source = new_source.replace(
            s2[2],
            this.state.fbase_path + s2[2]
          );
        }
      }
      cell_content.push(new_source)
    }

    return cell_content.join('')
  }

  parseOutputs(outputs) {
    if (outputs.length === 0) {
      return '';
    }

    var output_txt = [];
    var output_img = [];
    var output_std = [];
    var output_err = [];

    for (let output of outputs) {
      if ('data' in output) {
        // ('text/html' in output.data)
        // ('text/markdown' in output.data)
        if ('text/plain' in output.data) {
          for (let text of output.data['text/plain']) {
            // STRIP ANSI TERMINAL COLOR CODES FROM OUTPUT
            /*eslint-disable no-control-regex*/
            // str.replace(/[\x00-\x1F\x7F-\x9F]/g, "");
            output_txt.push(text.replace(/\u001b\[[0-9][0-9]?m/g, ''))
          }
        }

        if ('image/png' in output.data) {
          output_img.push([
            'data:image/png;base64,',
            output.data['image/png']
          ].join('')
          )
        }
      }

      if ('name' in output) {
        for (var text of output.text) {
          output_std.push(text)
        }
      }

      if ('ename' in output) {
        output_err.push([output.ename, output.evalue].join('\n'));
        // for (var trace in outputs[outs]['traceback']) {
        //      errors += outputs[outs]['traceback'][trace]
        // }
      }
    }

    var return_template = (
      <div>
        {/* NOTEBOOK CELL OUTPUT */}
        <NotebookStdOut
          maxLength={output_std.length}
          display={output_std.length > 0 ? '' : 'none'}
          cellContent={output_std.join('')}
          displayOptions={{
            highlightSelectedWord: false,
            highlightActiveLine: false,
            tabSize: 2,
            showPrintMargin: false,
            readOnly: true,
            lineWrapping: false,
            highlightGutterLine: false,
            useWorker: false,
            wrapBehavioursEnabled: true,
            wrap: true,
            showLineNumbers: false,
          }}
        />
        {/* NOTEBOOK CELL TXT */}
        <NotebookText
          display={output_txt.length > 0 ? '' : 'none'}
          maxLength={output_txt.length}
          cellContent={output_txt.join('')}
          codeTheme={this.state.text_ed_theme}
          displayOptions={{
            lineNumbers: false,
            lineWrapping: true,
            readOnly: true,
            tabSize: 2,
          }}
        />
        {/* NOTEBOOK CELL IMG */}
        {output_img.map((item, index)=>(
          <NotebookImgCell
            key={index}
            display={item.length > 0 ? '' : 'none'}
            imgSrc={item}
          />
        ))}
        {/* NOTEBOOK CELL ERRORS */}
        <NotebookErrorCell
          display={output_err.length > 0 ? '' : 'none'}
          cellContent={output_err.join('')}
          maxLength={output_err.length}
          codeTheme={this.state.text_ed_theme}
          displayOption={{
            autoCloseBrackets: false,
            autoCloseTags: false,
            lineNumbers: false,
            lineWrapping: true,
            lint: false,
            matchBrackets: false,
            matchTags: false,
            mode: 'python',
            readOnly: true,
            showLineNumbers: false,
            tabSize: 2,
            theme: 'seti',
          }}
        />
      </div>
    )
    return return_template
  }


  render() {
    return (
      <div className="my-4 content_area">
        <Spin spinning={this.state.loading} >
          <center>
            <div>
              <Card
                bodyStyle={{
                  padding: '.6em 10px 1.5em',
                  backgroundColor: this.state.background_output_theme,
                }}
                style={{
                  width: '100%',
                  maxWidth: this.notebookWidth,
                  border: 'none'
                }}
              >
                <NotebookHeader
                  titleColor={this.state.background_text_theme}
                  title={this.props.title}
                  fileName={this.props.subtitle}
                  fileUrl={this.props.file}
                />

                {this.props.coverImg && (
                <NotebookImg
                  imgSrc={this.props.coverImg}
                />
                )}
              </Card>
            </div>

          {this.state.loading ? (
            <div>{'Loading...'}</div>
          ) : (
            <>
            {this.state.notebook_json.cells ? (
              this.state.notebook_json.cells.map((item, index) => (
              <Card
                key={index}
                bodyStyle={{
                  padding: '0px 10px',
                  backgroundColor: this.state.background_output_theme
                }}
                style={{
                  width: '100%',
                  maxWidth: this.notebookWidth,
                  border: 'none'
                }}
              >
                <Row style={{backgroundColor: this.state.background_output_theme}}>
                  <Col span={this.state.gutterVisible ? 3 : 1}>
                    <div style={{display: this.state.gutterVisible ? '' : 'none'}}>
                      <Typography.Text
                        style={{
                          display: item.cell_type === 'code' ? '' : 'none',
                          float: 'left',
                          padding: '5px',
                          fontFamily: 'monospace',
                          fontSize: '0.9em',
                        }}>
                        In  [{item.execution_count || '  '}]:
                      </Typography.Text>
                    </div>
                  </Col>

                  <Col
                    span={this.state.gutterVisible ? 20 : 22}
                    style={{textAlign: 'left'}}
                  >

              {item.cell_type === 'code' ? (
                <NotebookCodeCell
                  bgColor={this.state.background_input_theme}
                  codeTheme={this.state.text_ed_theme}
                  maxLength={item.source.length === 0 ? 1 : item.source.length + 1}
                  onLoad={this.onLoad}
                  onChange={this.onChange}
                  cellContent={this.parseSource(item.source)}
                  displayOptions={editorOptions}
                />
              ) : (
                <div className='MDImg'>
                  <div
                    className={this.state.ed_theme}
                    style={{
                      margin: '0px 0px',
                      padding: '10px',
                    }}
                  >
                    <ReactMarkdown
                      style={{float: 'left'}}
                      source={this.parseMD(item.source)}
                      escapeHtml={false}
                    />
                    </div>
                  </div>
                )}
                </Col>
                <Col span={1}/>
              </Row>

              {item.cell_type === 'markdown' ? (<div/>) : (
                <>
                {item.outputs && (
                <NotebookMdCell
                  bgColor={this.state.background_output_theme}
                  gutterVisible={this.state.gutterVisible ? 3 : 1}
                  executionCount={item.execution_count}
                  cellContent={this.parseOutputs(item.outputs)}
                />
                )}
                </>
              )}
              </Card>
            ))
          ) : (
            <p>Error: Notebook Failed to load</p>
          )
        }
        </>
      )}
          </center>
        </Spin>
      </div>
    )
  }
}


export { NotebookViewer }
