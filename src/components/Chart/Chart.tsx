import React, { useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import ChartTooltip from './Tooltip';
import { NewMeasurementSubscription } from '../../store/api/subscriptions';
import { connect, useDispatch } from 'react-redux';
import { getActiveMetrics } from '../../store/reducers/MetricsReducer';
import { actions as metricsActions } from '../../store/reducers/MetricsReducer';
import { actions as chartActions } from '../../store/reducers/ChartReducer';
import { actions as latestValuesActions } from '../../store/reducers/LatestMetricValuesReducer';
import { getMultipleMeasurementsQuery } from '../../store/api/queries';
import { useQuery } from 'urql';
import { Subscription } from 'react-apollo';
import { addErrorMessage } from '../../utils';
import { formatDateToTime } from '../../utils';

function Chart({ metrics, ...props }: any) {
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

  // move it to another component
  const now = new Date(); // get the time from 30 minutes ago
  now.setMinutes(now.getMinutes() - 30);
  const after = now.getTime();

  const metricsToQuery = Object.keys(metrics)
    .filter((metric: any) => metrics[metric].active)
    .map((key: any) => ({
      metricName: key,
      after,
    }));
  const pause = !!props.chartData.length;
  console.log('pause', pause);

  const [SR] = useQuery({
    query: getMultipleMeasurementsQuery,
    variables: {
      input: metricsToQuery,
    },
    pause,
  });
  console.log('SR', SR);
  const { data: dataMM, error: errorMM } = SR;
  console.log('dataMM', { dataMM, errorMM });

  useEffect(() => {
    if (errorMM) {
      dispatch(metricsActions.apiErrorReceived({ error: errorMM.message }));
      return;
    }
    if (!dataMM) return;
    const { getMultipleMeasurements } = dataMM;
    // console.log('MMD', dataMM);

    const formattedData: any = [];

    for (let metric of getMultipleMeasurements) {
      metric.measurements.map((measurement: any, i: number) => {
        if (!formattedData[i]) {
          formattedData[i] = {};
        }
        formattedData[i][metric.metric] = measurement.value;
        if (!formattedData[i].at) {
          formattedData[i].at = measurement.at;
        }
      });
    }
    dispatch(chartActions.RECEIVED_CHART_METRICS(formattedData));
  }, [dispatch, dataMM, errorMM]);

  return (
    <div style={{ width: '75vw', minWidth: '700px' }}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <LineChart data={data}>
          <YAxis label={{ angle: -90, value: 'values', position: 'insideLeft' }} />
          <XAxis tickFormatter={formatDateToTime} dataKey="at" interval="preserveStartEnd" minTickGap={20} />
          <Tooltip content={<ChartTooltip metrics={metrics} />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Legend />
          {metrics &&
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
            const isActive = metrics[measurementUpdate.metric].active;

            if (!isActive || !hasData) return null;
            // update the latest value for that metric (only in toggleableIndicators)
            dispatch(latestValuesActions.SET_NEW_LATEST_VALUE({ [measurementUpdate.metric]: measurementUpdate.value }));
            if (haveSameTime && haveDifferentValues) {
              // update last chart points value
              dispatch(chartActions.UPDATED_METRIC_VALUE(measurementUpdate));
            } else if (measurementUpdate.at > lastDataItem.at) {
              // create a new chart points value obj at the end
              dispatch(chartActions.REPLACE_LAST_CHART_VALUE(measurementUpdate));
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
