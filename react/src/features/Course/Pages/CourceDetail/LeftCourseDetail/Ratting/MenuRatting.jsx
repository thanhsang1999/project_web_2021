import { Grid, makeStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import classNames from "classnames";
import React, { useState } from "react";
const useStyles = makeStyles((theme) => ({
  menuRating: {
    display: "flex",
    background: "rgba(243, 156, 18,.3)",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid var(--colorGray2)",
  },
  leftMenu: {
    display: "flex",
    flexFlow: "column",
    marginRight: "30px",
    "&>span:first-of-type": {
      display: "flex",
      justifyContent: "center",
      fontSize: "24px",
      fontWeight: 600,
      color: "var(--colorBlack2)",
      marginBottom: "15px",
    },
  },
  rightMenu: {
    display: "flex",
    "&>ul": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "&>li": {
        margin: "0 20px",
        "&>span": {
          background: "var(--colorWhite0)",
          padding: "6px",
          border: "1px solid var(--colorGray2)",
          borderRadius: "5px",
          cursor: "pointer",
          color: "var(--colorBlack2)",
          fontSize: "17px",
        },
        "&>span:hover": {
          border: "1px solid var(--colorOrange2)",
          color: "var(--colorOrange2)",
        },
      },
    },
  },
  selected: {
    border: "1px solid var(--colorOrange2) !important",
    color: "var(--colorOrange2) !important",
  },
  [theme.breakpoints.down("md")]: {
    menuRating: {
      display: "flex",
      flexFlow: "column",
    },
    leftMenu: {
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      marginRight: "0px",
      "&>span:first-of-type": {
        display: "flex",
        justifyContent: "center",
        fontSize: "24px",
        fontWeight: 600,
        color: "var(--colorBlack2)",
        marginBottom: "15px",
      },
    },
    rightMenu: {
      display: "flex",
      justifyContent: "center",
      "&>ul": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexFlow: "row wrap",
        "&>li": {
          margin: "20px 20px",
          "&>span": {
            background: "var(--colorWhite0)",
            padding: "6px",
            border: "1px solid var(--colorGray2)",
            borderRadius: "5px",
            cursor: "pointer",
            color: "var(--colorBlack2)",
            fontSize: "17px",
          },
          "&>span:hover": {
            border: "1px solid var(--colorOrange2)",
            color: "var(--colorOrange2)",
          },
        },
      },
    },
  },
}));
function MenuRatting(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  return (
    <Grid className={classes.menuRating}>
      <Grid className={classes.leftMenu}>
        <span>4.5 trên 5</span>
        <Rating defaultValue={4.5} precision={0.5} readOnly />
      </Grid>
      <Grid className={classes.rightMenu}>
        <ul>
          {[0, 5, 4, 3, 2, 1].map((item, index) => (
            <li key={index}>
              <span
                className={classNames(selected == item && classes.selected)}
                onClick={() => {
                  setSelected(item);
                }}
              >
                {item == 0 ? "Tất cả" : `${item} sao`}
              </span>
            </li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
}

export default MenuRatting;