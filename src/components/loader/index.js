import React from 'react';

function Spinner(){
  return (
    <div className="loader_spinner"/>
  )
}

function SpinnerContainer({color, small, children}) {
  const loaderSize = this.props.small ? 'loader_spinner__container-sm' : 'loader_spinner__container';
  return (
    <div class={loaderSize}>
      {children}
    </div>
  )
}

SpinnerContainer.defaultProps = {
  color: null,
  small: false,
}

function LoaderContainer({children}) {
  return (
    <div className="loader_container">
      {children}
    </div>
  )
}

function OverlayLoaderContainer({children}) {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 2,
        background: 'radial-gradient(rgb(0 0 0 / 0%), rgba(0,0,0,.4))',
        width: '100vw',
        height: '100vh',
    }}>
      {children}
    </div>
  )
}


class Loader extends React.Component {
  render() {
    const loaderSize = this.props.small ? 'loader_spinner__container-sm' : 'loader_spinner__container';

    return (
      <div className={loaderSize}>

        <div className="loader_spinner"
          style={{ color: this.props.color ? this.props.color : '' }}
          />

          {this.props.status && (
            <div className="loader_status">
              {this.props.status}
            </div>
          )}

      </div>
    )
  }
}

Loader.defaultProps = {
  color: '',
  small: false,
}

export { OverlayLoaderContainer, LoaderContainer, Spinner, Loader }
