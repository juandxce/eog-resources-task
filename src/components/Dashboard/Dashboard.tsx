import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect, useDispatch } from 'react-redux';
import { getLastKnownMeasurement } from '../../store/api/metrics';
import { addErrorMessage } from '../../utils';
import { actions as chartActions } from '../../store/reducers/ChartReducer';
import { actions as metricsActions } from '../../store/reducers/MetricsReducer';
// stopped using it because of https://github.com/apollographql/react-apollo/issues/3270
// import { useQuery } from 'react-apollo';
import { getMultipleMeasurementsQuery, getMetricsQuery, getLastKnownMeasurementQuery } from '../../store/api/queries';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

function Dashboard({ dispatch }: any) {
  const classes = useStyles();

  const [result] = useQuery({ query: getMetricsQuery });
  const { data, error } = result;

  useEffect(() => {
    if (error) {
      dispatch(metricsActions.apiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;

    const { getMetrics } = data;
    dispatch(metricsActions.RECEIVED_METRICS_TAGS(getMetrics));

    Promise.all(getMetrics.map((metric: any) => getLastKnownMeasurement(metric)))
      .then((data: any) => {
        dispatch(metricsActions.RECEIVED_METRICS_LAST_MEASUREMENTS(data));
      })
      .catch(addErrorMessage);
  }, [dispatch, data, error]);
  // move it to another component
  // const now = new Date(); // get the time from 30 minutes ago
  // now.setMinutes(now.getMinutes() - 30);
  // const after = now.getTime();

  // const metricsToQuery = Object.keys(metrics)
  //   .filter((metric: any) => metrics[metric].active)
  //   .map((key: any) => ({
  //     metricName: key,
  //     after,
  //   }));

  // const [SR] = useQuery({
  //   query: getMultipleMeasurementsQuery,
  //   variables: {
  //     input: metricsToQuery,
  //   },
  // });
  // // console.log('SR', SR);
  // const { data: dataMM, error: errorMM } = SR;
  // // console.log('dataMM', { dataMM, errorMM, loadingMM });

  // useEffect(() => {
  //   console.log('entering the second effect');
  //   if (errorMM) {
  //     dispatch(metricsActions.apiErrorReceived({ error: errorMM.message }));
  //     return;
  //   }
  //   if (!dataMM) return;
  //   const { getMultipleMeasurements } = dataMM;
  //   console.log('MMD', dataMM);

  //   // const formattedData: any = [];

  //   // for (let metric of getMultipleMeasurements) {
  //   //   metric.measurements.map((measurement: any, i: number) => {
  //   //     if (!formattedData[i]) {
  //   //       formattedData[i] = {};
  //   //     }
  //   //     formattedData[i][metric.metric] = measurement.value;
  //   //     if (!formattedData[i].at) {
  //   //       formattedData[i].at = measurement.at;
  //   //     }
  //   //   });
  //   // }

  //   // dispatch(chartActions.RECEIVED_CHART_METRICS(formattedData));
  // }, [dispatch]);

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
    // metrics: state.metrics,
  };
};

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

export default ConnectedDashboard;
