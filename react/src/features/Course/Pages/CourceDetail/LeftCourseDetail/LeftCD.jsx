import { Grid } from "@material-ui/core";
import { CheckCircle, FiberManualRecord } from "@material-ui/icons";
import React from "react";
import IconBreadcrumbs from "../../../../../components/Breadcrumbs/Breadcrumbs";
import SimpleAccordion from "../../components/SimpleAccordion/SimpleAccordion";
import LeftCDCSS from "./CSSLeftCD";
import PropTypes from "prop-types";

LeftCD.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  learning: PropTypes.array,
  parts: PropTypes.array,
};
LeftCD.defaultProps = {
  title: "",
  description: "",
  learning: [],
  parts: [],
};
function LeftCD(props) {
  const { title, description, learning, parts } = props;
  const classes = LeftCDCSS();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <IconBreadcrumbs />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className={classes.introduce}>
            <h1>{title}</h1>
            <span>{description}</span>
            <h2>Bạn sẽ học được gì</h2>

            <ul>
              {Array.from(learning).map((item, index) => (
                
                <li key={index}>
                  <CheckCircle />
                  <span>{item.learning}</span>
                </li>
              ))}
            </ul>
          </div>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className={classes.contentCourse}>
            <h2>Nội dung khóa học</h2>
            <ul>
              <li>{parts.length} phần</li>
              <li>
                <FiberManualRecord />
              </li>
              <li>10 bài học</li>
              <li>
                <FiberManualRecord />
              </li>
              <li>thời lượng ? giờ ? phút</li>
            </ul>
          </div>
          {/* render list courses */}
          <SimpleAccordion parts={parts} />
        </Grid>
      </Grid>
    </div>
  );
}

export default LeftCD;
