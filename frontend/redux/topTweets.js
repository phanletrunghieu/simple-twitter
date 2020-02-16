import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE ={
    isLoading: false,
    refreshing: false,
    tweets: [],
    error: null
}

// action
const { Types, Creators } = createActions({
    getTopTweetsRequest: ['offset', 'limit'],
    getTopTweetsSuccess: ['tweets', 'offset'],
    getTopTweetsFailure: ['error'],

    increaseRetweet: ['tweetID'],
})

export const TopTweetsAction = Creators
export const TopTweetsTypes = Types

// reducer
const request = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: action.offset != 0,
        refreshing: action.offset == 0,
        error: null,
    }
}

const success = (state = INITIAL_STATE, action) => {
    let tweets = [...state.tweets]
    if (action.offset == 0) {
        // refresh
        tweets = action.tweets
    } else {
        tweets.splice(action.offset, action.tweets.length, ...action.tweets)
    }

    return {
        ...state,
        isLoading: false,
        refreshing: false,
        tweets,
    }
}

const failure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        refreshing: false,
        error: action.error,
    }
}

const increaseRetweet = (state = INITIAL_STATE, action) => {
    const {tweetID} = action
    let {tweets} = state
    tweets = tweets.map(tweet => {
        if (tweet.id == tweetID) {
            tweet.numRetweet = !tweet.numRetweet ? 1 : tweet.numRetweet+1
        }
        return tweet
    })

    // tweets = tweets.sort((a, b) => b.numRetweet - a.numRetweet)

    return {
        ...state,
        tweets,
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.GET_TOP_TWEETS_REQUEST]: request,
    [Types.GET_TOP_TWEETS_SUCCESS]: success,
    [Types.GET_TOP_TWEETS_FAILURE]: failure,
    [Types.INCREASE_RETWEET]: increaseRetweet,
})