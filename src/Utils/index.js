const SERVER = "http://localhost:4000";
const api = `${SERVER}/api`;

// User
const adminPath = "/admin";
const userPath = "/user";
const gamePath = "/game";
const chatPath = "/chat";
const logInPath = "/login";
const signUpPath = "/signup";
const addStaffPath = "/addstaff";
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
  gamePath,
  chatPath,
  signUpPath,
  emailValidation,
  sendEmailResetPassword,
  resetPassword,
  addStaffPath,
  //
  queryParams,
};
export const config = {
  google_auth_client_id: "305153341920-na9skb2rrfi5tq5tce99v8bphj5ar4b1",
  facebook_app_id: "373730223867541",
};