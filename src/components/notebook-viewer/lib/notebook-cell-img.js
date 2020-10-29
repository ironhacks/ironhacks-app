function NotebookImgCell({
  display,
  imgSrc,
}) {
  return (
    <div style={{
      padding: '0 0 .5em 0'
    }}>
      <img
        src={imgSrc}
        alt="Notebook Cell Figure"
        style={{
          display: display,
          width: '100%',
          backgroundColor: 'white'
        }}
      />
    </div>
  )
}

export { NotebookImgCell }
