# Environment Variables Setup

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/admin-dashboard

# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/admin-dashboard?retryWrites=true&w=majority

# JWT Secret Key (Change this to a strong random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars

# Environment
NODE_ENV=development
```

## Important Notes:

1. **JWT_SECRET**: Use a strong, random string (minimum 32 characters) in production
2. **MONGO_URI**:
   - For local development, ensure MongoDB is running on your machine
   - For MongoDB Atlas, replace `username`, `password`, and `cluster` with your actual credentials
3. **PORT**: Default is 5000, change if needed

## Quick Setup:

1. Copy this content to a new file named `.env` in the `backend` directory
2. Update the values according to your setup
3. Never commit the `.env` file to version control
