import TagType from '../types/TagType'
import NoteType from '../types/NoteType'
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

export function filterNotes(notes: NoteType[], tags: TagType[]): NoteType[] {
  let result: NoteType[] = []
  const selectedTags: TagType[] = getSelectedTags(tags);
  if (selectedTags.length == 0) {
    result = notes
  }
  else {
    result = notes.filter((note: NoteType) => hasTags(note, tags))
  }
  return result
}


export const TagsCustomer = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'customer') }
export const TagsMain = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'main') }