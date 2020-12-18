import Axios from 'axios';
import { PANIER_EMPTY } from '../constants/panier';
import {
  COMMANDE_CREATE_FAIL,
  COMMANDE_CREATE_REQUEST,
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

  COMMANDE_DELIVER_REQUEST,
  COMMANDE_DELIVER_SUCCESS,
  COMMANDE_DELIVER_FAIL,

} from '../constants/commande';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_CREATE_REQUEST, payload: order });
  try {
    const {
      userConnexion: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COMMANDE_CREATE_SUCCESS, payload: data.order });
    dispatch({ type: PANIER_EMPTY });
    localStorage.removeItem('panierItems');
  } catch (error) {
    dispatch({
      type: COMMANDE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_DETAILS_REQUEST, payload: orderId });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMMANDE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMMANDE_DETAILS_FAIL, payload: message });
  }
};



export const listOrderMine = () => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_MINE_LIST_REQUEST });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: COMMANDE_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMMANDE_MINE_LIST_FAIL, payload: message });
  }
};



export const listOrders = () => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_LIST_REQUEST });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: COMMANDE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMMANDE_LIST_FAIL, payload: message });
  }
};


export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_DELETE_REQUEST, payload: orderId });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: COMMANDE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMMANDE_DELETE_FAIL, payload: message });
  }
};


export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: COMMANDE_DELIVER_REQUEST, payload: orderId });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: COMMANDE_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: COMMANDE_DELIVER_FAIL, payload: message });
  }
};