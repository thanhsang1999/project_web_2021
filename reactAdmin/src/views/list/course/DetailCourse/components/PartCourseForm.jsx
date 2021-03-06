import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "src/components/CustomButton";
import CustomInput from "src/components/CustomInput";
import * as yup from "yup";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CustomSelectForm from "src/components/form/CustomSelectForm";
import FormParts from "./PartCourse/FormParts";
import FormCreateLesson from "./PartCourse/FormCreateLesson";
import FormUploadLesson from "./PartCourse/FormUpdateLesson";
import courseApi from "src/api/courseApi";
import { isEmpty } from "src/Tool/Tools";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  formAddPart: {
    display: "flex",
    alignItems: "center",
    "& > span": {
      minWidth: "150px",
      fontSize: " 16px",
    },
    "& > button": {
      marginLeft: "15px",
    },
    marginBottom: "30px",
    marginTop: "30px",
  },
  contentPart: {
    "& .MuiAccordionDetails-root": {
      display: "flex",
      flexFlow: "column",
    },
    "&>.MuiPaper-elevation1": {
      boxShadow:
        "0px 2px 1px -1px rgba(44, 62, 80,1.0), 0px 1px 1px 0px rgba(44, 62, 80,1.0), 0px 1px 3px 0px rgba(44, 62, 80,1.0)",
    },
  },
  heading: {
    fontSize: "16px",
    fontWeight: 600,
    color: "var(--colorBlack1)",
  },
  accordion: {},
  [theme.breakpoints.down("md")]: {},
}));
const schema = yup.object().shape({
  // firstName: yup.string().required(),
});
function PartCourseForm(props) {
  const classes = useStyles();
  const { dataCourse = {}, changeDataCourse = null } = props;
  const { enqueueSnackbar } = useSnackbar();
  let indexLesson = 1;
  const formAddPart = useForm({
    mode: "onBlur",
    defaultValues: {
      namepart: "",
      //idCourse: dataCourse?.id
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = (values) => {
    console.log("PartPost", values);

    (async () => {
      try {
        const rp = await courseApi.postPart(dataCourse.id, values);
        if (!!!rp.status) {
          console.log(rp);
          if (changeDataCourse) changeDataCourse(rp);
          enqueueSnackbar("C???p nh???t th??nh c??ng", { variant: "success" });
          formAddPart.reset();
        } else {
          enqueueSnackbar("C???p nh???t kh??ng th??nh c??ng", { variant: "error" });
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    })();
  };
  const handleChangeDataCourse = (value) => {
    if (changeDataCourse) changeDataCourse(value);
  };
  // const [indexPart, setIndexPart] = useState(() => {
  //   return Array.from(dataCourse.parts).map((item, index) => ({
  //     value: index + 1,
  //     title: index + 1,
  //   }));
  // });
  // useEffect(() => {
  //   setIndexPart(() => {
  //     return Array.from(dataCourse.parts).map((item, index) => ({
  //       value: index + 1,
  //       title: index + 1,
  //     }));
  //   });
  // }, [dataCourse]);
  // console.log(indexPart);
  // console.log(dataCourse);
  return (
    <CCard>
      <CCardHeader>
        <span className="title">Ch???nh s???a kh??a h???c</span>
      </CCardHeader>
      <CCardBody>
        <div className={classes.contentPart}>
          {!isEmpty(dataCourse.parts) &&
            Array.from(dataCourse.parts).map((item, index) => (
              <Accordion key={item.id} className={classes.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <span className={classes.heading}>
                    Ph???n {index + 1} : {item.title}
                  </span>
                </AccordionSummary>
                <AccordionDetails>
                  {!isEmpty(item.lessons) &&
                    Array.from(item.lessons).map((item1, index1) => (
                      <Accordion key={item1.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography className={classes.heading}>
                            B??i {indexLesson++} : {item1.description}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <FormUploadLesson
                            lesson={item1}
                            part={item}
                            changeDataCourse={handleChangeDataCourse}
                          />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  <FormParts
                    part={item}
                    index={index + 1}
                    // indexPart={indexPart}
                    onSubmit={handleOnSubmit}
                    changeDataCourse={handleChangeDataCourse}
                  />
                  <FormCreateLesson
                    dataCourse={dataCourse}
                    part={item}
                    onSubmit={handleOnSubmit}
                    changeDataCourse={handleChangeDataCourse}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
        <form
          className={classes.formAddPart}
          onSubmit={formAddPart.handleSubmit(handleOnSubmit)}
        >
          <span>Th??m ph???n kh??a h???c</span>
          <CustomInput
            name="namepart"
            title="T??n ph???n h???c"
            label="T??n ph???n h???c"
            form={formAddPart}
          />
          <CustomButton type="submit" title="Th??m" />
        </form>
      </CCardBody>
      {/* <CCardFooter></CCardFooter> */}
    </CCard>
  );
}

export default PartCourseForm;
