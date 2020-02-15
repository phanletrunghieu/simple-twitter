import { createActions, createReducer } from 'reduxsauce'

// array of object {type: "error" | "success", message}
const INITIAL_STATE ={
    messages: [],
}

// action
const { Types, Creators } = createActions({
    addError: ['error'],
    addSuccess: ['msg'],
    removeError: ['error'],
})

export const MessageAction = Creators
export const MessageTypes = Types

// reducer
export const addError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        messages: state.messages.concat({type:"error", message: action.error}),
    }
}

export const addSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        messages: state.messages.concat({type:"success", message: action.msg}),
    }
}

export const removeError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        messages: state.messages.filter((e, i) => e != action.error),
    }
}

export default createReducer(INITIAL_STATE, {
    [Types.ADD_ERROR]: addError,
    [Types.REMOVE_ERROR]: removeError,
    [Types.ADD_SUCCESS]: addSuccess,
})