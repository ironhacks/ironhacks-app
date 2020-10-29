import React from 'react';

const AdminHackCard = (
  {
    hackId,
    name,
  },
) => {
  return (
    <a href={`/admin/hacks/${hackId}/settings`}>
      <div className={'hack_card p-2 bg-primary flex flex-center flex-align-center'}>
        <h3 className="hack_title font-bold text-center">
          {name}
        </h3>
      </div>
    </a>
  );
};

AdminHackCard.defaultProps = {
  name: 'Hack Name',
  hackId: ''
}

export { AdminHackCard }
