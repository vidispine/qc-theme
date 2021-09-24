import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, List, Button } from '@mui/material';

import { useDialog } from '../../context';
import FileCard from './FileCard';
import { QcDialog } from '../QC';

const FileList = ({ itemListType = {}, page, onChangePage }) => {
  const { item: items = [], hits } = itemListType;
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const onQc = (item) =>
    showDialog({ Dialog: QcDialog, item })
      .then(() => enqueueSnackbar('QC Job started!'))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {items.map((itemType) => (
            <FileCard key={itemType.id} itemType={itemType} allowQc onQc={onQc} />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button disabled={page < 1} onClick={() => onChangePage({ page: page - 1 })}>
          Prev
        </Button>
        <Button disabled={(page + 1) * 10 > hits} onClick={() => onChangePage({ page: page + 1 })}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default FileList;
