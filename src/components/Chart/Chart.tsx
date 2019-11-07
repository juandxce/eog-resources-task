import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getMetricTags } from '../../store/API/metrics';

const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

export default () => {
  const classes = useStyles();
  useEffect(() => {
    console.log('mounted');
    getMetricTags();
  }, []);

  return (
    <div className={classes.card}>
      Chart goes here
    </div>
  );
};
