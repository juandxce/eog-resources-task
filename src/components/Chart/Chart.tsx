import React, { useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import ChartTooltip from './Tooltip';
import { NewMeasurementSubscription } from '../../store/api/subscriptions';
import { connect, useDispatch } from 'react-redux';
import { actions as metricsActions, getActiveMetrics } from '../../store/reducers/MetricsReducer';
import { actions as chartActions } from '../../store/reducers/ChartReducer';
import { actions as latestValuesActions } from '../../store/reducers/LatestMetricValuesReducer';
import { getMultipleMeasurementsQuery } from '../../store/api/queries';
import { useQuery } from 'urql';
import { Subscription } from 'react-apollo';
import { formatDateToTime } from '../../utils';
import { IState } from '../../store';
import { Metrics, KeyValuePairs } from '../../store/reducers/MetricsReducer';
import { SubscriptionResult } from '@apollo/react-common';

export type ChartProps = {
  metrics: Metrics;
  chartData: Array<KeyValuePairs>;
  activeMetrics: Array<string>;
  colors: Array<string>;
};

// render only if the 'at' properties are different
const hasSameTime = (prevProps: ChartProps, nextProps: ChartProps) => {
  let shouldNotRender = false;
  if (prevProps.chartData.length && nextProps.chartData.length) {
    const timeBefore = prevProps.chartData[prevProps.chartData.length - 1].at;
    const timeAfter = nextProps.chartData[prevProps.chartData.length - 1].at;
    shouldNotRender = timeBefore === timeAfter;
  }

  return shouldNotRender;
};

const Chart = React.memo(function Chart({ metrics, chartData, activeMetrics, colors }: ChartProps) {
  const dispatch = useDispatch();
  const data = chartData;

  const chartHeight = (window && window.innerHeight) || 600;

  const now = new Date(); // get the time from 30 minutes ago
  now.setMinutes(now.getMinutes() - 30);
  const after = now.getTime();

  const metricsToQuery = Object.keys(metrics)
    .filter(metric => metrics[metric].active)
    .map(key => ({
      metricName: key,
      after,
    }));
  const pause = !!chartData.length;

  const [resultMM] = useQuery({
    query: getMultipleMeasurementsQuery,
    variables: {
      input: metricsToQuery,
    },
    pause,
  });
  const { data: dataMM, error: errorMM } = resultMM;

  useEffect(() => {
    if (errorMM) {
      dispatch(metricsActions.apiErrorReceived({ error: errorMM.message }));
      return;
    }
    if (!dataMM) return;
    const { getMultipleMeasurements } = dataMM;

    const formattedData: Array<KeyValuePairs> = [];

    for (let metric of getMultipleMeasurements) {
      metric.measurements.forEach((measurement: { value: number; at: number }, i: number) => {
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
            Object.keys(metrics).map((metric: string, index: number) => {
              if (activeMetrics.indexOf(metric) === -1) {
                return null;
              }
              return (
                <Line type="monotone" dot={false} key={metric} dataKey={metric} stroke={colors[index] || 'orange'} />
              );
            })}
        </LineChart>
      </ResponsiveContainer>

      {/* Handle the subscriptions incoming data */}
      <Subscription subscription={NewMeasurementSubscription}>
        {({ error, data: newInfo }: SubscriptionResult) => {
          if (error) {
            dispatch(metricsActions.apiErrorReceived({ error: error.message }));
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

            if (!hasData) return null;

            // update the latest value for that metric (only in toggleableIndicators)
            if (isActive) {
              dispatch(
                latestValuesActions.SET_NEW_LATEST_VALUE({
                  metric: measurementUpdate.metric,
                  value: measurementUpdate.value,
                }),
              );
            }

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
      </Subscription>
    </div>
  );
}, hasSameTime);

const mapStateToProps = (state: IState) => {
  return {
    metrics: state.metrics,
    activeMetrics: getActiveMetrics(state),
    colors: state.colors,
    chartData: state.chartData,
  };
};

const ConnectedChart = connect(mapStateToProps)(Chart);

export default ConnectedChart;
