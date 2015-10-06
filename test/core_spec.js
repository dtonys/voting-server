import {expect} from 'chai';
import {List, Map, fromJS } from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {

    it('adds entries to state', () => {
      let state = Map();
      let entries = List.of('Trainspotting', '28 Days Later');
      let nextState = setEntries( state, entries );
      expect(nextState).to.equal(
        Map({
          entries: List.of('Trainspotting', '28 Days Later')
        })
      )
    });

    it('converts to immutable', () => {
      let state = Map();
      let entries = ['Trainspotting', '28 Days Later'];
      let nextState = setEntries( state, entries );
      let nextMap = Map({ entries: List.of('Trainspotting', '28 Days Later') });
      expect( nextState ).to.equal(
        Map({
          entries: List.of('Trainspotting', '28 Days Later')
        })
      );
    });

    describe('next', () => {

      it('takes the next two entries under vote', () => {
        const state = Map({
          entries: List(['Trainspotting', '28 Days Later', 'Sunshine'])
        });
        const nextState = next(state);
        expect( nextState ).to.equal(
          Map({
            vote: Map({
              pair: List(['Trainspotting', '28 Days Later']),
              round: 1,
            }),
            entries: List(['Sunshine'])
          })
        );

      });

      it('puts winner back into list of entries', () => {

        let state =
          Map({
            vote: Map({
              pair: List([ 'Trainspotting', '28 Days Later' ]),
              tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
              })
            }),
            entries: List(['Sunshine', 'Millions', '127 Hours'])
          });

        let nextState = next(state);

        expect( nextState ).to.equal(
          Map({
            vote: Map({
              round: 1,
              pair: List([ 'Sunshine', 'Millions' ])
            }),
            entries: List(['127 Hours', 'Trainspotting'])
          })
        )

      });

      it('puts both back in case of tie', () => {
        let state =
          Map({
            vote: Map({
              round: 1,
              pair: List([ 'Trainspotting', '28 Days Later' ]),
              tally: Map({
                'Trainspotting': 3,
                '28 Days Later': 3
              })
            }),
            entries: List(['Sunshine', 'Millions', '127 Hours'])
          });
        let nextState = next(state);
        expect( nextState ).to.equal(
          Map({
            vote: Map({
              round: 2,
              pair: List([ 'Sunshine', 'Millions' ])
            }),
            entries: List([ '127 Hours', 'Trainspotting', '28 Days Later' ])
          })
        );

      });

      it('marks winner when just one entry left', () => {

        let state =
          Map({
            vote: Map({
              round: 1,
              pair: List([ 'Trainspotting', '28 Days Later' ]),
              tally: Map({
                'Trainspotting': 4,
                '28 Days Later': 2
              })
            }),
            entries: List([])
          });
        let nextState = next(state);
        expect( nextState ).to.equal(
          Map({
            winner: 'Trainspotting'
          })
        )

      });

    });

    describe('vote', () => {

      it('creates a tally for the vote entry', () => {
        let state =
          Map({
            round: 1,
            pair: List([ 'Trainspotting', '28 Days Later' ])
          })
        let nextState = vote(state, 'Trainspotting');
        expect( nextState ).to.equal(
          Map({
            round: 1,
            pair: List([ 'Trainspotting', '28 Days Later' ]),
            tally: Map({
              'Trainspotting': 1
            })
          })
        );
      });

      it('adds to existing tally for the voted entry', () => {

        let state =
          Map({
            round: 1,
            pair: List([ 'Trainspotting', '28 Days Later' ]),
            tally: Map({
              'Trainspotting': 3,
              '28 Days Later': 2
            })
          });
        let nextState = vote( state, 'Trainspotting' );
        expect( nextState ).to.equal(
          Map({
            round: 1,
            pair: List([ 'Trainspotting', '28 Days Later' ]),
            tally: Map({
              'Trainspotting': 4,
              '28 Days Later': 2
            })
          })
        )
      });

    });

  });

});
