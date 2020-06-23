import React from 'react';

function MaterialDesignIcon({ name, iconClass}) {
  return (
    <i className={`zmdi zmdi-${name} ${iconClass}`}/>
  )
}
MaterialDesignIcon.defaultProps = {
  name: '',
  iconClass: '',
}
export { MaterialDesignIcon }
