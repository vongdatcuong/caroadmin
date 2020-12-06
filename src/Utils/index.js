const api = "http://localhost:8080/api";

// User
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
  userPath,
  // User
  logInPath,
  signUpPath,
  //
  queryParams,
};
