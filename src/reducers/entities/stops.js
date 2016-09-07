import Im from 'immutable';
import {
  ADD_DELIVERY
} from './../../actions/types';

export default function stops(state = new Im.Map(), action) {
  switch (action.type) {
    case ADD_DELIVERY: {
      const { pickupStopId, dropoffStopId } = action;
      const pickup = pickupStop(null, action);
      const dropoff = dropoffStop(null, action);
      return state
      .set(pickupStopId, pickup)
      .set(dropoffStopId, dropoff);
    }
    default: return state;
  }
}

function pickupStop(state, action) {
  switch (action.type) {
    case ADD_DELIVERY: {
      const { pickupStopId: id, pickupStop: { location: { latitude, longitude } } } = action;
      return new Im.Map([
        ['id', id],
        ['location', new Map([
          ['latitude', latitude],
          ['longitude', longitude]
        ])]
      ]);
    }
    default: return state;
  }
}

function dropoffStop(state, action) {
  switch (action.type) {
    case ADD_DELIVERY: {
      const { dropoffStopId: id, dropoffStop: { location: { latitude, longitude } } } = action;
      return new Im.Map([
        ['id', id],
        ['location', new Map([
          ['latitude', latitude],
          ['longitude', longitude]
        ])]
      ]);
    }
    default: return state;
  }
}
