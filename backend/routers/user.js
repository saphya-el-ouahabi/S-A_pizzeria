import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/user.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // Si je veux mettre à jour ma liste d'users: faut les supprimer et les remettre dedans : 
    // http://localhost:5000/api/users/seed
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post('/connexion', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.mdp, user.mdp)){
            res.send({
                _id: user._id,
                nom: user.nom,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({ message: 'Mot de passe/email invalide ' });

})

);

userRouter.post(
  '/inscription',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      nom: req.body.nom,
      email: req.body.email,
      mdp: bcrypt.hashSync(req.body.mdp, 8), //8 pour générer automatiquement le mdp  
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      nom: createdUser.nom,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'Utilisateur introuvable' });
    }
  })
);



userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.nom = req.body.nom || user.nom;
      user.email = req.body.email || user.email;
      if (req.body.mdp) {
        user.mdp = bcrypt.hashSync(req.body.mdp, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        nom: updatedUser.nom,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'sa_pizzeria@gmail.com') {
        res.status(400).send({ message: 'Vous ne pouvez pas supprimer un des administrateur' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'Utilisateur a bien été supprimé', user: deleteUser });
    } else {
      res.status(404).send({ message: 'Utilisateur introuvable' });
    }
  })
);


userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.nom = req.body.nom || user.nom;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'Utilisateur a bien été mis à jour ', user: updatedUser });
    } else {
      res.status(404).send({ message: 'Utilisateur introuvable' });
    }
  })
);



export default userRouter;