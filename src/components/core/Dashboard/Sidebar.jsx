import React, { useState } from "react";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { sidebarLinks } from "../../../data/dashboard-links";
import Sidebarlink from "./Sidebarlink";
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../common/CustomModal";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  if (profileLoading || authLoading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="flex min-w-222px flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 h-full">
          <div className="flex flex-col">
            {sidebarLinks.map((item, index) => {
              if (item.type && user?.accountType !== item.type) return null;
              return (
                <>
                  <Sidebarlink iconname={item.icon} data={item} key={item.id} />
                </>
              );
            })}
          </div>
          <hr />
          <div className="flex flex-col">
            <Sidebarlink
              data={{ name: "Settings", path: "/dashboard/settings" }}
              iconname="VscSettingsGear"
            />
            <button
              onClick={() => {
                setConfirmationModal({
                  text1: "Are you sure ?",
                  text2: "Bhai tu logout hojayega",
                  btn1text: "Logout",
                  btn2text: "Cancel",
                  btn1handler: () => dispatch(logout(navigate)),
                  btn2handler: () => setConfirmationModal(null),
                });
              }}
              className="text-sm font-medium text-richblack-200"
            >
              <div className="flex gap-x-3 text-richblack-25 font-bold px-8 py-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
        {confirmationModal && <CustomModal modalData={confirmationModal} />}
      </div>
    </>
  );
};

export default Sidebar;
