import React from 'react';

export default function CommandeSteps(props) {
  return (
    <div className="row commande-steps">
      <div className={props.step1 ? 'active' : ''}>Connexion</div>
      <div className={props.step2 ? 'active' : ''}>Livraison</div>
      <div className={props.step3 ? 'active' : ''}>Paiement</div>
      <div className={props.step4 ? 'active' : ''}>Finaliser ...</div>
    </div>
    
  );
}