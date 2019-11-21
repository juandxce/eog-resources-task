import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect, useDispatch } from 'react-redux';
import { getMetricData, getLastKnownMeasurement } from '../../store/api/metrics';
import { addErrorMessage } from '../../utils';
import { actions as chartActions } from '../../store/reducers/ChartReducer';
import { actions as metricsActions } from '../../store/reducers/MetricsReducer';
import { useQuery } from 'react-apollo';
import { getMultipleMeasurementsQuery, getMetricsQuery, getLastKnownMeasurementQuery } from '../../store/api/queries';

const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

function Dashboard({ dispatch, metrics, ...props }: any) {
  const classes = useStyles();

  const result = useQuery(getMetricsQuery, {});
  console.log('result', result);
  const { data, error } = result;

  useEffect(() => {
    console.log('USING IT', result);

    if (error) {
      dispatch(metricsActions.weatherApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    const { getMetrics } = data;
    console.log('DATA', data);

    console.log('DISPA', getMetrics);
    dispatch(metricsActions.RECEIVED_METRICS_TAGS(getMetrics));

    Promise.all(
      getMetrics.map((metric: any) => {
        return getLastKnownMeasurement(metric);
      }),
    )
      .then((data: any) => {
        console.log('LAST MEASUREMENTS:', data);
        dispatch(metricsActions.RECEIVED_METRICS_LAST_MEASUREMENTS(data));
      })
      .catch(addErrorMessage);
  }, [dispatch, data, error]);

  useEffect(() => {
    console.log('USING SECOND');
    const after = new Date(); // get the time from 30 minutes ago
    after.setMinutes(after.getMinutes() - 30);
    console.log('metrics', metrics);
    getMetricData(
      Object.keys(metrics).filter((metric: any) => metrics[metric].active),
      after.getTime(),
    )
      .then((allData: any) => {
        const formattedData: any = [];

        for (let metric of allData) {
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
      })
      .catch(addErrorMessage);
  }, [metrics, dispatch]);

  return (
    <div className={classes.card}>
      <Sidebar />
      <Chart />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  console.log('state', state);
  return {
    metrics: state.metrics,
  };
};

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

export default ConnectedDashboard;
