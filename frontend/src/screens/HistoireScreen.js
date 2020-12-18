
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function ContactScreen(props) {
	return(
<div className="histoire">
     
    S&A_pizzeria est le site rêvé pour vous faire livrer de délicieuses pizzas. <br/>
    Nos pizzas aux couleurs de l'Italie sont cuites dans nos fours à bois leur donnant ainsi un goût unique. <br/> <br/>
    <div className="maison">C'est fait maison !</div> <br/>
    Une pâte fine et craquante pour régaler toute la famille, à laquelle s'ajoutent des produits frais de qualité : 
    pizza Reine avec champignons cuisinés et jambon aux herbes, pizza Vegan aux petits légumes…
    Et pour les gourmands une pizza au chocolat ! <br/><br/>
    Alors n'hésitez plus et commandez sur notre site sans plus attendre !! <br/> <br/>
        <div className='image'>
    <img src="./images/histoire.jpg"alt=""></img>
    </div>

            
    <Carousel showArrows autoPlay showThumbs={false} infiniteLoop>

<img src="./images/frais.jpg"alt=""></img>
<img src="./images/livraison.jpg" alt=""></img>
<img src="./images/friend1.jpg" alt=""></img>
<img src="./images/friend2.jpg" alt=""></img>

  </Carousel>

</div>);




}
