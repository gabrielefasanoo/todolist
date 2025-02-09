import React from 'react';
import { Container, Typography, Grid, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-auto">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              TaskMaster
            </Typography>
            <Typography color="text.secondary">
              La tua soluzione per la gestione delle attività quotidiane.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              Link Utili
            </Typography>
            <div className="space-y-2">
              <div><MuiLink href="/about">Chi Siamo</MuiLink></div>
              <div><MuiLink href="/privacy">Privacy</MuiLink></div>
              <div><MuiLink href="/terms">Termini di Servizio</MuiLink></div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" className="font-bold mb-4">
              Contatti
            </Typography>
            <div className="space-y-2">
              <div>Email: info@taskmaster.com</div>
              <div>Tel: +39 123 456 7890</div>
            </div>
          </Grid>
        </Grid>
        <Typography className="text-center mt-8 pt-8 border-t">
          © {new Date().getFullYear()} TaskMaster. Tutti i diritti riservati.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer; 