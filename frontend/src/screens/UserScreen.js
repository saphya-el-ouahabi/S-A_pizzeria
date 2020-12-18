import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/user';

export default function UserScreen() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [mdp, setMdp] = useState('');
  const [confirmMdp, setConfirmMdp] = useState('');

  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo } = userConnexion;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;


  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(detailsUser(userInfo._id));
      } else {
        setNom(user.nom);
        setEmail(user.email);
      }
    }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (mdp !== confirmMdp) {
        alert('Mot de passe non similaire');
      } else {
        dispatch(updateUserProfile({ userId: user._id, nom, email, mdp }));
      }
  };


  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
      <div className='text-blanc'>
          <h1>Profil</h1>
      </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>

            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Modification du profil validée
              </MessageBox>
            )}


            <div className='text-blanc'>
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="Entrez votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              ></input>
            </div>

            <div className='text-blanc'>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Entrez votre adresse mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>

            <div className='text-blanc'>
              <label htmlFor="mdp">Mot de passe</label>
              <input
                id="mdp"
                type="password"
                placeholder="Entrez votre mot de passe"
                onChange={(e) => setMdp(e.target.value)}
              ></input>
            </div>

            <div className='text-blanc'>
              <label htmlFor="confirmMdp">Confirmer</label>
              <input
                id="confirmMdp"
                type="password"
                placeholder="Confirmez votre mot de passe"
                onChange={(e) => setConfirmMdp(e.target.value)}
              ></input>
            </div>

            <div>
              <label />
              <button className="premier" type="submit">
                Mettre à jour
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}