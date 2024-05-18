import express from "express";
import auth from "../middleware/auth";
import { getWatchlistStockData } from "../controllers/stockController";

const router = express.Router();

router.get("/watchlist", auth, getWatchlistStockData as any);

export default router;
