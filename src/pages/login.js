import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, error, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Invio dati login:', formData);
    await login(formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Container maxWidth="sm" className="flex-grow py-12">
        <Paper className="p-8">
          <Typography variant="h4" component="h1" className="text-center mb-6">
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              variant="outlined"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading ? 'Accesso in corso...' : 'Accedi'}
            </Button>
          </form>
          <Box className="mt-4 text-center">
            <Typography color="text.secondary">
              Non hai un account?{' '}
              <Link href="/register" passHref>
                <MuiLink>Registrati</MuiLink>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default LoginPage; 