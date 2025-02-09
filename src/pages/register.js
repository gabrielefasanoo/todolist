import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box, Link as MuiLink, Alert } from '@mui/material';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formError, setFormError] = useState('');
  const { register, error, loading } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validazione
    if (formData.password !== formData.confirmPassword) {
      setFormError('Le password non coincidono');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('La password deve essere di almeno 6 caratteri');
      return;
    }

    // Registrazione
    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (!success) {
      setFormError('Errore durante la registrazione');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Container maxWidth="sm" className="flex-grow py-12">
        <Paper className="p-8">
          <Typography variant="h4" component="h1" className="text-center mb-6">
            Registrati
          </Typography>
          {(error || formError) && (
            <Alert severity="error" className="mb-4">
              {error || formError}
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              variant="outlined"
            />
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
            <TextField
              fullWidth
              label="Conferma Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
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
              {loading ? 'Registrazione in corso...' : 'Registrati'}
            </Button>
          </form>
          <Box className="mt-4 text-center">
            <Typography color="text.secondary">
              Hai già un account?{' '}
              <Link href="/login" passHref>
                <MuiLink>Accedi</MuiLink>
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default RegisterPage; 