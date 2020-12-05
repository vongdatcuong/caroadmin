const api = 'http://localhost:8080';


// User
const logInPath = '/logIn';
const signUpPath = '/signUp';

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export default {
    api,
    // User
    logInPath,
    signUpPath,
    // 
    queryParams
}