import {setEntries,next,vote} from '../src/core';
import {List,Map} from 'immutable';
import {expect} from 'chai';

const {it,describe} = global;

describe('application logic',() => {
	describe('set entries',() => {
		it('adds the entries to the store',() => {
			const state = Map();
			const entries = List.of('Trainspotting','28 Days Later');
			const nextState = setEntries(state,entries);
			expect(nextState).to.equal(Map({
					entries:List.of('Trainspotting','28 Days Later')
				})
			);
		});

		it('converts to immutable',() => {
			const entries = ['Trainspotting','28 Days Later'];
			const state = new Map();
			const nextState = setEntries(state, entries);
			expect(nextState).to.equal(Map({
					entries:List.of('Trainspotting','28 Days Later')
				})
			);
		});
	});

	describe('next',() => {
		it('takes the next 2 entries for vote',() => {
			const state = Map({
				entries:List(['Trainspotting','28 Days Later','Sunshine'])
			});

			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote:Map({
					pair:List.of('Trainspotting','28 Days Later')
				}),
				entries:List.of('Sunshine')
			}));
		});

		it('puts winner of current vote back in entries',() => {
			const state = Map({
				entries:List(['Sunshine','Slumdog Millionaire','127 Hours']),
				vote:Map({
					pair:List(['Trainspotting','28 Days Later']),
					tally:Map({
						'Trainspotting':4,
						'28 Days Later':2
					})
				})
			});
			const nextState = next(state);
			expect(nextState).to.equal(Map({
					entries:List(['127 Hours','Trainspotting']),
					vote:Map({
						pair:List(['Sunshine','Slumdog Millionaire'])
					})
				})
			);
		});

		 it('puts both from tied vote back to entries', () => {
		    const state = Map({
		      vote: Map({
		        pair: List.of('Trainspotting', '28 Days Later'),
		        tally: Map({
		          'Trainspotting': 3,
		          '28 Days Later': 3
		        })
		      }),
		      entries: List.of('Sunshine', 'Millions', '127 Hours')
		    });
		    const nextState = next(state);
		    expect(nextState).to.equal(Map({
		      vote: Map({
		        pair: List.of('Sunshine', 'Millions')
		      }),
		      entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
		    }));
		});

		it('marks a winner when only one entry is left',() => {
			const state = Map({
				entries:List(),
				vote:Map({
					pair:List.of('Trainspotting','28 Days Later'),
					tally:Map({
						'Trainspotting': 6,
		          		'28 Days Later': 3		
					})
				})
			});

			const nextState = next(state);
			expect(nextState).to.equal(Map({
					winner:'Trainspotting'
				})
			);
		});

	});

	describe('vote', () => {

	  it('creates a tally for the voted entry', () => {
	    const state = Map({
	      pair: List.of('Trainspotting', '28 Days Later')
	    });
	    const nextState = vote(state, 'Trainspotting')
	    expect(nextState).to.equal(Map({
	      pair: List.of('Trainspotting', '28 Days Later'),
	      tally: Map({
	        'Trainspotting': 1
	      })
	    }));
	  });

	  it('adds to existing tally for the voted entry', () => {
	    const state = Map({
	      pair: List.of('Trainspotting', '28 Days Later'),
	      tally: Map({
	        'Trainspotting': 3,
	        '28 Days Later': 2
	      })
	    });
	    const nextState = vote(state, 'Trainspotting');
	    expect(nextState).to.equal(Map({
	      pair: List.of('Trainspotting', '28 Days Later'),
	      tally: Map({
	        'Trainspotting': 4,
	        '28 Days Later': 2
	      })
	    }));
	  });

	});
});