import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { connexion } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


export default function  ConnexionScreen(props) {
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');


  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo, loading, error } = userConnexion;

  const dispatch = useDispatch();


  const submitHandler = (e) => {
    e.preventDefault();


    dispatch(connexion(email, mdp));
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
        <div className='text-blanc'>
          <h1>Connexion</h1>
        </div>        </div>

        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <div className='text-blanc'>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Entrer votre email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>

        <div className='text-blanc'>
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
            Connexion
          </button>
        </div>

        <div>
          <label />
          <div className='text-blanc'>
              Nouveau client ?{' '}
              <Link to={`/inscription?redirect=${redirect}`}style={{textDecoration : 'none', color:'coral'}}>
              Créer un compte 
            </Link>

          </div>
        </div>
      </form>
    </div>
  );
}