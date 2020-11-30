import { Component } from 'react'
import { createPortal } from 'react-dom'

class IFrame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mountNode: null
    }
    this.setContentRef = (contentRef) => {
      this.setState({
        mountNode: contentRef?.contentWindow?.document?.body
      })
    }
  }

  render() {
    const { children, ...props } = this.props
    const { mountNode } = this.state
    return (
      <iframe
        {...props}
        ref={this.setContentRef}
      >
        {mountNode && createPortal(children, mountNode)}
      </iframe>
    )
  }
}

function NotebookCellHtml({
  stdout_found,
  display,
  codeTheme,
  cellContent,
  displayOptions,
}) {
  return (
      <div style={{
        padding: '0 3px .5em 3px',
        width: '100%',
        display: display,
      }}>
      <IFrame>
        <div dangerouslySetInnerHTML={{ __html: cellContent }} />
      </IFrame>
    </div>
  )
}

export { NotebookCellHtml }
