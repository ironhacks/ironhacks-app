function LoginButton({ to, buttonClass, children }) {
  return (
    <a
      href={to}
      className={`btn login-button ${buttonClass}`}
    >
      {children}
    </a>
  )
}

LoginButton.defaultProps = {
  to: '/',
  buttonClass: '',
}


export { LoginButton }
