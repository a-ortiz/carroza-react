import Im from 'immutable';
import {
  START_CREATE_ROUTE_REQUEST,
  END_CREATE_ROUTE_REQUEST
} from './../actions/types';

export default function network(state = new Im.Map([
  ['isCreateRouteRequestActive', false]
]), action) {
  switch (action.type) {
    case START_CREATE_ROUTE_REQUEST: {
      return state
      .set('isCreateRouteRequestActive', true);
    }
    case END_CREATE_ROUTE_REQUEST: {
      return state
      .set('isCreateRouteRequestActive', false);
    }
    default: return state;
  }
}
