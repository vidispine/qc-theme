import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useApi } from '@vidispine/vdt-react';
import { shape as ShapeApi, bulkymetadata as BulkyApi } from '@vidispine/vdt-api';
import { formatTimeCodeType, formatTimeCodeText } from '@vidispine/vdt-js';

import BatonChart from './BatonChart';

const useBaton = ({ itemId, shapeId, testplan }) => {
  const { request: getShape, data = {} } = useApi(ShapeApi.getShape);
  React.useEffect(() => {
    if (!itemId || !shapeId) return;
    getShape({ itemId, shapeId });
  }, [itemId, shapeId, getShape]);

  const duration = React.useMemo(() => {
    const { containerComponent: { duration: timeCode = {} } = {} } = data;
    return formatTimeCodeType(timeCode).toSeconds();
  }, [data]);

  const startOfMedia = React.useMemo(() => {
    const { containerComponent = {} } = data;
    const { timeCodeTimeBase = {}, startTimecode = 0, dropFrame = false } = containerComponent;
    return formatTimeCodeType(
      { samples: startTimecode, timeBase: timeCodeTimeBase },
      { dropFrame },
    ).toSeconds();
  }, [data]);

  const { request: getBulkyMetadata, data: metadata = {} } = useApi(BulkyApi.getShapeBulkyMetadata);
  React.useEffect(() => {
    if (!testplan || !shapeId || !itemId) return;
    getBulkyMetadata({ itemId, shapeId, key: `baton_error_${testplan}` });
  }, [itemId, shapeId, testplan, getBulkyMetadata]);

  const events = React.useMemo(() => {
    const { field = [] } = metadata;
    const timedEvents = field.filter(({ start, end }) => start !== '-INF' && end !== '+INF');
    const parsedEvents = timedEvents.reduce((a, { maps = {}, start, end, ...params }) => {
      const startTimecode = formatTimeCodeText(start).toSeconds() - startOfMedia;
      const endTimecode = formatTimeCodeText(end).toSeconds() - startOfMedia;
      const { map = [] } = maps;
      const entries = map.reduce((b, { entry = [] }) => {
        const info = entry.reduce((c, { key, value }) => ({ ...c, [key]: value }), {});
        return [...b, { ...info, ...params, startTimecode, endTimecode }];
      }, []);
      return [...a, ...entries];
    }, []);
    const groupedEvents = parsedEvents.reduce(
      (a, b) => ({ ...a, [b.item]: (a[b.item] || []).concat(b) }),
      {},
    );
    return groupedEvents;
  }, [metadata, startOfMedia]);

  return { duration, startOfMedia, events };
};

const BatonTimeline = ({ videoEl, highlight }) => {
  const { duration, startOfMedia, events } = useBaton(highlight);
  const onSeek = React.useCallback(
    (seconds) => {
      // eslint-disable-next-line
      videoEl.current.player.videoEl.currentTime = seconds;
    },
    [videoEl],
  );
  if (!Object.keys(events).length) return null;
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: 1,
        paddingBottom: 2,
        marginTop: 1,
        borderRadius: 1,
      }}
    >
      <Typography variant="subtitle1">Baton report timeline</Typography>
      {Object.entries(events).map(([label, markers]) => (
        <Box key={label}>
          <Divider textAlign="left">
            <Typography variant="caption">{label}</Typography>
          </Divider>
          <BatonChart onSeek={onSeek} markers={markers} duration={duration} offset={startOfMedia} />
        </Box>
      ))}
    </Box>
  );
};

export default BatonTimeline;
