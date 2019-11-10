import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      Chart goes here
    </div>
  );
};
