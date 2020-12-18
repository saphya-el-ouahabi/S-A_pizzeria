import {
    PANIER_ADD_ITEM,
    PANIER_REMOVE_ITEM,
    PANIER_SAVE_ADRESSE_LIVRAISON,
    PANIER_SAVE_PAIEMENT,
    PANIER_EMPTY,
  } from '../constants/panier';

export const panierReducer = (state = { panierItems:[]}, action) => 
{
    switch (action.type) {
        case PANIER_ADD_ITEM:
            const item = action.playload;
            const existItem =state.panierItems.find(x => x.pizza === item.pizza);
            if(existItem) {
                return{
                ...state,
                panierItems: state.panierItems.map(x => 
                    x.pizza === existItem.pizza? item :x
                ),
            };
    } 
    else {
        return { ...state, panierItems: [...state.panierItems, item]};
    }
    case PANIER_REMOVE_ITEM:
        return {
          ...state,
          panierItems: state.panierItems.filter((x) => x.pizza !== action.payload),
        };

   case PANIER_SAVE_ADRESSE_LIVRAISON:
        return { ...state, adresseLivraison: action.payload };

   case PANIER_SAVE_PAIEMENT:
        return { ...state, paymentMethod: action.payload };
   
   
   case PANIER_EMPTY:
            return { ...state, panierItems: [] };


    default:
        return state;

}
};