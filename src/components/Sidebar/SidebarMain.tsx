import React, { MouseEvent } from 'react';
import TagType from '../../types/TagType'
import TagList from '../TagList'
import { AppContext } from '../../context';

interface SidebarMainProps {
}


export default function SidebarMain({ }: SidebarMainProps): JSX.Element {

  const { mainTags } = React.useContext(AppContext);

  return (<TagList tags={mainTags} sort={false} display={''} category={'main'} />)
}

//                                 // <input type="checkbox" checked={account.selected} onChange={() => handleSelect(account)} />
