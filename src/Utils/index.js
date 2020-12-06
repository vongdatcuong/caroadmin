const api = "http://localhost:8080";

// User
const logInPath = "/login";
const signUpPath = "/signup";

function queryParams(params) {
  return Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

export default {
  api,
  // User
  logInPath,
  signUpPath,
  //
  queryParams,
};
