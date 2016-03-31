import {List} from 'immutable';

export function setEntries(state, entries){
    "use strict";
    return state.set('entries',List(entries));
}