import { put, all, call, takeLatest } from 'redux-saga/effects'
import {TopTweetsAction, TopTweetsTypes} from '../redux/topTweets'
import { MessageAction } from '../redux/message'
import {getTopTweets as getTopTweetsAPI} from '../api/queries/getTopTweets'

function* getTopTweets({offset, limit}) {
    try {
        const tweets = yield call(getTopTweetsAPI, offset, limit)
        yield put(TopTweetsAction.getTopTweetsSuccess(tweets, offset))
    } catch (error) {
        yield put(TopTweetsAction.getTopTweetsFailure(error))
    }
}

function* failure({error}) {
    yield put(MessageAction.addError(error))
}

export default function* topTweetsSaga() {
    yield all([
        takeLatest(TopTweetsTypes.GET_TOP_TWEETS_REQUEST, getTopTweets),
        takeLatest(TopTweetsTypes.GET_TOP_TWEETS_FAILURE, failure),
    ])
}