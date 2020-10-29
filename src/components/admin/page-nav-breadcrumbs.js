import React from 'react';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap'
import { upperCaseWord } from '../../util/string-utils';


function AdminPageNavBreadcrumbs({props, hackId, hackName}) {
  let location = useLocation();
  const path = location.pathname.split('/');
  let currentPath = path.length >= 5 ? path.pop() : false;


  return (
    <Breadcrumb listProps={{className: 'bg-grey-dk3 br-0 cl-white font-bold fs-m2'}}>
      <Breadcrumb.Item href="/admin">Admin</Breadcrumb.Item>

      <Breadcrumb.Item href={`/admin/hacks/${hackId}`}>
        {hackName}
      </Breadcrumb.Item>

      {currentPath && (
        <Breadcrumb.Item active>
          {upperCaseWord(currentPath)}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export { AdminPageNavBreadcrumbs }
