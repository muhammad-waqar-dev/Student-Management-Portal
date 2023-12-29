import {
  GET_ALL_STUDENTS_REQUEST,
  GET_ALL_STUDENTS_SUCCESS,
  GET_ALL_STUDENTS_FAILURE,
  GET_STUDENT_BY_ID_FAILURE,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  GET_NATIONALITY_BY_ID_FAILURE,
  GET_NATIONALITY_BY_ID_REQUEST,
  GET_NATIONALITY_BY_ID_SUCCESS,
  GET_FAMILY_MEMBER_BY_ID_FAILURE,
  GET_FAMILY_MEMBER_BY_ID_REQUEST,
  GET_FAMILY_MEMBER_BY_ID_SUCCESS,
  CLEAR_ALL_STATES,
  CLEAR_MODAL_STATES,
  DELETE_FAMILY_MEMBER_BY_ID_REQUEST,
  DELETE_FAMILY_MEMBER_BY_ID_SUCCESS,
  DELETE_FAMILY_MEMBER_BY_ID_FAILURE,
  SET_ROLE,
  CREATE_STUDENT_REQUEST,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  GET_NATIONALITIES_FAILURE,
  GET_NATIONALITIES_SUCCESS,
  GET_NATIONALITIES_REQUEST,
  SET_ROLE_RIGHTS,
} from "./ActionTypes";

const initialState = {
  //initializing states
  loading: false,
  allStudentsList: [],
  studentItem: [],
  nationality: {},
  familyMemberList: [],
  loggedInRole: "",
  nationalitiesList: [],
  roleRight: "",
};
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    // Using switch cases and returning store values
    case GET_ALL_STUDENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allStudentsList: action.payload,
      };
    case GET_ALL_STUDENTS_FAILURE:
      return { ...state, loading: false };

    case GET_STUDENT_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_STUDENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        studentItem: action.payload,
      };
    case GET_STUDENT_BY_ID_FAILURE:
      return { ...state, loading: false };

    case GET_NATIONALITY_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NATIONALITY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        nationality: action.payload.nationality,
      };
    case GET_NATIONALITY_BY_ID_FAILURE:
      return { ...state, loading: false };

    case GET_FAMILY_MEMBER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_FAMILY_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        familyMemberList: action.payload,
      };

    case GET_FAMILY_MEMBER_BY_ID_FAILURE:
      return { ...state, loading: false };

    case DELETE_FAMILY_MEMBER_BY_ID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_FAMILY_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        // familyMemberList: action.payload,
      };

    case DELETE_FAMILY_MEMBER_BY_ID_FAILURE:
      return { ...state, loading: false };

    case CREATE_STUDENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // familyMemberList: action.payload,
      };

    case CREATE_STUDENT_FAILURE:
      return { ...state, loading: false };

    case GET_NATIONALITIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_NATIONALITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        nationalitiesList: action.payload,
      };

    case GET_NATIONALITIES_FAILURE:
      return { ...state, loading: false };

    case CLEAR_MODAL_STATES:
      return {
        ...state,
        studentItem: [],
        nationality: {},
        familyMemberList: [],
      };

    case SET_ROLE:
      return { ...state, loading: false, loggedInRole: action.payload };

    case SET_ROLE_RIGHTS:
      return { ...state, loading: false, roleRight: action.payload };

    case CLEAR_ALL_STATES:
      return { ...initialState };

    default:
      return state;
  }
}
