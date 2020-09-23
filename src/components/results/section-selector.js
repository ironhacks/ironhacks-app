import React from 'react';
import { userMetrics } from '../../util/user-metrics'

class ResultsSectionSelector extends React.Component {
  constructor(props){
    super(props);
    this.buttonClass = 'badge btn py-3 px-4 mx-2 bd-1';
  }

  changeSection(sectionId) {
    userMetrics({
      event: 'results_section_view',
      data: {
        selected: sectionId,
      }
    })
    if (this.props.callback) {
      this.props.callback(sectionId)
    }
  }

  render() {
    return (
      <div className='flex flex-start py-2'>
        {this.props.sections.map((item, index)=>(
          <div
            key={index}
            className={[
              this.buttonClass,
              this.props.selected === item.name ? 'bg-grey-dk3 cl-white' : 'cl-grey-dk3'
            ].join(' ')}
            onClick={()=>{this.changeSection(item.name)}}
            >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
}

export { ResultsSectionSelector }
