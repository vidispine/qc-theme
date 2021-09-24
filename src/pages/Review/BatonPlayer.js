import React from 'react';
import { VideoPlayer } from '@vidispine/vdt-videojs-react';
import '@vidispine/vdt-videojs-react/dist/index.css';
import { filterShapeSource } from '@vidispine/vdt-js';

const BatonPlayer = ({ itemType, isLoading, playerRef }) => {
  const previewSources = React.useMemo(
    () => filterShapeSource(itemType, { allowedMimeTypes: ['video/mp4'] }),
    [itemType],
  );
  if (isLoading) return null;
  return <VideoPlayer controls sources={previewSources} ref={playerRef} timecode />;
};

export default BatonPlayer;
