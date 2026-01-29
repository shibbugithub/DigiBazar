# DigiBazar API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Login User
Authenticates a user and returns a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

### Get Current User
Returns the currently authenticated user's information.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "role": "user",
    "address": [],
    "createdAt": "2025-01-28T10:00:00.000Z"
  }
}
```

---

## Product Endpoints

### Get All Products
Retrieves all products with optional filtering and sorting.

**Endpoint:** `GET /products`

**Query Parameters:**
- `category` - Filter by category (optional)
- `search` - Search by product name (optional)
- `minPrice` - Minimum price filter (optional)
- `maxPrice` - Maximum price filter (optional)
- `sort` - Sort order: price-low, price-high, rating, newest (optional)

**Example:**
```
GET /products?category=Electronics&sort=price-low
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Apple iPhone 15 Pro Max 256GB",
      "description": "The ultimate iPhone...",
      "price": 1199,
      "originalPrice": 1299,
      "discount": 8,
      "category": "Electronics",
      "images": ["https://..."],
      "brand": "Apple",
      "stock": 50,
      "rating": 4.8,
      "numReviews": 1250,
      "featured": true,
      "reviews": [],
      "createdAt": "2025-01-28T10:00:00.000Z"
    }
  ]
}
```

### Get Single Product
Retrieves a specific product by ID.

**Endpoint:** `GET /products/:id`

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Apple iPhone 15 Pro Max 256GB",
    "description": "The ultimate iPhone...",
    "price": 1199,
    "originalPrice": 1299,
    "discount": 8,
    "category": "Electronics",
    "images": ["https://..."],
    "brand": "Apple",
    "stock": 50,
    "rating": 4.8,
    "numReviews": 1250,
    "featured": true,
    "reviews": [
      {
        "user": "507f1f77bcf86cd799439012",
        "name": "Jane Smith",
        "rating": 5,
        "comment": "Excellent product!",
        "createdAt": "2025-01-28T10:00:00.000Z"
      }
    ],
    "createdAt": "2025-01-28T10:00:00.000Z"
  }
}
```

### Create Product (Admin Only)
Creates a new product.

**Endpoint:** `POST /products`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "New Product",
  "description": "Product description",
  "price": 299,
  "originalPrice": 399,
  "discount": 25,
  "category": "Electronics",
  "images": ["https://..."],
  "brand": "Brand Name",
  "stock": 100,
  "featured": false
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "New Product",
    ...
  }
}
```

### Update Product (Admin Only)
Updates an existing product.

**Endpoint:** `PUT /products/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "price": 279,
  "stock": 150
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "_id": "507f1f77bcf86cd799439011",
    "price": 279,
    "stock": 150,
    ...
  }
}
```

### Delete Product (Admin Only)
Deletes a product.

**Endpoint:** `DELETE /products/:id`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Add Product Review
Adds a review to a product.

**Endpoint:** `POST /products/:id/reviews`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product! Highly recommended."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Review added successfully"
}
```

---

## Order Endpoints

### Create Order
Creates a new order.

**Endpoint:** `POST /orders`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderItems": [
    {
      "product": "507f1f77bcf86cd799439011",
      "name": "Apple iPhone 15 Pro Max",
      "quantity": 1,
      "image": "https://...",
      "price": 1199
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "Credit Card",
  "itemsPrice": 1199,
  "taxPrice": 119.9,
  "shippingPrice": 10,
  "totalPrice": 1328.9
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "user": "507f1f77bcf86cd799439011",
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Credit Card",
    "itemsPrice": 1199,
    "taxPrice": 119.9,
    "shippingPrice": 10,
    "totalPrice": 1328.9,
    "isPaid": false,
    "isDelivered": false,
    "status": "Processing",
    "createdAt": "2025-01-28T10:00:00.000Z"
  }
}
```

### Get Order by ID
Retrieves a specific order.

**Endpoint:** `GET /orders/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "orderItems": [...],
    "shippingAddress": {...},
    "paymentMethod": "Credit Card",
    "totalPrice": 1328.9,
    "isPaid": false,
    "isDelivered": false,
    "status": "Processing",
    "createdAt": "2025-01-28T10:00:00.000Z"
  }
}
```

### Get My Orders
Retrieves all orders for the authenticated user.

**Endpoint:** `GET /orders/myorders`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "orderItems": [...],
      "totalPrice": 1328.9,
      "status": "Processing",
      "createdAt": "2025-01-28T10:00:00.000Z"
    }
  ]
}
```

### Get All Orders (Admin Only)
Retrieves all orders in the system.

**Endpoint:** `GET /orders`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Response:**
```json
{
  "success": true,
  "orders": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "user": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "orderItems": [...],
      "totalPrice": 1328.9,
      "status": "Processing",
      "createdAt": "2025-01-28T10:00:00.000Z"
    }
  ]
}
```

### Update Order to Paid
Marks an order as paid.

**Endpoint:** `PUT /orders/:id/pay`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "id": "PAYPAL-PAYMENT-ID",
  "status": "COMPLETED",
  "update_time": "2025-01-28T10:00:00Z",
  "email_address": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "isPaid": true,
    "paidAt": "2025-01-28T10:00:00.000Z",
    "paymentResult": {...},
    ...
  }
}
```

### Update Order Status (Admin Only)
Updates the status of an order.

**Endpoint:** `PUT /orders/:id/status`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Status Options:**
- Processing
- Shipped
- Delivered
- Cancelled

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "507f1f77bcf86cd799439014",
    "status": "Shipped",
    ...
  }
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Categories

Available product categories:
- Electronics
- Fashion
- Home & Kitchen
- Books
- Sports
- Toys
- Beauty
- Health
- Automotive
- Grocery

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{...order data...}'
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding rate limiting middleware.

## Pagination

Currently not implemented. All products/orders are returned in a single response. Consider adding pagination for large datasets.