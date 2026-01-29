// ==================== CONFIGURATION ====================
const API_URL = 'http://localhost:5000/api';
let currentUser = null;
let cart = [];
let products = [];
let currentCategory = 'All';

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    checkAuth();
    loadCart();
    fetchProducts();
    setupEventListeners();
}

// ==================== AUTHENTICATION ====================
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        currentUser = JSON.parse(user);
        updateAuthUI();
    }
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    if (currentUser) {
        loginBtn.innerHTML = `
            <i class="fas fa-user-circle"></i>
            <span>${currentUser.name}</span>
        `;
        loginBtn.onclick = logout;
    }
}

async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthUI();
            closeModal('loginModal');
            showToast('Login successful!', 'success');
        } else {
            showToast(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showToast('Login failed. Please try again.', 'error');
    }
}

async function register(name, email, password, phone) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            currentUser = data.user;
            updateAuthUI();
            closeModal('loginModal');
            showToast('Registration successful!', 'success');
        } else {
            showToast(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showToast('Registration failed. Please try again.', 'error');
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    currentUser = null;
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.innerHTML = '<i class="fas fa-user"></i><span>Login</span>';
    loginBtn.onclick = () => openModal('loginModal');
    showToast('Logged out successfully', 'success');
}

// ==================== PRODUCTS ====================
async function fetchProducts(category = 'All', search = '', sort = '') {
    try {
        showLoading();
        
        let url = `${API_URL}/products?`;
        if (category !== 'All') url += `category=${category}&`;
        if (search) url += `search=${search}&`;
        if (sort) url += `sort=${sort}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.success) {
            products = data.products;
            displayProducts(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        showToast('Failed to load products', 'error');
        hideLoading();
    }
}

function displayProducts(productsToDisplay) {
    const featuredContainer = document.getElementById('featuredProducts');
    const allProductsContainer = document.getElementById('allProducts');
    
    const featuredProducts = productsToDisplay.filter(p => p.featured);
    const regularProducts = productsToDisplay.filter(p => !p.featured);
    
    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    allProductsContainer.innerHTML = regularProducts.map(product => createProductCard(product)).join('');
    
    hideLoading();
}

function createProductCard(product) {
    const stars = generateStars(product.rating);
    const discount = product.discount > 0 ? `<div class="discount-badge">${product.discount}% OFF</div>` : '';
    
    return `
        <div class="product-card" onclick="showProductDetail('${product._id}')">
            <div class="product-image">
                ${discount}
                <button class="wishlist-btn" onclick="event.stopPropagation(); toggleWishlist('${product._id}')">
                    <i class="far fa-heart"></i>
                </button>
                <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/280x280?text=Product+Image'">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <span class="rating-text">${product.rating} (${product.numReviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                </div>
                <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart('${product._id}')">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

async function showProductDetail(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        const data = await response.json();
        
        if (data.success) {
            const product = data.product;
            const stars = generateStars(product.rating);
            
            const detailHTML = `
                <div class="product-detail">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-detail-image" onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'">
                    <div class="product-detail-info">
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            <div class="stars">${stars}</div>
                            <span class="rating-text">${product.rating} (${product.numReviews} reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">$${product.price}</span>
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-meta">
                            <div class="meta-item">
                                <span class="meta-label">Brand:</span>
                                <span class="meta-value">${product.brand}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Category:</span>
                                <span class="meta-value">${product.category}</span>
                            </div>
                            <div class="meta-item">
                                <span class="meta-label">Stock:</span>
                                <span class="meta-value ${product.stock > 0 ? 'text-green' : 'text-red'}">
                                    ${product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}
                                </span>
                            </div>
                        </div>
                        <button class="add-to-cart-btn" onclick="addToCart('${product._id}'); closeModal('productModal')">
                            <i class="fas fa-shopping-cart"></i>
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            
            document.getElementById('productDetail').innerHTML = detailHTML;
            openModal('productModal');
        }
    } catch (error) {
        console.error('Error fetching product details:', error);
        showToast('Failed to load product details', 'error');
    }
}

// ==================== CART ====================
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    
    if (!product) {
        showToast('Product not found', 'error');
        return;
    }
    
    if (product.stock <= 0) {
        showToast('Product out of stock', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.product._id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
            showToast('Cart updated!', 'success');
        } else {
            showToast('Maximum stock reached', 'error');
            return;
        }
    } else {
        cart.push({
            product: product,
            quantity: 1
        });
        showToast('Added to cart!', 'success');
    }
    
    saveCart();
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.product._id !== productId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart', 'success');
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.product._id === productId);
    
    if (item) {
        const newQuantity = item.quantity + change;
        
        if (newQuantity <= 0) {
            removeFromCart(productId);
            return;
        }
        
        if (newQuantity > item.product.stock) {
            showToast('Maximum stock reached', 'error');
            return;
        }
        
        item.quantity = newQuantity;
        saveCart();
        updateCartUI();
    }
}

function updateCartUI() {
    const cartBadge = document.getElementById('cartBadge');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    cartBadge.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--gray-500);">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.product.images[0]}" alt="${item.product.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80x80?text=Product'">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.product.name}</div>
                    <div class="cart-item-price">$${item.product.price}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity('${item.product._id}', -1)">-</button>
                        <span class="qty-display">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.product._id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.product._id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// ==================== CHECKOUT ====================
function proceedToCheckout() {
    if (!currentUser) {
        showToast('Please login to checkout', 'error');
        openModal('loginModal');
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    updateCheckoutSummary();
    toggleCart();
    openModal('checkoutModal');
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    document.getElementById('summarySubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('summaryShipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('summaryTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
}

async function placeOrder(orderData) {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            showToast('Please login to place order', 'error');
            return;
        }
        
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            cart = [];
            saveCart();
            updateCartUI();
            closeModal('checkoutModal');
            showToast('Order placed successfully! 🎉', 'success');
        } else {
            showToast(data.message || 'Order failed', 'error');
        }
    } catch (error) {
        console.error('Order error:', error);
        showToast('Failed to place order', 'error');
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Login/Register Modal
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', () => openModal('loginModal'));
    
    // Cart Button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', toggleCart);
    
    // Close Cart
    const closeCartBtn = document.querySelector('.close-cart');
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Checkout Button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', proceedToCheckout);
    
    // Search
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    searchBtn.addEventListener('click', () => {
        fetchProducts(currentCategory, searchInput.value);
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            fetchProducts(currentCategory, searchInput.value);
        }
    });
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', (e) => {
        fetchProducts(currentCategory, searchInput.value, e.target.value);
    });
    
    // Category Buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            fetchProducts(currentCategory, searchInput.value);
        });
    });
    
    // Auth Tabs
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const tabName = tab.dataset.tab;
            document.getElementById('loginForm').style.display = tabName === 'login' ? 'block' : 'none';
            document.getElementById('registerForm').style.display = tabName === 'register' ? 'block' : 'none';
        });
    });
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        login(email, password);
    });
    
    // Register Form
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        register(name, email, password, phone);
    });
    
    // Checkout Form
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const orderItems = cart.map(item => ({
            product: item.product._id,
            name: item.product.name,
            quantity: item.quantity,
            image: item.product.images[0],
            price: item.product.price
        }));
        
        const shippingAddress = {
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            zipCode: document.getElementById('zipCode').value,
            country: document.getElementById('country').value
        };
        
        const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
        
        const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const shipping = 10;
        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;
        
        const orderData = {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice: subtotal,
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: total
        };
        
        placeOrder(orderData);
    });
    
    // Modal Close Buttons
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// ==================== UTILITY FUNCTIONS ====================
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function showLoading() {
    const featuredContainer = document.getElementById('featuredProducts');
    featuredContainer.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading amazing products...</p>
        </div>
    `;
}

function hideLoading() {
    // Loading is replaced by products
}

function toggleWishlist(productId) {
    // Implement wishlist functionality
    showToast('Added to wishlist!', 'success');
}