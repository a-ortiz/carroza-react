import { combineReducers } from 'redux-immutable';
import deliveries from './deliveries';
import stops from './stops';
import drivers from './drivers';
import routes from './routes';

export default combineReducers({
  deliveries,
  stops,
  drivers,
  routes
});
