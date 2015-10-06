import {List, Map } from 'immutable';

let INITIAL_STATE = Map({});

function setEntries(state, entries){
  return state.set('entries', List(entries));
};

// remove 2 entries, put them into vote list
function next(state){
  let winners = getWinners( state.get('vote') );
  let entries = state.get('entries');
  entries = entries.concat(winners);

  // if one entry left, declare winner
  if( entries.size === 1 ){
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.get(0))
  }
  else{
    return state.merge({
      vote: Map({
        round: state.getIn(['vote', 'round'], 0) + 1,
        pair: entries.slice(0, 2)
      }),
      entries: entries.slice(2)
    });
  }
};

// return winner out of two
function getWinners( vote ){
  if( !vote ) return [];
  let a = vote.getIn(['pair', 0]);
  let b = vote.getIn(['pair', 1]);

  let aVotes = vote.getIn(['tally', a], 0);
  let bVotes = vote.getIn(['tally', b], 0);
  if( aVotes > bVotes )       return [a];
  else if( aVotes < bVotes )  return [b];
  else                        return [a, b];
}

// increment vote count for item
function vote( voteState, item ){
  return voteState.updateIn(['tally', item], 0, tally => tally + 1 )
};

export { setEntries, next, vote, INITIAL_STATE }
