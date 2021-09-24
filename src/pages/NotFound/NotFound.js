import React from 'react';
import { withStyles } from '@mui/styles';
import { Typography } from '@mui/material';

const styles = () => ({
  logo: {
    text: '100%',
    textAlign: 'center',
  },
});

function NotFound({ classes }) {
  return <Typography className={classes.text}>Page does not exist</Typography>;
}

export default withStyles(styles)(NotFound);
