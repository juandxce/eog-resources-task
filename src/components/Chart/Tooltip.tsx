import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { formatDateToTime } from '../../utils';

const useStyles = makeStyles({
  chartTooltip: {
    padding: '12px',
    color: '#333',
    background: '#eee',
    borderRadius: '6px',
    border: '1px solid #333',
    display: 'block',
    width: '250px',
    fontWeight: 'bold',
  },
});

function ChartTooltip({ metrics, payload }: any) {
  const classes = useStyles();
  if (!payload || !payload.length) return null;
  const time = formatDateToTime(payload[0].payload.at);
  return (
    <div className={classes.chartTooltip}>
      <div>{`Time: ${time}`}</div>
      {payload.map((metric: any, index: number) => (
        <div key={index}>{`${metric.dataKey}: ${metric.value}${metrics[metric.dataKey].unit}`}</div>
      ))}
    </div>
  );
}

export default ChartTooltip;
