import React from 'react';
import { VariableSizeList as List } from 'react-window';

class AdminCohortListItem extends React.Component {
  ListItem = ({ index, style }) => {
    return (
      <div style={style}>
        {index + 1}. {this.props.dataList[index]}
      </div>
    )
  };

  render() {
    return (
      <List
        itemCount={this.props.dataList.length}
        itemSize={(()=>{return 30})}
        height={200}
        width={'100%'}
        data={this.props.dataList}
      >
      {this.ListItem}
      </List>
    )
  }
}


export { AdminCohortListItem }
