import TagType from '../types/TagType'


export const TagsCustomer = (tags: TagType[]): TagType[] => {
  let customer: TagType | undefined = tags.find(tag => tag.name == 'customer')
  let result: TagType[] = []
  if (customer != undefined) {
    result = tags.filter(tag => {
      return tag.parentGuid === customer?.guid
    });
  }
  return result
}

const T1 = () => { }

export default T1;