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

      Promise.all(getMetrics.map((key: any) => {

        return getMetricData(key, after.getTime());
      })).then((allData: any) => {
        console.log('AD', allData);
        props.dispatch({ type: 'RECEIVED_METRICS_INITIAL_LOAD', payload: allData });

        const formattedData: any = [];

        for (let metric of allData) {
          let container: any = {};
          for (let i = 0; i < metric.measurements.length; i++) {
            const measure = metric.measurements[i];
            if(!formattedData[i]) {
              formattedData[i] = {};
            }
            formattedData[i][metric.metric] = measure.value;
            if (!container.at) {
              container['at'] = measure.at;
            }
          }
        }
        console.log('FEFEEF', formattedData);

        props.dispatch({ type: 'RECEIVED_CHART_METRICS', payload: formattedData });
      })
    });
  }, []);
  console.log('WAWW', props);

  return (
    <div className={classes.card}>
      {props.chartTags && props.chartTags[0]}
      <Sidebar />
      <Chart colors={props.colors} activeTags={props.metrics} chartData={props.chartMetrics} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('APP STATE,', state);
  
  return ({
    chartTags: state.metrics.chartTags,
    chartMetrics: state.metrics.chartMetrics,
    metrics: state.metrics.metrics,
    chart: state.metrics.chart,
    colors: state.metrics.colors,
    // activeMetrics: getSelectedMetrics(state)
  })
};


const ConnectedDashboard = connect(
  mapStateToProps,
)(Dashboard);

export default ConnectedDashboard;
