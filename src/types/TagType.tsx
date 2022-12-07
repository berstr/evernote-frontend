interface TagI {
    name: string;
    guid: string;
    parentGuid: string;
    selected: boolean;
}

type TagType = TagI;

export default TagType;

