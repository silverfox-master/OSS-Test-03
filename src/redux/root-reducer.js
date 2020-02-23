import { combineReducers } from 'redux'
import userReducer from './user/user.reducer'
import statsReducer from './stats/stats.reducer'

export default combineReducers({
    user:userReducer,
    sum:statsReducer,
    mean:statsReducer,
    quantity:statsReducer
})