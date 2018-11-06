import {expect} from 'chai'
import {createStore} from 'redux'
import {gotHats, addHats, allHats} from './allHatsReducer'

const hats = [
  {
    id: 10,
    name: 'Top Hat',
    description:
      'A tall, flat-crowned, cylindrical hat worn by men in the 19th and early 20th centuries, now worn only with morning dress or evening dress.',
    price: 4252,
    quantity: 10,
    category: 'Classy'
  }
]

describe('Action creators', () => {
  describe('gotHats', () => {
    it('returns properly formatted got hats action', () => {
      expect(gotHats(hats)).to.be.deep.equal({
        type: 'GOT_HATS',
        hats
      })
    })
  })

  describe('addHats', () => {
    it('returns properly formatted add hats action', () => {
      expect(addHats(hats)).to.be.deep.equal({
        type: 'ADD_HATS',
        hats
      })
    })
  })
})

describe('Reducer', () => {
  it('returns the initial state by default', () => {
    const store = createStore(allHats)
    expect(store.getState().allHats).to.be.an('array')
  })

  describe('reduces on GOT_HATS action', () => {
    it('sets the allHats on state', () => {
      const store = createStore(allHats)

      const action = {type: 'GOT_HATS', hats}
      store.dispatch(action)

      expect(store.getState().allHats).to.be.deep.equal(hats)
    })
  })

  describe('reduces on ADD_HATS action', () => {
    it('adds a new hat to allHats without mutating the original array', () => {
      const store = createStore(allHats)
      const prevState = store.getState()

      const action = {type: 'ADD_HATS', hats}
      store.dispatch(action)

      const newState = store.getState()

      expect(newState.allHats.length).to.be.equal(prevState.allHats.length + 1)
      expect(newState.allHats[newState.allHats.length - 1]).to.be.deep.equal(
        hats
      )
    })
  })

  describe('reduces on REMOVE_HATS action', () => {
    it('removes a hat from the allHats array (without mutating the previous state)', () => {
      const store = createStore(allHats)

      const action = {type: 'ADD_HATS', hats}
      store.dispatch(action)

      const prevState = store.getState()

      const action2 = {type: 'REMOVE_HATS', hats}
      store.dispatch(action2)

      const newState = store.getState()

      expect(newState.allHats.length).to.be.equal(prevState.allHats.length - 1)
      expect(prevState.allHats).to.be.deep.equal([hats])
    })
  })

  describe('handles unrecognized actions', () => {
    it('returns the previous state', () => {
      const store = createStore(allHats)
      const prevState = store.getState()

      const action = {type: 'NOT_A_THING'}
      store.dispatch(action)

      const newState = store.getState()

      // these should be the same object in memory AND have equivalent key-value pairs
      expect(prevState).to.be.an('object')
      expect(newState).to.be.an('object')
      expect(newState).to.be.equal(prevState)
      expect(newState).to.be.deep.equal(prevState)
    })
  })
}) // end Reducer
