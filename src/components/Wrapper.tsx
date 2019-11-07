import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    display: 'flex',
  },
});

const Wrapper: React.FC = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.wrapper}>{children}</div>;
};

export default Wrapper;
