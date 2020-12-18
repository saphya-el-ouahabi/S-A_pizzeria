import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/commande.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'nom');
    res.send(orders);
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: 'Votre panier est vide' });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        adresseLivraison: req.body.adresseLivraison,
        paymentMethod: req.body.paymentMethod,
        itemsPrix: req.body.itemsPrix,
        shippingPrix: req.body.shippingPrix,
        totalPrix: req.body.totalPrix,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: 'Nouvelle commande créée', order: createdOrder });
    }
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Commande Introuvable' });
    }
  })
);


orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Commande Supprimé', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Commande Introuvable' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Commande livré', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Commande Introuvable' });
    }
  })
);


export default orderRouter;