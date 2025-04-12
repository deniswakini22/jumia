// Sample product data
const products = {
    featured: [
        {
            id: 1,
            title: "Wireless Noise-Cancelling Headphones",
            price: 199.99,
            oldPrice: 249.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 2,
            title: "Ultra HD Smart TV 55\"",
            price: 599.99,
            oldPrice: 699.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 3,
            title: "Professional DSLR Camera",
            price: 899.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 4,
            title: "Smartphone Pro Max 128GB",
            price: 1099.99,
            image: "https://via.placeholder.com/250x200"
        }
    ],
    deals: [
        {
            id: 5,
            title: "Bluetooth Speaker",
            price: 49.99,
            oldPrice: 79.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 6,
            title: "Fitness Tracker Watch",
            price: 79.99,
            oldPrice: 99.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 7,
            title: "Wireless Keyboard & Mouse Combo",
            price: 39.99,
            oldPrice: 59.99,
            image: "https://via.placeholder.com/250x200"
        },
        {
            id: 8,
            title: "Portable Power Bank 20000mAh",
            price: 29.99,
            oldPrice: 49.99,
            image: "https://via.placeholder.com/250x200"
        }
    ]
};

// Cart functionality
let cart = [];

// DOM Elements
const featuredProductsGrid = document.getElementById('featured-products');
const dealsProductsGrid = document.getElementById('deals-products');
const cartCount = document.getElementById('cart-count');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const newsletterForm = document.getElementById('newsletter-form');
const currentYear = document.getElementById('current-year');

// Display products
function displayProducts() {
    // Clear existing products
    featuredProductsGrid.innerHTML = '';
    dealsProductsGrid.innerHTML = '';
    
    // Display featured products
    products.featured.forEach(product => {
        const productCard = createProductCard(product);
        featuredProductsGrid.appendChild(productCard);
    });
    
    // Display deals products
    products.deals.forEach(product => {
        const productCard = createProductCard(product);
        dealsProductsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const priceHTML = product.oldPrice 
        ? `<div class="product-price">$${product.price} <span class="product-old-price">$${product.oldPrice}</span></div>`
        : `<div class="product-price">$${product.price}</div>`;
    
    card.innerHTML = `
        <div class="product-image" style="background-image: url('${product.image}')"></div>
        <div class="product-info">
            <div class="product-title">${product.title}</div>
            ${priceHTML}
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    return card;
}

// Add to cart function
function addToCart(productId) {
    // Find product in either featured or deals
    const allProducts = [...products.featured, ...products.deals];
    const product = allProducts.find(p => p.id === productId);
    
    if (product) {
        cart.push(product);
        updateCartCount();
        alert(`${product.title} added to cart!`);
    }
}

// Update cart count display
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Search functionality
function handleSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        // In a real app, you would filter products and display results
        searchInput.value = '';
    }
}

// Newsletter subscription
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        alert(`Thank you for subscribing with ${email}!`);
        e.target.reset();
    }
}

// Set current year in footer
function setCurrentYear() {
    const year = new Date().getFullYear();
    currentYear.textContent = year;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    setCurrentYear();
    
    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Search button
    searchBtn.addEventListener('click', handleSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
});