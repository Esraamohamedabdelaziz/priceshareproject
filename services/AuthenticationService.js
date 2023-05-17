import axios from 'axios';
import GeneralService from './GeneralService';

export default class AuthenticationService {
    getAccountInfo() {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/customer-user/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem('userData'))?.token
                }`,
                'X-CS': generalService.domainURLValue(),
            },
        };

        const res = axios
            .get(apiUrl, headers)
            .then((response) => {
                console.log(response);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }

    onChangeAccountInfo(first_name, last_name, phone) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/customer-user/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${
                    JSON.parse(localStorage.getItem('userData'))?.token
                }`,
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = {
            first_name,
            last_name,
            phone,
        };
        console.log(body);

        const res = axios
            .put(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }

    onForgetPassword(email) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/forgot-password-public/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = { email };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }

    onResetNewPassword(password, token, uid) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/reset-password-public/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = { new_password: password, token, uid };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }
    onResetPassword(password) {
        const generalService = new GeneralService();

        const apiUrl =
            generalService.domainURLAPIValue() + '/reset-password-public/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        const uid = this.location.pathname.split('/').at(-2);
        const token = this.location.pathname.split('/').at(-1);

        const body = { password, uid, token };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }

    onRegister(
        username,
        first_name,
        last_name,
        phone,
        password,
        is_facebook_user
    ) {
        const generalService = new GeneralService();

        const apiUrl = generalService.domainURLAPIValue() + '/users/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        const body = {
            username,
            first_name,
            last_name,
            password,
            phone,
            is_facebook_user,
        };
        console.log(body);

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                return 200;
            })
            .catch((error) => {
                console.log(error);
                if (error?.response?.status == 409) {
                    return 409;
                } else {
                    return 400;
                }
            });

        return res;
    }

    onLogIn(e, setUser, user, is_facebook_user) {
        const generalService = new GeneralService();

        console.log('parameter ', e);
        console.log('user ', user);
        console.log('function setUser', setUser);
        const apiUrl = generalService.domainURLAPIValue() + '/api-token-auth/';
        const headers = {
            headers: {
                'Content-Type': 'application/json',
                'X-CS': generalService.domainURLValue(),
            },
        };

        // const username = e.target[0].value;
        // const password = e.target[1].value;

        e['is_facebook_user'] = is_facebook_user;
        if (is_facebook_user) {
            e['username'] = e['email'];
            e['password'] = 'dummy_password';
        }
        e['is_staff'] = false;
        const body = e;

        const res = axios
            .post(apiUrl, body, headers)
            .then((response) => {
                console.log(response);
                const data = {
                    token: response.data.token,
                    last_name: response.data.last_name,
                    name: response.data.name,
                    user_id: response.data.id,
                    username: response.data.username,
                };
                console.log('successful operation');
                setUser({
                    ...user,
                    isLoggedIn: true,
                    user: data,
                });
                return 200;
                // this.dispatch(handleLogin(data));
                // this.history.push('../dashboard/ecommerce');
            })
            .catch((e) => {
                return e.response.status;
                /*if (e.response.status === 400) {
                    notification['error']({
                        message: 'Wrong password',
                        description: 'Enter the correct password!',
                    });
                }*/
            });
        return res;
    }
}
