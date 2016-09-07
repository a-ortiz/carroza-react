import React from 'react';
import { connect } from 'react-redux';
import { selectNavigationTab } from './../actions';

import DeliveriesList from './DeliveriesList';
import DriversList from './DriversList';
import RoutesList from './RoutesList';

import Paper from 'material-ui/Paper';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import DeliveriesTab from 'material-ui/svg-icons/action/shopping-cart';
import DriversTab from 'material-ui/svg-icons/maps/directions-car';
import RoutesTab from 'material-ui/svg-icons/maps/place';

import './Sidebar.css';

const Sidebar = ({ selectedNavigationTab, selectNavigationTab }) => (
  <aside className="Sidebar">
    <div className="Sidebar-list">
      {selectedNavigationTab === 0 &&
        <DeliveriesList />}
      {selectedNavigationTab === 1 &&
        <DriversList />}
      {selectedNavigationTab === 2 &&
        <RoutesList />}
    </div>
    <div className="Sidebar-navigation">
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={selectedNavigationTab}>
          <BottomNavigationItem
            label="Deliveries"
            icon={<DeliveriesTab />}
            onTouchTap={() => selectNavigationTab(0)}
          />
          <BottomNavigationItem
            label="Drivers"
            icon={<DriversTab />}
            onTouchTap={() => selectNavigationTab(1)}
          />
          <BottomNavigationItem
            label="Routes"
            icon={<RoutesTab />}
            onTouchTap={() => selectNavigationTab(2)}
          />
        </BottomNavigation>
      </Paper>
    </div>
  </aside>
);

export default connect(
  state => {
    const selectedNavigationTab = state.get('ui').get('selectedNavigationTab');
    return {
      selectedNavigationTab
    };
  },
  dispatch => {
    return {
      selectNavigationTab(index) {
        dispatch(selectNavigationTab(index));
      }
    };
  }
)(Sidebar);
