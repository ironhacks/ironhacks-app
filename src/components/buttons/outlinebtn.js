// DemoComponent.js
function DemoComponent({ code, children }) {
  return (
    <div>
      <pre>{code}</pre> {/* syntax highlighted code block*/}
      <div>
        {children} {/* the react rendered demo */}
      </div>
    </div>
  )
}

export default DemoComponent
