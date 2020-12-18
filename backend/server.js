import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/user.js';
import pizzaRouter from './routers/pizza.js';
import dotenv from 'dotenv';
import orderRouter from './routers/commande.js';
import path from 'path';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sapizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/pizzas',pizzaRouter);
app.use('/api/orders', orderRouter);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`adresse du serveur http://localhost:${port}`);
});