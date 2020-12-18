import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Pizza from '../models/pizza.js';
import { isAdmin, isAuth } from '../utils.js';

const pizzaRouter = express.Router();

pizzaRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pizzas = await Pizza.find({});
    res.send(pizzas);
  })
);

pizzaRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // Si je veux mettre à jour ma liste de pizzas: faut les supprimer et les remettre dedans 
    // http://localhost:5000/api/pizzas/seed
    // await Pizza.remove({});
    const createdPizzas = await Pizza.insertMany(data.pizzas);
    res.send({ createdPizzas });
  })
);

pizzaRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      res.send(pizza);
    } else {
      res.status(404).send({ message: 'Pizza introuvable' });
    }
  })
);

pizzaRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pizza = new Pizza({
      nom: 'nom à définir' + Date.now(),
      image: '/images/pizza_1.jpg',
      prix: 0,
      stock: 0,
      note: 0,
      numAvis: 0,
      description: 'description à définir',
    });
    const createdPizza = await pizza.save();
    res.send({ message: 'Pizza créée', pizza: createdPizza });
  })
);

pizzaRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pizzaId = req.params.id;
    const pizza = await Pizza.findById(pizzaId);
    if (pizza) {
      pizza.nom = req.body.nom;
      pizza.prix = req.body.prix;
      pizza.image = req.body.image;
      pizza.description = req.body.description;
      pizza.stock = req.body.stock;

      const updatedPizza = await pizza.save();
      res.send({ message: 'Pizza mis à jour', pizza: updatedPizza });
    } else {
      res.status(404).send({ message: 'Pizza introuvable' });
    }
  })
);

pizzaRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza) {
      const deletePizza = await pizza.remove();
      res.send({ message: 'Pizza supprimé', pizza: deletePizza });
    } else {
      res.status(404).send({ message: 'Pizza introuvable' });
    }
  })
);

pizzaRouter.post(
  '/:id/avis',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const pizzaId = req.params.id;
    const pizza = await Pizza.findById(pizzaId);
    if (pizza) {
      if (pizza.avis.find((x) => x.nom === req.user.nom)) {
        return res
          .status(400)
          .send({ message: 'Vous avez déjà posté un avis' });
      }
      const avis = {
        nom: req.user.nom,
        note: Number(req.body.note),
        comment: req.body.comment,
      };
      pizza.avis.push(avis);
      pizza.numAvis = pizza.avis.length;
      pizza.note =
        pizza.avis.reduce((a, c) => c.note + a, 0) /
        pizza.avis.length;
      const updatedPizza = await pizza.save();
      res.status(201).send({
        message: 'Avis crée',
        avis: updatedPizza.avis[updatedPizza.avis.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Pizza introuvable' });
    }
  })
);



export default pizzaRouter;