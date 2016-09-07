import Im from 'immutable';
import {
  CREATE_ROUTE,
  CLEAR_ROUTES,
  ADD_ROUTE_TOUR
} from './../../actions/types';

export default function routes(state = new Im.Map(), action) {
  switch (action.type) {
    case CREATE_ROUTE: {
      const { id } = action;
      const newRoute = route(null, action);
      return state
      .set(id, newRoute);
    }
    case ADD_ROUTE_TOUR: {
      const { id } = action;
      const staleRoute = state.get(id);
      const updatedRoute = route(staleRoute, action);
      return state
      .set(id, updatedRoute);
    }
    case CLEAR_ROUTES: {
      return state.clear()
    }
    default: return state;
  }
}

function route(state, action) {
  switch (action.type) {
    case CREATE_ROUTE: {
      const { id, driverId, deliveryIds, stopIds } = action;
      return new Im.Map([
        ['id', id],
        ['driverId', driverId],
        ['deliveryIds', Im.Set.of(...deliveryIds)],
        ['stopIds', Im.List.of(...stopIds)]
      ]);
    }
    case ADD_ROUTE_TOUR: {
      const { time, distance, instructions, points } = action;
      const tour = new Im.Map([
        ['time', time],
        ['distance', distance],
        ['instructions', Im.List.of(...instructions)],
        ['points', Im.List.of(...points.map(point => {
          return new Im.Map([
            ['latitude', point.latitude],
            ['longitude', point.longitude],
          ]);
        }))]
      ]);
      return state
      .set('tour', tour);
    }
    default: return state;
  }
}
