import Axios from "axios"
import {
    PANIER_ADD_ITEM,
    PANIER_REMOVE_ITEM,
    PANIER_SAVE_ADRESSE_LIVRAISON,
    PANIER_SAVE_PAIEMENT,
  } from '../constants/panier';

export const addToPanier = (pizzaId, qty) => async(dispatch, getState) => {
    const {data} = await Axios.get(`/api/pizzas/${pizzaId}`);
    dispatch({
        type: PANIER_ADD_ITEM,
        playload:{
            nom: data.nom,
            image: data.image,
            prix: data.prix,
            stock: data.stock,
            pizza: data._id,
            qty,
        },
    });
    localStorage.setItem('panierItems', JSON.stringify(getState().panier.panierItems));

};

export const removeFromPanier = (pizzaId) => (dispatch, getState) => {
    dispatch({ type: PANIER_REMOVE_ITEM, payload: pizzaId });
    localStorage.setItem('panierItems', JSON.stringify(getState().panier.panierItems));
  };

export const saveShippingAddress  = (data) => (dispatch) => {
    dispatch({ type: PANIER_SAVE_ADRESSE_LIVRAISON, payload: data });
    localStorage.setItem('adresseLivraison', JSON.stringify(data));
  };

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: PANIER_SAVE_PAIEMENT, payload: data });
  };

  