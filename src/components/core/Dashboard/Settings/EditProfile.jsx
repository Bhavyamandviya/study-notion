import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

import { updateProfile } from "../../../../services/operations/SettingsAPI";

import { CustomButton, CustomInput } from "../../../common/Forms";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

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
export default function EditProfile() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    // console.log("Form Data - ", data)
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };
  const submitHandler = (values) => {};

  return (
    <>
      <form onSubmit={handleSubmit(submitProfileForm)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="firstName"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your first name.
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="lastName"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="dateOfBirth"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="gender"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  );
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="contactNumber"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label
                htmlFor="about"
                className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize"
              >
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
