import { Grid } from '@material-ui/core';
import { CheckCircle, FiberManualRecord } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import IconBreadcrumbs from '../../../../../components/Breadcrumbs/Breadcrumbs';
import SimpleAccordion from '../../components/SimpleAccordion/SimpleAccordion';
import LeftCDCSS from './CSSLeftCD';
import RatingCourse from './RatingCourse';

LeftCD.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  learnings: PropTypes.array,
  parts: PropTypes.array,
};
LeftCD.defaultProps = {
  title: '',
  description: '',
  learnings: [],
  parts: [],
};
function LeftCD(props) {
  const {
    title,
    rateStar = 0,
    description,
    learnings,
    parts,
    totalLesson = 0,
    longDescription = '',
    isFull = false,
  } = props;
  const classes = LeftCDCSS();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <IconBreadcrumbs nameCourse={title} />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <div className={classes.introduce}>
            <h1>{title}</h1>
            <span>{description}</span>
            <h2>Bạn sẽ học được gì </h2>

            <ul>
              {Array.from(learnings).map((item, index) => (
                <li key={index}>
                  <CheckCircle />
                  <span>{item.learning}</span>
                </li>
              ))}
            </ul>
            <div className="course-long-description">
              {longDescription && <h2>Giới thiệu khóa học</h2>}
              {ReactHtmlParser(longDescription)}
            </div>
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
              <li>{totalLesson} bài học</li>
              {/* <li>
                <FiberManualRecord />
              </li>
              <li>thời lượng ? giờ ? phút</li> */}
            </ul>
          </div>
          {/* render list courses */}
          <SimpleAccordion parts={parts} isFull={isFull} />
        </Grid>
        <RatingCourse rateStar={rateStar} />
      </Grid>
    </div>
  );
}

export default LeftCD;
