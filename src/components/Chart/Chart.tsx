import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import ChartTooltip from './Tooltip';

const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

export default (props: any) => {
  const classes = useStyles();
  const data = props.chartData;
  console.log('data???????', props);

  return (
    <div className={classes.card}>
      <LineChart width={800} height={800} data={data}>
        <YAxis label={{ angle: -90, value: 'values' }} />
        <XAxis label={{ value: 'time' }} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
        <Tooltip content={<ChartTooltip />} />
        <Legend />
        {props.metrics && Object.keys(props.metrics).map((metric: any, index: number) => (
        <Line type="monotone" dot={false} key={metric} dataKey={metric} stroke={props.colors[index] || 'orange'} />
        ))}
      </LineChart>
    </div>
  );
};
