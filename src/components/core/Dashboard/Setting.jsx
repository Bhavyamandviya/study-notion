import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { CustomInput } from "../../common/Forms";

const initialvalue = {
  firstName: "",
  lastName: "",
  dateofbirth: "",
  gender: "",
  contactNumber: "",
  about: "",
};
const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  dateofbirth: Yup.string().required(),
  gender: Yup.string().required(),
  contactNumber: Yup.string().required(),
  about: Yup.string().required(),
});
const Setting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [initialdatavalue, setInitialdatavalue] = useState(initialvalue);
  useEffect(() => {
    if (user) {
      setInitialdatavalue({
        about: user?.additionalDetails?.about || "",
        contactNumber: user?.additionalDetails?.contactNumber || 0,
        dateofbirth: user?.additionalDetails?.dateofbirth || "",
        firstName: user?.firstName || "",
        gender: user?.additionalDetails?.gender || "",
        lastName: user?.lastName || "",
      });
    }
  }, [user]);
  const submitHandler = (values) => {};

  const handleCancel = () => {
    navigate("/dashboard/my-profile");
  };
  return (
    <>
      <div className="flex flex-col gap-7 h-screen text-richblack-25">
        {/* section 1 */}
        <div className="flex items-center justify-between bg-richblack-800 p-6">
          <div className="flex items-center gap-5">
            <img
              src={user?.image}
              alt="text"
              className="aspect-square w-[78px] rounded-full object-cover "
            />
            <div>
              <p className="font-bold">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-richblack-500 font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
        {/* section 2 */}
        <div className="flex flex-col gap-3  bg-richblack-800 px-5 py-5">
          <div className="flex justify-between gap-2">
            <p className="font-bold text-2xl">Personal Details</p>
          </div>

          <div className="flex flex-col">
            <Formik
              initialValues={initialdatavalue}
              validationSchema={LoginSchema}
              onSubmit={submitHandler}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting,
              }) => {
                return (
                  <>
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col gap-5 w-[45%]">
                          <CustomInput
                            err={errors.firstName}
                            type="firstName"
                            isInvalid={
                              !!touched.firstName && !!errors.firstName
                            }
                            label={"first Name"}
                            name="firstName"
                            onChange={handleChange}
                            placeholder="Enter Your first Name"
                            value={values.firstName}
                            isRequired={true}
                          />
                          <CustomInput
                            err={errors.dateofbirth}
                            type="dateofbirth"
                            isInvalid={
                              !!touched.dateofbirth && !!errors.dateofbirth
                            }
                            label={"date of birth"}
                            name="dateofbirth"
                            onChange={handleChange}
                            placeholder="Enter Your date of birth "
                            value={values.dateofbirth}
                            isRequired={true}
                          />
                          <CustomInput
                            err={errors.contactNumber}
                            type="contactNumber"
                            isInvalid={
                              !!touched.contactNumber && !!errors.contactNumber
                            }
                            label={"contact Number "}
                            name="contactNumber"
                            onChange={handleChange}
                            placeholder="Enter Your contact Number"
                            value={values.contactNumber}
                            isRequired={true}
                          />
                        </div>
                        <div className="flex flex-col gap-5 w-[45%]">
                          <CustomInput
                            err={errors.lastName}
                            type="lastName"
                            isInvalid={!!touched.lastName && !!errors.lastName}
                            label={"last Name "}
                            name="lastName"
                            onChange={handleChange}
                            placeholder="Enter Your last Name "
                            value={values.lastName}
                            isRequired={true}
                          />
                          <CustomInput
                            err={errors.gender}
                            type="gender"
                            isInvalid={!!touched.gender && !!errors.gender}
                            label={"gender"}
                            name="gender"
                            onChange={handleChange}
                            placeholder="Enter Your gender "
                            value={values.gender}
                            isRequired={true}
                          />
                          <CustomInput
                            err={errors.about}
                            type="about"
                            isInvalid={!!touched.about && !!errors.about}
                            label={"about "}
                            name="about"
                            onChange={handleChange}
                            placeholder="Enter Your about "
                            value={values.about}
                            isRequired={true}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button
                          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
                          onSubmit={handleSubmit}
                          type="submit"
                        >
                          Save
                        </button>
                        <button
                          className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
                          onSubmit={handleCancel}
                          type="submit"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
