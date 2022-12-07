import React, { MouseEvent } from 'react';
import TagType from '../../types/TagType'
import Tag from './Tag'
import { AppContext } from '../../context';

interface SidebarAccountProps {
    accounts: TagType[];
    handleSelect: (account: TagType) => void;
}


export default function SidebarAccount({ accounts, handleSelect }: SidebarAccountProps): JSX.Element {

    const { customerTags } = React.useContext(AppContext);

    console.log('SidebarAccount: ', customerTags)

    return (
        <div>
            {
                customerTags.map((tag: TagType) => {
                    return (
                        <Tag key={tag.guid} tag={tag} />
                    )
                })
            }
        </div>
    )

}

//                                 // <input type="checkbox" checked={account.selected} onChange={() => handleSelect(account)} />
