import {next,vote,setEntries} from './core';

export default function reducer(state, action){
    "use strict";

    switch(action.type){
        case 'SET_ENTRIES':
            return setEntries(state,action.entries);
            break;
        case 'NEXT':
            return next(state);
            break;
        case 'VOTE':
            return vote(state,action.entry);
            break;
    }
}