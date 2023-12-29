import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cascader } from "antd";
import "./style.css";
import { getSetRole } from "../../Helper";
import { setRoleAction } from "../../redux/Action";
const Header = () => {
  const currentRole = useSelector((state) => state.loggedInRole);
  const dispatch = useDispatch();
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   if (currentRole) {
  //     setRole(currentRole);
  //   } else {
  //     let temp = getSetRole(role);
  //     dispatch(setRoleAction(temp));
  //   }
  // }, [currentRole]);

  return (
    <div className="header">
      <div>
        <label className="label text-white"> Role :</label>
        <Cascader
          options={[
            {
              value: "Admin",
              label: "Admin",
            },
            {
              value: "Registrar",
              label: "Registrar",
            },
          ]}
          onChange={(value) => {
            setRole(value);
            dispatch(setRoleAction(value));
          }}
          // defaultValue="Admin"
          placeholder="Select Role"
        />
      </div>
      <div>
        {currentRole == undefined ||
        currentRole == null ||
        currentRole == "" ? (
          <h3 className="text-white">
            {" "}
            Please select Admin role to Add New Student and Registrar Role for
            updating Student Information
          </h3>
        ) : (
          <h2 className="text-white"> {role} </h2>
        )}
      </div>
    </div>
  );
};

export default Header;
