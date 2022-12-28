import React, { MouseEvent } from 'react';
import TagType from '../../types/TagType'
import TagList from '../TagList'
import { mainTags, otherTags } from '../../helper/tags'
import { AppContext } from '../../context';

interface SidebarMainProps {
}


export default function SidebarMain({ }: SidebarMainProps): JSX.Element {

  const { tags } = React.useContext(AppContext);

  return (
    <div>
      <TagList tags={mainTags(tags)} sort={false} display={''} />
      <TagList tags={otherTags(tags)} sort={false} display={''} />
    </div>
  )
}

//                                 // <input type="checkbox" checked={account.selected} onChange={() => handleSelect(account)} />
