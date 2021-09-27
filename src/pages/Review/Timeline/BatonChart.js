import React from 'react';
import { Box } from '@mui/material';

import BatonTooltip from './BatonTooltip';

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

const BatonChart = ({ markers, duration, offset, onSeek = () => null }) => {
  const events = React.useMemo(() => {
    const splitter = duration / 100;
    return markers.reduce(
      (a, b) => {
        let index;
        const { startTimecode: start, endTimecode: end } = b;
        Object.entries(a).forEach(([k, v]) => {
          if (!v.length) index = k;
          if (index !== undefined) return;
          const overallCheck = v.every(({ startTimecode: s, endTimecode: e }) => {
            const equalityCheck = (start - s + end - e) / 2;
            // if difference is less than 1% of duration, move down one level
            if (equalityCheck < splitter && equalityCheck > 0 - splitter) return false;
            if (s < start && e > end) return false;
            if (s < start && e > start) return false;
            if (e > start && e < end) return false;
            return true;
          });
          if (overallCheck) index = k;
        });
        if (index === undefined) return { ...a, [Object.keys(a).length]: [b] };
        return { ...a, [index]: (a[index] || []).concat([b]) };
      },
      { 0: [] },
    );
  }, [markers, duration]);
  const level = 10;
  return (
    <Box sx={{ width: 1, borderRadius: 1, overflow: 'hidden' }}>
      {Object.entries(events).map(([index, marker]) => (
        <Box
          key={index}
          sx={{
            height: level,
            backgroundColor: 'background.default',
            position: 'relative',
            ':not(:first-of-type)': {
              marginTop: '2px',
            },
          }}
        >
          {marker.map((entry) => {
            const { startTimecode, endTimecode, severity } = entry;
            const left = (startTimecode / duration) * 100;
            const width = ((endTimecode - startTimecode) / duration) * 100;
            const onClick = () => onSeek(startTimecode);
            return (
              <BatonTooltip entry={entry} offset={offset} onClick={onClick} key={startTimecode}>
                <Box
                  onClick={onClick}
                  sx={{
                    cursor: 'pointer',
                    borderRadius: 1,
                    backgroundColor: COLOR_MAP(severity),
                    position: 'absolute',
                    left: `${left}%`,
                    width: `${width > 1 ? width : 1}%`,
                    height: level,
                  }}
                />
              </BatonTooltip>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};

export default BatonChart;
