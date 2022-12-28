import React, { MouseEvent } from 'react';
import Button from '@material-ui/core/Button'
import TagType from '../../types/TagType'
import TagList from '../TagList'
import { AppContext } from '../../context';
import { customerTags } from '../../helper/tags'

interface SidebarAccountProps {
}


export default function SidebarAccount({ }: SidebarAccountProps): JSX.Element {

    const { tags } = React.useContext(AppContext);

    return (
        <div>
            <TagList tags={customerTags(tags)} sort={false} display={''} />
        </div>
    )
}

//                                 // <input type="checkbox" checked={account.selected} onChange={() => handleSelect(account)} />
