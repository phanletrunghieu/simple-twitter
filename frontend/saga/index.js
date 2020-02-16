import { fork, all } from 'redux-saga/effects'
import userSaga from './user'
import topTweetsSaga from './topTweets'

export default function* rootSaga() {
    yield fork(userSaga)
    yield fork(topTweetsSaga)
}
