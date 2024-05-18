import mongoose, { Document, Schema } from "mongoose";

interface IWatchlist extends Document {
  user: mongoose.Types.ObjectId;
  symbols: string[];
}

const WatchlistSchema: Schema = new Schema({
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  symbols: { type: [String], required: true },
});

const Watchlist = mongoose.model<IWatchlist>("Watchlist", WatchlistSchema);

export default Watchlist;
