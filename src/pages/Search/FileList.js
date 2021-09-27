import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, List, Button } from '@mui/material';
import { item as ItemApi } from '@vidispine/vdt-api';

import { useDialog } from '../../context';
import FileCard from './FileCard';
import { QcDialog } from '../QC';

const FileList = ({ itemListType = {}, page, onChangePage }) => {
  const { item: items = [], hits } = itemListType;
  const { showDialog } = useDialog();
  const { enqueueSnackbar } = useSnackbar();

  const onDelete = (itemId) =>
    showDialog({
      title: 'Delete item',
      message: 'Are you sure you want to delete this item?',
      okText: 'Yes, delete item',
      noText: 'No, cancel',
    })
      .then(() =>
        ItemApi.removeItem({ itemId })
          .then(() => enqueueSnackbar('Item deleted'))
          .catch(() => enqueueSnackbar('Failed to delete item', { variant: 'error' })),
      )
      .catch(() => null);

  const onQc = (item) =>
    showDialog({ Dialog: QcDialog, item })
      .then(() => enqueueSnackbar('QC Job started!'))
      .catch(({ message }) => message && enqueueSnackbar(message, { variant: 'error' }));
  return (
    <Box display="grid" gridTemplateRows="1fr auto" height={1}>
      <Box overflow="auto" height={1}>
        <List disablePadding>
          {items.map((itemType) => (
            <FileCard
              key={itemType.id}
              itemType={itemType}
              allowQc
              onQc={onQc}
              onDelete={onDelete}
            />
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
