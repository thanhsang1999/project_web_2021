import React from "react";
import CardCourseDetail from "../../../../../components/card/CardCourseDetail";
import RightCDCSS from "./CSSRightCD";
import PropTypes from "prop-types";

RightCD.propTypes = {
  poster: PropTypes.string,
  
};
RightCD.defaultProps = {
  poster: "",
 
};
function RightCD(props) {
  const { onClickOpenVideo, poster } = props;
  function handleOnClickOpenVideo() {
    if (!onClickOpenVideo) return;
    onClickOpenVideo();
  }
  const classes = RightCDCSS();
  return (
    <div className={classes.root}>
      <CardCourseDetail onClickBuy={props.onClickBuy} course={props.course} onClickOpenVideo={handleOnClickOpenVideo} poster={poster} />
    </div>
  );
}

export default RightCD;
