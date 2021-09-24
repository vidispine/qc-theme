import React from 'react';
import get from 'lodash.get';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { parseMetadataType, parseShapeType } from '@vidispine/vdt-js';
import { BarChart, PlayArrow } from '@mui/icons-material';
import { withStyles } from '@mui/styles';
import {
  Tooltip,
  Box,
  Avatar,
  Checkbox,
  ListItem,
  Paper,
  Typography,
  ListItemIcon,
  IconButton,
} from '@mui/material';

import { useBaton } from '../../hooks';

const getFileData = (shape = {}) => {
  const { containerComponent = {} } = shape;
  const { file = [{}] } = containerComponent;
  const [{ timestamp, id: fileId, storage: storageId }] = file;
  return { timestamp: moment(timestamp).format('L'), fileId, storageId };
};

const parseItem = ({ metadata = {}, shape: [shape] = [{}] }) => ({
  ...parseMetadataType(metadata, { flat: true, arrayOnSingle: false }),
  ...parseShapeType(shape),
  ...getFileData(shape),
});

export const Column = ({ fields, data }) => (
  <Box display="grid" gridTemplateColumns="auto 1fr" gap={1}>
    {fields.map(({ key, label }) => (
      <Box key={key} display="contents">
        <Typography variant="body2" color="textSecondary">
          {label}:
        </Typography>
        <Typography noWrap variant="body2" color="textPrimary">
          {get(data, key, '-')}
        </Typography>
      </Box>
    ))}
  </Box>
);

const cols = [
  [
    {
      key: 'title',
      label: 'Title',
    },
    {
      key: 'fileSize',
      label: 'Filesize',
    },
  ],
  [
    {
      key: 'duration',
      label: 'Duration',
    },
    {
      key: 'timestamp',
      label: 'Timestamp',
    },
    {
      key: 'dimension',
      label: 'Resolution',
    },
    {
      key: 'frameRate',
      label: 'Framerate',
    },
  ],
  [
    {
      key: 'videoCodec',
      label: 'Video codec',
    },
    {
      key: 'videoBitrate',
      label: 'Bitrate',
    },
    {
      key: 'audioCodec',
      label: 'Audio codec',
    },
    {
      key: 'audioChannels',
      label: 'Audio channels',
    },
  ],
];

const styles = ({ spacing, typography }) => ({
  root: {
    padding: spacing(2),
    display: 'grid',
    gridTemplateColumns: 'auto auto 1fr 1fr 1fr auto',
    gap: spacing(2),
    alignItems: 'start',
    '& > .MuiAvatar-root': {
      display: 'flex',
      flexDirection: 'column',
      fontSize: typography.fontSize,
    },
    '& > .MuiListItemIcon-root': {
      minWidth: 'unset',
      marginLeft: spacing(-1),
      marginTop: spacing(-1),
    },
    '&:not(:last-child)': {
      marginBottom: spacing(2),
    },
    '& > *:first-child:not(.MuiListItemIcon-root)': {
      gridColumn: '1 / 2 span',
    },
    '& > *:last-child:nth-child(4)': {
      gridColumn: '5 / 2 span',
    },
  },
  paper: {
    '&:not(:last-child)': {
      marginBottom: spacing(1),
    },
  },
});

const FileCard = ({
  onQc = () => null,
  classes,
  itemType = {},
  checkbox = false,
  interactive = true,
}) => {
  const { hasQc } = useBaton(itemType);
  const item = React.useMemo(() => parseItem(itemType), [itemType]);
  return (
    <Paper className={classes.paper}>
      <ListItem button disableRipple className={classes.root}>
        {interactive && checkbox && (
          <ListItemIcon>
            <Checkbox />
          </ListItemIcon>
        )}
        <Avatar variant="square">
          {itemType.id.split('-').map((value) => (
            <span key={value}>{value}</span>
          ))}
        </Avatar>
        {cols.map((fields) => (
          <Column key={fields.reduce((a, { key }) => a + key, '')} data={item} fields={fields} />
        ))}
        {interactive && (
          <Box height={1} display="flex" flexDirection="column" justifyContent="space-between">
            <Tooltip title="QC file">
              <IconButton onClick={() => onQc(itemType)}>
                <BarChart />
              </IconButton>
            </Tooltip>
            <Tooltip disabled={!hasQc} title="Review file">
              <IconButton component={Link} to={`/search/${item.itemId}`}>
                <PlayArrow />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </ListItem>
    </Paper>
  );
};

export default withStyles(styles)(FileCard);
