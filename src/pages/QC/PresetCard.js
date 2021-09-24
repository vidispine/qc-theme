import React from 'react';
// import get from 'lodash.get';
import { withStyles } from '@mui/styles';
import {
  Paper,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
} from '@mui/material';
// import { Info as InfoIcon } from '@mui/icons-material';

import { useGetPreset } from '../../context';

const styles = ({ spacing }) => ({
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
});

export const PresetCard = ({
  entity,
  preset,
  onClick,
  selected = [],
  classes,
  resourceId,
  // bajs,
}) => {
  const { itemId, shapeId } = entity;
  const { data = {}, isLoading, isError } = useGetPreset({ preset, itemId, shapeId, resourceId });
  const checked = React.useMemo(() => selected.includes(preset), [selected, preset]);
  return (
    <Paper className={classes.paper}>
      <ListItem
        disabled={isLoading}
        onClick={() => onClick(preset)}
        disableRipple
        className={classes.root}
        button
        ContainerComponent="div"
      >
        <ListItemIcon>
          <Checkbox edge="start" checked={checked} color="primary" />
        </ListItemIcon>
        <ListItemText primary={preset} />
        <ListItemSecondaryAction>
          {isLoading && <CircularProgress size={20} />}
          {/* {isError && <InfoIcon />} */}
          {!isError && !isLoading && <span>${data}</span>}
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(PresetCard);
