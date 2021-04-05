import { MaterialDesignIcon } from '../icons/material-design-icon'

function ReactionButton({ count, type, active, onReact }) {
  return (
    <div className={['reaction_button', active ? 'active' : ''].join(' ').trim()} onClick={onReact}>
      <MaterialDesignIcon
        name={type === 'upvote' ? 'thumb-up' : 'thumb-down'}
        iconClass="pl-1 fs-1"
        style={{ color: active ? 'black' : 'gray' }}
      />

      <span className="reaction_count">{count}</span>
    </div>
  )
}

ReactionButton.defaultProps = {
  count: 0,
  type: 'upvote',
  active: false,
}

export { ReactionButton }
