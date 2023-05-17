import { actionTypes } from './action';
import useJwt from '../../src/@core/auth/jwt/useJwt';
import Router from 'next/router';

const config = useJwt.jwtConfig;

// const initialUser = () => {
//     const item = window.localStorage.getItem('userData');
//     //** Parse stored json or if none return initialValue
//     console.log('item ----> ', item);
//     return item ? JSON.parse(item) : {};
// };

export const initState = {
    isLoggedIn: false,
    user: null,
    isLoginModelOpen: false,
    isRegisterModelOpen: false,
    isStartSellingModelOpen: false,
};

function reducer(state = initState, actions) {
    // state = {
    //     ...state,
    //     user: initialUser,
    // };
    switch (actions.type) {
        case actionTypes.CHECK_AUTHORIZATION:
            return {
                ...state,
                isLoggedIn: true,
                user: actions.payload,
            };
        case actionTypes.LOGIN_SUCCESS:
            console.log('payload from reducers -----> ' + actions.payload);
            window.localStorage.setItem('token', actions.payload.token);
            window.localStorage.setItem(
                'userData',
                JSON.stringify({
                    name: actions.payload.name,
                    last_name: actions.payload.last_name,
                    token: actions.payload.token,
                    user_id: actions.payload.user_id,
                    username: actions.payload.username,
                })
            );

            // console.log(window.localStorage.getItem('userData').token);
            return {
                ...state,
                ...{ isLoggedIn: true, user: actions.payload },
            };
        case actionTypes.LOGOUT_SUCCESS:
            window.localStorage.removeItem('userData');
            window.localStorage.removeItem('token');
            return {
                ...state,
                ...{ isLoggedIn: false, user: null },
            };
        case actionTypes.LOGIN_MODEL_TOGGLE:
            return {
                ...state,
                isLoginModelOpen: actions.payload,
            };
        case actionTypes.REGISTER_MODEL_TOGGLE:
            return {
                ...state,
                isRegisterModelOpen: actions.payload,
            };
        case actionTypes.START_SELLING_MODEL_TOGGLE:
            return {
                ...state,
                isStartSellingModelOpen: actions.payload,
            };
        default:
            return state;
    }
}

export default reducer;
