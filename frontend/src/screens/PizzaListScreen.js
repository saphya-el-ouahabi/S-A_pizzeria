import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPizza, deletePizza, listPizzas } from '../actions/pizza';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PIZZA_CREATE_RESET, PIZZA_DELETE_RESET } from '../constants/pizza';

export default function PizzaListScreen(props) {
  const pizzaList = useSelector((state) => state.pizzaList);
  const { loading, error, pizzas } = pizzaList;

  const pizzaCreate = useSelector((state) => state.pizzaCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    pizza: createdPizza,
  } = pizzaCreate;

  const pizzaDelete  = useSelector((state) => state.pizzaDelete );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = pizzaDelete ;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
        dispatch({ type: PIZZA_CREATE_RESET });
        props.history.push(`/pizza/${createdPizza._id}/edit`);
      }
    if (successDelete) {
        dispatch({ type: PIZZA_DELETE_RESET });
      }

    dispatch(listPizzas());
    }, [createdPizza, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (pizza) => {
    if (window.confirm('Êtes-vous sûr de vouloir la supprimer ?')) {
        dispatch(deletePizza(pizza._id));
    }
  };

  const createHandler = () => {
    dispatch(createPizza());
  };

  return (
    <div>

      <div className="row">
        <h1>Pizzas</h1>
        <button type="button" className="premier" onClick={createHandler}>
          Ajouter une nouvelle pizza
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Identifiant</th>
              <th>Nom</th>
              <th>Prix</th>
              <th>Description</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr key={pizza._id}>
                <td>{pizza._id}</td>
                <td>{pizza.nom}</td>
                <td>{pizza.prix}</td>
                <td>{pizza.description}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/pizza/${pizza._id}/edit`)
                    }
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(pizza)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}