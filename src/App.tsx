import React from 'react';
import axios from "axios";
import TagType from './types/TagType'
import NotebookType from './types/NotebookType'
import SidebarAccount from './components/Sidebar/SidebarAccount'
import SidebarMain from './components/Sidebar/SidebarMain'
import { TagsCustomer, TagsMain } from './helper/tags'
import { AppContext } from './context';

import { Grid } from '@mui/material';
import NotesTable from './components/NotesTable'

import '../styles/main.css'

export const UserContext = React.createContext(undefined);

// https://iamkate.com/code/tree-views/
// below example is from https://dev.to/taiwobello/how-to-create-a-react-tree-view-component-3ch2

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

const selectedCustomersOnStartup: Array<string> = ['vw', 'porsche'];

function App() {

  const [notebooks, setNotebooks] = React.useState<NotebookType[]>([]);
  const [tags, setTags] = React.useState<TagType[]>([]);
  const [customerTags, setCustomerTags] = React.useState<TagType[]>([]);
  const [mainTags, setMainTags] = React.useState<TagType[]>([]);
  const [archivedNotes, setArchivedNotes] = React.useState<boolean>(false);


  function fetchNotebookNotes(notebooks: Array<NotebookType>, tags: TagType[]): void {
    for (const notebook of notebooks) {
      if ((notebook.name.search('archive') == -1) && (notebook.name.search('Bernd') == -1)) {
        // console.log(`App:fetchNotebookNotes() - notebook: ${notebook.name}`)
        // console.log(`App:fetchNotebookNotes() - customerTags: `, tags)
        tags.filter((tag: TagType) => {
          // console.log(`App:fetchNotebookNotes() - tag: ${tag.name} - selected: ${tag.selected} - match: ${notebook.name.toLowerCase().search(tag.name.toLowerCase())}`)
          if (tag.selected && (notebook.name.toLowerCase().search(tag.name.toLowerCase()) == 0)) {
            console.log(`App:fetchNotebookNotes() - fetch notes from notebook: ${notebook.name}`)
          }
        })
      }
    }
  }

  function fetchNotes(guid: string): void {
    const result: NotebookType | null = null;
    const fetch = async () => {
      try {
        console.log(`App:fetchNotes() - Execute - fetch notes ...`)
        const response = await axios.get(`http://localhost:37071/notes`, { params: { notebook_guid: guid }, headers: { 'Content-Type': 'application/json' } })
        console.log(`App:fetchNotes() - response: `, response.data)
      } catch (err: any) {
        if (err.response) {
          console.log(`fetchNotes() - axios response ERROR - data: ${err.response.data}`);
          console.log(`fetchNotes() - axios response ERROR - status: ${err.response.status}`);
          console.log(`fetchNotes() - axios response ERROR - headers: ${err.response.headers}`);
        } else if (err.request) {
          console.log(`fetchNotes() - axios network ERROR: ${err.request}`);
          console.log(`fetchNotes() - axios network ERROR - code: ${err.request.code}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`fetchNotes() - axios ERROR - message: ${err.message}`);
        }
      }
    };
    fetch();
  }

  React.useEffect(() => {
    const fetch = async () => {
      try {
        console.log(`App:useEffect() - Execute - fetch tags ...`)
        const response1 = await axios.get(`http://localhost:37071/tags`, { headers: { 'Content-Type': 'application/json', } })
        let tags: TagType[] = response1.data.tags.map((t: TagType) => {
          const selected = (selectedCustomersOnStartup.includes(t.name)) ? true : false
          return { ...t, selected: selected }
        })
        const customer_tags = TagsCustomer(tags)
        console.log(`App:useEffect() - customer tags: `, customer_tags)
        setCustomerTags(customer_tags)
        const main_tags = TagsMain(tags)
        setMainTags(main_tags)
        setTags(tags)

        console.log(`App:useEffect() - Execute - fetch notebooks ...`)
        const response2 = await axios.get(`http://localhost:37071/notebooks`, { headers: { 'Content-Type': 'application/json', } })
        //let notebooks: NotebookType[] = response2.data.notebooks.map((notebook: NotebookType) => { return notebook })
        let notebooks: NotebookType[] = response2.data.notebooks
        console.log(`App:useEffect() - Execute - notebooks : `, notebooks)
        fetchNotebookNotes(notebooks, customer_tags)

      } catch (err: any) {
        if (err.response) {
          console.log(`useEffect() - axios response ERROR - data: ${err.response.data}`);
          console.log(`useEffect() - axios response ERROR - status: ${err.response.status}`);
          console.log(`useEffect() - axios response ERROR - headers: ${err.response.headers}`);
        } else if (err.request) {
          console.log(`useEffect() - axios network ERROR: ${err.request}`);
          console.log(`useEffect() - axios network ERROR - code: ${err.request.code}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log(`useEffect() - axios ERROR - message: ${err.message}`);
        }
      }
    };
    fetch();
  }, []);


  const handleTagClick = (tag: TagType, category: string) => {
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
  }

  const cname = 'tags_all';

  return (

    <AppContext.Provider value={{ customerTags, mainTags, handleTagClick }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div >
            <SidebarAccount />
          </div>
          <div >
            <SidebarMain />
          </div>
          <div className={cname}>
            <div>tag1sdfgsdfgdfs</div>
            <div>tag2sdfgsdfsdfg</div>
            tag3sdfgsdfsdfgsdf
            tag4dsfsdgsdfgf
            tag5sdfsdfsdf
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
          <div style={{ width: '100%' }}><NotesTable notes={notesTest} customerTags={customerTags} /></div>
        </Grid>
      </Grid>
    </AppContext.Provider >

  )

}


export default App;


