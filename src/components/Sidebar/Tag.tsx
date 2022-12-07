import React, { MouseEvent } from 'react';
import TagType from '../../types/TagType'
import { AppContext } from '../../context';

interface TagProps {
  tag: TagType;
}


export default function Tag({ tag }: TagProps): JSX.Element {

  let backgroundColor = {}
  let color = { color: 'black' }
  let fontWeight = { fontWeight: 'normal' }
  let border = {}

  if (tag.selected) {
    backgroundColor = { backgroundColor: '#b9b4b4' }
  }

  //const { customerTags } = React.useContext(AppContext);

  const backgroundGrey = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'gainsboro'
  }
  const backgroundReset = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '0'
  }

  const handleTagSelect = (tag: TagType) => {

  }

  return (
    <div>
      <div onMouseEnter={backgroundGrey} onMouseLeave={backgroundReset} >
        <button style={{ ...border, fontSize: '10px', ...fontWeight, marginRight: '10px', marginBottom: '5px', ...backgroundColor, ...color }} onClick={() => { handleTagSelect(tag) }}>{tag.name}</button>
      </div>
    </div>
  )

}
