import bcrypt from 'bcryptjs';

const data = {

    users: [
      {
        nom:'SA_pizzeria',
        email:'sa_pizzeria@gmail.com',
        mdp: bcrypt.hashSync('motdepasse',8),
        isAdmin: true,
      },

      {
        nom:'Sophya',
        email:'sophya@gmail.com',
        mdp: bcrypt.hashSync('motdepasse1',8),
        isAdmin: false,
      },

      {
        nom:'Anais',
        email:'anais@gmail.com',
        mdp: bcrypt.hashSync('motdepasse1',8),
        isAdmin: false,
      },

      {
        nom:'Janette',
        email:'janetteDu74@gmail.com',
        mdp: bcrypt.hashSync('motdepasse1',8),
        isAdmin: false,
      },

      {
        nom:'Jean',
        email:'jeanDu74@gmail.com',
        mdp: bcrypt.hashSync('motdepasse1',8),
        isAdmin: false,
      },

    ],
    
    pizzas: [
      {
        nom: 'Margharita',
        image: '/images/pizza_1.jpg',
        description: 'Sauce tomate, mozzarella, basilic',
        prix: 10,
        numAvis: 5,
        note: 5,
        stock: 15,
      },

      {
        nom: 'Reine',
        image: '/images/pizza_2.jpg',
        description: 'Sauce tomate, mozzarella, jambon, champignons',
        prix: 12,
        numAvis: 6,
        note: 5,
        stock: 15,
      },

      {
        nom: 'Champignon crème',
        image: '/images/pizza_3.jpg',
        description: 'Champignon de Paris, crème , mozzarella, truffe',
        prix: 12,
        numAvis: 6,
        note: 4,
        stock: 15,
      },

      {
        nom: 'Suprême Vegan',
        image: '/images/pizza_4.jpg',
        description: 'Sauce tomate, mozzarella, champignons, olives, proteines de soja',
        prix: 12,
        numAvis: 7,
        note: 5,
        stock: 15,
      },

      {
        nom: 'Chicken Vegan',
        image: '/images/pizza_5.jpg',
        description: 'Crème, rapé, avocats, tofu caramélisés',
        prix: 12,
        numAvis: 7,
        note: 4,
        stock: 15,
      },

      {
        nom: 'Chocolat Extrême',
        image: '/images/pizza_6.jpg',
        description: "Pâte à tartiner sans produit laitier + Topping aux choix (oréos, kinder, hershey's, cookie dough ...) ",
        prix: 9,
        numAvis: 12,
        note: 4,
        stock: 0,
      },
    ],
  };
  export default data;