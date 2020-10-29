function Separator({primary}){
  const style = {
    width: '100%',
    height: '1px',
    marginTop: '15px',
    marginBottom: '10px',
    backgroundColor: primary ? 'var(--color-primary)' : 'lightgray',
  }
  return (
    <div
      style={style}
      className="seperator"
    />
  )
}

export default Separator;
