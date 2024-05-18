import axios from "axios";

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

export const getStockData = async (symbol: string) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol,
        interval: "5min",
        apikey: apiKey,
      },
    });

    const data = response.data["Time Series (5min)"];
    const latestTime = Object.keys(data)[0];
    const latestData = data[latestTime];

    return {
      symbol,
      price: latestData["1. open"],
      time: latestTime,
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error;
  }
};
