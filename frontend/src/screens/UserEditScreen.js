import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/user';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/user';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setNom(user.nom);
      setEmail(user.email);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, nom, email}));
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <div className="text-blanc-h">Modifier l'utilisateur : {nom}</div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div className="text-blanc" >
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="Entrez un nouveau nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              ></input>
            </div>

            <div className="text-blanc">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Entrez une nouvelle adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            
            <div>
              <button type="submit" className="premier">
                Mettre à jour
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}