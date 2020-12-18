import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/commande';
import CommandeSteps from '../components/CommandeSteps';
import { COMMANDE_CREATE_RESET } from '../constants/commande';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function CommandeScreen(props) {
  const panier = useSelector((state) => state.panier);
  if (!panier.paymentMethod) {
    props.history.push('/payment');
  }


  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;


  panier.itemsPrix = panier.panierItems.reduce((a, c) => a + c.qty * c.prix, 0);
  panier.shippingPrix= 5;
  panier.totalPrix = panier.itemsPrix + panier.shippingPrix;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {

    dispatch(createOrder({ ...panier, orderItems: panier.panierItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: COMMANDE_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);


  return (
    <div>
      <CommandeSteps step1 step2 step3 step4></CommandeSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="panier panier-body">
                <h2>Livraison</h2>
                <p>
                  <strong>Nom prénom :</strong> {panier.adresseLivraison.nom} {panier.adresseLivraison.prenom}<br />
                  <strong>Adresse : </strong> {panier.adresseLivraison.adresse},
                  {panier.adresseLivraison.ville}, {panier.adresseLivraison.codePostal}
                </p>
              </div>
            </li>
            <li>
              <div className="panier panier-body">
                <h2>Paiement</h2>
                <p>
                  <strong>Methode:</strong> {panier.paymentMethod}
                  
                  <p >PAIEMENT ACCEPTE</p>
                </p>
              </div>
            </li>
            <li>
              <div className="panier panier-body">
                <h2>Pizza(s) commandée(s): </h2>
                <ul>
                  {panier.panierItems.map((item) => (
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
                          <Link to={`/pizza/${item.pizza}`}>
                            {item.nom}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {item.prix} € = {item.qty * item.prix} €
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="panier panier-body">
            <ul>
              <li>
                <h2>Détails de la Commande</h2>
              </li>


              <li>
                <div className="row">
                  <div>Sous Total</div>
                  <div>{panier.itemsPrix} €</div>
                </div>
              </li>



              <li>
                <div className="row">
                  <div>Livraison</div>
                  <div>{panier.shippingPrix} € </div>
                </div>
              </li>


              <li>
                <div className="row">
                  <div>
                    <strong> Total </strong>
                  </div>
                  <div>
                    <strong>{panier.totalPrix} € </strong>
                  </div>
                </div>
              </li>


              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="premier block"
                  disabled={panier.panierItems.length === 0}
                >
                  Commander
                </button>
              </li>

              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}