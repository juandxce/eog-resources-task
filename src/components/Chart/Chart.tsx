import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import ChartTooltip from './Tooltip';
import { NewMeasurementSubscription } from '../../store/api/subscriptions';
import { connect } from 'react-redux';
import { getActiveMetrics } from '../../store/reducers/MetricsReducer';

import { useDispatch, useSelector } from 'react-redux';
import { SET_NEW_LATEST_VALUE } from '../../store/actions';
import { Subscription } from 'react-apollo';
import { addErrorMessage } from '../../utils';
import { formatDateToTime } from '../../utils';

function Chart (props: any) {
  // shouldComponentUpdate(nextprops: any, nextState: any) {
  //   const hasChartData = !!props.chartData[props.chartData.length - 1];
  //   const receivedNewChartData = props.chartData.length !== nextprops.chartData.length;
  //   const shouldComponentUpdate =
  //     receivedNewChartData ||
  //     (hasChartData &&
  //       props.chartData[props.chartData.length - 1].at !==
  //         nextprops.chartData[nextprops.chartData.length - 1].at);
  //   return shouldComponentUpdate;
  // }
  const dispatch = useDispatch();
  const data = props.chartData;
  const chartHeight = (window && window.innerHeight) || 600;

  return (
    <div style={{ width: '75vw', minWidth: '700px' }}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={data}>
          <YAxis label={{ angle: -90, value: 'values', position: 'insideLeft' }} />
          <XAxis tickFormatter={formatDateToTime} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
          <Tooltip content={<ChartTooltip metrics={props.metrics} />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          {props.metrics &&
            props.activeMetrics.map((metric: any, index: number) => (
              <Line
                type="monotone"
                dot={false}
                key={metric}
                dataKey={metric}
                stroke={props.colors[index] || 'orange'}
              />
            ))}
        </LineChart>
      </ResponsiveContainer>

      {/* Handle the subscriptions incoming data */}
      {/* <Subscription subscription={NewMeasurementSubscription}>
        {({ error, data: newInfo }: any) => {
          if (error) {
            addErrorMessage(error);
            return null;
          }
          if (!newInfo) return null;
          if (newInfo.newMeasurement) {
            const measurementUpdate = newInfo.newMeasurement;
            const hasData = data.length;
            const lastDataItem = (!!hasData && data[data.length - 1]) || {};
            const haveDifferentValues = measurementUpdate.value !== lastDataItem[measurementUpdate.metric];
            const haveSameTime = measurementUpdate.at === lastDataItem.at;
            const isActive = props.metrics[measurementUpdate.metric].active;

            if (!isActive || !hasData) return null;
            // update the latest value for that metric (only in toggleableIndicators)
            props.dispatch({
              type: SET_NEW_LATEST_VALUE,
              payload: { [measurementUpdate.metric]: measurementUpdate.value },
            });
            if (haveSameTime && haveDifferentValues) {
              // update last chart points value
              dispatch(actions.UPDATED_METRIC_VALUE(measurementUpdate));
            } else if (measurementUpdate.at > lastDataItem.at) {
              // create a new chart points value obj at the end
              dispatch(actions.REPLACE_LAST_CHART_VALUE(measurementUpdate));
            }
          }
          return null;
        }}
      </Subscription> */}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    metrics: state.metrics,
    activeMetrics: getActiveMetrics(state),
    colors: state.colors,
    chartData: state.chartData.data,
  };
};

const ConnectedChart = connect(mapStateToProps)(Chart);

export default ConnectedChart;
