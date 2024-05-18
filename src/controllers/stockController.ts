import { Request as ExpressRequest, Response } from "express";
import User from "../models/User";
import { getStockData } from "../utils/stockData";

interface User {
  id: string;
}

interface Request extends ExpressRequest {
  user: User;
}

export const getWatchlistStockData = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const stockDataPromises = user.watchlist.map((symbol) =>
      getStockData(symbol)
    );
    const stockData = await Promise.all(stockDataPromises);

    res.json(stockData);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
};
