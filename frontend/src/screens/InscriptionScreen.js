import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { inscription } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function  InscriptionScreen(props) {

  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [nom, setNom] = useState('');


  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userInscription = useSelector((state) => state.userInscription);
  const { userInfo, loading, error } = userInscription;

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();


    dispatch(inscription(nom, email, mdp));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Inscription</h1>
        </div>

        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
       
        <div>
          <label htmlFor="email">Nom</label>
          <input
            type="text"
            id="nom"
            placeholder="Entrer votre nom"
            required
            onChange={(e) => setNom(e.target.value)}
          ></input>
        </div>


        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Entrer votre email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="mdp">Mot de passe</label>
          <input
            type="password"
            id="mdp"
            placeholder="Entrer votre mot de passe"
            required
            onChange={(e) => setMdp(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="premier" type="submit">
            Inscription
          </button>
        </div>
        <div>
          <label />
          <div>
            Vous avez déjà un compte chez nous ?  <Link to="/connexion">Connexion</Link>
          </div>
        </div>
      </form>
    </div>
  );
}