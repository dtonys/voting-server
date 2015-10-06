import makeStore from './src/store';
import Server from 'socket.io';
import startServer from './src/server';

let store = makeStore();
startServer( store );

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' });

export default store;
