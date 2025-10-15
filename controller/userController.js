const { Book, Cart }  = require('../models/Book');
const fs = require("fs");
const path = require("path");

// ----------------- BOOK CONTROLLERS -----------------

const postbook = async (req, res) => {
  try {
    const { title, author, price, category, language } = req.body;
    const image = req.file ? req.file.filename : null;

    const newBook = await Book.create({ title, author, price, category, language, image });
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (err) {
    console.error("Error creating book:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllbooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const getbook = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBook = await Book.findById(id);
    res.status(200).json({
      success: true,
      message: "Book fetched successfully",
      data: singleBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

const updatebook = async (req, res) => {
  try {
    const { id } = req.params;
    const existingBook = await Book.findById(id);

    if (!existingBook) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    const updatedData = { ...req.body };

    if (req.file) {
      // delete old image if exists
      if (existingBook.image) {
        const oldPath = path.join(__dirname, "../uploads", existingBook.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updatedData.image = req.file.filename;
    } else {
      updatedData.image = existingBook.image;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook
    });
  } catch (err) {
    console.error("Error updating book:", err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) return res.status(404).json({ success: false, message: "Book not found" });

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

// ----------------- CART CONTROLLERS -----------------

// Get all cart items
const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find().populate("book");  //populate Returns cart items with book details fetched from the Book collection
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add book to cart
const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const item = await Cart.findOne({ book: bookId });

    if (item) {
      return res.status(400).json({ message: "Already in cart" });
    }

    const newItem = new Cart({ book: bookId });
    await newItem.save();

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// Remove book from cart
const removeFromCart = async (req, res) => {
  try {
    const deleted = await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: deleted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  postbook,
  getAllbooks,
  getbook,
  updatebook,
  deleteBook,
  getCartItems,
  addToCart,
  removeFromCart
};
