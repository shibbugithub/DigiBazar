const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: 'Apple iPhone 15 Pro Max 256GB',
    description: 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system. Features a 6.7-inch Super Retina XDR display with ProMotion technology.',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=500'],
    brand: 'Apple',
    stock: 50,
    rating: 4.8,
    numReviews: 1250,
    featured: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB',
    description: 'Premium flagship smartphone with 200MP camera, S Pen, and stunning 6.8-inch Dynamic AMOLED 2X display. Powered by Snapdragon 8 Gen 3.',
    price: 1099,
    originalPrice: 1199,
    discount: 8,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'],
    brand: 'Samsung',
    stock: 45,
    rating: 4.7,
    numReviews: 980,
    featured: true
  },
  {
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise canceling with Auto NC Optimizer. 30-hour battery life and crystal-clear hands-free calling.',
    price: 349,
    originalPrice: 399,
    discount: 13,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'],
    brand: 'Sony',
    stock: 100,
    rating: 4.9,
    numReviews: 2340,
    featured: true
  },
  {
    name: 'MacBook Pro 16" M3 Pro',
    description: 'Supercharged for pros with M3 Pro chip. 16-inch Liquid Retina XDR display, up to 22 hours battery life. 18GB RAM, 512GB SSD.',
    price: 2499,
    originalPrice: 2699,
    discount: 7,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'],
    brand: 'Apple',
    stock: 25,
    rating: 4.9,
    numReviews: 567,
    featured: true
  },
  {
    name: 'Nike Air Max 90 Sneakers',
    description: 'Classic sneaker with visible Max Air cushioning, durable construction, and iconic style. Perfect for everyday wear.',
    price: 129,
    originalPrice: 150,
    discount: 14,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    brand: 'Nike',
    stock: 150,
    rating: 4.6,
    numReviews: 890,
    featured: false
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'The original blue jean since 1873. Straight fit, button fly, and timeless style that never goes out of fashion.',
    price: 69,
    originalPrice: 89,
    discount: 22,
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1542272454315-7f6f6d870876?w=500'],
    brand: 'Levi\'s',
    stock: 200,
    rating: 4.5,
    numReviews: 1456,
    featured: false
  },
  {
    name: 'KitchenAid Stand Mixer',
    description: '5-quart stainless steel bowl, 10 speeds, and includes flat beater, dough hook, and wire whip. Available in multiple colors.',
    price: 379,
    originalPrice: 449,
    discount: 16,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500'],
    brand: 'KitchenAid',
    stock: 60,
    rating: 4.8,
    numReviews: 3240,
    featured: true
  },
  {
    name: 'Instant Pot Duo 7-in-1',
    description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer all in one. 6-quart capacity.',
    price: 89,
    originalPrice: 119,
    discount: 25,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1585515320310-259814833e62?w=500'],
    brand: 'Instant Pot',
    stock: 120,
    rating: 4.7,
    numReviews: 8970,
    featured: false
  },
  {
    name: 'The Great Gatsby - F. Scott Fitzgerald',
    description: 'Classic American novel about the Jazz Age. Follow Jay Gatsby\'s quest to recapture lost love in this timeless masterpiece.',
    price: 12,
    originalPrice: 15,
    discount: 20,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'],
    brand: 'Scribner',
    stock: 500,
    rating: 4.6,
    numReviews: 12450,
    featured: false
  },
  {
    name: 'Atomic Habits - James Clear',
    description: 'An easy and proven way to build good habits and break bad ones. Practical strategies that will teach you how to form good habits.',
    price: 16,
    originalPrice: 27,
    discount: 41,
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500'],
    brand: 'Avery',
    stock: 300,
    rating: 4.8,
    numReviews: 15670,
    featured: true
  },
  {
    name: 'Wilson Evolution Basketball',
    description: 'Official size and weight basketball. Micro-fiber composite leather for superior grip and durability. Indoor use.',
    price: 59,
    originalPrice: 75,
    discount: 21,
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500'],
    brand: 'Wilson',
    stock: 85,
    rating: 4.7,
    numReviews: 2340,
    featured: false
  },
  {
    name: 'Fitbit Charge 6 Fitness Tracker',
    description: 'Advanced fitness tracker with built-in GPS, heart rate monitoring, sleep tracking, and 7+ days battery life.',
    price: 159,
    originalPrice: 199,
    discount: 20,
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'],
    brand: 'Fitbit',
    stock: 95,
    rating: 4.5,
    numReviews: 4560,
    featured: false
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Ultimate collector\'s model with 7,541 pieces. Includes detailed interior, exterior features, and 7 minifigures.',
    price: 849,
    originalPrice: 899,
    discount: 6,
    category: 'Toys',
    images: ['https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'],
    brand: 'LEGO',
    stock: 15,
    rating: 5.0,
    numReviews: 890,
    featured: true
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum',
    description: 'Laser reveals microscopic dust. Scientific proof of a deep clean. Up to 60 minutes of run time.',
    price: 649,
    originalPrice: 749,
    discount: 13,
    category: 'Home & Kitchen',
    images: ['https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500'],
    brand: 'Dyson',
    stock: 40,
    rating: 4.6,
    numReviews: 1230,
    featured: true
  },
  {
    name: 'L\'Oréal Paris Revitalift Serum',
    description: 'Anti-aging face serum with pure hyaluronic acid. Reduces wrinkles and fine lines. Suitable for all skin types.',
    price: 24,
    originalPrice: 32,
    discount: 25,
    category: 'Beauty',
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500'],
    brand: 'L\'Oréal Paris',
    stock: 250,
    rating: 4.4,
    numReviews: 5670,
    featured: false
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data cleared');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@digibazar.com',
      password: 'admin123',
      role: 'admin',
      phone: '+1234567890'
    });
    console.log('Admin user created');

    // Create sample user
    await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      phone: '+1987654321'
    });
    console.log('Sample user created');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();