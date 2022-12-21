import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

import NoteType from '../types/NoteTyoe'

type Order = 'asc' | 'desc';


// https://mui.com/material-ui/react-table/#sorting-amp-selecting


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


function getComparator<Key extends keyof any>(order: Order, orderBy: Key):
  (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const tableContainerSx: SxProps = {
  //width: 'max-content',
  maxHeight: '90vh',
  maxWidth: '90vw',
  border: '1px solid rgba(128,128,128,0.4)',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: 2
}

const rowSx: SxProps = {
  padding: '1px',
  align: 'center'
};


interface NotesTableProps {
  notes: Array<NoteType>;
  orderBy: keyof NoteType;
}

export default function NotesTable({ notes, orderBy }: NotesTableProps) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [order_By, setOrderBy] = React.useState<keyof NoteType>(orderBy);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof NoteType,
  ) => {
    //console.log(`NotesTable :: handleRequestSort() - property: ${String(property)}`)
    const isAsc = order_By === property && order === 'asc';
    //console.log(`NotesTable :: handleRequestSort() - isAsc: ${isAsc}`)
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property: keyof NoteType) => (event: React.MouseEvent<unknown>) => {
    handleRequestSort(event, property);
  };


  return (
    <TableContainer component={Paper} sx={tableContainerSx} >
      <Table
        stickyHeader
        aria-label="sticky table"
        size={'small'}
      >
        <TableHead>
          <TableRow>
            {/* console.log('NotesTable1 - notes:', notes)*/}
            {/* console.log(notes[0])*/}
            {/* console.log(Object.keys(notes[0])) */}
            {Object.keys(notes[0]).map((note_key: keyof NoteType, index: number) => (
              <TableCell
                key={index}
                padding={'normal'}
                sortDirection={order_By === note_key ? order : false}
              >
                <TableSortLabel
                  active={order_By === note_key}
                  direction={order_By === note_key ? order : 'asc'}
                  onClick={createSortHandler(note_key)}
                >
                  {note_key}

                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>


        <TableBody sx={{
          "& tr:nth-of-type(2n+1)": {
            backgroundColor: "grey.50",
          }
        }}>
          {notes.sort(getComparator(order, order_By))
            .map((note: NoteType, index: number) => {
              return (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell
                    padding={'normal'}
                  >
                    {note.title}
                  </TableCell>
                  <TableCell sx={rowSx}>{note.customer}</TableCell>
                  <TableCell sx={rowSx}>{note.guid}</TableCell>
                  <TableCell sx={rowSx}>{note.tags}</TableCell>
                  <TableCell sx={rowSx}>{note.created}</TableCell>
                  <TableCell sx={rowSx}>{note.updated}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


