import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Table, Button, Cascader, DatePicker, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.css";
import { familyColumn } from "../../constant";
import {
  createFamilyMembersByIdAction,
  createStudentAction,
  deleteFamilyMemberByIdAction,
  getAllStudentsAction,
  getFamilyMemberByIdAction,
  getNationalitiesAction,
  setRoleRights,
  updateFamilyMemberByIdAction,
  updateFamilyMemberNationalityByIdAction,
  updateNationalityByIdAction,
  updateStudentByIdAction,
} from "../../redux/Action";
import { getSetRole } from "../../Helper";

export const CustomGrid = (props) => {
  const { data, onRowClick, columnName, handleEdit, handleDelete } = props;
  const loggedInRole = useSelector((state) => state.loggedInRole);

  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = columnName?.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      render: (text, record) => (
        <span>
          {loggedInRole == "Registrar" ? (
            <>
              {" "}
              <Button size="small" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button
                className="deleteButton"
                size="small"
                danger
                onClick={() => handleDelete(record)}
              >
                Delete
              </Button>
            </>
          ) : null}
        </span>
      ),
    };
  });

  return (
    <>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={data}
        columns={columns}
        onRow={onRowClick}
      />
    </>
  );
};

export const CustomModal = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nationalitiesList = useSelector((state) => state.nationalitiesList);
  const loggedInRole = useSelector((state) => state.loggedInRole);
  const roleRight = useSelector((state) => state.roleRight);

  const {
    title,
    showModal,
    onCancelModal,
    disableModal,
    basicData,
    setBasicData,
    familyData,
    setFamilyData,
  } = props;

  const { firstName, lastName, nationality, dateOfBirth } = basicData;
  const {
    memberFirstName,
    memberLastName,
    memberDateOfBirth,
    memberRelationship,
    memberNationality,
  } = familyData;

  const [studentID, setStudentID] = useState(basicData.id);
  const [disableBtn, setDisableBtn] = useState(false);
  const [btnText, setBtnText] = useState("Add New Family Member");

  const initialValuesData = {
    firstName: basicData.firstName,
    lastName: basicData.lastName,
    nationality: basicData.nationality?.title ? nationality.title : "",
    dateOfBirth: dayjs(basicData.dateOfBirth),
  };

  const familyMemberInitialValuesData = {
    memberFirstName: memberFirstName,
    memberLastName: memberLastName,
    memberNationality: memberNationality?.title ? memberNationality.title : "",
    memberDateOfBirth: dayjs(memberDateOfBirth),
    memberRelationship: memberRelationship,
  };
  const handleEdit = (record) => {
    setBtnText("Update Family Member");
    setFamilyData({
      memberFirstName: record.firstName,
      memberLastName: record.lastName,
      memberDateOfBirth: record.dateOfBirth,
      memberRelationship: record.relationship,
      memberNationality: record.nationality,
    });
    setStudentID(basicData.id);
  };

  const handleDelete = (record) => {
    const request = record.id;
    dispatch(deleteFamilyMemberByIdAction(request, basicData.id));
  };

  useEffect(() => {
    form.setFieldsValue({
      firstName: firstName,
      lastName: lastName,
      nationality: nationality?.title ? nationality.title : "",
      dateOfBirth: dayjs(dateOfBirth),
    });
  }, [firstName, lastName, nationality, dateOfBirth]);

  useEffect(() => {
    form.setFieldsValue({
      memberFirstName: memberFirstName,
      memberLastName: memberLastName,
      memberNationality: memberNationality?.title
        ? memberNationality.title
        : "",
      memberDateOfBirth: dayjs(memberDateOfBirth),
      memberRelationship: memberRelationship,
    });
  }, [
    memberFirstName,
    memberLastName,
    memberNationality,
    memberDateOfBirth,
    memberRelationship,
  ]);

  const onAddStudent = () => {
    if (
      firstName == "" ||
      firstName == undefined ||
      lastName == "" ||
      lastName == undefined ||
      nationality?.title == "" ||
      nationality?.title == undefined ||
      dateOfBirth == undefined ||
      dateOfBirth == null
    ) {
      alert("All fields are Required.");
    } else {
      const request = {
        firstName: basicData.firstName,
        lastName: basicData.lastName,
        dateOfBirth: basicData.dateOfBirth,
        nationality: basicData.nationality,
      };

      dispatch(
        createStudentAction(request, (response) => {
          if (response) {
            dispatch(getAllStudentsAction());
            dispatch(
              updateNationalityByIdAction(response.id, basicData.nationality.id)
            );
            setStudentID(response.id);
            if (response.id != 0) {
              setDisableBtn(true);
              dispatch(setRoleRights("Student Created"));
            }
            
          }
        })
      );
    }
  };

  const onUpdateStudent = () => {
    const request = {
      firstName: basicData.firstName,
      lastName: basicData.lastName,
      dateOfBirth: basicData.dateOfBirth,
      nationality: basicData.nationality,
    };

    dispatch(
      updateStudentByIdAction(request, basicData.id, (response) => {
        if (response) {
          dispatch(getAllStudentsAction());
          dispatch(
            updateNationalityByIdAction(response.id, basicData.nationality.id)
          );
          setStudentID(response.id);
        }
      })
    );
  };

  const onAddFamilyMember = () => {
    if (
      studentID == 0 ||
      studentID == undefined ||
      familyData.memberFirstName == "" ||
      familyData.memberLastName == "" ||
      familyData.memberNationality?.title == "" ||
      familyData.memberDateOfBirth == undefined ||
      familyData.memberDateOfBirth == null ||
      familyData.memberRelationship == ""
    ) {
      alert("All fields are Required.");
    } else {
      let request = {
        firstName: familyData.memberFirstName,
        lastName: familyData.memberLastName,
        dateOfBirth: familyData.memberDateOfBirth,
        relationship: familyData.memberRelationship,
        nationality: familyData.memberNationality,
        currentNationality: familyData.memberNationality.title,
      };
      if (basicData.id == 0 || basicData.id == undefined) {
        dispatch(
          createFamilyMembersByIdAction(request, studentID, (res) => {
            if (res) {
              dispatch(
                updateFamilyMemberNationalityByIdAction(
                  res?.data?.id,
                  request?.nationality?.id,
                  () => {
                    dispatch(getFamilyMemberByIdAction(studentID));
                    // form.resetFields();
                    setFamilyData({
                      memberFirstName: "",
                      memberLastName: "",
                      memberDateOfBirth: dayjs(),
                      memberRelationship: "",
                      memberNationality: {
                        id: 0,
                        title: "",
                      },
                    });
                    setBtnText("Add New Family Member");
                  }
                )
              );
            }
          })
        );
      } else {
        dispatch(
          updateFamilyMemberByIdAction(request, basicData.id, (res) => {
            if (res) {
              dispatch(
                updateFamilyMemberNationalityByIdAction(
                  res?.id,
                  request?.nationality?.id,
                  () => {
                    dispatch(getFamilyMemberByIdAction(basicData.id));
                    form.resetFields();
                    setFamilyData({
                      memberFirstName: "",
                      memberLastName: "",
                      memberDateOfBirth: dayjs(),
                      memberRelationship: "",
                      memberNationality: {
                        id: 0,
                        title: "",
                      },
                    });
                    setBtnText("Add New Family Member");
                    // setStudentID(0);
                  }
                )
              );
            }
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(getNationalitiesAction());
  }, []);
  useEffect(() => {
    if (loggedInRole == "Admin" && roleRight == "Student Created") {
      setDisableBtn(true);
    }
  }, [loggedInRole, roleRight]);
  useEffect(() => {
    if (
      basicData.id == 0 ||
      (basicData.id == undefined && roleRight == "Create")
    ) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [basicData, roleRight]);

  const onFinish = (values) => {
    console.log("Success:", values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishFamilyMember = (values) => {
    console.log("Success:", values);
    // form.resetFields();
  };

  const onFinishFailedFamilyMember = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={title}
      open={showModal}
      onCancel={onCancelModal}
      footer={null}
      width={1000}
    >
      <div className="row">
        <Form
          form={form}
          name="Basic Information"
          initialValues={initialValuesData}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          disabled={disableModal}
        >
          <div>
            <h4>Basic Information Section</h4>
            <Form.Item label="First Name" name="firstName">
              <Input
                onChange={(e) => {
                  setBasicData({
                    ...basicData,
                    firstName: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Last Name" name="lastName">
              <Input
                onChange={(e) => {
                  setBasicData({
                    ...basicData,
                    lastName: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Select Date of Birth" name="dateOfBirth">
              <DatePicker
                onChange={(date, dateString) => {
                  setBasicData({
                    ...basicData,
                    dateOfBirth: dateString,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Select Nationality" name="nationality">
              <Cascader
                options={nationalitiesList}
                onChange={(value, selectedOptions) => {
                  debugger
                  if (selectedOptions?.length > 0) {
                    let temp = {
                      id: selectedOptions[0]?.id,
                      title: selectedOptions[0]?.title,
                    };
                    setBasicData({
                      ...basicData,
                      nationality: temp,
                    });
                  } else {
                    let temp = {
                      id: 0,
                      title: "",
                    };
                    setBasicData({
                      ...basicData,
                      nationality: temp,
                    });
                  }
                }}
              />
            </Form.Item>
          </div>

          <Form.Item>
            {loggedInRole == "Admin" ? (
              <Button
                htmlType="submit"
                onClick={onAddStudent}
                disabled={disableBtn}
              >
                Add Student
              </Button>
            ) : loggedInRole == "Registrar" ? (
              <Button
                htmlType="submit"
                onClick={onUpdateStudent}
                // disabled={disableBtn}
              >
                Update Student
              </Button>
            ) : null}
          </Form.Item>
        </Form>

        <Form
          form={form}
          name="Family information"
          initialValues={familyMemberInitialValuesData}
          onFinish={onFinishFamilyMember}
          // onFinishFailed={onFinishFailedFamilyMember}
          autoComplete="off"
          disabled={disableModal}
        >
          <div>
            <h4>Family Information Section</h4>

            <Form.Item
              label="First Name"
              name="memberFirstName"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please enter student's first name",
              //   },
              // ]}
            >
              <Input
                onChange={(e) => {
                  setFamilyData({
                    ...familyData,
                    memberFirstName: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Last Name" name="memberLastName">
              <Input
                onChange={(e) => {
                  setFamilyData({
                    ...familyData,
                    memberLastName: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Select Date of Birth" name="memberDateOfBirth">
              <DatePicker
                onChange={(date, dateString) => {
                  setFamilyData({
                    ...familyData,
                    memberDateOfBirth: dateString,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Select Relationship Type"
              name="memberRelationship"
            >
              <Cascader
                options={[
                  {
                    value: "Parent",
                    label: "Parent",
                    id: "1",
                  },
                  {
                    id: 2,
                    value: "Sibling",
                    label: "Sibling",
                  },
                  {
                    id: 3,
                    value: "Spouse",
                    label: "Spouse",
                  },
                ]}
                onChange={(value) => {
                  if (value) {
                    setFamilyData({
                      ...familyData,
                      memberRelationship: value[0],
                    });
                  } else {
                    let temp = {
                      id: 0,
                      value: "",
                      label: "",
                    };
                    setFamilyData({
                      ...familyData,
                      memberRelationship: temp,
                    });
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label="Select Nationality"
              // rules={[
              //   {
              //     required: true,
              //     message: "Please select student's nationality",
              //   },
              // ]}
              name="memberNationality"
            >
              <Cascader
                options={nationalitiesList}
                onChange={(value, selectedOptions) => {
                  if (selectedOptions?.length > 0) {
                    let temp = {
                      id: selectedOptions[0].id,
                      title: selectedOptions[0].value,
                    };
                    setFamilyData({
                      ...familyData,
                      memberNationality: temp,
                    });
                  } else {
                    let temp = {
                      id: 0,
                      title: "",
                    };
                    setFamilyData({
                      ...familyData,
                      memberNationality: temp,
                    });
                  }
                }}
              />
            </Form.Item>
          </div>

          <Form.Item>
            {loggedInRole == "Admin" && roleRight == "Create" ? null : (
              <Button
                htmlType="submit"
                onClick={onAddFamilyMember}
                // disabled={disableFamilyBtn}
              >
                {btnText}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
      <div>
        <CustomGrid
          data={basicData?.familyMembers}
          columnName={familyColumn}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </Modal>
  );
};
