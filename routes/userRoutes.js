// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { postbook,getAllbooks,getbook,updatebook,deleteBook } = require('../controller/userController');
const multer = require("multer");
const { getCartItems, addToCart, removeFromCart } = require('../controller/userController');
const { addToWishlist, getWishlist, removeFromWishlist } = require("../controller/wishlistController");


// -------------- MULTER SETUP HERE --------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // make sure 'uploads' folder exists
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
// -----------------------------------------------

router.get('/get', getAllbooks);
router.get('/get/:id', getbook);
router.post('/add', upload.single("image"), postbook);
router.put('/put/:id', upload.single("image"), updatebook);
router.delete('/delete/:id', deleteBook);

router.get('/cart', getCartItems);                // Get all cart items
router.post('/cart', addToCart);                 // Add book to cart
router.delete('/cart/:id', removeFromCart); 

router.post("/wishlist", addToWishlist);
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:id", removeFromWishlist);

module.exports = router;
