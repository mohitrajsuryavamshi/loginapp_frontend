import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Alert, Card } from "@mui/material";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/users/login", { username, password });

      if (response.data === "Login successful") {
        setMessage(`Welcome, ${username}! Redirecting...`);
        setTimeout(() => navigate("/dashboard"), 1500); // ✅ Redirect to Dashboard
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Error connecting to server. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            p: 4,
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            bgcolor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: 3,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#fff" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 1,
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 1,
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
                bgcolor: "#ff6b6b",
                "&:hover": { bgcolor: "#ff4f4f" },
              }}
            >
              Login
            </Button>
          </form>

          {/* Success & Error Messages */}
          {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

          {/* ✅ Go to Registration Button */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{
              mt: 2,
              color: "#fff",
              borderColor: "#fff",
              "&:hover": { borderColor: "#ff4f4f", color: "#ff4f4f" },
            }}
            onClick={() => navigate("/")}
          >
            Go to Registration
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginForm;
