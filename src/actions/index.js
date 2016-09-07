import Im from 'immutable';
import { v4 } from 'node-uuid';

import {
  BATCH_ACTIONS,
  ADD_DELIVERY,
  ADD_DRIVER,
  CREATE_ROUTE,
  CLEAR_ROUTES,
  ADD_DELIVERY_TOUR,
  ADD_ROUTE_TOUR,
  ENABLE_ROUTING_BUTTON,
  DISABLE_ROUTING_BUTTON,
  SELECT_NAVIGATION_TAB,
  SELECT_DRIVER,
  DESELECT_DRIVER,
  SELECT_DELIVERY,
  DESELECT_DELIVERY,
  SELECT_ROUTE,
  DESELECT_ROUTE,
  START_CREATE_ROUTE_REQUEST,
  END_CREATE_ROUTE_REQUEST
} from './types';

import {
  planRoutes,
  getTour
} from './../api/app';

export function batchActions(...actions) {
  return {
    type: BATCH_ACTIONS,
    actions: actions
  };
}

export function addDelivery(id, pickup, dropoff) {
  return {
    type: ADD_DELIVERY,
    id,
    pickupStopId: v4(),
    pickup,
    dropoffStopId: v4(),
    dropoff
  };
}

export function addDriver(id, name, location) {
  return {
    type: ADD_DRIVER,
    id,
    name,
    location
  };
}

export function createRoute(driverId, deliveryIds, stopIds) {
  return {
    type: CREATE_ROUTE,
    id: v4(),
    driverId,
    deliveryIds,
    stopIds
  };
}

function clearRoutes() {
  return {
    type: CLEAR_ROUTES
  };
}

export function addDeliveryTour(id, time, distance, instructions, points) {
  return {
    type: ADD_DELIVERY_TOUR,
    id,
    time,
    distance,
    instructions,
    points
  };
}

export function addRouteTour(id, time, distance, instructions, points) {
  return {
    type: ADD_ROUTE_TOUR,
    id,
    time,
    distance,
    instructions,
    points
  };
}


function enableRoutingButton() {
  return {
    type: ENABLE_ROUTING_BUTTON
  };
}

function disableRoutingButton() {
  return {
    type: DISABLE_ROUTING_BUTTON
  };
}

export function selectNavigationTab(index) {
  return {
    type: SELECT_NAVIGATION_TAB,
    index
  };
}

export function selectDriver(driverId) {
  return {
    type: SELECT_DRIVER,
    driverId
  };
}

export function deselectDriver() {
  return {
    type: DESELECT_DRIVER
  };
}

export function selectDelivery(deliveryId) {
  return {
    type: SELECT_DELIVERY,
    deliveryId
  };
}

export function selectDeliveryAndLoadTourIfNeeded(deliveryId) {
  return (dispatch, getState) => {
    dispatch(selectDelivery(deliveryId));
    const state = getState();
    const selectedDelivery = state.get('entities').get('deliveries').get(deliveryId);
    const hasSelectedDeliveryTourLoaded = selectedDelivery.has('tour');
    if (!hasSelectedDeliveryTourLoaded) {
      const stops = state.get('entities').get('stops');
      const points = new Im.List([
        stops.get(selectedDelivery.get('pickupStopId')).get('location'),
        stops.get(selectedDelivery.get('dropoffStopId')).get('location')
      ]);
      getTour(points)
      .then(({ status, data }) => {
        if (status !== 200) return;
        const time = data.time;
        const distance = data.distance;
        const instructions = [];
        const points = [];
        data.edges.forEach(edge => {
          instructions.push(edge.text);
          edge.points.forEach(point => {
            points.push(point);
          });
        });
        dispatch(addDeliveryTour(deliveryId, time, distance, instructions, points));
      },
      () => {

      });
    }
  };
}

export function selectRouteAndLoadTourIfNeeded(routeId) {
  return (dispatch, getState) => {
    dispatch(selectRoute(routeId));
    const state = getState();
    const selectedRoute = state.get('entities').get('routes').get(routeId);
    const hasSelectedRouteTourLoaded = selectedRoute.has('tour');
    if (!hasSelectedRouteTourLoaded) {
      const stops = state.get('entities').get('stops');
      const drivers = state.get('entities').get('drivers');
      const driver = drivers.get(selectedRoute.get('driverId'));
      const points = Im.List.of(...selectedRoute.get('stopIds').map(stopId => {

        return stops.get(stopId).get('location')
      }));
      getTour(points.unshift(driver.get('location')))
      .then(({ status, data }) => {
        if (status !== 200) return;
        const time = data.time;
        const distance = data.distance;
        const instructions = [];
        const points = [];
        data.edges.forEach(edge => {
          instructions.push(edge.text);
          edge.points.forEach(point => {
            points.push(point);
          });
        });
        dispatch(addRouteTour(routeId, time, distance, instructions, points));
      },
      () => {

      });
    }
  };
}

export function deselectDelivery() {
  return {
    type: DESELECT_DELIVERY
  };
}

export function selectRoute(routeId) {
  return {
    type: SELECT_ROUTE,
    routeId
  };
}

export function deselectRoute() {
  return {
    type: DESELECT_ROUTE
  };
}

function startCreateRouteRequest() {
  return {
    type: START_CREATE_ROUTE_REQUEST
  };
}

function endCreateRouteRequest() {
  return {
    type: END_CREATE_ROUTE_REQUEST
  };
}

export function createRoutes() {
  return (dispatch, getState) => {
    const state = getState();
    const isActive = state.get('network').get('isCreateRouteRequestActive');
    if (!isActive) {
      dispatch(batchActions(
        disableRoutingButton(),
        deselectRoute(),
        clearRoutes(),
        startCreateRouteRequest()
      ));
      const drivers = state.get('entities').get('drivers');
      const deliveries = state.get('entities').get('deliveries');
      const stops = state.get('entities').get('stops');
      planRoutes(drivers, deliveries, stops)
      .then(({ status, data }) => {
        dispatch(batchActions(
          endCreateRouteRequest(),
          enableRoutingButton()
        ));
        if (status !== 200) return;
        const createRouteActions = data.routes.map(({ vehicle_id: driverId, activities }) => {
          const deliveryIds = [];
          const stopIds = [];
          activities.filter(({ id }) => id).forEach(({ id: deliveryId, name: stopType }) => {
            const delivery = deliveries.get(deliveryId);
            deliveryIds.push(deliveryId);
            if (stopType === 'pickup') {
              stopIds.push(delivery.get('pickupStopId'));
            } else if (stopType === 'dropoff') {
              stopIds.push(delivery.get('dropoffStopId'));
            }
          })
          return createRoute(driverId, deliveryIds, stopIds);
        });
        dispatch(batchActions(...createRouteActions));
      },
      () => {
        dispatch(batchActions(
          endCreateRouteRequest(),
          enableRoutingButton()
        ));
      });
    }
  }
}
