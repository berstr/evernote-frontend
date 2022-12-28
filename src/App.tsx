import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import TagType from './types/TagType'
import NotebookType from './types/NotebookType'
import NoteType from './types/NoteType'
import SidebarAccount from './components/Sidebar/SidebarAccount'
import SidebarMain from './components/Sidebar/SidebarMain'
import { customerTags, mainTags, initalNotebooks } from './helper/tags'
import { fetchNotebooks, fetchTags, fetchNotes } from './helper/http'
import { AppContext } from './context';

import { Grid } from '@mui/material';
import NotesTable from './components/NotesTable'

import '../styles/main.css'
import { Filter1 } from '@mui/icons-material';

export const UserContext = React.createContext(undefined);

// https://iamkate.com/code/tree-views/
// below example is from https://dev.to/taiwobello/how-to-create-a-react-tree-view-component-3ch2




const selectedCustomersOnStartup: Array<string> = ['vw', 'porsche'];



function App() {

  const [notebooks, setNotebooks] = React.useState<NotebookType[]>([]);
  const [tags, setTags] = React.useState<TagType[]>([]);
  const [notes, setNotes] = React.useState<NoteType[]>([])

  React.useEffect(() => {

    fetchTags().then((data: TagType[]) => {
      let tags: TagType[] = data.map((tag: TagType) => {
        const selected = (selectedCustomersOnStartup.includes(tag.name)) ? true : false
        return { ...tag, selected: selected }
      })
      setTags(tags)
      console.log('useEffect() - tags: ', tags)
      fetchNotebooks().then((data: NotebookType[]) => {
        let notebooks: NotebookType[] = data.map((notebook: NotebookType) => {
          return { ...notebook, notes: undefined }
        })
        setNotebooks(notebooks)
        const nb = initalNotebooks(notebooks, tags)
        console.log('useEffect() - matching notebooks: ', nb)
      })
    })
  }, []);


  const handleTagClick = (clickedTag: TagType) => {
    /*
    let stateFunction = undefined
    let stateTags: TagType[] = []
    if (category == 'customer') {
      stateFunction = setCustomerTags
      stateTags = customerTags;
    } else if (category == 'main') {
      stateFunction = setMainTags
      stateTags = mainTags;
    }
    const newState = stateTags.map(stateTag => {
      if (tag.guid == stateTag.guid) {
        return { ...stateTag, selected: !tag.selected }
      } else {
        return stateTag;
      }
    });
    if (stateFunction != undefined) { stateFunction(newState) }
    */
    const newState = tags.map(tag => {
      if (clickedTag.guid == tag.guid) {
        return { ...tag, selected: !tag.selected }
      } else {
        return tag;
      }
      setTags(newState)
    });

  }

  const cname = 'tags_all';

  return (

    <AppContext.Provider value={{ tags, handleTagClick }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div >
            <SidebarAccount />
          </div>
          <div >
            <SidebarMain />
          </div>
        </Grid>
        <Grid item xs={9} >
          <Grid container columns={30} spacing={5} padding={3}>
            <Grid item xs={3}>
              Search A
            </Grid>
            <Grid item xs={3}>
              Search A
            </Grid>
          </Grid>
          { /*
          <div style={{ width: '100%' }}><NotesTable notebooks={notebooks} tags={tags} /></div>
          */}
        </Grid>
      </Grid>
    </AppContext.Provider >

  )

}


export default App;



/*

function createNotesTest(
  title: string,
  customer: string | undefined,
  guid: string,
  tags: Array<string>,
  created: string,
  updated: string
): NoteType {
  return {
    title,
    customer,
    guid,
    tags,
    created,
    updated
  };
}

const notesTest = [
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'vw', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'vw', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'vw', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'vw', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'Bosch', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'bsh', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'audi', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'vw', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'vw', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'vw', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'vw', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'vw', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'porsche', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'vw', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'vw', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),
  createNotesTest('=this is a workstream', 'vw', '001', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream1', 'vw', '002', ['workstream'], '2022-11-01', '2022-11-11'),
  createNotesTest('=this is a workstream2', 'vw', '003', ['workstream'], '2022-11-02', '2022-11-11'),
  createNotesTest('=this is a workstream3', 'vw', '006', ['workstream'], '2022-11-05', '2022-11-11'),
  createNotesTest('=this is a workstream4', 'vw', '004', ['workstream'], '2022-11-03', '2022-11-11'),
  createNotesTest('=this is a workstream5', 'vw', '009', ['workstream'], '2022-11-04', '2022-11-11'),
  createNotesTest('2022-12-12 - notes 123', 'porsche', '008', ['note'], '2022-11-01', '2022-11-11'),
  createNotesTest(':task 001', 'vw', '7574545757', ['task'], '2022-12-01', '2022-11-11'),

];
*/