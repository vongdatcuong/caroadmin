const api = "http://localhost:4000/api";

// User
const adminPath = "/admin";
const logInPath = "/login";
const signUpPath = "/signup";
//
const userPath = "/user"

function queryParams(params) {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

export default {
  api,
  adminPath,
  userPath,
  // User
  logInPath,
  signUpPath,
  //
  queryParams,
};
