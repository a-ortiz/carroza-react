import Im from 'immutable';
import {
  ADD_DELIVERY,
  ADD_DELIVERY_TOUR
} from './../../actions/types';

export default function deliveries(state = new Im.Map(), action) {
  switch (action.type) {
    case ADD_DELIVERY: {
      const { id } = action;
      const newDelivery = delivery(null, action);
      return state
      .set(id, newDelivery);
    }
    case ADD_DELIVERY_TOUR: {
      const { id } = action;
      const staleDelivery = state.get(id);
      const updatedDelivery = delivery(staleDelivery, action);
      return state
      .set(id, updatedDelivery);
    }
    default: return state;
  }
}

function delivery(state, action) {
  switch (action.type) {
    case ADD_DELIVERY: {
      const { id, pickupStopId, dropoffStopId } = action;
      return new Im.Map([
        ['id', id],
        ['pickupStopId', pickupStopId],
        ['dropoffStopId', dropoffStopId]
      ]);
    }
    case ADD_DELIVERY_TOUR: {
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
