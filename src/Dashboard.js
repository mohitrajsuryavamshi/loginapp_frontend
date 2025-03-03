import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Button, Container, Box } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data after login
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users/me"); // Replace with actual API endpoint
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page
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
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome {user ? user.username : "User"}! 🎉
          </Typography>
          {user ? (
            <Box>
              <Typography variant="body1">
                <strong>ID:</strong> {user.id}
              </Typography>
              <Typography variant="body1">
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>
          ) : (
            <Typography>Loading user data...</Typography>
          )}

          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
