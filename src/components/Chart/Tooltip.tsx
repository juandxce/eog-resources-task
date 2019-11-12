import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chartTooltip: {
    padding: '12px',
    color: '#333',
    background: '#eee',
    borderRadius: '6px',
    border: '1px solid #333',
    display: 'block',
    width: '250px',
    fontWeight: 'bold'
  }
});

const ChartTooltip = ({ metrics }: any) => {
  const classes = useStyles();
  return(
  <div className={classes.chartTooltip} >
    {Object.keys(metrics)
    .filter(metric => metrics[metric].active)
    .map((metric: any) => (
      <div>{`${metric}: ${metrics[metric].value}${metrics[metric].unit}`}</div>
    ))}
  </div>);
}

export default ChartTooltip;