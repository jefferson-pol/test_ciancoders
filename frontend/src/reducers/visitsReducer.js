import { ADD_VISIT, LOAD_VISIT } from '../constReducers/visitsConsts';

export default function visitsReducer(state=[],action){
  switch(action.type){
    case LOAD_VISIT:
      return action.visits;
    case ADD_VISIT:
      return [action.visit].concat(state);
    default:
      return state;
  }
}
