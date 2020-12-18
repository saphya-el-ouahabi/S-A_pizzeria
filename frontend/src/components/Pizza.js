import React from 'react';
import { Link } from 'react-router-dom';
import Note from './Note';

export default function Pizza(props) {
  const { pizza } = props;
  return (
            <div key={pizza._id} className="panier">
            <Link to={`/pizza/${pizza._id}`}>
                <img className="medium" src={pizza.image} alt={pizza.nom}/> 
            </Link>
            <div className="panier-body">
                <Link to={`/pizza/${pizza._id}`}>
                    <h2>{pizza.nom}</h2>
                </Link>
                <Note note={pizza.note} 
                numAvis={pizza.numAvis}></Note>

                <div className="prix">{pizza.prix} € </div>
                
            </div>
            </div>
  );
}