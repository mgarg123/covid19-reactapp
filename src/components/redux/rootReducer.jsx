import { combineReducers } from 'redux'
import { darkModeReducer } from './darkModeReducer'
import { usersReducer } from './usersReducer'

const rootRedcuer = combineReducers({
    theme: darkModeReducer,
    users: usersReducer
})

export default rootRedcuer

