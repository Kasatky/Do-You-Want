import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';
import DiaryToolbar from './DiaryToolbar';
import DiaryTableHead from './DiaryTableHead';

export interface Data {
  date: string;
  situation: string;
  emotion: string;
  mind: string;
  action: string;
}

function createData(
  date: string,
  situation: string,
  emotion: string,
  mind: string,
  action: string,
): Data {
  return {
    date,
    situation,
    emotion,
    mind,
    action,
  };
}

const rows = [
  createData('01.01.2023', 'sssss1', 'eeeee1', 'mmmmm1', 'aaaaa1'),
  createData('02.01.2023', 'sssss2', 'eeeee2', 'mmmmm2', 'aaaaa2'),
  createData(
    '03.01.2023',
    'ssssaerth  th theahs3',
    'eee3ee',
    'mmmm3m',
    'aaaaa3',
  ),
  createData('04.01.2023', 'sssss4', 'e4eeee', 'mmm4mm', 'aaaaa4'),
  createData('05.01.2023', 'sfetn etah essss5', 'eeeee', 'mmmmm', 'aaaaa'),
  createData(
    '06.01.2023',
    'sssddddddddddddddddddddddd ffffff fffffffffffffffffffff fwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwww fffffffff fffffffffffffffffffff dddddddddddddaeth th hass6',
    'eeeee',
    'mmmmm',
    'aaaaa',
  ),
  createData('07.01.2023', 'sssss7', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('08.01.2023', 'sssss8', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('09.01.2023', 'sssss9', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('10.01.2023', 'sssss10', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('11.01.2023', 'sssss11', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('12.01.2023', 'sssss12', 'eeeee', 'mmmmm', 'aaaaa'),
  createData('13.01.2023', 'sssss13', 'eeeee', 'mmmmm', 'aaaaa'),
];

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

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
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
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
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
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.date}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.date}
                      </TableCell>
                      <TableCell align="right">{row.situation}</TableCell>
                      <TableCell align="right">{row.mind}</TableCell>
                      <TableCell align="right">{row.emotion}</TableCell>
                      <TableCell align="right">{row.action}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={'Количество строк:'}
          labelDisplayedRows={() =>
            `${page * rowsPerPage + 1}–${
              rowsPerPage * (page + 1) > rows.length
                ? rows.length
                : rowsPerPage * (page + 1)
            } из ${rows.length}`
          }
        />
      </Paper>
    </Box>
  );
}
