import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect } from 'react-redux';
import { getMetricTags, getMetricData, getLastKnownMeasurement } from '../../store/api/metrics';
import { RECEIVED_METRICS_TAGS, RECEIVED_CHART_METRICS, RECEIVED_METRICS_LAST_MEASUREMENTS } from '../../store/actions';

import { addErrorMessage } from '../../utils';

const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

function Dashboard({dispatch, ...props}: any) {
  const classes = useStyles();
  useEffect(() => {
    getMetricTags().then(({ data }) => {
      const { getMetrics } = data;
      dispatch({ type: RECEIVED_METRICS_TAGS, payload: getMetrics });

      Promise.all(getMetrics
      .map((metric: any) => {
        return getLastKnownMeasurement(metric);
      })).then((data) => {
        dispatch({ type: RECEIVED_METRICS_LAST_MEASUREMENTS, payload: data })
      })
    }).catch(addErrorMessage);
  }, [dispatch]);

  useEffect(() => {
      const after = new Date();
      after.setMinutes(after.getMinutes() - 30);

      getMetricData(Object.keys(props.metrics)
      .filter((metric: any) => props.metrics[metric].active), after.getTime())
      .then((allData: any) => {

        const formattedData: any = [];

        for (let metric of allData) {
          for (let i = 0; i < metric.measurements.length; i++) {
            const measure = metric.measurements[i];
            if(!formattedData[i]) {
              formattedData[i] = {};
            }
            formattedData[i][metric.metric] = measure.value;
            if (!formattedData[i].at) {
              formattedData[i].at = measure.at;
            }
          }
        }

        dispatch({ type: RECEIVED_CHART_METRICS, payload: formattedData });
      })
      .catch(addErrorMessage);
  }, [props.metrics, dispatch]);

  return (
    <div className={classes.card}>
      <Sidebar colors={props.colors} metrics={props.metrics} latestMetricsValues={props.latestMetricsValues} dispatch={dispatch} />
      <Chart dispatch={dispatch} colors={props.colors} metrics={props.metrics} chartData={props.chartData} />
    </div>
  );
};

const mapStateToProps = (state: any) => {

  return ({
    metrics: state.metrics,
    chartData: state.chartData,
    colors: state.colors,
    latestMetricsValues: state.latestMetricsValues
  })
};


const ConnectedDashboard = connect(
  mapStateToProps,
)(Dashboard);

export default ConnectedDashboard;
