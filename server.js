import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import connectDB from './db/mongo.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
