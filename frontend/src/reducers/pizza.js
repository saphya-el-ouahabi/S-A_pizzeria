const {
    PIZZA_LIST_FAIL,
    PIZZA_LIST_REQUEST,
    PIZZA_LIST_SUCCESS,

    PIZZA_DETAILS_FAIL,
    PIZZA_DETAILS_REQUEST,
    PIZZA_DETAILS_SUCCESS,

    PIZZA_CREATE_REQUEST,
    PIZZA_CREATE_SUCCESS,
    PIZZA_CREATE_FAIL,
    PIZZA_CREATE_RESET,

    PIZZA_UPDATE_REQUEST,
    PIZZA_UPDATE_SUCCESS,
    PIZZA_UPDATE_FAIL,
    PIZZA_UPDATE_RESET,

    PIZZA_DELETE_REQUEST,
    PIZZA_DELETE_SUCCESS,
    PIZZA_DELETE_FAIL,
    PIZZA_DELETE_RESET,

    PIZZA_AVIS_CREATE_REQUEST,
    PIZZA_AVIS_CREATE_SUCCESS,
    PIZZA_AVIS_CREATE_FAIL,
    PIZZA_AVIS_CREATE_RESET,
  } = require('../constants/pizza');
  
  export const pizzaListReducer = (
    state = { loading: true, pizzas: [] },
    action
  ) => {
    switch (action.type) {
      case PIZZA_LIST_REQUEST:
        return { loading: true };
      case PIZZA_LIST_SUCCESS:
        return { loading: false, pizzas: action.payload };
      case PIZZA_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  
  export const pizzaDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PIZZA_DETAILS_REQUEST:
      return { loading: true };
    case PIZZA_DETAILS_SUCCESS:
      return { loading: false, pizza: action.payload };
    case PIZZA_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const pizzaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PIZZA_CREATE_REQUEST:
      return { loading: true };
    case PIZZA_CREATE_SUCCESS:
      return { loading: false, success: true, pizza: action.payload };
    case PIZZA_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PIZZA_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const pizzaUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PIZZA_UPDATE_REQUEST:
      return { loading: true };
    case PIZZA_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PIZZA_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PIZZA_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


export const pizzaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PIZZA_DELETE_REQUEST:
      return { loading: true };
    case PIZZA_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PIZZA_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PIZZA_DELETE_RESET:
      return {};
    default:
      return state;
  }
};


export const pizzaAvisCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PIZZA_AVIS_CREATE_REQUEST:
      return { loading: true };
    case PIZZA_AVIS_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case PIZZA_AVIS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PIZZA_AVIS_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
