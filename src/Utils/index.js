const SERVER = "http://localhost:4000";
const api = `${SERVER}/api`;

// User
const adminPath = "/admin";
const userPath = "/user";
const logInPath = "/login";
const signUpPath = "/signup";
const emailValidation = "/emailValidation";
const sendEmailResetPassword = "/sendEmailResetPassword";
const resetPassword = "/resetPassword";
function queryParams(params) {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

export default {
  api,
  SERVER,
  // User
  adminPath,
  userPath,
  logInPath,
  signUpPath,
  emailValidation,
  sendEmailResetPassword,
  resetPassword,
  //
  queryParams,
};
