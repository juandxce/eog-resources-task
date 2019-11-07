import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';

const useStyles = makeStyles({
  card: {
    width: '100vw',
  },
});

export default () => {
  const classes = useStyles();
  useEffect(() => {
    console.log('mounted');
  }, []);

  return (
    <div className={classes.card}>
      <Sidebar />
      <Chart />
    </div>
  );
};
