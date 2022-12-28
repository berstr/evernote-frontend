import TagType from '../types/TagType'
import NoteType from '../types/NoteType'
import NotebookType from '../types/NotebookType'
import { TagFaces } from '@mui/icons-material';


export function findChildTags(tags: TagType[], parentTagName: string): TagType[] {
  let customer: TagType | undefined = tags.find(tag => tag.name == parentTagName)
  let result: TagType[] = []
  if (customer != undefined) {
    result = tags.filter(tag => {
      return tag.parentGuid === customer?.guid
    });
  }
  return result
}

// the initially selected notebooks are defined by comparing the tag name with the title of the notebook
// 
export function initalNotebooks(notebooks: Array<NotebookType>, tags: TagType[]): NotebookType[] {
  let result: NotebookType[] = [];
  for (const tag of getSelectedTags(tags)) {
    for (const notebook of notebooks) {
      const tag_lowerCase = tag.name.toLowerCase()
      const notebook_lowerCase = notebook.name.toLowerCase()
      const matchingNotebooks = [tag_lowerCase, tag_lowerCase + '-notes', tag_lowerCase + '-tasks', tag_lowerCase + '~contacts']
      if (matchingNotebooks.includes(notebook_lowerCase)) {
        result.push(notebook)
      }
    }
  }
  //console.log(`tags:initalNotebooks() - result: `, result)
  return result;
}


export function getSelectedTags(tags: TagType[]): TagType[] {
  return tags.filter((tag: TagType) => tag.selected)
}

export function hasTags(note: NoteType, tags: TagType[]): boolean {
  let result: boolean = true;
  tags.forEach((tag: TagType) => {
    if (note.tags.include(tag.guid) == false) {
      result = false
    }
  })
  return result
}



export const customerTags = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'customer') }
export const mainTags = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'main') }
export const otherTags = (tags: TagType[]): TagType[] => { return tags.filter(tag => tag.parentGuid == null) }
