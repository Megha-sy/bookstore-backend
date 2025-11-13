const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/db');
const bookRoute=require('./routes/userRoutes')

const cors = require('cors');

dotenv.config(); // Load .env file

const app = express();
// app.use(cors());
app.use(
  cors({
   origin: [
  "https://frontend-bookstore-psi.vercel.app",
  "http://localhost:5174"
],
   methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // optional (only if you use cookies or auth)
  })
);

app.use("/uploads", express.static("uploads"));

connectDB();
app.use(express.json())
app.use('/api/books',bookRoute)



app.get('/', (req, res) => {
  res.send('MongoDB connected successfully!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
