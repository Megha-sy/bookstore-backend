// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    author: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true 
    },
    price: {
      type: Number,
      required: true
    },
    language: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String,   // store image URL or file path
      required: true  // make true if image is mandatory
    },
    CreatedAt: { 
      type: Date,
      default: Date.now
    },
  },
  { timestamps: true }
);


const cartSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  addedAt: { type: Date, default: Date.now },
});

const Cart= mongoose.model("Cart", cartSchema);

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book, Cart };
