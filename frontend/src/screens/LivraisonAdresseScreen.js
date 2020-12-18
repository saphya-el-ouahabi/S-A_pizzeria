import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/panier';
import CommandeSteps from '../components/CommandeSteps';

export default function LivraisonAdresseScreen(props) {
  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo } = userConnexion;
  const panier = useSelector((state) => state.panier);
  const { adresseLivraison } = panier;

  if (!userInfo) {
    props.history.push('/connexion');
  }
  const [nom, setNom] = useState(adresseLivraison.nom);
  const [prenom, setPrenom] = useState(adresseLivraison.prenom);
  const [adresse, setAdresse] = useState(adresseLivraison.adresse);
  const [ville, setVille] = useState(adresseLivraison.ville);
  const [codePostal, setCodePostal] = useState(adresseLivraison.codePostal);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ nom, prenom, adresse, ville, codePostal })
    );
    props.history.push('/payment');
  };
  return (
    <div>
      <CommandeSteps step1 step2></CommandeSteps>
      <form className="form" onSubmit={submitHandler}>
      <div className='text-blanc'>
          <h1>Adresse de livraison</h1>
        </div>

        <div className='text-blanc'>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            placeholder="Entrer votre Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          ></input>
        </div>

        <div className='text-blanc'>
          <label htmlFor="prenom">Prenom</label>
          <input
            type="text"
            id="prenom"
            placeholder="Entrer votre Prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          ></input>
        </div>

        <div className='text-blanc'>
          <label htmlFor="adresse">Adresse</label>
          <input
            type="text"
            id="adresse"
            placeholder="Entrer votre adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
          ></input>
        </div>

        <div className='text-blanc'>
          <label htmlFor="ville">Ville</label>
          <input
            type="text"
            id="ville"
            placeholder="Entrer votre ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            required
          ></input>
        </div>

        <div className='text-blanc'>
          <label htmlFor="codePostal">Postal Code</label>
          <input
            type="text"
            id="codePostal"
            placeholder="Entrer votre code postal"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label/>
          <button className="premier" type="submit">
            Continuer
          </button>
        </div>
        
      </form>
    </div>
  );
}