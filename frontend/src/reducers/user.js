import {
    USER_CONNEXION_FAIL,
    USER_CONNEXION_REQUEST,
    USER_CONNEXION_SUCCESS,

    USER_DECONNEXION,

    USER_INSCRIPTION_REQUEST,
    USER_INSCRIPTION_SUCCESS,
    USER_INSCRIPTION_FAIL,

    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS,
    
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,

    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_RESET,
    USER_DELETE_SUCCESS,

    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_RESET,
    USER_UPDATE_SUCCESS,

  } from '../constants/user';
  
  export const userInscriptionReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_INSCRIPTION_REQUEST:
        return { loading: true };
      case USER_INSCRIPTION_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_INSCRIPTION_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const userConnexionReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_CONNEXION_REQUEST:
        return { loading: true };
      case USER_CONNEXION_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_CONNEXION_FAIL:
        return { loading: false, error: action.payload };
      case USER_DECONNEXION:
        return {};
      default:
        return state;
    }
  };


  export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { loading: true };
      case USER_DETAILS_SUCCESS:
        return { loading: false, user: action.payload };
      case USER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case USER_DETAILS_RESET:
        return { loading: true };
      default:
        return state;
    }
  };


  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true };
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
        return {};
      default:
        return state;
    }
  };


  export const userListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return { loading: true };
      case USER_LIST_SUCCESS:
        return { loading: false, users: action.payload };
      case USER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { loading: true };
      case USER_DELETE_SUCCESS:
        return { loading: false, success: true };
      case USER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case USER_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case USER_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };