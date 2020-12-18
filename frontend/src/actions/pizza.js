import Axios from 'axios';
import {
  PIZZA_LIST_FAIL,
  PIZZA_LIST_REQUEST,
  PIZZA_LIST_SUCCESS,

  PIZZA_DETAILS_FAIL,
  PIZZA_DETAILS_REQUEST,
  PIZZA_DETAILS_SUCCESS,

  PIZZA_CREATE_FAIL,
  PIZZA_CREATE_REQUEST,
  PIZZA_CREATE_SUCCESS,

  PIZZA_UPDATE_REQUEST,
  PIZZA_UPDATE_SUCCESS,
  PIZZA_UPDATE_FAIL,

  PIZZA_DELETE_REQUEST,
  PIZZA_DELETE_FAIL,
  PIZZA_DELETE_SUCCESS,

} from '../constants/pizza';

export const listPizzas = () => async (dispatch) => {
  dispatch({
    type: PIZZA_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/pizzas');
    dispatch({ type: PIZZA_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PIZZA_LIST_FAIL, payload: error.message });
  }
};

export const detailsPizza = (pizzaId) => async (dispatch) => {
dispatch({ type: PIZZA_DETAILS_REQUEST, payload: pizzaId });
try {
  const { data } = await Axios.get(`/api/pizzas/${pizzaId}`);
  dispatch({ type: PIZZA_DETAILS_SUCCESS, payload: data });
} catch (error) {
  dispatch({
    type: PIZZA_DETAILS_FAIL,
    payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
  });
}
};


export const createPizza = () => async (dispatch, getState) => {
  dispatch({ type: PIZZA_CREATE_REQUEST });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      '/api/pizzas',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: PIZZA_CREATE_SUCCESS,
      payload: data.pizza,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PIZZA_CREATE_FAIL, payload: message });
  }
};



export const updatePizza = (pizza) => async (dispatch, getState) => {
  dispatch({ type: PIZZA_UPDATE_REQUEST, payload: pizza });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.put(`/api/pizzas/${pizza._id}`, pizza, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PIZZA_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PIZZA_UPDATE_FAIL, error: message });
  }
};


export const deletePizza = (pizzaId) => async (dispatch, getState) => {
  dispatch({ type: PIZZA_DELETE_REQUEST, payload: pizzaId });
  const {
    userConnexion: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/pizzas/${pizzaId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PIZZA_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PIZZA_DELETE_FAIL, payload: message });
  }
};