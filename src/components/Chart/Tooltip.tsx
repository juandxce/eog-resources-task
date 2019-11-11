import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chartTooltip: {
    padding: '12px',
    color: '#333',
    backgroundColor: '#eee',
    borderRadius: '6px',
    fontWeight: 'bold'
  }
});

const ChartTooltip = (props: any) => {
  const classes = useStyles();

  return(<div >This is the tooltip</div>);
}

export default ChartTooltip;