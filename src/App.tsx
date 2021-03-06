import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { Provider as URQLProvider, createClient } from 'urql';

import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Wrapper from './components/Wrapper';
import Dashboard from './components/Dashboard/Dashboard';
import { Client } from '../src/store/api/metrics';
import { ApolloProvider } from '@apollo/react-hooks';

const URQLclient = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <ApolloProvider client={Client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <URQLProvider value={URQLclient}>
        <Wrapper>
          <ToastContainer />
          <Dashboard />
        </Wrapper>
      </URQLProvider>
      </Provider>
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
