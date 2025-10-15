// controller/wishlistController.js
const Wishlist = require("../models/wishlist");

// Add book to wishlist
const addToWishlist = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Check if already exists
    const existing = await Wishlist.findOne({ book: bookId });
    if (existing) {
      return res.status(200).json({ success: false, message: "Book already in wishlist" });
    }

    const newWish = await Wishlist.create({ book: bookId });
    res.status(201).json({ success: true, data: newWish });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all wishlist items
const getWishlist = async (req, res) => {
  try {
    const items = await Wishlist.find().populate("book");
    res.status(200).json({ success: true, data: items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Remove from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 module.exports={addToWishlist,getWishlist,removeFromWishlist}