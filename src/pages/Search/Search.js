/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import debounce from 'lodash.debounce';
import { useSearchItem } from '@vidispine/vdt-react';
import { Box, Tab, Tabs, Paper, CircularProgress } from '@mui/material';

import JobList from '../Job/JobList';
import FileList from './FileList';
import { useSplitters } from '../../context';
import { Split, Search as SearchInput } from '../../components';
import { useSearch } from '../../hooks';

const defaultState = {
  itemSearchDocument: {
    // field: [{ name: '__shape_size', value: [{ value: '*' }] }],
  },
  queryParams: {
    content: ['shape', 'metadata', 'thumbnail'],
    field: ['originalFilename:title', 'itemId', 'title'],
    methodMetadata: [{ key: 'format', value: 'SIGNED-AUTO' }],
  },
  rowsPerPage: 10,
};

const Search = () => {
  const [query, setQuery] = React.useState('');
  const { splitters, setSplitter } = useSplitters();

  const { state: itemState, ...itemActions } = useSearch(defaultState);
  const { itemListType = {}, isLoading, isError, onRefresh } = useSearchItem(itemState);
  const { page } = itemState;

  const debouncedItemQuery = React.useRef(debounce(itemActions.setSearchText, 500)).current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => isError && setTimeout(onRefresh, 5000), [isError]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => debouncedItemQuery(`*${query.toLowerCase()}*`), [query]);

  return (
    <Box height={1} display="flex" flexDirection="column">
      <SearchInput onChange={setQuery} value={query} />
      <Box mt={2} flexGrow={1} overflow="hidden">
        <Split
          style={{ flexDirection: 'row' }}
          direction="horizontal"
          minSize={375}
          sizes={splitters.vertical}
          gutterSize={20}
          onDragEnd={(sizes) => setSplitter('horizontal', sizes)}
        >
          <Box display="grid" gridTemplateRows="auto 1fr" gap={2}>
            <Paper>
              <Tabs value="input">
                <Tab disableRipple value="input" label={`Files (${itemListType.hits || 0})`} />
                {isLoading && (
                  <Tab
                    disabled
                    style={{ minWidth: 'unset' }}
                    icon={<CircularProgress size={20} />}
                  />
                )}
              </Tabs>
            </Paper>
            <Box overflow="hidden">
              <FileList page={page} itemListType={itemListType} {...itemActions} />,
            </Box>
          </Box>
          <JobList />
        </Split>
      </Box>
    </Box>
  );
};

export default Search;
