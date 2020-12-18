import React, { useEffect, useState } from 'react';
import Note from '../components/Note';
import { useDispatch, useSelector } from 'react-redux';
import { createAvis, detailsPizza } from '../actions/pizza';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PIZZA_AVIS_CREATE_RESET } from '../constants/pizza';
import { Link } from 'react-router-dom';

export default function PizzaScreen(props) {
    const dispatch = useDispatch();
    const pizzaId = props.match.params.id;

    const [qty, setQty] = useState(1);

    const pizzaDetails = useSelector((state) => state.pizzaDetails);
    const { loading, error, pizza} = pizzaDetails;
  

    const userConnexion = useSelector((state) => state.userConnexion);
    const { userInfo } = userConnexion;
  

    const pizzaAvisCreate = useSelector((state) => state.pizzaAvisCreate);
    const {
      loading: loadingAvisCreate,
      error: errorAvisCreate,
      success: successAvisCreate,
    } = pizzaAvisCreate;
  
    const [note, setNote] = useState(0);
    const [comment, setComment] = useState('');


    useEffect(() => {

      if (successAvisCreate) {
        window.alert('Avis bien ajouté');
        setNote('');
        setComment('');
        dispatch({ type: PIZZA_AVIS_CREATE_RESET });
      }

      dispatch(detailsPizza(pizzaId));
    }, [dispatch, pizzaId, successAvisCreate]);

    const addToPanierHandler = () => {
        props.history.push(`/panier/${pizzaId}?qty=${qty}`);
      };

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && note) {
          dispatch(
            createAvis(pizzaId, { note, comment, nom: userInfo.nom })
          );
        } else {
          alert('Veuillez entrer un commentaire et une note =D ');
        }
      };

    return (
        <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
            <div className="row top">

            <div className="col-2-pizza">                    
            <img className="large" src={pizza.image} alt={pizza.nom}></img>
                </div>

                <div className="col-1-pizza">
                    <ul>
                        <li>
                            <h1>{pizza.nom}</h1>
                        </li>
                        <li>
                            <Note note={pizza.note} numAvis={pizza.numAvis}></Note>
                        </li>
                        <li>
                            Description: <p>{pizza.description}</p>
                        </li>
                    </ul>

                </div>

                <div className="col-1-pizza">
                    <div className="panier panier-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div> Prix: </div>
                                    <div className="prix"> {pizza.prix} € </div>
                                </div>
                            </li>

                            <li>
                                <div className="row-pizza">
                                    <div> Disponibilité: </div> 
                                    <div> 
                                    {pizza.stock>0? (
                                        <span className="success">En stock</span>
                                        ):(
                                        <span className="danger">Indisponible</span>                                        
                                        )}
                                    </div>
                                </div>
                            </li>
                            {
                              pizza.stock > 0 && (
                                <>
                                <li>
                                  <div className="row">
                                    <div> Quantité </div>
                                    <div>                                      
                                      <select value={qty} onChange={e => setQty(e.target.value)}> 
                                        {
                                          [...Array(pizza.stock).keys()].map(
                                            x => ( <option key={x+1} value={x+1}>{x+1}</option>
                                              ))
                                        }

                                      </select>
                                    </div>
                                  </div>
                                </li>
                                  <li>
                                    <button onClick={addToPanierHandler} className="premier block">Ajouter au panier</button>
                                  </li>
                                </>
                              )
                            }
                          </ul>
                        </div>
                      </div>
                    </div>



                    <div>
                          <h2 id="avis">Avis</h2>
                          {pizza.avis.length === 0 && (
                            <MessageBox>Il n'y a pas encore d'avis </MessageBox>
                          )}
                          <ul>
                            {pizza.avis.map((avis) => (
                              <li key={avis._id}>
                                <strong>{avis.nom}</strong>
                                <Note note={avis.note} caption=" "></Note>
                                <p>{avis.createdAt.substring(0, 10)}</p>
                                <p>{avis.comment}</p>
                              </li>
                            ))}
                            <li>
                              {userInfo ? (
                                <form className="form" onSubmit={submitHandler}>
                                  <div>
                                    <h2>Ecrire un commentaire</h2>
                                  </div>
                                  <div>
                                    <label htmlFor="note">Note</label>
                                    <select
                                      id="note"
                                      value={note}
                                      onChange={(e) => setNote(e.target.value)}
                                    >
                                      <option value="">Selectionner ...</option>
                                      <option value="1">1- Pas bon </option>
                                      <option value="2">2- Moyen</option>
                                      <option value="3">3- Bon </option>
                                      <option value="4">4- Très bon </option>
                                      <option value="5">5- Woah ! </option>
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="comment">Commentaire </label>
                                    <textarea
                                      id="comment"
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label />
                                    <button className="primary" type="submit">
                                      Envoyer
                                    </button>
                                  </div>
                                  <div>
                                    {loadingAvisCreate && <LoadingBox></LoadingBox>}
                                    {errorAvisCreate && (
                                      <MessageBox variant="danger">
                                        {errorAvisCreate}
                                      </MessageBox>
                                    )}
                                  </div>
                                </form>
                              ) : (
                                <MessageBox>
                                  Please <Link to="/connexion">Connexion</Link> Ecrire un avis 
                                </MessageBox>
                              )}
                            </li>
                          </ul>
                        </div>








                  </div>
      )}
    </div>
  );
}
