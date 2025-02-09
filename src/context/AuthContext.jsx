import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

// Inizializza gli utenti dal localStorage o usa l'utente di test
// ...existing code...
const getInitialUsers = () => {
  if (typeof window !== 'undefined') {
    const savedUsers = localStorage.getItem('mockUsers');
    if (savedUsers) {
      return JSON.parse(savedUsers);
    }
  }
  const initialUsers = [
    {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }
  ];
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUsers', JSON.stringify(initialUsers));
  }
  return initialUsers;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(getInitialUsers);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  // ...resto del codice esistente...
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Controlla se l'email esiste già
      if (users.some(u => u.email === userData.email)) {
        throw new Error('Email già registrata');
      }

      // Crea nuovo utente
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        password: userData.password
      };

      // Aggiorna la lista degli utenti
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      // Salva l'utente (senza password) nel localStorage e nello state
      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      router.push('/dashboard');
      return true;
    } catch (err) {
      setError(err.message || 'Errore durante la registrazione');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      // Debug logs
      console.log('Tentativo di login con:', credentials);
      console.log('Utenti disponibili:', users);

      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Trova l'utente
      const user = users.find(u => {
        console.log('Confronto con utente:', {
          storedEmail: u.email,
          inputEmail: credentials.email,
          emailMatch: u.email === credentials.email,
          passwordMatch: u.password === credentials.password
        });
        return u.email === credentials.email && u.password === credentials.password;
      });

      console.log('Utente trovato:', user);

      if (!user) {
        throw new Error('Email o password non validi');
      }

      // Salva l'utente (senza password) nel localStorage e nello state
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      router.push('/dashboard');
      return true;
    } catch (err) {
      console.error('Errore durante il login:', err);
      setError(err.message || 'Errore durante il login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}; 