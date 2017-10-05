import * as actions from '../redux'
import moment from 'moment'

const reducer = actions.currencyApp

describe('app reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      currencies: [{key: 0, value: '0', text: 'USD'}, {key: 1, value: '0', text: 'EUR'}],
      rates: [{key: 0, value: '0', text: '0'}],
      rate1: 'rate',
      rate2: 'rate',
      startDate: actions.store.getState().currencyApp.startDate
    })
  })

  it('should handle GET_RATES', () => {
    expect(reducer([], 
      {  type: 'GET_RATES', 
         payload: [{key: 0, value: '0', text: 'USD'}]
      })
    ).toEqual({'currencies': [{key: 0, value: '0', text: 'USD'}]})
  })

  it('should handle SET_CURRENCIES', () => {
    expect(reducer([], 
      {  type: 'SET_CURRENCIES', 
         payload: [{key: 0, value: '100', text: 'USD'}]
      })
    ).toEqual({'rates': [{key: 0, value: '100', text: 'USD'}]})
  })

  it('should handle CHANGE_CURRENCY1', () => {
    expect(reducer([], 
      {  type: 'CHANGE_CURRENCY1', 
         payload: 100
      })
    ).toEqual({'rate1': 100})
  })

  it('should handle CHANGE_CURRENCY2', () => {
    expect(reducer([], 
      {  type: 'CHANGE_CURRENCY2', 
         payload: 100
      })
    ).toEqual({'rate2': 100})
  })

  it('should handle GET_DATE', () => {
    expect(reducer([], 
      {  type: 'GET_DATE', 
         payload: '01/01/2016'
      })
    ).toEqual({'startDate': '01/01/2016'})
  })

})

describe('combine reducers', () => {
  it('should be function', () => {
    expect(actions.reducers).toBeInstanceOf(Function)
  })

  it('should be function', () => {
    expect(actions.configureStore).toBeInstanceOf(Function)
  })
})

describe('store', () => {
  it('should be object', () => {
    expect(actions.store).toBeInstanceOf(Object)
  })
})