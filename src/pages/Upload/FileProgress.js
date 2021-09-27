import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const FileProgress = ({ value }) => (
  <Box display="flex" alignItems="center">
    <Box width="100%" mr={1}>
      <LinearProgress variant="determinate" value={value} />
    </Box>
    <Box minWidth={35}>
      {value && (
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      )}
    </Box>
  </Box>
);

export default FileProgress;
