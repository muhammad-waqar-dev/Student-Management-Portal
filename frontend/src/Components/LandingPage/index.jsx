import React, { useState, useEffect } from "react";
import { Button } from "antd";
import "./style.css";
import { CustomGrid, CustomModal } from "../ReusableComponent";
import { studentColumn } from "../../constant";
import {
  getAllStudentsAction,
  getFamilyMemberByIdAction,
  getNationalityByIdAction,
  getStudentByIdAction,
  clearModalStates,
  setRoleRights,
} from "../../redux/Action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";

import { getSetRole } from "../../Helper";

const LandingPage = (props) => {
  const today = moment(new Date()).format("YYYY-MM-DD");

  const dispatch = useDispatch();
  const studentsList = useSelector((state) => state.allStudentsList);
  const studentItem = useSelector((state) => state.studentItem);
  const nationalityById = useSelector((state) => state.nationality);
  const familyMemberList = useSelector((state) => state.familyMemberList);
  const loggedInRole = useSelector((state) => state.loggedInRole);

  const [basicInfo, setBasicInfo] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: dayjs(),
    relationship: "",
    nationality: {
      id: 0,
      title: "",
    },
    familyMembers: [],
  });
  const [familyInfo, setFamilyInfo] = useState({
    memberID: 0,
    memberFirstName: "",
    memberLastName: "",
    memberDateOfBirth: dayjs(),
    memberRelationship: "",
    memberNationality: {
      id: 0,
      title: "",
    },
  });

  useEffect(() => {
    dispatch(getAllStudentsAction());
    console.log("basicInfo", basicInfo);
  }, []);

  const [onAddModalOpen, setOnAddModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [disable, setDisable] = useState(false);
  const [disableAddRecord, setDisableAddRecord] = useState(false);

  const handleAdd = () => {
    setOnAddModalOpen(true);
    setDisable(false);
    if (loggedInRole == "Admin") {
      dispatch(setRoleRights("Create"));
    } else {
      dispatch(setRoleRights(""));
    }
  };

  const handleRowClick = (dataItem) => {
    // Access and use the dataItem (entire row data) here
    if (
      loggedInRole == "" ||
      loggedInRole == undefined ||
      loggedInRole == null
    ) {
      alert(
        "Please select Admin role to View Student Profile or Register role to Update Student Profile"
      );
    } else {
      setOnAddModalOpen(true);
      dispatch(getStudentByIdAction(dataItem.id));
      dispatch(getNationalityByIdAction(dataItem.id));
      dispatch(getFamilyMemberByIdAction(dataItem.id));
      if (loggedInRole == "Admin") {
        setDisable(true);
        dispatch(setRoleRights("Student Created"));
      } else {
        setDisable(false);
      }
    }
  };

  const getRowProps = (record) => {
    return {
      onClick: () => {
        handleRowClick(record);
      },
    };
  };

  const closeModal = () => {
    setOnAddModalOpen(false);
    dispatch(clearModalStates());
    // setRoleRights("");
    setBasicInfo({
      id: 0,
      firstName: "",
      lastName: "",
      dateOfBirth: dayjs(),
      relationship: "",
      nationality: {
        id: 0,
        title: "",
      },
      familyMembers: [],
    });
    setFamilyInfo({
      memberID: 0,
      memberFirstName: "",
      memberLastName: "",
      memberDateOfBirth: dayjs(),
      memberRelationship: "",
      memberNationality: {
        id: 0,
        title: "",
      },
    });
  };

  useEffect(() => {
    if (
      loggedInRole == "Registrar" ||
      loggedInRole == "" ||
      loggedInRole == undefined ||
      loggedInRole == null
    ) {
      setDisableAddRecord(true);
    } else {
      setDisableAddRecord(false);
    }
  }, [loggedInRole]);

  useEffect(() => {
    let tempFamily = [...familyMemberList];
    tempFamily.map(
      (item) => (item["currentNationality"] = item?.nationality?.title)
    );
    setBasicInfo({
      ...basicInfo,
      id: studentItem.id,
      firstName: studentItem?.firstName,
      lastName: studentItem?.lastName,
      dateOfBirth: dayjs(
        studentItem?.dateOfBirth ? studentItem?.dateOfBirth : new Date()
      ).format(),
      relationship: studentItem?.relationship,
      nationality: nationalityById,
      currentNationality: nationalityById?.title,
      familyMembers: tempFamily,
    });
  }, [studentItem, nationalityById, familyMemberList]);

  return (
    <div className="main-container">
      {disableAddRecord == false ? (
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: 16,
          }}
        >
          Add New Students
        </Button>
      ) : null}
      <CustomGrid
        data={studentsList}
        columnName={studentColumn}
        onRowClick={getRowProps}
      />
      <CustomModal
        title="Student Detail Modal"
        basicData={basicInfo}
        setBasicData={setBasicInfo}
        familyData={familyInfo}
        setFamilyData={setFamilyInfo}
        showModal={onAddModalOpen}
        onCancelModal={closeModal}
        disableModal={disable}
        setDisableModal={setDisable}
      />
    </div>
  );
};
export default LandingPage;
