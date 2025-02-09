import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout dopo 5 secondi
      retryWrites: true,
    });

    console.log(`MongoDB Connesso: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Errore di connessione a MongoDB: ${error.message}`);
    // Ritenta la connessione dopo 5 secondi
    setTimeout(connectDB, 5000);
  }
};

// Gestione degli eventi di connessione
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnesso. Tentativo di riconnessione...');
  setTimeout(connectDB, 5000);
});

mongoose.connection.on('error', (err) => {
  console.error(`Errore MongoDB: ${err.message}`);
});

export default connectDB; 