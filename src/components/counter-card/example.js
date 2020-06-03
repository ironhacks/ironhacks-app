import React from 'react'



class CounterCard extends React.Component {
  render() {
    return (
      <div
        id="solution-counter-tools"
        class="solution-count count-it"
        data-counter-start="1"
        data-counter-end="10"
        data-counter-duration="6"
      >
      <span>0</span>
      </div>
    )
  }
}

export { CounterCard }
