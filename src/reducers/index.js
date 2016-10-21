import { combineReducers } from 'redux'
import { RECEIVE_TRIPS, REQUEST_TRIPS, SELECT_USER } from '../actions/index'

const selectedUser = (state = {ID: 0}, action) => {
  switch (action.type) {
    case 'SELECT_USER':
      return action.user
    default:
      return state
  }
}

const Trips = (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_TRIPS':
      return {
        ...state,
        trips: action.trips
      }
    default:
      return state
  }
}



const loginUser = (state = {user: ''}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {user: action.user})
  default:
    return state
  }
}



const rootReducer = combineReducers({
  loginUser,
  selectedUser,
  Trips
})

export default rootReducer
