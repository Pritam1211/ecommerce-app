const express  = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const auth = require("./routes/auth.route");
const category = require("./routes/category.route");
const product = require("./routes/product.route");

dotenv.config();


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB ", err);
  }
}


dbConnect();



app.use("/api/auth", auth);
app.use("/api/category", category);
app.use("/api/product", product);

app.listen(process.env.PORT, ()=>{
  console.log("Server is Running on Port ", process.env.PORT );
})