import React, { MouseEvent } from 'react';
import TagType from '../types/TagType'
import { AppContext } from '../context';

interface TagProps {
  tag: TagType;
  category: string;
}


export default function Tag({ tag, category }: TagProps): JSX.Element {

  let backgroundColor = {}
  let color = { color: 'black' }
  let fontWeight = { fontWeight: 'normal' }
  let border = {}

  if (tag.selected) {
    backgroundColor = { backgroundColor: '#b9b4b4' }
  }

  const { handleTagClick } = React.useContext(AppContext);

  const backgroundGrey = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = 'gainsboro'
  }
  const backgroundReset = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '0'
  }

  React.useEffect(() => {
    if (tag.selected) {
      backgroundColor = { backgroundColor: '#b9b4b4' }
    }
    console.log(`Tag [${category}]: `, tag)
  }, [tag])

  const handleTagSelect = (tag: TagType) => {

  }

  return (
    <div className='tag' onMouseEnter={backgroundGrey} onMouseLeave={backgroundReset}>
      <button onClick={() => { handleTagClick(tag, category) }}>{tag.name}</button>
    </div>
  )

}

//         <button style={{ ...border, fontSize: '10px', ...fontWeight, marginRight: '10px', marginBottom: '5px', ...backgroundColor, ...color }} onClick={() => { handleTagClick(tag, category) }}>{tag.name}</button>

/*

  <div onMouseEnter={backgroundGrey} onMouseLeave={backgroundReset} >
        <button onClick={() => { handleTagClick(tag, category) }}>{tag.name}</button>
      </div>

*/