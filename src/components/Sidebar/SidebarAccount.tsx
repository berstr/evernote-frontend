import React, { MouseEvent } from 'react';
import Button from '@material-ui/core/Button'
import TagType from '../../types/TagType'
import TagList from '../TagList'
import { AppContext } from '../../context';

interface SidebarAccountProps {
}


export default function SidebarAccount({ }: SidebarAccountProps): JSX.Element {

    const { customerTags } = React.useContext(AppContext);

    return (
        <div>
            <TagList tags={customerTags} sort={false} display={''} category={'customer'} />
            <Button variant='contained'> Click Me</Button>
        </div>
    )
}

//                                 // <input type="checkbox" checked={account.selected} onChange={() => handleSelect(account)} />
