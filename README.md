Projet effectué dans le cadre du cours INFO734

# Site de gestion de pizzeria : S-A_pizzeria

Le projet est que nous avons réalisé a pour but d'être un site de gestion de pizzeria.
Pour réaliser ce site nous avons utilisé Node.JS, MongoDB, ExpressJS ainsi que React.

## Website

- 👉 Heroku : https://sapizzeria.herokuapp.com/


## Run localement

### 1. Clone repo

```
$ git clone https://github.com/saphya-el-ouahabi/S-A_pizzeria.git
$ cd S-A_pizzeria
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - Create .env file in root folder
  - Set MONGODB_URL=mongodb://localhost/sapizzeria  
- Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - Create .env file in root folder
  - Set MONGODB_URI=mongodb+srv://your-db-connection

### 3. Run Backend

```
$ npm install
$ npm start
```

### 4. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users/seed
- Cela retourne l'email et le mdp de l'admin
- Run this on chrome: http://localhost:5000/api/pizzas/seed
- Cela crée 6 pizzas

## Le Site :
lien : https://sapizzeria.herokuapp.com

### Se connecter --> En mode administrateur:
* email: sa_pizzeria@gmail.com
* mot de passe : motdepasse
### Se connecter --> En mode client : 
Se créer un compte ou utiliser :
* email : janetteDu74@gmail.com
* mdp : motdepasse1

## En local :
- Run http://localhost:3000/connexion
- Entrer l'email de l'admin et son mdp

Projet en collaboration @anais-ferrera
