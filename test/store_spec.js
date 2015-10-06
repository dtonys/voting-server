import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import makeStore from '../src/store';

describe('store', () => {

  it('is reduce store configured with correct reducer', () => {

    let store = makeStore();
    expect( store.getState() ).to.equal( Map({}) );

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    });

    expect( store.getState() ).to.equal(
      fromJS({
        entries: ['Trainspotting', '28 Days Later']
      })
    );

  });

})
