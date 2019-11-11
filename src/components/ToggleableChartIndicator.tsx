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
  },
});

export const ToggleableChartIndicator = (props: any) => {
  const classes = useStyles();
  return (
    <div style={{background: props.background, opacity: props.active? '1': '.3'}} onClick={() => {
      props.dispatch({type: TOGGLE_SELECTED_METRIC, payload: props.label})
    }} className={classes.card}>
      <span>{props.label}</span>
      <span>{props.value}</span>
      <span>{props.active}</span>
    </div>
  );
};

export default ToggleableChartIndicator;