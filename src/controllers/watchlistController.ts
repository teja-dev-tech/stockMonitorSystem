import { Request as ExpressRequest, Response } from "express";
import Watchlist from "../models/Watchlist";
import axios from "axios";
import { throttle } from "lodash";
import dotenv from "dotenv";
dotenv.config();

interface User {
  id: string;
}

interface Request extends ExpressRequest {
  user: User;
}

const fetchStockData = async (symbol: string) => {
  try {
    console.log(`Fetching stock data for ${symbol}`);
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: symbol,
        interval: "1min",
        apikey: process.env.ALPHA_VANTAGE_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const fetchStockDataThrottled = throttle(fetchStockData, 10); // limit to once per 10 milliseconds

export const getWatchlist = async (req: Request, res: Response) => {
  try {
    const watchlist = await Watchlist.findOne({ user: req.user.id });
    if (!watchlist) {
      return res.status(404).json({ msg: "Watchlist not found" });
    }

    const stockPrices: { symbol: string; price: string }[] = [];

    for (const symbol of watchlist.symbols) {
      try {
        const data = await fetchStockDataThrottled(symbol);
        if (data) {
          const timeSeries = data["Time Series (1min)"];
          const latestTime = Object.keys(timeSeries)[0];
          stockPrices.push({
            symbol: data["Meta Data"]["2. Symbol"],
            price: timeSeries[latestTime],
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    res.json(stockPrices);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
};

export const addSymbol = async (req: Request, res: Response) => {
  const { symbol } = req.body;
  try {
    let watchlist = await Watchlist.findOne({ user: req.user.id });
    if (!watchlist) {
      watchlist = new Watchlist({ user: req.user.id, symbols: [symbol] });
    } else {
      if (watchlist.symbols.includes(symbol)) {
        return res.status(400).json({ msg: "Symbol already in watchlist" });
      }
      watchlist.symbols.push(symbol);
    }
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
};

export const removeSymbol = async (req: Request, res: Response) => {
  const { symbol } = req.body;
  try {
    const watchlist = await Watchlist.findOne({ user: req.user.id });
    if (!watchlist) {
      return res.status(404).json({ msg: "Watchlist not found" });
    }
    watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).send("Server error");
  }
};
