/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { Box, TableCell, IconButton, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FileIcon } from 'react-file-icon';
import { Timeline } from '@mui/icons-material';

import { Menu } from '../../components';

const variants = {
  xml: { extension: 'xml', type: 'code', color: '#3478C7', glyphColor: '#fff' },
  pdf: { extension: 'pdf', type: 'acrobat', color: '#D93831', glyphColor: '#fff' },
};

const FileCell = ({ files, onDownload }) => {
  return (
    <TableCell padding="checkbox">
      <Box display="flex">
        {files.map(({ filename, type }) => (
          <IconButton
            onClick={() => onDownload({ filename })}
            key={filename}
            sx={{ width: 64, height: 64, padding: 2 }}
          >
            <FileIcon {...variants[type]} />
          </IconButton>
        ))}
      </Box>
    </TableCell>
  );
};
const DateCell = ({ date }) => {
  return <TableCell>{moment(date).format('LLL')}</TableCell>;
};

const MenuCell = ({ onHighlight }) => (
  <TableCell padding="checkbox">
    <Menu>
      <MenuItem onClick={onHighlight}>
        <ListItemIcon>
          <Timeline />
        </ListItemIcon>
        <ListItemText primary="Show on timeline" secondary="Display events on player timeline" />
      </MenuItem>
    </Menu>
  </TableCell>
);

const BatonCell = ({ data, padding, value, type, onDownload, onHighlight }) => {
  const cellValue = React.useMemo(() => data[value] || '-', [data, value]);
  if (type === 'menu') return <MenuCell onHighlight={onHighlight} />;
  if (!data[value]) return <TableCell />;
  if (type === 'files') return <FileCell files={cellValue} onDownload={onDownload} />;
  if (type === 'date') return <DateCell date={cellValue} value={value} />;
  return (
    <TableCell
      sx={{ ...(['info', 'error', 'warning'].includes(value) && { color: `${value}.main` }) }}
      padding={padding}
    >
      {cellValue}
    </TableCell>
  );
};

export default BatonCell;
