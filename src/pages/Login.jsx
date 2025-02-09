import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Container maxWidth="sm" className="min-h-screen flex items-center">
      <Paper className="p-8 w-full">
        <Typography variant="h4" className="text-center mb-6">
          Accedi
        </Typography>
        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            startIcon={<LoginIcon />}
            size="large"
          >
            Accedi
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login; 