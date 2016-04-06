import {expect} from 'chai';
import {List,Map} from 'immutable';

const {describe,it} = global;

describe('immutability',() => {

	describe('A list',() => {
		function addMovie(currentState,movie) {
			return currentState.push(movie);
		}

		it('is immutable',() => {
			let state = List.of('Trainspotting','28 Days Later');
			let nextState = addMovie(state,'Sunshine');
			expect(state).to.equal(List.of('Trainspotting','28 Days Later'));
			expect(nextState)
				.to.equal(
					List.of('Trainspotting','28 Days Later','Sunshine')
				);
		});
	});

	describe('A tree',() => {
		function addMovie(currentState,movie) {
			return currentState.set('movies',
				currentState.get('movies').push(movie)
			);
		}

		it('is immutable',() => {
			let state = Map({
				movies:List.of('Trainspotting','28 Days Later')
			});
			let nextState = addMovie(state,'Sunshine');

			expect(state).to.equal(Map({
					movies:List.of('Trainspotting','28 Days Later')
				})
			);
			expect(nextState).to.equal(Map({
					movies:List.of('Trainspotting','28 Days Later','Sunshine')
				})
			);	
		});
	});
});