import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToPanier, removeFromPanier } from '../actions/panier';
import MessageBox from '../components/MessageBox';

export default function PanierScreen(props) {
  const pizzaId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const panier = useSelector((state) => state.panier);
  const { panierItems } = panier;
  const dispatch = useDispatch();
  useEffect(() => {
    if (pizzaId) {
      dispatch(addToPanier(pizzaId, qty));
    }
  }, [dispatch, pizzaId, qty]);

  const removeFromPanierHandler = (id) => {
    dispatch(removeFromPanier(id));
  };

  const checkoutHandler = () => {
    props.history.push('/connexion?redirect=shipping');
  };
  return (
    <div className="row top">
    <div className="col-2-panier">
        <h1>Panier</h1>
        {panierItems.length === 0 ? (
          <MessageBox>
            Votre panier est vide <Link to="/">Retour aux achats</Link>
          </MessageBox>
        ) : (
          <ul>
            {panierItems.map((item) => (
              <li key={item.pizza}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.nom}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/pizza/${item.pizza}`}>{item.nom}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToPanier(item.pizza, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>{item.prix} € </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromPanierHandler(item.pizza)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="panier panier-body">
          <ul>
            <li>
              <h2>
                Total ({panierItems.reduce((a, c) => a + c.qty, 0)} pizzas) :
                {panierItems.reduce((a, c) => a + c.prix * c.qty, 0)  } €
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="premier block"
                disabled={panierItems.length === 0}
              >
              Commander
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}