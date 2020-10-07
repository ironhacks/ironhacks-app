import React from 'react';
import { userMetrics } from '../../util/user-metrics'

function SectionSelectorItem({
  selected,
  buttonClass,
  title,
  disabled,
  index,
  onItemClick,
}) {
  let classes = [
    buttonClass,
    selected ? 'bg-grey-dk3 cl-white' : 'cl-grey-dk3',
    disabled ? 'cl-white bg-grey-lt2' : ''
  ].join(' ');

  return (
    <div
      className={classes}
      onClick={()=>{
        if (disabled) { return false }
        onItemClick()
      }}
    >
      <span>{title}</span>
    </div>
  )
}

class ResultsSectionSelector extends React.Component {
  constructor(props){
    super(props);
    this.buttonClass = 'badge btn py-3 px-4 mx-1 bd-1';
  }

  changeSection(sectionId) {
    if (this.props.disabled) { return false }

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
      <div className='flex flex-start py-2 fs-m1'>
        {this.props.sections.map((item, index)=>(
          <SectionSelectorItem
            key={index}
            buttonClass={this.buttonClass}
            selected={item.name === this.props.selected ? true : false}
            disabled={item.disabled}
            onItemClick={()=>{this.changeSection(item.name)}}
            title={item.label}
          />
        ))}
      </div>
    )
  }
}

export { ResultsSectionSelector }
