import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        nom: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        prix: { type: Number, required: true },
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Pizza',
          required: true,
        },
      },
    ],
    adresseLivraison: {
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      adresse: { type: String, required: true },
      ville: { type: String, required: true },
      codePostal: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    itemsPrix: { type: Number, required: true },
    shippingPrix: { type: Number, required: true },
    totalPrix: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;