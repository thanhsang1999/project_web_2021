import {
  Button,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: "linear-gradient(45deg, #f1c40f 30%, #f39c12 90%)",
        backgroundSize: "200%",
        transition: "0.3s",
        "&:hover": {
          backgroundPosition: "right",
        },
        border: 0,
        color: "white",
        height: 40,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        borderRadius: "25px",
        marginTop: "2px",
      },
    },
  },
});
Button1.propTypes = {
  title: PropTypes.string,
};

Button1.defaultProps = {
  title: "",
};
function Button1(props) {
  const { title } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button>{title}</Button>
    </ThemeProvider>
  );
}

export default Button1;
