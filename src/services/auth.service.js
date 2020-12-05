import constant from '../Utils';

class AuthService {
    logIn(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                password: password
            })
        };
        return fetch(constant.api + constant.userPath + constant.logInPath, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.isSuccess){
                    localStorage.setItem("user", JSON.stringify(result.user));
                    return {
                        isSuccess: true,
                        user: result.user
                    };
                } else {
                    return {
                        isSuccess: false,
                        message: result.message
                    }
                }
                
            })
    }

    logInWithGoogle(googleID) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify({ 
                googleID: googleID
            })
        };
        return fetch(constant.api + constant.userPath + constant.logInWithGoogle, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.isSuccess){
                    localStorage.setItem("user", JSON.stringify(result.user));
                    return {
                        isSuccess: true,
                        user: result.user
                    };
                } else {
                    return {
                        isSuccess: false,
                        message: result.message
                    }
                }
                
            })
    }

    logInWithFacebook(facebookID) {
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' ,
            },
            body: JSON.stringify({ 
                facebookID: facebookID
            })
        };
        return fetch(constant.api + constant.userPath + constant.logInWithFacebook, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.isSuccess){
                    localStorage.setItem("user", JSON.stringify(result.user));
                    return {
                        isSuccess: true,
                        user: result.user
                    };
                } else {
                    return {
                        isSuccess: false,
                        message: result.message
                    }
                }
                
            })
    }

    logOut(){
        localStorage.removeItem("user");
    }

    signUp(username, password, name, email) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: username,
                password: password,
                name: name,
                email: email
            })
        };
        return fetch(constant.api + constant.userPath + constant.signUpPath, requestOptions)
            .then(response => response.json())
            .then(result => {
                return {
                    isSuccess: result.isSuccess,
                    message: result.message
                };
                
            })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    updateCurrentUser(newUser){
        const user = Object.assign({}, JSON.parse(localStorage.getItem('user')), newUser);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
    }
  }
  
  export default new AuthService();