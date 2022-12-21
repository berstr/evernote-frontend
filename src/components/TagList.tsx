import React, { MouseEvent } from 'react';
import TagType from '../types/TagType'
import Tag from './Tag'
import '../../styles/main.css'


interface TagListProps {
  tags: TagType[];
  display: string;
  sort: boolean;
  category: string;
}


export default function TagList({ tags, category }: TagListProps): JSX.Element {

  return (
    <div className='tag_group'>
      {
        tags.map((tag: TagType) => {
          return (
            <div key={tag.guid} >
              <Tag tag={tag} category={category} />
            </div>
          )
        })
      }
    </div>
  )
}
