// let setEntriesAction = { type: 'SET_ENTRIES', entries: ['Trainspotting', '28 days'] };
// let voteAction = { type: 'VOTE', entry: 'Trainspotting' };
// let nextAction = { type: 'NEXT' }

import {  setEntries,
          next,
          vote,
          INITIAL_STATE } from './core'

// vote(state, voteAction.entru)
function reducer( state = INITIAL_STATE, action ){
  switch( action.type ){
    case 'SET_ENTRIES':
      return setEntries( state, action.entries );
    case 'VOTE':
      return state.update('vote', voteState => vote( voteState, action.entry ) )
    case 'NEXT':
      return next( state );
  }
  return state;
}
export default reducer;
