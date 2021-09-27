import React from 'react';
import parseFileSize from 'filesize';
import { Delete, CheckCircle } from '@mui/icons-material';
import { ListItem, ListItemText, ListItemAvatar, IconButton } from '@mui/material';

import FilePreview from './FilePreview';
import FileProgress from './FileProgress';

const calculatePercentage = (progress) => {
  if (!progress) return 0;
  const { transferedBytes, totalBytes } = progress;
  if (!transferedBytes || !totalBytes) return 0;
  return Math.floor((progress.transferedBytes / progress.totalBytes) * 100);
};

const FileRow = ({ file: { type, preview, path, size }, progress, onDelete, isUploading }) => {
  const progressPercent = calculatePercentage(progress);
  const isComplete = progressPercent === 100;
  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton disabled={isUploading} edge="end" onClick={onDelete}>
            {isComplete && <CheckCircle />}
            {!isComplete && <Delete />}
          </IconButton>
        }
      >
        <ListItemAvatar sx={{ marginRight: 2, width: 60, height: 60 }}>
          <FilePreview preview={preview} type={type} path={path} />
        </ListItemAvatar>
        <ListItemText primary={path} secondary={parseFileSize(size)} />
      </ListItem>
      {progress && <FileProgress value={progressPercent} />}
    </>
  );
};

export default FileRow;
