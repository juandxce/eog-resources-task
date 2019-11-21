import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleableChartIndicator from '../ToggleableChartIndicator';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  card: {
    width: '20vw',
    minWidth: '190px',
  },
});

function Sidebar(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      {Object.keys(props.metrics).map((metric: any, index: number) => (
        <ToggleableChartIndicator
          background={props.colors[index]}
          key={index}
          label={metric}
          unit={props.metrics[metric].unit}
          value={props.latestMetricsValues[metric]}
          active={props.metrics[metric].active}
          dispatch={props.dispatch}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    metrics: state.metrics,
    colors: state.colors,
    latestMetricsValues: state.latestMetricsValues,
  };
};

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export default ConnectedSidebar;
