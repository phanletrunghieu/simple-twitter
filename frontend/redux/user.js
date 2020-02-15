import { createActions, createReducer } from 'reduxsauce'
import { signout as signoutUtil } from '../utils/auth'

const INITIAL_STATE = {
    isSignining: false,
    user: {},
    success: false,
    error: null
}

// action
const { Types, Creators } = createActions({
    signinRequest: ['signData'],
    signinSuccess: ['user', 'facilities'],
    signinFailure: ['error'],
    signout: null,
})

export const UserAction = Creators
export const UserTypes = Types

// reducer
export const request = (state = INITIAL_STATE, action) => {
    return {...state, isSignining: true}
}

export const success = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSignining: false,
        success: true,
        user: action.user,
    }
}

export const failure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSignining: false,
        error: action.error,
    }
}

export const signout = (state = INITIAL_STATE, action) => {
    signoutUtil();
    return INITIAL_STATE
}

export default createReducer(INITIAL_STATE, {
    [Types.SIGNIN_REQUEST]: request,
    [Types.SIGNIN_SUCCESS]: success,
    [Types.SIGNIN_FAILURE]: failure,
    [Types.SIGNOUT]: signout,
})