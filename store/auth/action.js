export const actionTypes = {
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_MODEL_TOGGLE: 'LOGIN_MODEL_TOGGLE',
    REGISTER_MODEL_TOGGLE: 'REGISTER_MODEL_TOGGLE',
    START_SELLING_MODEL_TOGGLE: 'START_SELLING_MODEL_TOGGLE',
    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
};

export function loginModelController(isOpen) {
    return { type: actionTypes.LOGIN_MODEL_TOGGLE, payload: isOpen };
}

export function registerModelController(isOpen) {
    return { type: actionTypes.REGISTER_MODEL_TOGGLE, payload: isOpen };
}
export function startSellingModelController(isOpen) {
    return { type: actionTypes.START_SELLING_MODEL_TOGGLE, payload: isOpen };
}

export function login(payL) {
    console.log('payload ----->' + payL);
    return { type: actionTypes.LOGIN_REQUEST, payload: payL };
}

export function loginSuccess(payL) {
    return { type: actionTypes.LOGIN_SUCCESS, payload: payL };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function checkAuthorization(payL) {
    // const item = window.localStorage.getItem('userData');
    // // console.log(item
    return { type: actionTypes.CHECK_AUTHORIZATION, payload: payL };
}
