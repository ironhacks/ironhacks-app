import React from "react"

const SvgComponent = props => (
  <svg
    aria-hidden="true"
    style={{
      msTransform: "rotate(360deg)",
      WebkitTransform: "rotate(360deg)",
    }}
    viewBox="0 0 472 384"
    transform="rotate(360)"
    {...props}
  >
    <path
      d="M320 171q-27 0-45.5-19T256 106.5t18.5-45T320 43t45.5 18.5 18.5 45-18.5 45.5-45.5 19zm-170.5 0q-26.5 0-45.5-19t-19-45.5 19-45T149.5 43t45 18.5 18.5 45-18.5 45.5-45 19zm0 42q27.5 0 60.5 8t61 26 28 41v53H0v-53q0-23 27.5-41t61-26 61-8zm170.5 0q28 0 61 8t60.5 26 27.5 41v53H341v-53q0-43-42-74 13-1 21-1z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
