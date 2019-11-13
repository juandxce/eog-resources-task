import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TOGGLE_SELECTED_METRIC } from '../store/actions'
import { useSubscription } from '@apollo/react-hooks';
import { newMeasurementSubscription } from '../store/api/subscriptions';
import debounceRender from 'react-debounce-render';

const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
    color: '#eee',
    background: '#333',
    fontWeight: 'bold',
    padding: '15px',
    width: '200px',
    height: '100px',
    borderRadius: '10px',
    fontSize: '19px',
    textShadow: '2px 2px 3px #333',
    overflow: 'hidden',
    transition: 'all .3s',
    cursor: 'pointer',
    '&:hover': {
      'boxShadow': '3px 3px 5px #444',
    }
  },
  cardMeasurement: {
    display: 'block',
    textAlign: 'right',
  },
  cardTitle: {
    display: 'block',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  }
});

export const ToggleableChartIndicator = (props: any) => {
  const classes = useStyles();

  let latestValue;
  const { data: info } = useSubscription(newMeasurementSubscription);
  // console.log('WORKS', info && info.newMeasurement);
  if(props.active && info && (info.newMeasurement.metric === props.label)) {
    latestValue = info && info.newMeasurement.value;
  }

  return (
    <div style={{background: props.background, opacity: props.active? '1': '.3'}} onClick={() => {
      props.dispatch({type: TOGGLE_SELECTED_METRIC, payload: props.label})
    }} className={classes.card}>
      <span className={classes.cardTitle}>{props.label}</span>
      <span className={classes.cardMeasurement}>{latestValue || props.value} {props.unit}</span>
    </div>
  );
};

export default debounceRender(ToggleableChartIndicator, 500, { leading: false, trailing: true });