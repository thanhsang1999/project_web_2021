import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import courseApi from "src/api/courseApi";
import CustomButton from "src/components/CustomButton";
import CustomButtonRed from "src/components/CustomButtonRed";
import CustomDialogAction from "src/components/CustomDialogAction";

function UnBlockCourse(props) {
  const classes = makeStyles(() => ({
    contentDialog: {
      fontSize: "16px",
      margin: "20px 0",
    },
  }))();
  const { item, onReload = null } = props;
  const [isOpenDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(!isOpenDialog);
  };

  const handleUnBlockCourse = async () => {
    const res = await courseApi.unblockCourse(item.id);
    console.log(res);
    if (onReload) onReload();
  };
  return (
    <>
      <CustomButton title="Mở khóa" onClick={handleOpenDialog} />
      <CustomDialogAction
        title={`Mở khóa khóa học : ${item.title}`}
        id={item.id}
        closeDialog={handleOpenDialog}
        isOpen={isOpenDialog}
        accepct={handleUnBlockCourse}
        content={
          <div className={classes.contentDialog}>
            Bạn có thực sự muốn mở khóa khóa học <b>{item.title}</b> này hay
            không ?
            <br />
            <br />
            Khóa học được mở khóa sẽ bán và học viên học bình thường
          </div>
        }
      />
    </>
  );
}

export default UnBlockCourse;
