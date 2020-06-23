import React from 'react'

const SvgComponent = props => (
  <svg
    aria-hidden="true"
    style={{
      msTransform: 'rotate(360deg)',
      WebkitTransform: 'rotate(360deg)',
    }}
    viewBox="0 0 416 432"
    transform="rotate(360)"
    {...props}
  >
    <path
      d="M366 237l45 35q7 6 3 14l-43 74q-4 8-13 4l-53-21q-18 13-36 21l-8 56q-1 9-11 9h-85q-9 0-11-9l-8-56q-19-8-36-21l-53 21q-9 3-13-4L1 286q-4-8 3-14l45-35q-1-12-1-21t1-21L4 160q-7-6-3-14l43-74q5-8 13-4l53 21q18-13 36-21l8-56q2-9 11-9h85q10 0 11 9l8 56q19 8 36 21l53-21q9-3 13 4l43 74q4 8-3 14l-45 35q2 12 2 21t-2 21zm-158.5 54q30.5 0 52.5-22t22-53-22-53-52.5-22-52.5 22-22 53 22 53 52.5 22z"
      fill="currentColor"
    />
  </svg>
)

export default SvgComponent
