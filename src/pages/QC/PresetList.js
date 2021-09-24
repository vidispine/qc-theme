/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from '@mui/material';

import { Search } from '../../components';
import { usePresets, useConfiguration } from '../../context';

import Preset from './PresetCard';

export const PresetList = ({ entity, selected, setSelected, resourceId }) => {
  const { presets, onSearch } = usePresets();
  const onClick = (name) => {
    if (selected.includes(name)) setSelected([]);
    else setSelected([name]);
  };

  return (
    <Box overflow="hidden" flexGrow={1} display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        position="sticky"
        top={0}
        zIndex={10}
        bgcolor="background.default"
      >
        <Search onChange={onSearch} placeholder="Search profiles..." />
      </Box>
      <Box mt={1}>
        {presets.map((preset) => (
          <Preset
            key={preset}
            entity={entity}
            preset={preset}
            onClick={onClick}
            selected={selected}
            resourceId={resourceId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PresetList;
