import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const useStyles = makeStyles({
  card: {
    width: '70vw',
  },
});

export default () => {
  const classes = useStyles();
  const data = [{name: 'Page A', at: 400, pv: 2400, amt: 2400}, {name: 'Page A', at: 500, pv: 2800, amt: 2900}];

  return (
    <div className={classes.card}>
      <LineChart width={800} height={800} data={data}>
        <YAxis label={{ angle: -90, value: 'values' }} />
        <XAxis dataKey="at" interval="preserveStartEnd" minTickGap={20} />
        <Line type="monotone" dataKey="at" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};
