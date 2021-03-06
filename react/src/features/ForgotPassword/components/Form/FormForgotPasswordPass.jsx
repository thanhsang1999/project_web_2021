import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import ButtonSubmit from '../../../../components/Button/ButtonSubmit';
import {
  colorBlack1,
  colorBlack2,
  colorOrange1,
} from '../../../../components/color/color';
import CustomInput from '../../../../components/Input/CustomInput';
import CustomInputHidden from '../../../../components/Input/CustomInputHidden';
//css
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundImage: 'url("../assets/images/noell.jpg")',
    minHeight: '100vh',

    position: 'relative',

    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    background:
      'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("../assets/images/4.jpg")',
  },
  cssForm: {
    background: 'white',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px 40px 20px 40px',
    borderRadius: '10px',
    width: '400px',
    height: '75%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: '40px',
    textAlign: 'center',
    display: 'block',
    fontWeight: '700',
    margin: '50px 0 30px 0',
  },
  text1: {
    fontSize: '18px',
    marginTop: '40px',
    display: 'block',
    textAlign: 'center',
    color: colorBlack1,
  },
  textDK: {
    fontSize: '16px',
    fontWeight: 600,
    display: 'block',
    textAlign: 'center',
    textDecoration: 'none',
    color: colorBlack2,
    '&:hover': {
      color: colorOrange1,
    },
  },
  text3: {
    margin: '10px 0px 10px 0px',
    display: 'block',
    textAlign: 'right',
    textDecoration: 'none',
    color: colorBlack2,
    '&:hover': {
      color: colorOrange1,
    },
  },
}));
//proptypes
FormForgotPasswordPass.propTypes = {};

//yup

const schema = yup.object().shape({
  username: yup.string(),
  code: yup.string(),
  password: yup
    .string()
    .required('Vui l??ng nh???p password')
    .min(3, 'Vui l??ng nh???p h??n 3 k?? t???'),
  retypepassword: yup
    .string()
    .required('Vui l??ng nh???p password')
    .oneOf([yup.ref('password')], 'password kh??ng gi???ng nhau'),
});
//function
function FormForgotPasswordPass(props) {
  const { onSubmit, data } = props;
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      username: data.username,
      code: data.code,
      password: '',
      retypepassword: '',
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
        <span className={classes.title}>Qu??n m???t kh???u</span>
        <CustomInputHidden value={data.username} name="username" form={form} />
        <CustomInputHidden value={data.code} name="code" form={form} />
        <CustomInput
          label="M???t kh???u"
          name="password"
          type="password"
          form={form}
        />
        <CustomInput
          label="Nh???p l???i m???t kh???u"
          name="retypepassword"
          type="password"
          form={form}
        />
        <ButtonSubmit title="G???i" />
        <span className={classes.text1}>B???n ???? nh??? m???t kh???u r???i ?</span>
        <Link to="/auth/login" className={classes.textDK}>
          <span>????ng nh???p</span>
        </Link>
      </form>
    </div>
  );
}

export default FormForgotPasswordPass;
