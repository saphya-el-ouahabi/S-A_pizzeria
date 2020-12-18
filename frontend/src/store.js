import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { panierReducer } from './reducers/panier';
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMineListReducer,
  orderListReducer,
  orderDeleteReducer,
  orderDeliverReducer,
} from './reducers/commande';

import {
  pizzaDetailsReducer,
  pizzaListReducer,
  pizzaCreateReducer,
  pizzaUpdateReducer,
  pizzaDeleteReducer,
  pizzaAvisCreateReducer,
} from './reducers/pizza';

import {
  userInscriptionReducer,
  userConnexionReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/user';

const initialState = {
  userConnexion: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },

  panier:{
    panierItems: localStorage.getItem('panierItems')
    ? JSON.parse(localStorage.getItem('panierItems'))
    : [],

  adresseLivraison: localStorage.getItem('adresseLivraison')
    ? JSON.parse(localStorage.getItem('adresseLivraison'))
    : {},

  paymentMethod: 'PayPal',

  },
};

const reducer = combineReducers({
  pizzaList: pizzaListReducer,
  pizzaDetails: pizzaDetailsReducer,
  panier: panierReducer,
  userConnexion: userConnexionReducer,
  userInscription: userInscriptionReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderMineList: orderMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  pizzaCreate: pizzaCreateReducer,
  pizzaUpdate: pizzaUpdateReducer,
  pizzaDelete: pizzaDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  pizzaAvisCreate: pizzaAvisCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//création d'un store de base en utilisant redux
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)) 
);

export default store;