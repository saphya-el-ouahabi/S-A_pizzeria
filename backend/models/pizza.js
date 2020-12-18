import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    numAvis: { type: Number, required: true },
    note: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Pizza = mongoose.model('Pizza', pizzaSchema);

export default Pizza;