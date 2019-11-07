import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
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
