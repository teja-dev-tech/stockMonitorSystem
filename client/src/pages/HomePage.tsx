import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url("images/stockMonitorCover.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <HomeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome to Stock Monitor
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">
              <Typography
                component="h2"
                variant="h6"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/register");
              }}
            >
              <Typography component="h2" variant="h6">
                Register
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
