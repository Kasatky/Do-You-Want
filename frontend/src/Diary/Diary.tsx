import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import DiaryToolbar from './DiaryToolbar';
import DiaryTableHead from './DiaryTableHead';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { getDiary } from './diarySlice';
import DiaryModalNew from './DiaryModalNew';
import { DiaryNote } from './diaryTypes';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = 'asc' | 'desc';

type DiaryNoteKey = keyof DiaryNote;

function getComparator<Key extends DiaryNoteKey>(
  order: Order,
  orderBy: Key,
): (a: DiaryNote, b: DiaryNote) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number,
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<DiaryNoteKey>('createdAt');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const notes = useSelector((state: RootState) => state.diary.notes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDiary());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: DiaryNoteKey,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <DiaryToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <DiaryTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort<DiaryNote>(notes, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((note) => {
                  return (
                    <TableRow hover tabIndex={-1} key={note.id}>
                      <TableCell sx={{ minWidth: '80px' }}>
                        {String(note.createdAt).slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">{note.situation}</TableCell>
                      <TableCell align="right">{note.emotion}</TableCell>
                      <TableCell align="right">{note.mind}</TableCell>
                      <TableCell align="right">{note.action}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Количество строк:'}
          labelDisplayedRows={() =>
            `${page * rowsPerPage + 1}–${
              rowsPerPage * (page + 1) > notes.length
                ? notes.length
                : rowsPerPage * (page + 1)
            } из ${notes.length}`
          }
        />
      </Paper>
      <Button onClick={handleOpen} variant="contained">
        Добавить запись
      </Button>
      <DiaryModalNew open={open} setOpen={setOpen} />
    </Box>
  );
}
