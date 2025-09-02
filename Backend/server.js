const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json()); // To parse JSON request bodies

const products = [
  {
    id: 1,
    name: 'Classic White T-Shirt',
    price: 29.99,
    description: 'A timeless classic. This high-quality white t-shirt is made from 100% premium cotton, ensuring a soft feel and a comfortable fit. Perfect for any occasion.',
    image: 'https://placehold.co/400x400.png/FFFFFF/000000?text=White+T-Shirt',
    category: 'Fashion'
  },
  {
    id: 2,
    name: 'Modern Black Jeans',
    price: 89.99,
    description: 'Sleek and stylish. These modern black jeans are crafted from a durable denim blend, offering both comfort and a sharp, contemporary look.',
    image: 'https://placehold.co/400x400.png/000000/FFFFFF?text=Black+Jeans',
    category: 'Fashion'
  },
  {
    id: 3,
    name: 'Leather Ankle Boots',
    price: 149.99,
    description: 'Elegant and durable. These ankle boots are made from genuine leather and feature a sturdy sole, making them a perfect blend of style and practicality.',
    image: 'https://placehold.co/400x400.png/8B4513/FFFFFF?text=Leather+Boots',
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Blue Denim Jacket',
    price: 119.99,
    description: 'A wardrobe essential. This classic denim jacket has a relaxed fit and is made from high-quality blue denim, ideal for layering in any season.',
    image: 'https://placehold.co/400x400.png/4682B4/FFFFFF?text=Denim+Jacket',
    category: 'Fashion'
  },
  {
    id: 5,
    name: 'Striped Cotton Sweater',
    price: 79.99,
    description: 'Cozy and chic. This sweater is woven from soft, breathable cotton and features a classic striped pattern for a touch of nautical charm.',
    image: 'https://placehold.co/400x400.png/D3D3D3/000000?text=Striped+Sweater',
    category: 'Fashion'
  },
  {
    id: 6,
    name: 'Beige Chino Shorts',
    price: 49.99,
    description: 'Comfortable and versatile. These chino shorts are made from a lightweight cotton twill, perfect for warm weather and casual outings.',
    image: 'https://placehold.co/400x400.png/F5DEB3/000000?text=Chino+Shorts',
    category: 'Fashion'
  },
  {
    id: 7,
    name: 'Smartphone X',
    price: 699.99,
    description: 'The latest smartphone with a powerful camera and long-lasting battery.',
    image: 'https://placehold.co/400x400.png/FF0000/FFFFFF?text=Smartphone+X',
    category: 'Electronics'
  },
  {
    id: 8,
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Immersive sound experience with noise-cancelling technology.',
    image: 'https://placehold.co/400x400.png/00FF00/000000?text=Headphones',
    category: 'Electronics'
  }
];

// In-memory user store (for demonstration purposes)
const users = [];
const JWT_SECRET = 'your_jwt_secret'; // In a real application, use a strong, environment-variable-based secret

// Register route
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});


app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    // Get related products (same category, excluding the current product)
    const relatedProducts = products.filter(
      p => p.category === product.category && p.id !== product.id
    );
    res.json({ product, relatedProducts });
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
