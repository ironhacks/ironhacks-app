function Button({ buttonClass, children, disabled, height, margin, onClick, primary, width }) {
  const buttonStyle = {
    width: width ? width : '100%',
    height: height ? height : '30px',
    margin: margin ? margin : '0',
    backgroundColor: primary ? 'var(--color-primary)' : 'lightgray',
    borderRadius: '5px',
    border: 'none',
  }

  return (
    <button style={buttonStyle} className={buttonClass} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  primary: false,
  width: null,
  height: null,
  margin: null,
  buttonClass: 'button',
  disabled: false,
}

export { Button }
