import React, { useEffect } from 'react';
import Pizza from '../components/Pizza';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import {listPizzas} from '../actions/pizza';


export default function AccueilScreen() {
  const dispatch = useDispatch();
  const pizzaList = useSelector(state => state.pizzaList);
  const {loading, error, pizzas}=pizzaList;
  

  useEffect(() => {

    dispatch(listPizzas());
  }, [dispatch]);

  return (<div> 
      {loading ? (
    <LoadingBox></LoadingBox>
        ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
        ) : (
    <div className="row center">
       {pizzas.map((pizza) => ( 
        <Pizza key={pizza._id} pizza={pizza}></Pizza>
      ))}
    </div>
)
  }</div>);
}