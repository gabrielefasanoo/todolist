import React from 'react';
import { AppBar, Toolbar, Button, Typography, Container } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className="justify-between">
          <Link href="/" passHref>
            <Typography 
              variant="h6" 
              component="div" 
              className="cursor-pointer font-bold text-primary"
            >
              TaskMaster
            </Typography>
          </Link>
          <div className="space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" passHref>
                  <Button color="primary">Dashboard</Button>
                </Link>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="outlined" color="primary">
                    Accedi
                  </Button>
                </Link>
                <Link href="/register" passHref>
                  <Button variant="contained" color="primary">
                    Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 