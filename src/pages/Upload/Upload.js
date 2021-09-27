/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { useUploadFiles } from '@vidispine/vdt-react';
import { Box, List, ListSubheader, Divider, Button } from '@mui/material';

import FileRow from './FileRow';

const Upload = ({
  responseTimeout = 5000,
  DragActiveText = 'Drop files here',
  DragInactiveText = 'Drop files or click to open',
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = React.useCallback(
    () => enqueueSnackbar('Import started', { variant: 'success' }),
    [enqueueSnackbar],
  );
  const { onAddFiles, onUpload, onRemoveFile, files } = useUploadFiles({});
  const [isUploading, setIsUploading] = React.useState(false);
  const queue = files.filter((file) => !file.progress);
  const uploaded = files.filter((file) => file.progress);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      onAddFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const onSubmit = React.useCallback(
    (submitProps) => {
      setIsUploading(true);
      onUpload(submitProps)
        .then((result) => {
          setIsUploading(false);
          setTimeout(() => {
            if (onSuccess) onSuccess(result);
          }, responseTimeout);
        })
        .catch(() => {
          setIsUploading(false);
        });
    },
    [onSuccess, onUpload, responseTimeout],
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          cursor: 'pointer',
          height: files.length < 1 ? '50vh' : 50,
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.3s',
          borderWidth: 1,
          borderColor: 'divider',
          borderStyle: 'solid',
          borderRadius: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: isDragActive ? 'background.paper' : 'background.default',
        }}
        {...getRootProps()}
      >
        <Box>{isDragActive ? DragActiveText : DragInactiveText}</Box>
        <input {...getInputProps()} />
      </Box>
      <Box sx={{ padding: 2 }}>
        {queue.length > 0 && (
          <List>
            <ListSubheader sx={{ backgroundColor: 'background.default' }}>Queued</ListSubheader>
            {queue.map(({ file }, i) => (
              <FileRow key={file.name} file={file} onDelete={onRemoveFile(i)} />
            ))}
          </List>
        )}
        {uploaded.length > 0 && (
          <List>
            <ListSubheader sx={{ backgroundColor: 'background.default' }}>Uploaded</ListSubheader>
            {uploaded.map(({ file, progress }, i) => (
              <FileRow
                key={file.name}
                file={file}
                onDelete={onRemoveFile(queue.length + i)}
                progress={progress}
                isUploading={isUploading}
              />
            ))}
          </List>
        )}
      </Box>
      <Divider />
      <Box sx={{ padding: 2, width: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" disabled={!queue.length || isUploading} onClick={onSubmit}>
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default Upload;
