import React from 'react';
import { InsertDriveFile as File } from '@mui/icons-material';
import { Box, Avatar } from '@mui/material';

const FilePreview = ({ preview, type, path }) => {
  let previewType;
  if (type.includes('image')) {
    previewType = 'image';
  } else if (type.includes('video')) {
    previewType = 'video';
  } else {
    previewType = 'other';
  }
  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {previewType === 'image' && <img src={preview} alt={path} />}
      {previewType === 'video' && (
        <video muted>
          <source src={preview} type={type} />
        </video>
      )}
      {previewType === 'other' && (
        <Avatar sx={{ alignSelf: 'center' }} variant="square">
          <File fontSize="large" />
        </Avatar>
      )}
    </Box>
  );
};

export default FilePreview;
