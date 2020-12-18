import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsPizza , updatePizza } from '../actions/pizza';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PIZZA_UPDATE_RESET } from '../constants/pizza';
import Axios from 'axios';

export default function PizzaEditScreen(props) {
  const pizzaId = props.match.params.id;
  const [nom, setNom] = useState('');
  const [prix, setPrix] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');

  const pizzaDetails = useSelector((state) => state.pizzaDetails);
  const { loading, error, pizza } = pizzaDetails;

  const pizzaUpdate = useSelector((state) => state.pizzaUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = pizzaUpdate;


  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/pizzalist');
      }
      if (!pizza || pizza._id !== pizzaId || successUpdate) {
        dispatch({ type: PIZZA_UPDATE_RESET });
      dispatch(detailsPizza(pizzaId));
    } else {
      setNom(pizza.nom);
      setPrix(pizza.prix);
      setImage(pizza.image);
      setStock(pizza.stock);
      setDescription(pizza.description);
    }
  }, [pizza, dispatch, pizzaId,  successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
        updatePizza({
          _id: pizzaId,
          nom,
          prix,
          image,
          description,
          stock,
        })
      );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userConnexion = useSelector((state) => state.userConnexion);
  const { userInfo } = userConnexion;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };



  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Modifier une pizza {pizzaId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                id="nom"
                type="text"
                placeholder="Entrer le nom de la pizza"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              ></input>
            </div>


            <div>
              <label htmlFor="prix">Prix</label>
              <input
                id="prix"
                type="text"
                placeholder="Entrer le prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
              ></input>
            </div>


            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Entrer l'image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            

            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Entrer la description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>


            <div>
              <label htmlFor="stock">Nombre de pizza en stock</label>
              <input
                id="stock"
                type="text"
                placeholder="Entrer le stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              ></input>
            </div>

            <div>
              <label></label>
              <button className="premier" type="submit">
                Mettre à jour la pizza
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}