import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import ButtonSubmit from "../../../../components/Button/ButtonSubmit";
import {
  colorBlack1,
  colorBlack2,
  colorOrange1,
} from "../../../../components/color/color";
import InputText from "../../../../components/TextField";
import InputTextDisable from "../../../../components/TextField/InputTextDisable";
//css
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: 'url("../assets/images/noell.jpg")',
    minHeight: "100vh",

    position: "relative",

    backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
    background:
      'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/noell.jpg")',
  },
  cssForm: {
    background: "white",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px 40px 20px 40px",
    borderRadius: "10px",
    width: "27%",
    height: "75%",
    [theme.breakpoints.only("xs")]: {
      width: "90%",
      height: "80%",
    },
    [theme.breakpoints.only("sm")]: {
      width: "36%",
    },
  },
  title: {
    fontFamily: "Poppins",
    fontSize: "40px",
    textAlign: "center",
    display: "block",
    fontWeight: "700",
    margin: "50px 0 30px 0",
  },
  text1: {
    fontSize: "18px",
    marginTop: "40px",
    display: "block",
    textAlign: "center",
    color: colorBlack1,
  },
  textDK: {
    fontSize: "16px",
    fontWeight: 600,
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    color: colorBlack2,
    "&:hover": {
      color: colorOrange1,
    },
  },
  text3: {
    margin: "10px 0px 10px 0px",
    display: "block",
    textAlign: "right",
    textDecoration: "none",
    color: colorBlack2,
    "&:hover": {
      color: colorOrange1,
    },
  },
}));
//proptypes
FormForgotPasswordCode.propTypes = {};

//yup

const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập username"),
  code: yup.string().required("Vui lòng nhập code từ email"),
});
//function
function FormForgotPasswordCode(props) {
  const { onSubmit, data } = props;
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      username: data.username,
      code: "",
    },
    resolver: yupResolver(schema),
  });

  function handleOnSubmit(values) {
    if (!onSubmit) return;
    onSubmit(values);
  }
  return (
    <div className={classes.root}>
      <form
        className={classes.cssForm}
        onSubmit={form.handleSubmit(handleOnSubmit)}
      >
        <span className={classes.title}>Confirm Forgot Password</span>
        <InputTextDisable
          label="Username"
          name="username"
          value={data.username}
          form={form}
        />
        <InputText label="Code" name="code" form={form} />
        <ButtonSubmit title="Submit" />
        <span className={classes.text1}>Did you remember the account?</span>
        <Link to="/auth/login" className={classes.textDK}>
          <span>Login</span>
        </Link>
      </form>
    </div>
  );
}

export default FormForgotPasswordCode;
