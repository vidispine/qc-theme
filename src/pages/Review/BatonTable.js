import React from 'react';
import { Box, Table, TableRow, TableHead, TableBody, TableCell, Typography } from '@mui/material';
import { useBaton } from '../../hooks';
import BatonRow from './BatonRow';

const defaultColumns = [
  { id: 1, label: 'Reports', type: 'files', value: 'files', padding: 'checkbox' },
  { id: 3, label: 'Testplan', value: 'name' },
  { id: 4, label: 'Date', value: 'created', type: 'date' },
  { id: 5, label: 'Errors', value: 'error' },
  { id: 6, label: 'Warnings', value: 'warning' },
  { id: 7, label: 'Info', value: 'info' },
  { id: 8, label: undefined, value: undefined, type: 'menu' },
];

const BatonTable = ({ itemType, isLoading, columns = defaultColumns, onHighlight }) => {
  const { reports } = useBaton(itemType);
  if (isLoading) return null;
  return reports.map(({ itemId, shapeId, testplans }) => (
    <Box key={shapeId}>
      <Typography variant="h6">{shapeId}</Typography>
      <Table>
        <caption>{`Found ${testplans.length} report${testplans.length !== 1 ? 's' : ''}`}</caption>
        <TableHead>
          <TableRow>
            {columns.map(({ label, id, padding }) => (
              <TableCell key={id} padding={padding}>
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {testplans.map((testplan) => (
            <BatonRow
              columns={columns}
              key={testplan.name}
              shapeId={shapeId}
              itemId={itemId}
              testplan={testplan}
              onHighlight={onHighlight}
            />
          ))}
        </TableBody>
      </Table>
    </Box>
  ));
};

export default BatonTable;
