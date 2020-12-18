import {
    COMMANDE_CREATE_FAIL,
    COMMANDE_CREATE_REQUEST,
    COMMANDE_CREATE_RESET,
    COMMANDE_CREATE_SUCCESS,

    COMMANDE_DETAILS_FAIL,
    COMMANDE_DETAILS_REQUEST,
    COMMANDE_DETAILS_SUCCESS,

    COMMANDE_MINE_LIST_REQUEST,
    COMMANDE_MINE_LIST_FAIL,
    COMMANDE_MINE_LIST_SUCCESS,

    COMMANDE_LIST_REQUEST,
    COMMANDE_LIST_SUCCESS,
    COMMANDE_LIST_FAIL,

    COMMANDE_DELETE_REQUEST,
    COMMANDE_DELETE_SUCCESS,
    COMMANDE_DELETE_FAIL,
    COMMANDE_DELETE_RESET,

    COMMANDE_DELIVER_REQUEST,
    COMMANDE_DELIVER_SUCCESS,
    COMMANDE_DELIVER_FAIL,
    COMMANDE_DELIVER_RESET,

  } from '../constants/commande';
  
  export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMANDE_CREATE_REQUEST:
        return { loading: true };

      case COMMANDE_CREATE_SUCCESS:
        return { loading: false, success: true, order: action.payload };

      case COMMANDE_CREATE_FAIL:
        return { loading: false, error: action.payload };

      case COMMANDE_CREATE_RESET:
        return {};

      default:
        return state;
    }
  };



  export const orderDetailsReducer = (
    state = { loading: true, order: {} },
    action
  ) => {
    switch (action.type) {
      case COMMANDE_DETAILS_REQUEST:
        return { loading: true };
      case COMMANDE_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case COMMANDE_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const orderMineListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case COMMANDE_MINE_LIST_REQUEST:
        return { loading: true };
      case COMMANDE_MINE_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case COMMANDE_MINE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case COMMANDE_LIST_REQUEST:
        return { loading: true };
      case COMMANDE_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case COMMANDE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMANDE_DELETE_REQUEST:
        return { loading: true };
      case COMMANDE_DELETE_SUCCESS:
        return { loading: false, success: true };
      case COMMANDE_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case COMMANDE_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
      case COMMANDE_DELIVER_REQUEST:
        return { loading: true };
      case COMMANDE_DELIVER_SUCCESS:
        return { loading: false, success: true };
      case COMMANDE_DELIVER_FAIL:
        return { loading: false, error: action.payload };
      case COMMANDE_DELIVER_RESET:
        return {};
      default:
        return state;
    }
  };

  