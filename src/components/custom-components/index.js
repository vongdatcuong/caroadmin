import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
export const BtnFacebook = withStyles({
  root: {
    background: "#3b5998",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    height: 48,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: 5,
    marginBottom: 10,
  },
  label: {
    textTransform: "capitalize",
  },
  "&$hover": {
    background: "#3b5998",
  },
})(Button);
export const BtnGoogle = withStyles({
  root: {
    background: "#db3236",
    borderRadius: 3,
    border: 0,
    color: "white",
    padding: "0 30px",
    height: 48,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: 5,
    marginBottom: 10,
  },
  label: {
    textTransform: "capitalize",
  },
  "&$hover": {
    background: "#3b5998",
  },
})(Button);
