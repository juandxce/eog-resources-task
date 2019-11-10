import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect } from 'react-redux';
import { getSelectedMetrics } from '../../store/reducers/MetricsReducer'
import { getMetricTags, getMetricData } from '../../store/api/metrics';
import { RECEIVED_METRICS_TAGS } from '../../store/actions';

const useStyles = makeStyles({
  card: {
    width: '100vw',
    display: 'flex',
  },
});

const Dashboard = (props: any) => {
  const classes = useStyles();
  useEffect(() => {
    console.log('mounted props', props);
    getMetricTags().then(({ data }) => {
      console.log('metricTags2', data);
      const { getMetrics } = data;
      props.dispatch({ type: RECEIVED_METRICS_TAGS, payload: getMetrics });
      const after = new Date();
      after.setMinutes(after.getMinutes() - 30);

      getMetricData(getMetrics[1], after.getTime());
    });
  }, []);
  console.log('WAWW', props);

  return (
    <div className={classes.card}>
      {props.chartTags && props.chartTags[0]}
      <Sidebar />
      <Chart />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  chartTags: state.metrics.chartTags,
  metrics: state.metrics.metrics,
  chart: state.metrics.chart,
  // activeMetrics: getSelectedMetrics(state)
});


const ConnectedDashboard = connect(
  mapStateToProps,
)(Dashboard);

export default ConnectedDashboard;
