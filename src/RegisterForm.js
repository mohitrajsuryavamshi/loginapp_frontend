import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const RegistrationForm = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle Form Input
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Submit Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(`http://localhost:8080/users/${editingUserId}`, user);
      } else {
        await axios.post("http://localhost:8080/users", user);
      }
      setUser({ username: "", email: "", password: "" });
      setEditingUserId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Edit User
  const handleEdit = (user) => {
    setUser({ username: user.username, email: user.email, password: user.password });
    setEditingUserId(user.id);
  };

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 4,
          mt: 4,
        }}
      >
        {/* Registration Form */}
        <Card sx={{ p: 4, width: "45%", boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            {editingUserId ? "Update User" : "Register"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={user.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              {editingUserId ? "Update User" : "Sign Up"}
            </Button>
          </form>
          
          {/* Go to Login Button */}
          <Button 
            variant="outlined" 
            color="secondary" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Card>

        {/* Users Table */}
        <Card sx={{ p: 3, width: "50%", boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            Registered Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="info" size="small" onClick={() => handleEdit(user)}>
                        Edit
                      </Button>
                      <Button variant="contained" color="error" size="small" onClick={() => handleDelete(user.id)} sx={{ ml: 1 }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
