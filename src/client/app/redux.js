import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import axios from 'axios';
import thunk from 'redux-thunk';
import moment from 'moment';

const initialState = {
  currencies: [{key: 0, value: '0', text: 'USD'}, {key: 1, value: '0', text: 'EUR'}],
  rates: [{key: 0, value: '0', text: '0'}],
  rate1: 'rate',
  rate2: 'rate',
  startDate: moment()
};

let ratesList = [];

function getRates(url, dispatch) {
  ratesList = [];
  axios.get(url)
  .then(res => {
    let parser = new DOMParser(),
        currenciesList = [],
        valutes = parser.parseFromString(res.data, 'text/xml').getElementsByTagName('Valute');
    
    for (let i = 0; i < valutes.length; i++) {
      if (valutes[i].childNodes[3].textContent === 'USD') {
        dispatch({type: 'CHANGE_CURRENCY1', payload: valutes[i].childNodes[9].textContent});
      }
      else if (valutes[i].childNodes[3].textContent === 'EUR') {
        dispatch({type: 'CHANGE_CURRENCY2', payload: valutes[i].childNodes[9].textContent});
      }
      
      currenciesList.push({
        key: i, 
        text: valutes[i].childNodes[3].textContent, 
        value: valutes[i].childNodes[3].textContent
      });

      ratesList.push({
        key: i,
        text: valutes[i].childNodes[3].textContent, 
        value: valutes[i].childNodes[9].textContent
      });
    }

    dispatch({type: 'GET_RATES', payload: currenciesList});
    dispatch({type: 'SET_CURRENCIES', payload: ratesList});
  })
  .catch(e => {
    console.log(e);
  });  
}

function dateFormat(date) {
  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() 
          < 10 ? '0' + date.getMonth() : date.getMonth()}/${date.getFullYear()}`;
}

export const getCurrencyRate = () => {
  return dispatch => {
    let date = new Date(),
        currentDate = dateFormat(date);

    getRates(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${currentDate}`, dispatch);
  }
}

export const changeDate = (date) => {
  return dispatch => {
    let chosenDate = dateFormat(date);
        
    dispatch({type: 'GET_DATE', payload: date});
    getRates(`http://www.cbr.ru/scripts/XML_daily.asp?date_req=${chosenDate}`, dispatch);
  }
}

export const changeCurrency = (e, val) => {
  return dispatch => {
    if (e) {
      console.log(e);
    }

    let currency = val.value;
    for (let i = 0; i < ratesList.length; i++) {
      if (currency === ratesList[i].text) {
        if (val.defaultValue === 'AUD') {
          dispatch({type: 'CHANGE_CURRENCY1', payload: ratesList[i].value});
        }
        else {
          dispatch({type: 'CHANGE_CURRENCY2', payload: ratesList[i].value});
        }
      }
    }
  }
}

export const currencyApp = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_RATES':
      return Object.assign({}, state, {currencies: action.payload});
    case 'SET_CURRENCIES':
      return Object.assign({}, state, {rates: action.payload});
    case 'CHANGE_CURRENCY1':
      return Object.assign({}, state, {rate1: action.payload});
    case 'CHANGE_CURRENCY2':
      return Object.assign({}, state, {rate2: action.payload});
    case 'GET_DATE':
      return Object.assign({}, state, {startDate: action.payload});
    default:
      return state;
  }
};

export const reducers = combineReducers({
  currencyApp,
});

export function configureStore(initialState = {}) {  
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  )
  return store;
};
  
export const store = configureStore();