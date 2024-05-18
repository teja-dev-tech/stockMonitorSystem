import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/AuthContext";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState({ show: false, message: "" });
  const [severity, setSeverity] = React.useState("success");
  const { register } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setSeverity("error");
      setAlert({ show: true, message: "Please enter all fields" });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
        setSeverity("success");
      }, 2000);
      return;
    }
    try {
      const res: any = await register(username, email, password);
      console.log(res);
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        setAlert({ show: true, message: "User registered successfully!" });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
      if (res && res.msg) {
        setSeverity("error");
        setAlert({ show: true, message: res.msg });
        setTimeout(() => {
          setAlert({ show: false, message: "" });
          setSeverity("success");
        }, 2000);
      }
    } catch (error) {
      console.log(error as Error);
      setSeverity("error");
      setAlert({ show: true, message: (error as Error).message });
      setTimeout(() => {
        setAlert({ show: false, message: "" });
        setSeverity("success");
      }, 2000);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      {alert.show ? (
        <Alert
          variant="filled"
          sx={{
            width: "50%",
            position: "absolute",
            top: 2,
            right: 2,
            zIndex: 9999,
          }}
          severity={severity as any}
        >
          {alert.message}
        </Alert>
      ) : null}
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Go back
                </Link>
              </Grid>
              <Grid item>
                <Link href="./login" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
