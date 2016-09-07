import Im from 'immutable';
import {
  ENABLE_ROUTING_BUTTON,
  DISABLE_ROUTING_BUTTON,
  SELECT_NAVIGATION_TAB,
  SELECT_DRIVER,
  DESELECT_DRIVER,
  SELECT_DELIVERY,
  DESELECT_DELIVERY,
  SELECT_ROUTE,
  DESELECT_ROUTE
} from './../actions/types';

export default function ui(state = new Im.Map([
  ['isRoutingButtonEnabled', true],
  ['selectedNavigationTab', 0],
  ['selectedDeliveryId', null],
  ['selectedDriverId', null],
  ['selectedRouteId', null]
]), action) {
  switch (action.type) {
    case ENABLE_ROUTING_BUTTON: {
      return state
      .set('isRoutingButtonEnabled', true);
    }
    case DISABLE_ROUTING_BUTTON: {
      return state
      .set('isRoutingButtonEnabled', false);
    }
    case SELECT_NAVIGATION_TAB: {
      const { index } = action;
      return state
      .set('selectedNavigationTab', index);
    }
    case SELECT_DELIVERY: {
      const { deliveryId } = action;
      return state
      .set('selectedDeliveryId', deliveryId)
    }
    case DESELECT_DELIVERY: {
      return state
      .set('selectedDeliveryId', null)
    }
    case SELECT_DRIVER: {
      const { driverId } = action;
      return state
      .set('selectedDriverId', driverId)
    }
    case DESELECT_DRIVER: {
      return state
      .set('selectedDriverId', null)
    }
    case SELECT_ROUTE: {
      const { routeId } = action;
      return state
      .set('selectedRouteId', routeId)
    }
    case DESELECT_ROUTE: {
      return state
      .set('selectedRouteId', null)
    }
    default: return state;
  }
}
