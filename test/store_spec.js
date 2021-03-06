import {Map,fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';


describe('store',()=>{
   it('is with the correct reducer attached',()=>{
       const store  = makeStore();
       expect(store.getState()).to.equal(Map());
       store.dispatch({
           type:'SET_ENTRIES',
           entries:['Trainspotting','127 hours']
       });
       expect(store.getState()).to.equal(fromJS({
           'entries':['Trainspotting','127 hours']
       }))

   })

});