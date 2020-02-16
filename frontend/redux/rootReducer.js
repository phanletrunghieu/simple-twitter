import { combineReducers } from "redux"
import { UserTypes } from "./user";
import message from './message'
import topTweets from './topTweets'

const appReducer = combineReducers({
    message,
    topTweets,
});

const rootReducer = (state, action) => {
    if (action.type === UserTypes.SIGNOUT) {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;