# DigiBazar Quick Start Guide

Get DigiBazar up and running in 5 minutes!

## Prerequisites Check
```bash
# Check Node.js (should be v14+)
node --version

# Check MongoDB (should be v4.4+)
mongod --version

# Check npm
npm --version
```

## Installation Steps

### Step 1: Install Backend Dependencies
```bash
cd digibazar/backend
npm install
```

### Step 2: Configure Environment
Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digibazar
JWT_SECRET=mysecretkey123
JWT_EXPIRE=7d
NODE_ENV=development
```

### Step 3: Start MongoDB
```bash
# macOS/Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Or if using MongoDB as a process
mongod
```

### Step 4: Seed Database
```bash
cd backend
node seed.js
```

You should see:
```
MongoDB Connected
Data cleared
Admin user created
Sample user created
Products seeded
Database seeded successfully!
```

### Step 5: Start Backend Server
```bash
npm start
```

You should see:
```
DigiBazar server running on port 5000
MongoDB Connected
```

### Step 6: Start Frontend
Open a new terminal:

**Option A - Direct file access:**
```bash
cd frontend
# Open index.html in your browser
open index.html  # macOS
xdg-open index.html  # Linux
start index.html  # Windows
```

**Option B - Using Python server:**
```bash
cd frontend
python -m http.server 3000
# Visit http://localhost:3000
```

**Option C - Using Node.js http-server:**
```bash
npx http-server frontend -p 3000
# Visit http://localhost:3000
```

## Test the Application

### 1. Browse Products
- Visit the homepage
- Click on different categories
- Try the search feature
- Sort products by price or rating

### 2. Login
Click "Login" button and use:
- **Email:** john@example.com
- **Password:** password123

Or register a new account

### 3. Add to Cart
- Click "Add to Cart" on any product
- View cart by clicking the cart icon
- Adjust quantities

### 4. Place Order
- Click "Proceed to Checkout"
- Fill in shipping address
- Select payment method
- Click "Place Order"

### 5. Admin Access
Login with admin credentials:
- **Email:** admin@digibazar.com
- **Password:** admin123

## Troubleshooting

### MongoDB Not Starting
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB service
sudo systemctl start mongod
```

### Port Already in Use
Change the port in `.env`:
```env
PORT=5001
```

### Products Not Loading
1. Check backend is running: `http://localhost:5000`
2. Check MongoDB is running
3. Check browser console for errors
4. Verify API_URL in `frontend/js/app.js`

### CORS Errors
If frontend is on different port, update backend `server.js`:
```javascript
app.use(cors({
    origin: 'http://localhost:3000'
}));
```

## Next Steps

1. **Customize Design**
   - Edit colors in `frontend/css/style.css`
   - Change fonts in `frontend/index.html`

2. **Add Products**
   - Use API endpoint `POST /api/products`
   - Or modify `backend/seed.js`

3. **Deploy**
   - Backend: Heroku, DigitalOcean, AWS
   - Frontend: Netlify, Vercel, GitHub Pages
   - Database: MongoDB Atlas

## Useful Commands

```bash
# Backend Development
npm run dev          # Start with nodemon
npm start           # Start server

# Database
node seed.js        # Seed database
mongosh             # Open MongoDB shell

# Check Server
curl http://localhost:5000
curl http://localhost:5000/api/products
```

## Default Credentials

**Admin:**
- Email: admin@digibazar.com
- Password: admin123

**Test User:**
- Email: john@example.com
- Password: password123

## Support

For issues:
1. Check the main README.md
2. Check API_DOCUMENTATION.md
3. Open an issue on GitHub

Happy coding! 🚀