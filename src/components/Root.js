import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { redA400 } from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './App';

const theme = getMuiTheme({
  palette: {
    primary1Color: redA400
  },
  appBar: {
    height: 50,
  },
});

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);

export default Root;
