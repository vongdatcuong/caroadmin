import constant from "../Utils";

class AuthService {
  logIn(username, password) {
    const data = {
      username: username,
      password: password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: Buffer.from(JSON.stringify(data)).toString("base64"),
      }),
    };
    return fetch(
      constant.api +
        constant.adminPath +
        constant.userPath +
        constant.logInPath,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("token", result.token);
          return {
            isSuccess: true,
            user: result.user,
          };
        } else {
          return {
            isSuccess: false,
            message: result.message,
          };
        }
      });
  }

  googleLogin = (googleresponse) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(googleresponse),
    };
    return fetch(constant.api + "/admin/user/googlelogin", requestOptions);
  };
  facebookLogin = (fbresponse) => {
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fbresponse),
    };
    return fetch(constant.api + "/admin/user/facebooklogin", requestOptions);
  };

  logOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  signUp(username, password, name, email, isAdmin, isActive) {
    const token = localStorage.getItem("token");
    const data = {
      username: username,
      password: password,
      name: name,
      email: email,
      user_type: isAdmin ? "ADMIN" : "STAFF",
      isActive: isActive,
    };
    console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
     },
      body: JSON.stringify({
        data: Buffer.from(JSON.stringify(data)).toString("base64"),
      }),
    };
    return fetch(
      constant.api + constant.adminPath + constant.userPath,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        return {
          isSuccess: result.success,
          message: result.message,
        };
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  updateCurrentUser(newUser) {
    const user = Object.assign(
      {},
      JSON.parse(localStorage.getItem("user")),
      newUser
    );
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  }

  async activeAccount(token) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    let res = await fetch(
      constant.api + constant.userPath + constant.emailValidation,
      requestOptions
    );
    return res;
  }
  async sendRequestResetEmail(email) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    };
    let res = await fetch(
      constant.api + constant.userPath + constant.sendEmailResetPassword,
      requestOptions
    );
    return res;
  }
  async resetPassword(token, password) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        password: password,
      }),
    };
    let res = await fetch(
      constant.api + constant.userPath + constant.resetPassword,
      requestOptions
    );
    return res;
  }
}

export default new AuthService();
