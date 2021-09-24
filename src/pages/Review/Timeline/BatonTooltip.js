import React from 'react';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { formatSecondsPrecise } from '@vidispine/vdt-js';

const COLOR_MAP = (key) => {
  switch (key.toLowerCase()) {
    case 'fatal':
    case 'serious':
      return 'error.main';
    case 'warning':
      return 'warning.main';
    case 'info':
      return 'info.main';
    default:
      return 'text.secondary';
  }
};

const BatonTooltip = ({ entry, offset, onClick, children }) => {
  const { startTimecode, endTimecode, synopsis, severity, description } = entry;
  const startSeconds = (startTimecode - offset).toFixed(2);
  const endSeconds = (endTimecode - offset).toFixed(2);
  return (
    <Tooltip
      title={
        <Box
          sx={{
            maxHeight: 500,
            paddingRight: 0,
            overflow: 'auto',
            '&::WebkitScrollbar': {
              WebkitAppearance: 'none',
              width: 8,
            },
            '&::WebkitScrollbarThumb': {
              borderRadius: 1,
              backgroundColor: 'divider',
            },
          }}
        >
          <Box sx={{ cursor: 'pointer' }} onClick={() => onClick(startSeconds)}>
            <Grid container>
              <Grid item container xs={3} direction="column">
                <Typography variant="subtitle2" color={COLOR_MAP(severity)}>
                  {severity}
                </Typography>
                <Typography variant="caption">
                  {formatSecondsPrecise(startSeconds).toSmpte()}
                </Typography>
                <Typography variant="caption">
                  {formatSecondsPrecise(endSeconds).toSmpte()}
                </Typography>
              </Grid>
              <Grid item container xs={9} direction="column">
                <Typography variant="subtitle2">{synopsis}</Typography>
                <Typography variant="caption">{description}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      }
    >
      {children}
    </Tooltip>
  );
};

export default BatonTooltip;
