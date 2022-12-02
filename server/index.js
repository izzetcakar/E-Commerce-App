import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "../client/public/images";
    fs.access(dest, function (error) {
      if (error) {
        return cb(null, "../admin/public/images");
      } else {
        return cb(null, dest);
      }
    });

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage, preservePath: true });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});