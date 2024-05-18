import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface WatchlistContextType {
  watchlist: { symbol: string; price: Object }[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  refreshWatchlist: () => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<
    { symbol: string; price: Object }[]
  >([]);

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/watchlist`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setWatchlist(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const addSymbol = async (symbol: string) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/watchlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ symbol }),
        }
      );
      const data = await res.json();
      console.log(data);
      fetchWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  const removeSymbol = async (symbol: string) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/watchlist/remove`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ symbol }),
        }
      );
      const data = await res.json();
      console.log(data);
      fetchWatchlist();
    } catch (err) {
      console.error(err);
    }
  };

  const refreshWatchlist = fetchWatchlist;

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addSymbol, removeSymbol, refreshWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export { WatchlistContext, WatchlistProvider };
