import express from "express";
import connectDB from "./utils/db";
import userRoutes from "./routes/user";
import dotenv from "dotenv";
import watchlistRoutes from "./routes/watchlist";
import stockRoutes from "./routes/stock";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

// CORS Middleware
app.use(cors());

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/stocks", stockRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
