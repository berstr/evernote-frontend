import TagType from '../types/TagType'


function findChildTags(tags: TagType[], parentTagName: string): TagType[] {
  let customer: TagType | undefined = tags.find(tag => tag.name == parentTagName)
  let result: TagType[] = []
  if (customer != undefined) {
    result = tags.filter(tag => {
      return tag.parentGuid === customer?.guid
    });
  }
  return result
}

export const TagsCustomer = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'customer') }
export const TagsMain = (tags: TagType[]): TagType[] => { return findChildTags(tags, 'main') }