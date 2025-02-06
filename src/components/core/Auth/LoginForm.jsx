import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { Formik } from "formik";
import { login } from "../../../services/operations/authAPI";
import { CustomInput, CustomInputPassword } from "../../common/Forms";

const initialvalue = {
  email: "",
  password: "",
};
const LoginSchema = Yup.object().shape({
  password: Yup.string().required(),
  email: Yup.string().email("Invalid email").required("Email is Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // })

  const [showPassword, setShowPassword] = useState(false);

  // const { email, password } = formData

  // const handleOnChange = (e) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: e.target.value,
  //   }))
  // }

  // const handleOnSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(login(email, password, navigate))
  // }
  const submitHandler = (values) => {
    dispatch(login(values.email, values.password, navigate));
  };

  return (
    <>
      <Formik
        initialValues={initialvalue}
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
        }) => (
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="flex flex-col w-full gap-y-4 mt-6"
          >
            <CustomInput
              err={errors.email}
              type="email"
              isInvalid={!!touched.email && !!errors.email}
              label={"email address"}
              name="email"
              onChange={handleChange}
              placeholder="Enter Your email address"
              value={values.email}
              isRequired={true}
            />
            <CustomInputPassword
              err={errors.password}
              handleChange={handleChange}
              isInvalid={!!touched.password && errors.password}
              label="Create Password"
              name="password"
              placeholder="Enter password"
              value={values.password}
              isRequired={true}
            />

            <button
              className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
              onSubmit={handleSubmit}
              type="submit"
            >
              Sign In
            </button>
          </form>
        )}
      </Formik>
    </>
    // <form
    //   onSubmit={handleOnSubmit}
    //   className="mt-6 flex w-full flex-col gap-y-4"
    // >
    //   <label className="w-full">
    //     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    //       Email Address <sup className="text-pink-200">*</sup>
    //     </p>
    //     <input
    //       required
    //       type="text"
    //       name="email"
    //       value={email}
    //       onChange={handleOnChange}
    //       placeholder="Enter email address"
    //       style={{
    //         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    //       }}
    //       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
    //     />
    //   </label>
    //   <label className="relative">
    //     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
    //       Password <sup className="text-pink-200">*</sup>
    //     </p>
    //     <input
    //       required
    //       type={showPassword ? "text" : "password"}
    //       name="password"
    //       value={password}
    //       onChange={handleOnChange}
    //       placeholder="Enter Password"
    //       style={{
    //         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    //       }}
    //       className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
    //     />
    //     <span
    //       onClick={() => setShowPassword((prev) => !prev)}
    //       className="absolute right-3 top-[38px] z-[10] cursor-pointer"
    //     >
    //       {showPassword ? (
    //         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
    //       ) : (
    //         <AiOutlineEye fontSize={24} fill="#AFB2BF" />
    //       )}
    //     </span>
    //     <Link to="/forgot-password">
    //       <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
    //         Forgot Password
    //       </p>
    //     </Link>
    //   </label>
    //   <button
    //     type="submit"
    //     className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
    //   >
    //     Sign In
    //   </button>
    // </form>
  );
};

export default LoginForm;
