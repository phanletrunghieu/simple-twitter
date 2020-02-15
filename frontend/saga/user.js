import { put, all, call, takeLatest } from 'redux-saga/effects'
import { UserTypes } from '../redux/user'
import { MessageAction } from '../redux/message'

function* signinRequest({signData}) {
    try {
    } catch (error) {
    }
}

function* signinSuccess() {
    setTimeout(() => {
        window.location.href = window.location.origin + "/admin"
    }, 1000);
}

function* signinFailure({error}) {
    yield put(MessageAction.addError(error))
}

export default function* authSaga() {
    yield all([
        takeLatest(UserTypes.SIGNIN_REQUEST, signinRequest),
        takeLatest(UserTypes.SIGNIN_SUCCESS, signinSuccess),
        takeLatest(UserTypes.SIGNIN_FAILURE, signinFailure),
    ])
}