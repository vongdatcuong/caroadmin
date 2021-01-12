/**MAIN PATH */
const rootPath = "/";
const dashboardPath = "/dashboard";

/**USER PATH */
const userPath = "/user";
const profilePath = "/profile";
const logInPath = "/login";
const signUpPath = "/signup";
const emailValidation = "/emailValidation";
const sendEmailResetPassword = "/sendEmailResetPassword";
const resetPassword = "/resetPassword";
const forgotPasswordPath = "/forget-password";
const accountValidatePath = "/account-validation/:token";
const resetPasswordPath = "/reset-password/:token";

/**GAME PATH */
const gamePath = "/game";
const historyPath = "/history";
const historyGamePath = "/history/:gameID";
const spectatorPath = "/spectator";

export const route = {
  root: rootPath,
  user: userPath,
  login: logInPath,
  signup: signUpPath,
  game: gamePath,
  history: historyPath,
  emailValidation: emailValidation,
  sendEmailresetPassword: sendEmailResetPassword,
  resetPassword: resetPassword,
  profile: profilePath,
  dashboard: dashboardPath,
  forgotPassword: forgotPasswordPath,
  historyGame: historyGamePath,
  accountValidate: accountValidatePath,
  resetPasswordPath: resetPasswordPath,
  spectatorPath: spectatorPath
};
