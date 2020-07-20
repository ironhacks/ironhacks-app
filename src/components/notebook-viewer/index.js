import React from 'react';
import {
  Card,
  Spin,
  Col,
  Row,
  Typography,
} from 'antd';
import ReactMarkdown from 'react-markdown';
import { NotebookCodeCell } from './lib/notebook-cell-code';
import { NotebookErrorCell } from './lib/notebook-error';
import { NotebookImg } from './lib/notebook-img';
import { NotebookImgCell } from './lib/notebook-cell-img';
import { NotebookMdCell } from './lib/notebook-cell-md';
import { NotebookStdOut } from './lib/notebook-cell-stdout';
import { NotebookText } from './lib/notebook-text';
import { NotebookTitle } from './lib/notebook-title';
import editorOptions from './notebook-config';


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

            console.log(this.state.notebook_json)

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
        var rgx2 = new RegExp(/\!\[(.*?)\]\((.*?)[\s|\)]/);
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
        if ('text/plain' in output.data) {
          for (let text of output.data['text/plain']) {
            output_txt.push(text)
          }
        }

        if ('image/png' in output.data) {
          output_img.push('data:image/png;base64,')
          output_img.push(output.data['image/png'])
        }
      }

      if ('name' in output) {
        for (var text in output.text) {
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
            ...editorOptions,
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
            ...editorOptions,
            showLineNumbers: false,
          }}
        />

        {/* NOTEBOOK CELL IMG */}
        <NotebookImgCell
          display={output_img.length > 0 ? '' : 'none'}
          imgSrc={output_img.join('')}
        />

        {/* NOTEBOOK CELL ERRORS */}
        <NotebookErrorCell
          display={output_err.length > 0 ? '' : 'none'}
          cellContent={output_err.join('')}
          maxLength={output_err.length}
          codeTheme={this.state.text_ed_theme}
          displayOption={{
            ...editorOptions,
            showLineNumbers: false,
          }}
        />
      </div>
    )

    return return_template
  }


  render() {
    return (
      <div style={{margin:'1em 0 0 0'}}>
      <Spin spinning={this.state.loading} >

      <center>
        <div>
          <Card
            bodyStyle={{
              padding: '30px 10px',
              backgroundColor: this.state.background_output_theme,
            }}
            style={{
              width: '100%',
              maxWidth: '800px',
              border: 'none'
            }}
          >
            <NotebookTitle
              titleColor={this.state.background_text_theme}
              title={this.props.title}
              subtitle={this.props.subtitle}
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
        this.state.notebook_json.cells.map((item, index) => (
          <Card
            key={index}
            bodyStyle={{
              padding: '0px 10px',
              backgroundColor: this.state.background_output_theme
            }}
            style={{
              width: '100%',
              maxWidth: '800px',
              border: 'none'
            }}
          >
            <Row style={{backgroundColor: this.state.background_output_theme}}>
              <Col span={this.state.gutterVisible ? 3 : 1}>
                <div style={{display: this.state.gutterVisible ? '' : 'none'}}>
                  <Typography.Text
                    style={{
                      color: this.state.background_text_theme || '#56ACBC',
                      float: 'left',
                      padding: '5px',
                      display: item.cell_type === 'code' ? '' : 'none',
                    }}>
                    I [{item.execution_count}]:
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
            <NotebookMdCell
              display={item.outputs.length === 0 ? 'none' : 'visible'}
              bgColor={this.state.background_output_theme}
              gutterVisible={this.state.gutterVisible ? 3 : 1}
              executionCount={item.execution_count}
              cellContent={this.parseOutputs(item.outputs)}
            />
          )}
          </Card>
        )
      ))
      }
      </center>
      </Spin>
      </div>
    )
  }
}


export { NotebookViewer }
