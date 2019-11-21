import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect, useDispatch } from 'react-redux';
import { getMetricTags, getMetricData, getLastKnownMeasurement } from '../../store/api/metrics';
import { RECEIVED_METRICS_TAGS, RECEIVED_METRICS_LAST_MEASUREMENTS } from '../../store/actions';
import { getActiveMetrics } from '../../store/reducers/MetricsReducer';
import { addErrorMessage } from '../../utils';
import { actions } from '../../store/reducers/ChartReducer';
const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

function Dashboard({ dispatch, ...props }: any) {
  const classes = useStyles();
  useEffect(() => {
    getMetricTags()
      .then(({ data }) => {
        const { getMetrics } = data;
        dispatch({ type: RECEIVED_METRICS_TAGS, payload: getMetrics });

        return Promise.all(
          getMetrics.map((metric: any) => {
            return getLastKnownMeasurement(metric);
          }),
        )
      })
      .then(data => {
        dispatch({ type: RECEIVED_METRICS_LAST_MEASUREMENTS, payload: data });
      })
      .catch(addErrorMessage);
  }, [dispatch]);

  useEffect(() => {
    const after = new Date(); // get the time from 30 minutes ago
    after.setMinutes(after.getMinutes() - 30);

    getMetricData(
      Object.keys(props.metrics).filter((metric: any) => props.metrics[metric].active),
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

        dispatch(actions.RECEIVED_CHART_METRICS(formattedData));
      })
      .catch(addErrorMessage);
  }, [props.metrics, dispatch]);

  return (
    <div className={classes.card}>
      <Sidebar />
      <Chart />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    metrics: state.metrics,
  };
};

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

export default ConnectedDashboard;
