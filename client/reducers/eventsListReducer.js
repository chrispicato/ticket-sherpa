import { combineReducers } from 'redux';

import {
  SELECT_EVENT,
  INVALIDATE_EVENT,
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  SEARCH_EVENTS,
  RECEIVE_SEARCH_EVENTS,
  SEARCH_EVENTS_RESULTS,
  CHECK_ADDRESS,
  SERVER_ERROR,
  GEOENCODE_ERROR,
  GEOENCODE_SERVER_ERROR,
  NO_ADDRESS,
} from '../actions/index.jsx';

const selectEvent = (state = [], action) => {
  switch (action.type) {
    case 'SELECT_EVENT':
      return [...state, {
        eventName: action.eventName,
        date: action.date,
        time: action.time,
        address: action.address,
        price: action.price,
      }];
    default:
      return state;
  }
};

const eventsList = (state = [], action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
      if (!action.payload || action.payload.data !== undefined) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const receiveEvents = (state = false, action) => {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.payload;
    default:
      return state;
  }
};

const searchEvents = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_EVENTS:
      return {
        ...state,
        searchEvents: action.payload,
      };
    default:
      return state;
  }
};

const searchEventsList = (state = [], action) => {
  switch (action.type) {
    case SEARCH_EVENTS_RESULTS:
      if (!action.payload || action.payload.data !== undefined) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

const checkAddress = (state = {}, action) => {
  switch (action.type) {
    case CHECK_ADDRESS:
      return state;
    case GEOENCODE_ERROR:
      return {
        ...state,
        GEOENCODE_ERROR: action.payload,
      };
    case GEOENCODE_SERVER_ERROR:
      return {
        ...state,
        GEOENCODE_SERVER_ERROR: action.payload,
      };
    default:
      return state;
  }
};

const checkAddressEntered = (state = true, action) => {
  switch (action.type) {
    case NO_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

const checkServerError = (state = true, action) => {
  switch (action.type) {
    case SERVER_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const checkGeoencodeError = (state = true, action) => {
  switch (action.type) {
    case GEOENCODE_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const checkGeoencodeServerError = (state = true, action) => {
  switch (action.type) {
    case GEOENCODE_SERVER_ERROR:
      return action.payload;
    default:
      return state;
  }
};

const eventsListReducer = combineReducers({
  selectEvent,
  eventsList,
  receiveEvents,
  searchEvents,
  searchEventsList,
  checkAddress,
  checkAddressEntered,
  checkServerError,
  checkGeoencodeError,
  checkGeoencodeServerError,
});

export default eventsListReducer;
