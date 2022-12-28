import React, { MouseEvent } from 'react';
import TagType from '../types/TagType'
import Tag from './Tag'
import '../../styles/main.css'


interface TagListProps {
  tags: TagType[];
  display: string;
  sort: boolean;
}


export default function TagList({ tags }: TagListProps): JSX.Element {

  return (
    <div className='tag_group'>
      {console.log('TagList: ', tags)}
      {
        tags.map((tag: TagType) => {
          return (
            <div key={tag.guid} >
              <Tag tag={tag} />
            </div>
          )
        })
      }
    </div>
  )
}
