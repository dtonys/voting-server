// import redux from 'redux';
import * as redux from 'redux';
import reducer from './reducer';

function makeStore(){
  let store = redux.createStore( reducer );
  return store;
}

export default makeStore;
