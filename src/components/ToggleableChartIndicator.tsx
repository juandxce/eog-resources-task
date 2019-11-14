import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TOGGLE_SELECTED_METRIC } from '../store/actions'

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

export function ToggleableChartIndicator(props: any) {
  const classes = useStyles();

  return (
    <div style={{background: props.background, opacity: props.active? '1': '.3'}} onClick={() => {
      props.dispatch({type: TOGGLE_SELECTED_METRIC, payload: props.label})
    }} className={classes.card}>
      <span className={classes.cardTitle}>{props.label}</span>
      <span className={classes.cardMeasurement}>{props.value} {props.unit}</span>
    </div>
  );
};

export default ToggleableChartIndicator;