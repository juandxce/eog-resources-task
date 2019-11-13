import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../Sidebar/Sidebar';
import Chart from '../Chart/Chart';
import { connect } from 'react-redux';
import { getMetricTags, getMetricData, getLastKnownMeasurement } from '../../store/api/metrics';
import { RECEIVED_METRICS_TAGS, RECEIVED_CHART_METRICS, RECEIVED_METRICS_LAST_MEASUREMENTS } from '../../store/actions';

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

      Promise.all(getMetrics
      .map((metric: any) => {
        return getLastKnownMeasurement(metric);
      })).then((data) => {
        console.log('getLastKnownMeaturement:', data);
        props.dispatch({ type: RECEIVED_METRICS_LAST_MEASUREMENTS, payload: data })
      })
    });
  }, []);

  useEffect(() => {
    console.log('using it', props.metrics);

      const after = new Date();
      after.setMinutes(after.getMinutes() - 30);

      getMetricData(Object.keys(props.metrics)
      .filter((metric: any) => props.metrics[metric].active), after.getTime())
      .then((allData: any) => {
        console.log('AD', allData);

        const formattedData: any = [];

        for (let metric of allData) {
          let container: any = {};
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
        // console.log('FEFEEF', formattedData);

        props.dispatch({ type: RECEIVED_CHART_METRICS, payload: formattedData });
      })
  }, [props.metrics]);
  console.log('rendering dashboard', props);

  return (
    <div className={classes.card}>
      <Sidebar colors={props.colors} metrics={props.metrics} dispatch={props.dispatch} />
      <Chart colors={props.colors} metrics={props.metrics} chartData={props.chartData} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  console.log('APP STATE,', state);

  return ({
    chartTags: Object.keys(state.metrics),
    metrics: state.metrics,
    chartData: state.chartData,
    colors: state.colors,
  })
};


const ConnectedDashboard = connect(
  mapStateToProps,
)(Dashboard);

export default ConnectedDashboard;
