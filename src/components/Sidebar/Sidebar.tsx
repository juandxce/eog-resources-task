import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleableChartIndicator from '../ToggleableChartIndicator';
import { connect } from 'react-redux';
import { KeyValuePairs, Metrics } from '../../store/reducers/MetricsReducer';
import { IState } from '../../store';

const useStyles = makeStyles({
  card: {
    width: '20vw',
    minWidth: '190px',
  },
});

function Sidebar({
  metrics,
  colors,
  latestMetricsValues,
}: {
  metrics: Metrics;
  colors: Array<string>;
  latestMetricsValues: KeyValuePairs;
}) {
  const classes = useStyles();

  return (
    <div className={classes.card}>
      {Object.keys(metrics).map((metric: string, index: number) => (
        <ToggleableChartIndicator
          background={colors[index]}
          key={index}
          label={metric}
          unit={metrics[metric].unit || ''}
          value={latestMetricsValues[metric]}
          active={metrics[metric].active}
        />
      ))}
    </div>
  );
}

const mapStateToProps = (state: IState) => {
  return {
    metrics: state.metrics,
    colors: state.colors,
    latestMetricsValues: state.latestMetricsValues,
    chartData: state.chartData,
  };
};

const ConnectedSidebar = connect(mapStateToProps)(Sidebar);

export default ConnectedSidebar;
