import React from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import { GetItem } from '@vidispine/vdt-react';

import BatonTable from './BatonTable';
import BatonPlayer from './BatonPlayer';
import { BatonTimeline } from './Timeline';

const playerQueryParams = {
  content: ['thumbnail', 'shape'],
  methodMetadata: [{ key: 'format', value: 'SIGNED-AUTO' }],
  'noauth-url': true,
  sampleRate: 'PAL',
};
const batonQueryParams = { p: ['shape.id', 'shape.tag', 'id'] };

export default () => {
  const { itemId } = useParams();
  const ref = React.createRef();
  const [highlight, setHighlight] = React.useState({ itemId });
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <GetItem itemId={itemId} queryParams={playerQueryParams}>
          <BatonPlayer playerRef={ref} />
        </GetItem>
        <BatonTimeline highlight={highlight} videoEl={ref} />
      </Grid>
      <Grid item xs={6}>
        <GetItem itemId={itemId} queryParams={batonQueryParams}>
          <BatonTable onHighlight={setHighlight} />
        </GetItem>
      </Grid>
    </Grid>
  );
};
