// DemoComponent.js
import React from "react"

// This is a container component to render our demos and their code
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
