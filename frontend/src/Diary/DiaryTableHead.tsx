import React from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from './Diary';
import {
  Box,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { DiaryNote } from './diaryTypes';

interface HeadCell {
  disablePadding: boolean;
  id: keyof DiaryNote;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'createdAt',
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
    property: keyof DiaryNote,
  ) => void;
  order: Order;
  orderBy: string;
}

function DiaryTableHead(props: DiaryTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof DiaryNote) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead
      sx={{
        borderTop: '1px solid #e7e7e7',
      }}
    >
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            align={'center'}
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
