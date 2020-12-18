import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, deliverOrder } from '../actions/commande';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { COMMANDE_DELIVER_RESET, } from '../constants/commande';

export default function CommandeFinalScreen(props) {

  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo } = userConnexion;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !order ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: COMMANDE_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } 
  }, [dispatch,  orderId, successDeliver, order]);


  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (


    <div>
      <div className='text-blanc-h'>Récapitulatifs</div>
      <div className='text-blanc'>
      <h1>Commande : {order._id}</h1></div>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="panier panier-body">
                <h2>Livraison</h2>
                <p>
                <strong>Nom prénom :</strong> {order.adresseLivraison.nom} {order.adresseLivraison.prenom}<br />                  
                <strong>Adresse: </strong> {order.adresseLivraison.adresse},
                  {order.adresseLivraison.ville},{' '}
                  {order.adresseLivraison.codePostal}
                </p>
              </div>
            </li>
            <li>
              <div className="panier panier-body">
                <h2>Paiement</h2>
                <p>
                  <strong>Methode:</strong> {order.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="panier panier-body">
                <h2>Votre commande</h2>
                <ul>
                  {order.orderItems.map((item) => (
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
                <h2>Détails de votre Commande</h2>
              </li>
              <li>
                <div className="row">
                  <div>Pizzas</div>
                  <div>{order.itemsPrix} € </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Livraison</div>
                  <div>{order.shippingPrix} € </div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <div>
                    <strong> {order.totalPrix} € </strong>
                  </div>
                </div>
              </li>


              <li>
                <button
                  type="button"
                  className="premier block"
                >
                  <Link to="/">VALIDER</Link>
                </button>


                {userInfo.isAdmin && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="premier block"
                    onClick={deliverHandler}
                  >
                    Livraison faite
                  </button>
                </li>
              )}


              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}