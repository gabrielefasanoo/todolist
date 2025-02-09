import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <Container maxWidth="lg" className="py-20">
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Typography variant="h2" component="h1" className="font-bold">
            Organizza le tue attività in modo semplice
          </Typography>
          <Typography variant="h6" color="text.secondary">
            TaskMaster ti aiuta a gestire i tuoi impegni quotidiani in modo efficiente e intuitivo.
          </Typography>
          <div className="space-x-4 pt-4">
            <Link href="/register" passHref>
              <Button variant="contained" color="primary" size="large">
                Inizia Gratis
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outlined" color="primary" size="large">
                Scopri di più
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative h-[400px] hidden md:block">
          <Image
            src="/hero-image.svg"
            alt="Task Management"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </Box>
    </Container>
  );
};

export default HeroSection; 