Projet effectué dans le cadre du cours INFO734

# Site de gestion de pizzeria : S-A_pizzeria

Le projet que nous avons réalisé a pour but d'être un site de gestion de pizzeria.
Pour le réaliser nous avons utilisé Node.JS, MongoDB, ExpressJS ainsi que React.

## Site internet 

- 👉 Heroku : https://sapizzeria.herokuapp.com/

### Se connecter --> En mode administrateur:
* email: sa_pizzeria@gmail.com
* mot de passe : motdepasse

### Se connecter --> En mode client : 
Se créer un compte ou utiliser :
* email : janetteDu74@gmail.com
* mdp : motdepasse1

## Run localement

### 1. Clone le réportoire

```
$ git clone https://github.com/saphya-el-ouahabi/S-A_pizzeria.git
$ cd S-A_pizzeria
```

### 2. Installer MongoDB

👉 https://www.mongodb.com/try/download/community

### 3. Run le Backend

```
# ouvrir un terminal
$ npm install
$ npm start
```

### 4. Run le Frontend

```
# ouvrir un deuxième terminal
$ cd frontend
$ npm install
$ npm start
```

### 5.  Seed les pizzas (les mettre à jour)  

- Dans le fichier backend/routers/pizza.js:
* Enlever le commentaire à la ligne 22 // await Pizza.remove({});
* Lancer dans votre moteur de recherche l'url suivant: http://localhost:5000/api/pizzas/seed
* Remettre en commentaire la ligne 22
👉 Cela crée 6 pizzas

### 6.  Seed les utilisateurs

- Dans le fichier backend/routers/user.js:
* Enlever le commentaire à la ligne 15 // await User.remove({});
* Lancer dans votre moteur de recherche l'url suivant: http://localhost:5000/api/users/seed
* Remettre en commentaire la ligne 15
👉 Cela crée 4 utilisateurs


Projet en collaboration @anais-ferrera
