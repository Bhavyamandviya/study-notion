import React from "react";
import { CustomButton } from "./Forms";

const CustomModal = ({ modalData }) => {
  return (
    <div>
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
        <div className="flex">
          <CustomButton
            onClick={modalData.btn1handler}
            text={modalData.btntext1}
          />
          <button onClick={modalData.btn2handler}>{modalData.btntext2}</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
