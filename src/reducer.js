import {next,vote,setEntries,INITIAL_STATE} from './core';

export default function reducer(state=INITIAL_STATE, action){
    "use strict";

    switch(action.type){
        case 'SET_ENTRIES':
            return setEntries(state,action.entries);
            break;
        case 'NEXT':
            return next(state);
            break;
        case 'VOTE':
            return state.update('vote',voteState=>vote(voteState,action.entry));
            break;
    }
    return state;
}