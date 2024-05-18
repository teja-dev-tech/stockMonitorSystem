import express from "express";
import {
  getWatchlist,
  addSymbol,
  removeSymbol,
} from "../controllers/watchlistController";
import auth from "../middleware/auth";
const router = express.Router();

router.get("/", auth, getWatchlist as any);
router.post("/add", auth, addSymbol as any);
router.post("/remove", auth, removeSymbol as any);

export default router;
