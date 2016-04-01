import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries,next, vote} from '../src/core';
describe('application logic', ()=> {

    describe('setEntries', ()=> {
        it('adds entries to the state', ()=> {

            const state = Map();
            const entries = List.of('Trainspotting', '28 days later');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 days later')
            }));

        });
        it('converts to immutable', ()=> {

            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));

        });

    });
    describe('next', ()=> {
        it('takes next 2 entries under vote', ()=> {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            console.log('state');
            console.log(state);
            console.log('nextState');
            console.log(nextState);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')

            }))
        });
        it('puts winner of current vote back to entries', ()=> {
            const state = Map({
                entries: List.of('Sunshine', 'Millions', '127 Hours'),
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                })
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')

            }));


        });
        it('puts both from tied vote back to the entries', ()=> {

            const state = Map({
                entries: List.of('Sunshine', 'Millions', '127 Hours'),
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 4
                    })
                })
            });

            const nextState = next(state);
            expect(nextState).to.equal(Map({
                entries:List.of('127 Hours','Trainspotting','28 Days Later'),
                vote:Map({
                    pair:List.of('Sunshine','Millions')
                })
            }));

        });

    });
    describe('voting', ()=> {
        it('creates a tally for the voted entry', ()=> {
            "use strict";
            const state = Map({
                entries: List.of(),
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                })
            });
            const nextState = vote(state, 'Trainspotting');
            expect(nextState).to.equal(Map({
                entries: List.of(),
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1
                    })
                })
            }));


        });
        it('adds to existing tally for the voted entry', ()=> {
            "use strict";
            const state = Map({
                entries: List.of(),
                vote: Map({
                    pair: List.of('Trainspotting', 'Sunshine'),
                    tally: Map({
                        'Trainspotting': 3,
                        'Sunshine': 2
                    })
                })
            });
            const nextState = vote(state, 'Sunshine');
            expect(nextState).to.equal(Map({
                entries: List.of(),
                vote: Map({
                    pair: List.of('Trainspotting', 'Sunshine'),
                    tally: Map({
                        'Trainspotting': 3,
                        'Sunshine': 3
                    })
                })
            }));

        });

    });

});
