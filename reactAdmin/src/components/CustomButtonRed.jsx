import { Button, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  CustomButton: {
    background:
      "linear-gradient(45deg, var(--colorRed1) 30%, var(--colorRed2) 90%)",
    backgroundSize: "200%",
    transition: "0.3s",
    "&:hover": {
      backgroundPosition: "right",
    },
    "&:focus": {
      outline: "none",
    },
    border: 0,
    color: "white",
    height: 35,
    padding: "0 15px",
    boxShadow: "0 3px 2px 2px #e74c3c30",
    borderRadius: "10px",
  },
}));
function CustomButtonRed(props) {
  const {
    title = "",
    type = "button",
    size = "medium",
    variant = "text",
    fullWidth = false,
    css = true,
    color = "default",
    onClick = null,
  } = props;
  const classes = useStyles();
  return (
    <Button
      size={size}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      color={color}
      className={css && classes.CustomButton}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {title}
    </Button>
  );
}

export default CustomButtonRed;
