import React, { useEffect, useState } from 'react';
import Note from '../components/Note';
import { useDispatch, useSelector } from 'react-redux';
import { detailsPizza } from '../actions/pizza';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PizzaScreen(props) {
    const dispatch = useDispatch();
    const pizzaId = props.match.params.id;

    const [qty, setQty] = useState(1);

    const pizzaDetails = useSelector((state) => state.pizzaDetails);
    const { loading, error, pizza} = pizzaDetails;
  
    useEffect(() => {
      dispatch(detailsPizza(pizzaId));
    }, [dispatch, pizzaId]);

    const addToPanierHandler = () => {
        props.history.push(`/panier/${pizzaId}?qty=${qty}`);
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

                <div className="col-2">
                    <img className="large" src={pizza.image} alt={pizza.nom}></img>
                </div>

                <div className="col-1">
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

                <div className="col-1">
                    <div className="panier panier-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div> Prix: </div>
                                    <div className="prix"> {pizza.prix} € </div>
                                </div>
                            </li>

                            <li>
                                <div className="row">
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
                                    <div> Qty </div>
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
                  </div>
      )}
    </div>
  );
}
