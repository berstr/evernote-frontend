import axios, { AxiosError, AxiosResponse } from 'axios';
import { NwRespI, NwRespNotebooksI, NwRespTagsI, NwRespNotesI } from '../types/HttpType'

export function logHTTPRequestError(msg: string, err: any): void {
  if (err.response) {
    console.log(`${msg} - backend response ERROR: `, err.response);
    console.log(`${msg} - backend response ERROR - status: ${err.response.status}`);
    console.log(`${msg} - backend response ERROR - status text: ${err.response.statusText}`);
  } else if (err.request) {
    console.log(`${msg} - network network ERROR: `, err.request);
    console.log(`${msg} - network network ERROR - status: ${err.request.status}`);
    console.log(`${msg} - network network ERROR - status text: ${err.request.statusText}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`${msg} - generic request ERROR: `, err);
  }
}

export async function fetchTags(): Promise<any> {
  try {
    console.log(`http:fetchTags() - Fetch`);
    const res: NwRespI<NwRespTagsI> = await axios.get(`http://localhost:37071/tags`, { headers: { 'Content-Type': 'application/json', } });
    console.log(`http:fetchTags() - response - status: ${res.status} / ${res.statusText}`);
    //console.log(`http::fetchTags() - response - tags:`, res.data.tags);
    return res.data.tags
  } catch (err: any) {
    logHTTPRequestError('http:fetchTags', err)
    return []
  }
}

export async function fetchNotes(guid: string): Promise<any> {
  try {
    console.log(`http:fetchNotes() - Fetch`);
    const res: NwRespI<NwRespNotesI> = await axios.get(`http://localhost:37071/notes`, { params: { notebook_guid: guid }, headers: { 'Content-Type': 'application/json', } });
    console.log(`http:fetchNotes() - response - status: ${res.status} / ${res.statusText}`);
    //console.log(`http::fetchTags() - response - tags:`, res.data.tags);
    return res.data.notes
  } catch (err: any) {
    logHTTPRequestError('http:fetchNotes', err)
    return []
  }
}

export async function fetchNotebooks(): Promise<any> {
  try {
    console.log(`http:fetchNotebooks() - Fetch`);
    const res: NwRespI<NwRespNotebooksI> = await axios.get(`http://localhost:37071/notebooks`, { headers: { 'Content-Type': 'application/json', } });
    console.log(`http:fetchNotebooks() - response - status: ${res.status} / ${res.statusText}`);
    // console.log(`http:fetchNotebooks() - response - notebooks:`, res.data.notebooks);
    return res.data.notebooks;
  } catch (err: any) {
    logHTTPRequestError('http:fetchNotebooks', err)
    return []
  }
}



/*

const fetchData = async <T,>(uri: string, params: any, headers: any): Promise<T> => {
  console.log(`App::fetchData() - Fetch - uri: ${uri}`);
  return await axios.get(uri, { params: params, headers: headers })
}

const fetchTags = () => {
  console.log(`App::fetchTags() - Fetch`);
  new Promise(async (resolve, reject) => {
    try {
      const res: NwRespI<NwRespTagsI> = await fetchData<NwRespI<NwRespTagsI>>(`http://localhost:37071/tags`, {}, { 'Content-Type': 'application/json', });
      console.log(`App::fetchTags() - response - status: ${res.status} / ${res.statusText}`);
      console.log(`App::fetchTags() - response - tags:`, res.data.tags);
    } catch (error) {
      reject(error);
    }
  });
}

const fetchNotebooks = () => {
  console.log(`App::fetchNotebooks() - Fetch`);
  new Promise(async (resolve, reject) => {
    try {
      const res: NwRespI<NwRespNotebooksI> = await fetchData<NwRespI<NwRespNotebooksI>>(`http://localhost:37071/notebooks`, {}, { 'Content-Type': 'application/json', });
      console.log(`App::fetchTags() - response - status: ${res.status} / ${res.statusText}`);
      console.log(`App::fetchTags() - response - notebooks:`, res.data.notebooks);
    } catch (error) {
      reject(error);
    }
  });
}
*/