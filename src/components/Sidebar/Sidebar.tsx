import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleableChartIndicator from '../ToggleableChartIndicator';
const useStyles = makeStyles({
  card: {
    width: '20vw',
  },
});

export default (props: any) => {
  const classes = useStyles();
  console.log('props.metrics', props.metrics);
  
  return (
    <div className={classes.card}>
      {Object.keys(props.metrics).map((metric: any, index: number) => (
        <ToggleableChartIndicator background={props.colors[index]} key={index} label={metric} active={props.metrics[metric].active} dispatch={props.dispatch} />
      ))}
    </div>
  );
};
