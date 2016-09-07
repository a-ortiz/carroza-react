import React from 'react';
import { connect } from 'react-redux';
import { createRoutes } from './../actions';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BuildRoutes from 'material-ui/svg-icons/action/build';
import Sidebar from './Sidebar';
import DeliveriesMap from './DeliveriesMap';
import DriversMap from './DriversMap';
import RoutesMap from './RoutesMap';

import './App.css';

const App = ({ isRoutingButtonEnabled, selectedNavigationTab, createRoutes }) => (
  <div className="App">
    <AppBar
      title="Carrozza"
      showMenuIconButton={false}
      iconElementRight={<IconButton disabled={!isRoutingButtonEnabled} onTouchTap={createRoutes}><BuildRoutes /></IconButton>}
    />
    <div className="App-main">
      <div className="App-side">
        <Sidebar />
      </div>
      <div className="App-map">
        {selectedNavigationTab === 0 &&
          <DeliveriesMap />}
        {selectedNavigationTab === 1 &&
          <DriversMap />}
        {selectedNavigationTab === 2 &&
          <RoutesMap />}
      </div>
    </div>
  </div>
);

export default connect(
  state => {
    const isRoutingButtonEnabled = state.get('ui').get('isRoutingButtonEnabled');
    const selectedNavigationTab = state.get('ui').get('selectedNavigationTab');
    return {
      isRoutingButtonEnabled,
      selectedNavigationTab
    };
  },
  dispatch => {
    return {
      createRoutes() {
        dispatch(createRoutes())
      }
    }
  }
)(App);
