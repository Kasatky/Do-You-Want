import React from 'react';
import { visuallyHidden } from '@mui/utils';
import { Data, Order } from './Diary';
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Дата',
  },
  {
    id: 'situation',
    numeric: true,
    disablePadding: false,
    label: 'Событие',
  },
  {
    id: 'emotion',
    numeric: true,
    disablePadding: false,
    label: 'Эмоции',
  },
  {
    id: 'mind',
    numeric: true,
    disablePadding: false,
    label: 'Мысли',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Поведение',
  },
];

interface DiaryTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  order: Order;
  orderBy: string;
}

function DiaryTableHead(props: DiaryTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default DiaryTableHead;
