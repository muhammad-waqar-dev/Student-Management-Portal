import apiHelper from "../Utils/AxiosSetup";
import {
  CLEAR_ALL_STATES,
  GET_ALL_STUDENTS_FAILURE,
  GET_ALL_STUDENTS_REQUEST,
  GET_ALL_STUDENTS_SUCCESS,
  GET_STUDENT_BY_ID_FAILURE,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  GET_NATIONALITY_BY_ID_FAILURE,
  GET_NATIONALITY_BY_ID_REQUEST,
  GET_NATIONALITY_BY_ID_SUCCESS,
  GET_FAMILY_MEMBER_BY_ID_FAILURE,
  GET_FAMILY_MEMBER_BY_ID_REQUEST,
  GET_FAMILY_MEMBER_BY_ID_SUCCESS,
  CLEAR_MODAL_STATES,
  DELETE_FAMILY_MEMBER_BY_ID_FAILURE,
  DELETE_FAMILY_MEMBER_BY_ID_SUCCESS,
  DELETE_FAMILY_MEMBER_BY_ID_REQUEST,
  SET_ROLE,
  CREATE_STUDENT_REQUEST,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  GET_NATIONALITIES_FAILURE,
  GET_NATIONALITIES_SUCCESS,
  GET_NATIONALITIES_REQUEST,
  UPDATE_NATIONALITY_BY_ID_REQUEST,
  UPDATE_NATIONALITY_BY_ID_SUCCESS,
  UPDATE_NATIONALITY_BY_ID_FAILURE,
  CREATE_FAMILY_MEMBER_BY_ID_REQUEST,
  CREATE_FAMILY_MEMBER_BY_ID_SUCCESS,
  CREATE_FAMILY_MEMBER_BY_ID_FAILURE,
  UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_FAILURE,
  UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_SUCCESS,
  UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_REQUEST,
  UPDATE_STUDENT_BY_ID_REQUEST,
  UPDATE_STUDENT_BY_ID_SUCCESS,
  UPDATE_STUDENT_BY_ID_FAILURE,
  UPDATE_FAMILY_MEMBER_BY_ID_REQUEST,
  UPDATE_FAMILY_MEMBER_BY_ID_SUCCESS,
  UPDATE_FAMILY_MEMBER_BY_ID_FAILURE,
  SET_ROLE_RIGHTS,
} from "./ActionTypes";

export const getAllStudentsAction = () => async (dispatch) => {
  try {
    // dispatching request action
    dispatch(getAllStudentsRequest());
    // await for response from API
    let response = await apiHelper("get", "Students");
    let {data} = response?.data;
    // dispatching success action
    dispatch(getAllStudentsSuccess(data));
  } catch (error) {
    // dispatching failure action
    dispatch(getAllStudentsFailure(error));
    // Clearing states using clear action
    
  }
};

const getAllStudentsRequest = () => {
  // Creating request action for AllStudents API
  return {
    type: GET_ALL_STUDENTS_REQUEST,
  };
};

const getAllStudentsSuccess = (responseDataPublic) => {
  // Creating success action for AllStudents API
  return {
    type: GET_ALL_STUDENTS_SUCCESS,
    payload: responseDataPublic,
  };
};

const getAllStudentsFailure = (error) => {
  return {
    type: GET_ALL_STUDENTS_FAILURE,
    payload: error,
  };
};

export const getStudentByIdAction = (studentId) => async (dispatch) => {
  try {
    // dispatching request action
    dispatch(getStudentByIdRequest());
    // await for response from API
    let response = await apiHelper("get", `Students/${studentId}`);
    let {data} = response?.data;

    // dispatching success action
    dispatch(getStudentByIdSuccess(data));
  } catch (error) {
    // dispatching failure action
    dispatch(getStudentByIdFailure(error));
    // Clearing states using clear action
    
  }
};

const getStudentByIdRequest = () => {
  // Creating request action for StudentById API
  return {
    type: GET_STUDENT_BY_ID_REQUEST,
  };
};

const getStudentByIdSuccess = (responseDataPublic) => {
  // Creating success action for StudentById API
  return {
    type: GET_STUDENT_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const getStudentByIdFailure = (error) => {
  return {
    type: GET_STUDENT_BY_ID_FAILURE,
    payload: error,
  };
};

export const getNationalityByIdAction = (studentId) => async (dispatch) => {
  try {
    // dispatching request action
    dispatch(getNationalityByIdRequest());
    // await for response from API
    let response = await apiHelper("get", `Students/${studentId}/Nationality/`);
    let {data} = response?.data;

    // dispatching success action
    dispatch(getNationalityByIdSuccess(data));
  } catch (error) {
    // dispatching failure action
    dispatch(getNationalityByIdFailure(error));
    // Clearing states using clear action
    
  }
};

const getNationalityByIdRequest = () => {
  // Creating request action for NationalityById API
  return {
    type: GET_NATIONALITY_BY_ID_REQUEST,
  };
};

const getNationalityByIdSuccess = (responseDataPublic) => {
  // Creating success action for NationalityById API
  return {
    type: GET_NATIONALITY_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const getNationalityByIdFailure = (error) => {
  return {
    type: GET_NATIONALITY_BY_ID_FAILURE,
    payload: error,
  };
};

export const getFamilyMemberByIdAction =
  (studentId, callback = false) =>
  async (dispatch) => {
    try {
      // dispatching request action
      dispatch(getFamilyMemberByIdRequest());
      // await for response from API
      let response = await apiHelper(
        "get",
        `Students/${studentId}/FamilyMembers/`
      );
      let {data} = response?.data;

      // dispatching success action
      dispatch(getFamilyMemberByIdSuccess(data));
      if (callback) {
        callback(studentId);
      }
    } catch (error) {
      // dispatching failure action
      dispatch(getFamilyMemberByIdFailure(error));
      // Clearing states using clear action
      
    }
  };

const getFamilyMemberByIdRequest = () => {
  // Creating request action for FamilyMemberById API
  return {
    type: GET_FAMILY_MEMBER_BY_ID_REQUEST,
  };
};

const getFamilyMemberByIdSuccess = (responseDataPublic) => {
  // Creating success action for FamilyMemberById API
  return {
    type: GET_FAMILY_MEMBER_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const getFamilyMemberByIdFailure = (error) => {
  return {
    type: GET_FAMILY_MEMBER_BY_ID_FAILURE,
    payload: error,
  };
};

export const deleteFamilyMemberByIdAction =
  (Id, studentID) => async (dispatch) => {
    try {
      // dispatching request action
      dispatch(deleteFamilyMemberByIdRequest());
      // await for response from API
      let response = await apiHelper("delete", `FamilyMembers/${Id}`);
      let {data} = response?.data;

      // dispatching success action
      dispatch(deleteFamilyMemberByIdSuccess(data));
      if (response.status == 200) {
        dispatch(getFamilyMemberByIdAction(studentID));
      }
    } catch (error) {
      // dispatching failure action
      dispatch(deleteFamilyMemberByIdFailure(error));
      // Clearing states using clear action
    }
  };

const deleteFamilyMemberByIdRequest = () => {
  // Creating request action for deleteFamilyMemberById API
  return {
    type: DELETE_FAMILY_MEMBER_BY_ID_REQUEST,
  };
};

const deleteFamilyMemberByIdSuccess = (responseDataPublic) => {
  // Creating success action for deleteFamilyMemberById API
  return {
    type: DELETE_FAMILY_MEMBER_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const deleteFamilyMemberByIdFailure = (error) => {
  return {
    type: DELETE_FAMILY_MEMBER_BY_ID_FAILURE,
    payload: error,
  };
};

export const createStudentAction = (request, callBack) => async (dispatch) => {
  try {
    // dispatching request action
    dispatch(createStudentRequest(request));
    // await for response from API
    let response = await apiHelper("post", `Students`, request);
    let {data} = response?.data;

    // dispatching success action
    dispatch(createStudentSuccess(data));
    callBack(response.data);
  } catch (error) {
    // dispatching failure action
    dispatch(createStudentFailure(error));
    // Clearing states using clear action
  }
};

const createStudentRequest = () => {
  // Creating request action for createStudent API
  return {
    type: CREATE_STUDENT_REQUEST,
  };
};

const createStudentSuccess = (responseDataPublic) => {
  // Creating success action for createStudent API
  return {
    type: CREATE_STUDENT_SUCCESS,
    payload: responseDataPublic,
  };
};

const createStudentFailure = (error) => {
  return {
    type: CREATE_STUDENT_FAILURE,
    payload: error,
  };
};

export const getNationalitiesAction = () => async (dispatch) => {
  try {
    // dispatching request action
    dispatch(getNationalitiesRequest());
    // await for response from API
    let response = await apiHelper("get", `Nationalities`);
    const { data } = response?.data;
    debugger
    // dispatching success action
    data?.map((item) => {
      item["label"] = item.title;
      item["value"] = item.title;
    });
    debugger
    dispatch(getNationalitiesSuccess(data));
  } catch (error) {
    // dispatching failure action
    dispatch(getNationalitiesFailure(error));
    // Clearing states using clear action
  }
};

const getNationalitiesRequest = () => {
  // Creating request action for getNationalities API
  return {
    type: GET_NATIONALITIES_REQUEST,
  };
};

const getNationalitiesSuccess = (responseDataPublic) => {
  // Creating success action for getNationalities API
  return {
    type: GET_NATIONALITIES_SUCCESS,
    payload: responseDataPublic,
  };
};

const getNationalitiesFailure = (error) => {
  return {
    type: GET_NATIONALITIES_FAILURE,
    payload: error,
  };
};

export const updateNationalityByIdAction =
  (studentID, nationalityID) => async (dispatch) => {
    try {
      // dispatching request action
      dispatch(updateNationalityByIdRequest());
      // await for response from API
      let response = await apiHelper(
        "put",
        `Students/${studentID}/Nationality/${nationalityID}`
      );
      let {data} = response?.data;

      // dispatching success action
      dispatch(updateNationalityByIdSuccess(data));
    } catch (error) {
      // dispatching failure action
      dispatch(updateNationalityByIdFailure(error));
      // Clearing states using clear action
    }
  };

const updateNationalityByIdRequest = () => {
  // Creating request action for updateNationalityById API
  return {
    type: UPDATE_NATIONALITY_BY_ID_REQUEST,
  };
};

const updateNationalityByIdSuccess = (responseDataPublic) => {
  // Creating success action for updateNationalityById API
  return {
    type: UPDATE_NATIONALITY_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const updateNationalityByIdFailure = (error) => {
  return {
    type: UPDATE_NATIONALITY_BY_ID_FAILURE,
    payload: error,
  };
};

export const createFamilyMembersByIdAction =
  (request, studentID, callBack) => async (dispatch) => {
    try {
      // dispatching request action
      dispatch(createFamilyMembersByIdRequest());
      // await for response from API
      let response = await apiHelper(
        "post",
        `Students/${studentID}/FamilyMembers/`,
        request
      );
      let {data} = response?.data;

      // dispatching success action
      dispatch(createFamilyMembersByIdSuccess(data));

      callBack(response);
    } catch (error) {
      // dispatching failure action
      dispatch(createFamilyMembersByIdFailure(error));
      // Clearing states using clear action
    }
  };

const createFamilyMembersByIdRequest = () => {
  // Creating request action for createFamilyMembersById API
  return {
    type: CREATE_FAMILY_MEMBER_BY_ID_REQUEST,
  };
};

const createFamilyMembersByIdSuccess = (responseDataPublic) => {
  // Creating success action for createFamilyMembersById API
  return {
    type: CREATE_FAMILY_MEMBER_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const createFamilyMembersByIdFailure = (error) => {
  return {
    type: CREATE_FAMILY_MEMBER_BY_ID_FAILURE,
    payload: error,
  };
};

export const updateFamilyMemberNationalityByIdAction =
  (familyMemberID, nationalityID, callBack = false) =>
  async (dispatch) => {
    try {
      // dispatching request action
      dispatch(updateFamilyMemberNationalityByIdRequest());
      // await for response from API
      let response = await apiHelper(
        "put",
        `FamilyMembers/${familyMemberID}/Nationality/${nationalityID}`
      );
      let {data} = response?.data;

      if (callBack) {
        callBack();
      }
      // dispatching success action
      dispatch(updateFamilyMemberNationalityByIdSuccess(data));
    } catch (error) {
      // dispatching failure action
      dispatch(updateFamilyMemberNationalityByIdFailure(error));
      // Clearing states using clear action
    }
  };

const updateFamilyMemberNationalityByIdRequest = () => {
  // Creating request action for updateFamilyMemberNationalityById API
  return {
    type: UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_REQUEST,
  };
};

const updateFamilyMemberNationalityByIdSuccess = (responseDataPublic) => {
  // Creating success action for updateFamilyMemberNationalityById API
  return {
    type: UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const updateFamilyMemberNationalityByIdFailure = (error) => {
  return {
    type: UPDATE_FAMILY_MEMBER_NATIONALITY_BY_ID_FAILURE,
    payload: error,
  };
};

export const updateStudentByIdAction =
  (request, id, callBack) => async (dispatch) => {
    try {
      // dispatching request action
      dispatch(updateStudentByIdRequest());
      // await for response from API
      let response = await apiHelper("put", `Students/${id}`, request);
      let {data} = response?.data;

      // dispatching success action
      dispatch(updateStudentByIdSuccess(data));
      callBack(response?.data);
    } catch (error) {
      // dispatching failure action
      dispatch(updateStudentByIdFailure(error));
      // Clearing states using clear action
    }
  };

const updateStudentByIdRequest = () => {
  // Creating request action for updateStudentById API
  return {
    type: UPDATE_STUDENT_BY_ID_REQUEST,
  };
};

const updateStudentByIdSuccess = (responseDataPublic) => {
  // Creating success action for updateStudentById API
  return {
    type: UPDATE_STUDENT_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const updateStudentByIdFailure = (error) => {
  return {
    type: UPDATE_STUDENT_BY_ID_FAILURE,
    payload: error,
  };
};

export const updateFamilyMemberByIdAction =
  (request, id, callBack) => async (dispatch) => {
    try {
      // dispatching request action
      dispatch(updateFamilyMemberByIdRequest());
      // await for response from API
      let response = await apiHelper("put", `FamilyMembers/${id}`, request);
      let {data} = response?.data;

      // dispatching success action
      dispatch(updateFamilyMemberByIdSuccess(data));
      callBack(response?.data);
    } catch (error) {
      // dispatching failure action
      dispatch(updateFamilyMemberByIdFailure(error));
      // Clearing states using clear action
    }
  };

const updateFamilyMemberByIdRequest = () => {
  // Creating request action for updateFamilyMemberById API
  return {
    type: UPDATE_FAMILY_MEMBER_BY_ID_REQUEST,
  };
};

const updateFamilyMemberByIdSuccess = (responseDataPublic) => {
  // Creating success action for updateFamilyMemberById API
  return {
    type: UPDATE_FAMILY_MEMBER_BY_ID_SUCCESS,
    payload: responseDataPublic,
  };
};

const updateFamilyMemberByIdFailure = (error) => {
  return {
    type: UPDATE_FAMILY_MEMBER_BY_ID_FAILURE,
    payload: error,
  };
};

export const clearModalStates = () => {
  // Creating clear states action
  return {
    type: CLEAR_MODAL_STATES,
  };
};

export const setRoleRights = (right) => {
  return {
    type: SET_ROLE_RIGHTS,
    payload: right,
  };
};

export const setRoleAction = (role) => {
  return {
    type: SET_ROLE,
    payload: role,
  };
};

export const getClearStates = () => {
  // Creating clear states action
  return {
    type: CLEAR_ALL_STATES,
  };
};
