import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useWatchlist from "../hooks/useWatchlist";
import NavBar from "../components/NavBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  symbol: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number
) {
  return { symbol, open, high, low, close, volume };
}

const DashboardPage = () => {
  const { watchlist, addSymbol, removeSymbol, refreshWatchlist } =
    useWatchlist();
  const [newSymbol, setNewSymbol] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const rows = watchlist.map((stock: any) =>
    createData(
      stock.symbol,
      stock.price["1. open"],
      stock.price["2. high"],
      stock.price["3. low"],
      stock.price["4. close"],
      stock.price["5. volume"]
    )
  );

  const handleAddSymbol = async () => {
    if (newSymbol) {
      setLoading(true);
      await addSymbol(newSymbol);
      setNewSymbol("");
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    await refreshWatchlist();
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <NavBar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={4}
      >
        <Typography variant="h4" gutterBottom>
          My Watchlist
        </Typography>
        <TextField
          label="Stock Symbol"
          fullWidth
          margin="normal"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSymbol}
          disabled={loading}
          style={{ marginBottom: "1rem" }}
        >
          {loading ? <CircularProgress size={24} /> : "Add Symbol"}
        </Button>
        <List>
          {watchlist.map((stock: any) => (
            <ListItem key={stock.symbol} divider>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                primary={`${stock.symbol}: ${stock.price["1. open"]}  `}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeSymbol(stock.symbol)}
                disabled={loading}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Refresh"}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="right">Open</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Low&nbsp;(g)</TableCell>
              <TableCell align="right">Close&nbsp;(g)</TableCell>
              <TableCell align="right">Volume&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.symbol}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.symbol}
                </TableCell>
                <TableCell align="right">{row.open}</TableCell>
                <TableCell align="right">{row.high}</TableCell>
                <TableCell align="right">{row.low}</TableCell>
                <TableCell align="right">{row.close}</TableCell>
                <TableCell align="right">{row.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DashboardPage;
