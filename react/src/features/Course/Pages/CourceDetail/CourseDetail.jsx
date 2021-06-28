import {
  Box,
  Container,
  // DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  //makeStyles,
  Paper,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Close } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import courseApi from "../../../../api/courseApi";
import { DataUser } from "../../../../app/DataUser";
import Header from "../../../../components/header/index";
import { isEmpty } from "../../../../components/tools/Tools";
import CourseDetailCSS from "./CSSCourseDetail";
import Lecture from "./Lecture/Lecture";
import LeftCD from "./LeftCourseDetail/LeftCD";
import RightCD from "./RightCourseDetail/RightCD";

function CourseDetail(props) {
  const classes = CourseDetailCSS();
  const [dataUser, setDataUser] = useRecoilState(DataUser);
  const { idCourse } = useParams();
  // console.log(idCourse);
  const { url } = useRouteMatch();
  const { push } = useHistory();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const [course, setCourse] = useState({
    isFull: false,
  });
  function handleToggleDialog() {
    setIsOpenDialog(!isOpenDialog);
  }
  function handleOnClickBuy() {
    if (!isEmpty(dataUser.token)) {
      console.log("Buy");
      (async () => {
        // console.log(url);
        //console.log(window.location.href);
        const res1 = await courseApi.payment({
          returnUrl: window.location.href,
          idCourse: idCourse,
        });
        window.location = res1.url;
        console.log(res1);
      })();
    } else {
      push("/auth/login");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (!isEmpty(dataUser.token)) {
          //const res1 = await courseApi.check({ idCourse: idCourse });
          const res1 = await courseApi.courseAccess({ idCourse: idCourse });
          // console.log("check", res1);
          if(!res1.status){
            setCourse(res1);
          }
          
        }     else {
          const res = await courseApi.get(idCourse);
          console.log("review", res);
          if (res.status == 500 || res.status == 400) {
            push("/course");
          }
          setCourse({
            isFull: false,
            ...res,
          });
        }

        // console.log("course", course);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [url, dataUser.token]);
  // console.log("init Detail", course);
  const handleUpdateCourse = async () => {
    try {
      if (!isEmpty(dataUser.token)) {
        const res1 = await courseApi.check({ idCourse: idCourse });
        // console.log("check", res1);
        if (res1.status == 400 || res1.status == 500) {
          const res = await courseApi.get(idCourse);
          // console.log("review", res);
          if (res.status == 500) {
            push("/course");
          }
          setCourse({
            isFull: false,
            ...res,
          });
        } else {
          setCourse({
            isFull: true,
            ...res1,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <Box className={classes.backgroundHeader} />
      <Box className={classes.root}>
        <Container>
          <Grid container spacing={3}>
            <Grid
              item
              className={classes.left}
              xl={8}
              lg={8}
              md={8}
              sm={12}
              xs={12}
            >
              <Paper elevation={0}>
                {/* --------------------- Left Data --------------------------- */}
                <LeftCD
                  idCourse={course.id}
                  title={course.title}
                  description={course.description}
                  learnings={course.learnings}
                  parts={course.parts}
                  evaluates={course.evaluates}
                  onUpdate={handleUpdateCourse}
                />
              </Paper>
            </Grid>
            <Grid
              item
              className={classes.right}
              xl={4}
              lg={4}
              md={4}
              sm={12}
              xs={12}
            >
              <Paper elevation={0}>
                <RightCD
                  onClickOpenVideo={handleToggleDialog}
                  onClickBuy={handleOnClickBuy}
                  poster={course?.imagePoster?.image}
                  course={course}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Dialog
        className={classes.DialogCustom}
        fullScreen={fullScreen}
        maxWidth="lg"
        onClose={handleToggleDialog}
        aria-labelledby="customized-dialog-title"
        open={isOpenDialog}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleToggleDialog}>
          <span className={classes.smallTitle}>Giới thiệu khóa học</span>
          <span className={classes.iconClose} onClick={handleToggleDialog}>
            <Close />
          </span>
          <br />
          <span className={classes.titleVideo}>{course.title}</span>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.video}>
            <video autoPlay /* muted */ loop className="video__play" controls>
              <source src={course.demo?.urlVideo} type="video/mp4"></source>
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CourseDetail;
