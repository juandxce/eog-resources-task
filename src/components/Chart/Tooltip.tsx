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

const ChartTooltip = ({ metrics, payload }: any) => {
  const classes = useStyles();
  if(!payload || !payload.length) return null;
  return(
  <div className={classes.chartTooltip} >
    <div>{`Time: ${new Date(payload[0].payload.at).toLocaleTimeString()}`}</div>
    {payload.map((metric: any, index: number) => (
      <div key={index}>
        {`${metric.dataKey}: ${metric.value}${metrics[metric.dataKey].unit}`}
      </div>
    ))}
  </div>);
}

export default ChartTooltip;