import React from 'react';
import { AdminHackCard } from './admin-hack-card';

const AdminHackCardList = (
  {
    hacks,
    emptyText,
  },
) => {
  if (!hacks || hacks.length === 0) {
    return (
      <span className='empty-list'>
        {emptyText || 'There are no hacks available.'}
      </span>
    );
  } else {
    return (
      <ul className="hack_card_list">
      {hacks.map((hack, index) => (
        <li
          key={index}
          className="hack_card_list__item col-sm-6"
          index={index}
          >

          <AdminHackCard
            name={hack.name}
            hackId={hack.id}
            hack={hack}
          />
        </li>
      ))}
      </ul>
    );
  }
};


export { AdminHackCardList }
