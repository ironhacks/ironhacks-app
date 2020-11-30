import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Component error', error, errorInfo)
    this.setState({ error: error })
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>x</h1>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

export { ErrorBoundary }
