import _ from "lodash";
import moment from "moment";
import React, { memo } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import isEqual from "react-fast-compare";

const CustomInput = ({
  label,
  isDisabled,
  isRequired,
  name,
  type = "text",
  value,
  err,
  placeholder,
  isInvalid,
  onChange,
  defaultValue,
}) => {
  console.log("def", defaultValue);
  return (
    <>
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem] capitalize">
          {label}

          {isRequired === true && (
            //   <span
            //     className={css`
            //       margin-top: 0.3rem;
            //       margin-left: 0.3rem;
            //       font-size: 1.2rem;
            //       display: inline !important;
            //       position: unset !important;
            //       color: red;
            //     `}
            //   >
            //     *
            //   </span>
            <sup className="text-pink-200">*</sup>
          )}
        </p>
        <input
          disabled={isDisabled}
          required={isRequired}
          type={type}
          value={
            type === "date"
              ? moment(
                  _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                    ? _.toNumber(value)
                    : value
                )
                  .format("DD-MM-YYYY")
                  .toString()
              : _.toString(value)
          }
          onChange={onChange}
          defaultValue={defaultValue}
          placeholder={placeholder}
          name={name}
          className="bg-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-richblack-25 border-b-2"
        />
        <span className="text-pink-200">{err}</span>
      </label>
    </>
  );
};
const CustomInputPassword = memo(
  ({
    label,
    value,
    name,
    isInvalid,
    err,
    placeholder,
    type = "text",
    isRequired = false,
    handleChange,
  }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);
    return (
      <>
        <label className="w-full relative">
          <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
            {label}
            {isRequired === true && (
              //   <span
              //     className={css`
              //       margin-top: 0.3rem;
              //       margin-left: 0.3rem;
              //       font-size: 1.2rem;
              //       display: inline !important;
              //       position: unset !important;
              //       color: red;
              //     `}
              //   >
              //     *
              //   </span>
              <sup className="text-pink-200">*</sup>
            )}
          </p>
          <input
            required
            type={show ? "text" : "password"}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            value={
              type === "date"
                ? moment(
                    _.isNumber(_.toNumber(value)) && !_.isNaN(_.toNumber(value))
                      ? _.toNumber(value)
                      : value
                  )
                    .format("YYYY-MM-DD")
                    .toString()
                : _.toString(value)
            }
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={handleClick}
          >
            {show ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
          <span className="text-pink-200">{err}</span>
        </label>
      </>
    );
  },
  isEqual
);

const CustomButton = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClass,
  type,
}) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={customClass}
      >
        {children ? (
          <>
            <span>{text}</span>
            {children}
          </>
        ) : (
          <>{text}</>
        )}
      </button>
    </>
  );
};
export { CustomInput, CustomInputPassword, CustomButton };
