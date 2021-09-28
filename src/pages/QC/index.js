import React from 'react';
import { shape as ShapeApi } from '@vidispine/vdt-api';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useConfiguration } from '../../context';
import { PresetList } from './PresetList';
import FileCard from '../Search/FileCard';

export const QcDialog = ({ open, onSuccess, onError, onClose, item = {} }) => {
  const { resource } = useConfiguration({ type: 'BATON' });
  const [selected, setSelected] = React.useState([]);
  const resourceId = React.useMemo(() => resource && resource.id, [resource]);
  const entity = React.useMemo(() => {
    const { shape = [], id: itemId } = item;
    const { id: shapeId } = shape.find(({ tag = [] }) => tag.includes('original')) || {};
    return { itemId, shapeId };
  }, [item]);

  const onSubmit = () => {
    const { itemId, shapeId } = entity;
    const [preset] = selected;
    const queryParams = { preset, resourceId };
    return ShapeApi.createShapeAnalyze({ itemId, shapeId, queryParams })
      .then(onSuccess)
      .catch(onError);
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle disableTypography sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Start QC
        </Typography>
        <Typography variant="caption">Choose a preset to start the QC job</Typography>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: 1 }}>
        <FileCard itemType={item} interactive={false} />
        <PresetList
          entity={entity}
          resourceId={resourceId}
          selected={selected}
          setSelected={setSelected}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary" disabled={!selected.length} onClick={onSubmit}>
          Start QC
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QcDialog;
