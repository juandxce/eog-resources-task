import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import ChartTooltip from './Tooltip';
import { useSubscription } from '@apollo/react-hooks';
import { newMeasurementSubscription } from '../../store/api/subscriptions';
import { UPDATED_METRIC_VALUE } from '../../store/actions';
import { REPLACE_LAST_CHART_VALUE } from '../../store/actions';

const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

const Chart = (props: any) => {
  const classes = useStyles();
  const data = props.chartData;
  const formatDateToTime = (time: any) => {
    return new Date(time).toLocaleTimeString();
  }

  let measurementUpdate;
  const { data: info } = useSubscription(newMeasurementSubscription);
  if(info && (info.newMeasurement)) {
    measurementUpdate = info.newMeasurement;
    const hasData = data.length;
    const lastDataItem = (!!hasData && data[data.length-1]) || {};
    const haveDifferentValues = measurementUpdate.value !== lastDataItem[measurementUpdate.metric];
    const haveSameTime = measurementUpdate.at === lastDataItem.at;
    const isActive = props.metrics[measurementUpdate.metric].active;

    if(isActive && hasData && haveSameTime && haveDifferentValues ) {
      props.dispatch({ type: UPDATED_METRIC_VALUE, payload: measurementUpdate })
    } else if(isActive && hasData && (measurementUpdate.at > lastDataItem.at)){
      props.dispatch({ type: REPLACE_LAST_CHART_VALUE, payload: measurementUpdate })
    }
  }

  return (
    <div className={classes.card}>
      <LineChart width={800} height={800} data={data}>
        <YAxis label={{ angle: -90, value: 'values' }} />
        <XAxis tickFormatter={formatDateToTime} label={{ value: 'time' }} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
        <Tooltip content={<ChartTooltip metrics={props.metrics} />} />
        <Legend />
        {props.metrics && Object.keys(props.metrics).map((metric: any, index: number) => (
        <Line type="monotone" dot={false} key={metric} dataKey={metric} stroke={props.colors[index] || 'orange'} />
        ))}
      </LineChart>
    </div>
  );
};
export default Chart;