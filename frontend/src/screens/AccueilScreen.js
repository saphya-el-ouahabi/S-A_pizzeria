import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {listPizzas} from '../actions/pizza';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function AccueilScreen() {
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(listPizzas());
  }, [dispatch]);
  

return (<div>

  
    <div className="intro">
              
              Bienvenue sur notre site de commande de pizzas ! <br/>
              Disponible que sur Annecy et ses alentours ! 
              
        </div>
        <br/>
        <div className="accueil">
              Envie de dégustez un plat gourmand et riche en saveurs  ?
              Vous êtes au bon endroit !
        </div>
        <div className="accueil">
              Commandez sur notre site internet,
              et vous serez livrés à votre domicile en moins d'1 heure !
        </div>
        <br/>
        
        <Carousel showArrows autoPlay showThumbs={false} infiniteLoop>

    <img src="./images/pexels-rodolfo-clix-1596888.jpg"alt=""></img>
    <img src="./images/pexels-narda-yescas-1566837.jpg" alt=""></img>
    <img src="./images/banque-d-images-gratuites-libres-de-droits752.jpg" alt=""></img>
    <img src="./images/pexels-eneida-nieves-905847.jpg" alt=""></img>
  
  
</Carousel>
    
  </div>
);
}