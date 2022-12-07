import React from 'react';
import axios from "axios";
import TagType from './types/TagType'
import SidebarAccount from './components/Sidebar/SidebarAccount'
import { TagsCustomer } from './helper/tags'
import { AppContext } from './context';

//import './styles/main.css'

export const UserContext = React.createContext(undefined);

function App() {

  const [accounts, setAccounts] = React.useState<TagType[]>([]); // { name: 'VW', selected: true }, { name: 'CARIAD', selected: true }, { name: 'Porsche', selected: false }]);
  const [tags, setTags] = React.useState<TagType[]>([]);
  const [customerTags, setCustomerTags] = React.useState<TagType[]>([]);

  React.useEffect(() => {
    console.log(`App:useEffect() - Execute - fetch tags ...`)
    axios.get(`http://localhost:37071/tags`, { headers: { 'Content-Type': 'application/json', } })
      .then((response) => {
        //console.log(`App.useEffect() - response from Evernote:`); console.log(response.data.tags);
        let tags: TagType[] = response.data.tags.map((t: TagType) => { return { ...t, selected: false } })
        const customer_tags = TagsCustomer(tags)
        setCustomerTags(customer_tags)
        setTags(tags)
      })
      .catch((err: any) => {
        if (err.response) {
          console.log(`App.useEffect() - Response ERROR - data: ${err.response.data}`);
          console.log(`App.useEffect() - Response ERROR - status: ${err.response.status}`);
          console.log(`App.useEffect() - Response ERROR - headers: ${err.response.headers}`);
        } else if (err.request) {
          console.log(`App.useEffect() - Network ERROR - data: ${err.request}`);
          console.log(`App.useEffect() - Network ERROR - code: ${err.request.code}`);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', err.message);
        }
      });
  }, []);


  const handleAccountSelect = (tag: TagType) => {
    console.log(`App:handleAccountSelect() - name: ${tag.name}`)
    const newState = accounts.map(account => {
      if (account.name == tag.name) {
        return { ...account, selected: !account.selected }
      }
      return account;
    });
    setAccounts(newState)
  }

  return (

    <AppContext.Provider value={{ customerTags }}>
      <div>
        <div className="wrapper">
          <div className="box header">Header</div>
          <div className="box sidebar">
            <div className="tags">
              <div className="tags_accounts">
                <SidebarAccount accounts={accounts} handleSelect={handleAccountSelect} />
              </div>
              <div className="tags_major">
                tags_major
              </div>
              <div className="tags_all">
                tags_all
              </div>
            </div>
          </div>
          <div className="box content">Content</div>
        </div>

      </div>
    </AppContext.Provider>

  )

}


export default App;


