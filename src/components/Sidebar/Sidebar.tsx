import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '20vw',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.card}>
      Sidebar goes here
    </div>
  );
};
