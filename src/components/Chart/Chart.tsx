import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import ChartTooltip from './Tooltip';
import { useSubscription } from '@apollo/react-hooks';
import { newMeasurementSubscription } from '../../store/api/subscriptions';
import { UPDATED_METRIC_VALUE } from '../../store/actions';
import { REPLACE_LAST_CHART_VALUE } from '../../store/actions';
import debounceRender from 'react-debounce-render';
const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

export default (props: any) => {
  const classes = useStyles();
  const data = props.chartData;

  let latestValue;
  const { data: info } = useSubscription(newMeasurementSubscription);
  if(info && (info.newMeasurement)) {
    latestValue = info.newMeasurement;
    if(data.length && (latestValue.at === data[data.length-1].at)){
      props.dispatch({ type: UPDATED_METRIC_VALUE, payload: latestValue })
    }
    else if(data.length && (latestValue.at > data[data.length-1].at)){
      props.dispatch({ type: REPLACE_LAST_CHART_VALUE, payload: latestValue })
    }
  }

  return (
    <div className={classes.card}>
      <LineChart width={800} height={800} data={data}>
        <YAxis label={{ angle: -90, value: 'values' }} />
        <XAxis label={{ value: 'time' }} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
        <Tooltip content={<ChartTooltip metrics={props.metrics} />} />
        <Legend />
        {props.metrics && Object.keys(props.metrics).map((metric: any, index: number) => (
        <Line type="monotone" dot={false} key={metric} dataKey={metric} stroke={props.colors[index] || 'orange'} />
        ))}
      </LineChart>
    </div>
  );
};
