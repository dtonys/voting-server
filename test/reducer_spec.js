import {expect} from 'chai';
import {List, Map, fromJS } from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_ENTRIES', () => {

    let initialState = Map();
    let action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    let nextState = reducer( initialState, action );

    expect( nextState ).to.equal(
      fromJS({
        entries: ['Trainspotting']
      })
    );

  });

  it('handles NEXT', () => {

    let initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    });
    let action = { type: 'NEXT' };
    let nextState = reducer( initialState, action );

    expect( nextState ).to.equal(
      fromJS({
        vote: {
          round: 1,
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: []
      })
    )
  });

  it('handles VOTE', () => {

    let initialState =
      fromJS({
        vote: {
          round: 1,
          pair: ['Trainspotting', '28 Days Later'],
        },
        entries: []
      })
    let action = { type: 'VOTE', entry: 'Trainspotting' };
    let nextState = reducer( initialState, action );

    expect( nextState ).to.equal(
      fromJS({
        vote: {
          round: 1,
          pair: ['Trainspotting', '28 Days Later'],
          tally: {
            'Trainspotting': 1
          }
        },
        entries: []
      })
    )
  });

  it('has an initial state', () => {

    let action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
    let nextState = reducer( undefined, action );
    expect( nextState ).to.equal(
      fromJS({
        entries: ['Trainspotting']
      })
    )

  });

  it('can be used with reduce', () => {

    let actions = [
      {type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
      {type: 'NEXT'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'VOTE', entry: '28 Days Later'},
      {type: 'VOTE', entry: 'Trainspotting'},
      {type: 'NEXT'}
    ];
    let finalState = actions.reduce( reducer, Map({}) );
    expect( finalState ).to.equal(
      fromJS({
        winner: 'Trainspotting'
      })
    )
  });

});
