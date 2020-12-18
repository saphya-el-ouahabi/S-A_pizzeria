import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/panier';
import CommandeSteps from '../components/CommandeSteps';

export default function PaiementScreen(props) {
  const panier = useSelector((state) => state.panier);
  const { adresseLivraison } = panier;
  if (!adresseLivraison.adresse) {
    props.history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder');
  };
  return (
    <div>
      <CommandeSteps step1 step2 step3></CommandeSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Paiement</h1>
        </div>

        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>


        <div>
          <div>
            <input
              type="radio"
              id="visa"
              value="Visa"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="visa"> Visa </label>
          </div>
        </div>


        <div>
          <label />
          <button className="premier" type="submit">
            Continuer
          </button>
        </div>

      </form>
    </div>
  );
}