# DigiBazar - Modern E-Commerce Platform

![DigiBazar Logo](https://img.shields.io/badge/DigiBazar-E--Commerce-FF6B35?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

A modern, full-featured e-commerce platform built with Express.js, MongoDB, and vanilla JavaScript. Features a stunning UI with vibrant orange and teal color scheme inspired by Amazon and Flipkart.

## ✨ Features

### User Features
- 🔐 **User Authentication** - Secure registration and login with JWT
- 🛍️ **Product Browsing** - Browse products by category with search and filters
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 📦 **Order Processing** - Complete checkout with shipping address
- ⭐ **Product Reviews** - Rate and review products
- 💳 **Multiple Payment Methods** - Credit Card, Debit Card, PayPal, Cash on Delivery

### Admin Features
- ➕ **Product Management** - Add, edit, delete products
- 📊 **Order Management** - View and update order status
- 👥 **User Management** - View registered users

### Technical Features
- 🎨 **Modern UI Design** - Vibrant orange & teal color scheme
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🚀 **Fast Performance** - Optimized loading and animations
- 🔒 **Secure** - Password hashing, JWT authentication
- 📦 **RESTful API** - Clean, organized backend architecture

## 🎨 Design Philosophy

DigiBazar features a bold, modern design with:
- **Primary Colors**: Vibrant Orange (#FF6B35) and Teal (#00D4AA)
- **Typography**: Urbanist (body) and Syne (headings) for a distinctive look
- **Animations**: Smooth transitions and micro-interactions
- **Layout**: Clean, spacious design with attention to detail

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with custom properties
- **Vanilla JavaScript** - No frameworks, pure JS
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Urbanist, Syne)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd digibazar
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/digibazar
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

### 4. Start MongoDB
Make sure MongoDB is running:
```bash
# On macOS/Linux
mongod

# On Windows
net start MongoDB
```

### 5. Seed the Database
```bash
cd backend
node seed.js
```

This will create:
- Admin user: `admin@digibazar.com` / `admin123`
- Test user: `john@example.com` / `password123`
- 15 sample products across various categories

### 6. Start the Backend Server
```bash
npm start
# Or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

### 7. Open the Frontend
Open `frontend/index.html` in your web browser, or use a local server:

```bash
# Using Python 3
cd frontend
python -m http.server 3000

# Using Node.js http-server
npx http-server frontend -p 3000
```

Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
digibazar/
├── backend/
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── orderController.js   # Order management
│   │   └── productController.js # Product management
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── orderRoutes.js       # Order endpoints
│   │   └── productRoutes.js     # Product endpoints
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server
│   ├── seed.js                  # Database seeder
│   └── package.json
└── frontend/
    ├── css/
    │   └── style.css            # Main stylesheet
    ├── js/
    │   └── app.js               # Main JavaScript
    ├── index.html               # Main HTML file
    └── images/                  # Image assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add review (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders/myorders` - Get user orders (Protected)
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/pay` - Update to paid (Protected)
- `PUT /api/orders/:id/status` - Update status (Admin)

## 👤 Default Accounts

### Admin Account
- **Email**: admin@digibazar.com
- **Password**: admin123
- **Role**: Administrator

### Test User Account
- **Email**: john@example.com
- **Password**: password123
- **Role**: User

## 🎯 Usage Guide

### For Customers

1. **Browse Products**
   - Click category buttons to filter
   - Use search bar to find specific products
   - Sort by price, rating, or newest

2. **View Product Details**
   - Click on any product card
   - See full description, reviews, and stock status

3. **Add to Cart**
   - Click "Add to Cart" button
   - Adjust quantities in cart sidebar
   - View cart total

4. **Checkout**
   - Click "Proceed to Checkout"
   - Login or register if not authenticated
   - Fill in shipping address
   - Select payment method
   - Place order

### For Administrators

1. **Login as Admin**
   - Use admin credentials
   - Access admin features via API

2. **Manage Products**
   - Add new products via POST request
   - Update existing products
   - Delete products

3. **Manage Orders**
   - View all orders
   - Update order status
   - Track deliveries

## 🔧 Configuration

### Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT token expiration time
- `NODE_ENV` - Environment (development/production)

### Customization

#### Colors
Edit CSS variables in `frontend/css/style.css`:
```css
:root {
    --primary-orange: #FF6B35;
    --primary-teal: #00D4AA;
    /* Modify other colors */
}
```

#### Fonts
Change fonts in the Google Fonts link in `index.html` and update CSS:
```css
:root {
    --font-primary: 'Urbanist', sans-serif;
    --font-display: 'Syne', sans-serif;
}
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
net start MongoDB  # Windows
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

### CORS Issues
If running frontend on different port, update CORS in `server.js`:
```javascript
app.use(cors({
    origin: 'http://localhost:3000'
}));
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
heroku create digibazar-api
heroku config:set MONGODB_URI=<your-mongodb-atlas-uri>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

### Frontend Deployment (Netlify/Vercel)
1. Update API_URL in `frontend/js/app.js`
2. Deploy frontend folder to Netlify or Vercel

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Update MONGODB_URI in .env
3. Whitelist IP addresses

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built with ❤️ by the DigiBazar Team

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@digibazar.com or open an issue in the repository.

---

**Happy Shopping! 🛍️**#   d i g i B a z a r  
 #   D i g i B a z a r  
 