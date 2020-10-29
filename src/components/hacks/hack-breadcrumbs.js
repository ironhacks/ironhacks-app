import { useLocation } from 'react-router-dom';
import { upperCaseWord } from '../../util/string-utils';
import { Breadcrumb } from 'react-bootstrap'

function HackPageBreadCrumbs({hackSlug, hackName}) {
  let location = useLocation();
  let paths = location.pathname.split('/').slice(2);
  let current = paths.pop();
  var url = ['', 'hacks'];

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/hacks">
        Hacks
      </Breadcrumb.Item>

      {paths.map((item, index)=>{
        url.push(item);
        return (
          <Breadcrumb.Item
            key={item}
            href={url.join('/')}>
            {upperCaseWord(item)}
          </Breadcrumb.Item>
        )
      })}

      {current && (
        <Breadcrumb.Item active>
          {upperCaseWord(current)}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  )
}

export { HackPageBreadCrumbs }
