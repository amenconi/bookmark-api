import dotenv from 'dotenv';
import app from './config/express';

// Load environment variables
dotenv.config();

// Get port from environment or use default
const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check available at http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
