import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect, useDispatch } from 'react-redux';
import { getLastKnownMeasurement } from '../../store/api/metrics';
import { actions as metricsActions } from '../../store/reducers/MetricsReducer';
// stopped using it because of https://github.com/apollographql/react-apollo/issues/3270
// import { useQuery } from 'react-apollo';
import { getMetricsQuery } from '../../store/api/queries';
import { useQuery } from 'urql';

const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

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
      .catch((error) => {
        dispatch(metricsActions.apiErrorReceived({ error: error.message }));
      });
  }, [dispatch, data, error]);

  return (
    <div className={classes.card}>
      <Sidebar />
      <Chart />
    </div>
  );
}

const ConnectedDashboard = connect(null, null)(Dashboard);

export default ConnectedDashboard;
