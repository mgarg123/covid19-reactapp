import { createStore } from 'redux' //,applyMiddleware
// import logger from 'redux-logger'
// import { darkModeReducer } from './darkModeReducer'
// import { usersReducer } from './usersReducer'
import rootReducer from './rootReducer'

// let rootReducer = combineReducers(darkModeReducer, usersReducer)

const store = createStore(rootReducer) //applyMiddleware(logger)

export default store