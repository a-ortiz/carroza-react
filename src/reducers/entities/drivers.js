import Im from 'immutable';
import {
  ADD_DRIVER
} from './../../actions/types';

export default function drivers(state = new Im.Map(), action) {
  switch (action.type) {
    case ADD_DRIVER: {
      const { id } = action;
      const newDriver = driver(null, action);
      return state
      .set(id, newDriver);
    }
    default: return state;
  }
}

function driver(state, action) {
  switch (action.type) {
    case ADD_DRIVER: {
      const { id, name, location: { latitude, longitude } } = action;
      return new Im.Map([
        ['id', id],
        ['name', name],
        ['location', new Im.Map([
          ['latitude', latitude],
          ['longitude', longitude]
        ])]
      ]);
    }
    default: return state;
  }
}
