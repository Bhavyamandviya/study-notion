import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/Forms";
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-7 h-screen text-richblack-25">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {/* Section 1 */}

        <div className="flex items-center justify-between bg-richblack-800 px-5 py-5">
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
          <div className="bg-yellow-25 p-1 text-richblack-700 flex items-center gap-x-3">
            <CustomButton
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
              customClass="text-[16px] font-semibold text-richblack-700"
            />
            <FaRegEdit className="text-lg font-bold" />
          </div>
        </div>

        {/* Section 2 */}
        <div className="flex flex-col gap-3  bg-richblack-800 px-5 py-5">
          <div className="flex justify-between gap-2">
            <p className="font-bold text-3xl">About</p>
            <div className="bg-yellow-25 p-1 text-richblack-700 flex items-center gap-x-3">
              <CustomButton
                text="Edit"
                onClick={() => {
                  navigate("dashboard/settings");
                }}
                customClass="text-[16px] font-semibold text-richblack-700"
              />
              <FaRegEdit className="text-lg font-bold" />
            </div>
          </div>
          <p className="w-[80%] text-justify">
            {user?.additionalDetails?.about
              ? user?.additionalDetails?.about
              : "Hello"}
          </p>
        </div>
        {/* section 3 */}
        <div className="flex flex-col gap-3  bg-richblack-800 px-5 py-5">
          <div className="flex justify-between gap-2">
            <p className="font-bold text-3xl">Personal Details</p>
            <div className="bg-yellow-25 p-1 text-richblack-700 flex items-center gap-x-3">
              <CustomButton
                text="Edit"
                onClick={() => {
                  navigate("dashboard/settings");
                }}
                customClass="text-[16px] font-semibold text-richblack-700"
              />
              <FaRegEdit className="text-lg font-bold" />
            </div>
          </div>
          <div className="flex w-[60%] justify-between items-center">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">First Name </p>
                <p> {user?.firstName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">Email</p>
                <p>{user?.email}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">Gender</p>
                <p>{user?.additionalDetails?.gender ?? "Add Your Gender"}</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">Last Name</p>
                <p>{user?.lastName}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">Contact Number</p>
                <p>
                  {user?.additionalDetails?.contactNumber ??
                    "Add your contact number"}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-richblack-600">Date of Birth</p>
                <p>
                  {user?.additionalDetails?.dateofbirth ??
                    "Add your date of birth"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
