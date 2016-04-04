import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', ()=> {
    "use strict";
    it('handles entries', ()=> {

        const initialState = Map();
        const action = {type: "SET_ENTRIES", entries: ['Trainspotting']};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    it('handles next', ()=> {
        const initialState = fromJS({
            entries: ['Trainspotting', 'Sunshine']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: [],
            vote: {
                pair: ['Trainspotting', 'Sunshine']
            }
        }));

    });
    it('handles vote', ()=> {
        const initialState = fromJS({
            entries: [],
            vote: {
                pair: ['Trainspotting', 'Sunshine']
            }
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            entries: [],
            vote: {
                pair: ['Trainspotting', 'Sunshine'],
                tally: {
                    'Trainspotting': 1
                }
            }
        }));
    });
    it('has an initial state', ()=> {
        const initialState = Map();
        const action ={type:'SET_ENTRIES',entries:['Trainspotting','Sunshine']};
        const nextState=reducer(undefined,action);
        expect(nextState).to.equal(fromJS({
            entries:['Trainspotting','Sunshine']
        }));
    });
    it('can be used with reduce',()=>{
       const actions=[
           {type:'SET_ENTRIES',entries:['Trainspotting', 'Sunshine']},
           {type:'NEXT'},
           {type:'VOTE',entry:'Trainspotting'},
           {type:'VOTE', entry:'Sunshine'},
           {type:'VOTE',entry:'Trainspotting'},
           {type:'NEXT'}
       ];
        const nextState = actions.reduce(reducer,Map());
        expect(nextState).to.equal(fromJS({
            winner:'Trainspotting'
        }));
    });
});