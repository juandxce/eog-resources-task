import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect } from 'react-redux';
import { getMetricTags, getMetricData, getLastKnownMeasurement } from '../../store/api/metrics';
import { RECEIVED_METRICS_TAGS, RECEIVED_CHART_METRICS, RECEIVED_METRICS_LAST_MEASUREMENTS } from '../../store/actions';
import { getActiveMetrics } from '../../store/reducers/MetricsReducer';
import { addErrorMessage } from '../../utils';

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

        Promise.all(
          getMetrics.map((metric: any) => {
            return getLastKnownMeasurement(metric);
          }),
        ).then(data => {
          dispatch({ type: RECEIVED_METRICS_LAST_MEASUREMENTS, payload: data });
        });
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

        dispatch({ type: RECEIVED_CHART_METRICS, payload: formattedData });
      })
      .catch(addErrorMessage);
  }, [props.metrics, dispatch]);

  return (
    <div className={classes.card}>
      <Sidebar
        colors={props.colors}
        metrics={props.metrics}
        latestMetricsValues={props.latestMetricsValues}
        dispatch={dispatch}
      />
      <Chart activeMetrics={props.activeMetrics} dispatch={dispatch} colors={props.colors} metrics={props.metrics} chartData={props.chartData} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    activeMetrics: getActiveMetrics(state),
    metrics: state.metrics,
    chartData: state.chartData,
    colors: state.colors,
    latestMetricsValues: state.latestMetricsValues,
  };
};

const ConnectedDashboard = connect(mapStateToProps)(Dashboard);

export default ConnectedDashboard;
