import { combineReducers } from 'redux-immutable';
import entities from './entities';
import ui from './ui';
import network from './network';

export default combineReducers({
  entities,
  ui,
  network
});
