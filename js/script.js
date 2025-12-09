// Product Data
const products = [
    { id: 1, name: "Japanese Kit Kat Matcha", country: "Japan", price: 8.99, category: "chocolate", image: "images/logostill.svg" },
    { id: 2, name: "Korean Honey Butter Chips", country: "Korea", price: 6.99, category: "chips", image: "🍯" },
    { id: 3, name: "Mexican Takis Fuego", country: "Mexico", price: 4.99, category: "chips", image: "🌶️" },
    { id: 4, name: "British Cadbury Dairy Milk", country: "UK", price: 5.99, category: "chocolate", image: "🍫" },
    { id: 5, name: "Thai Shrimp Chips", country: "Thailand", price: 7.99, category: "chips", image: "🦐" },
    { id: 6, name: "German Haribo Gummy Bears", country: "Germany", price: 3.99, category: "candy", image: "🐻" },
    { id: 7, name: "French Macarons", country: "France", price: 12.99, category: "cookies", image: "🍪" },
    { id: 8, name: "Japanese Pocky Strawberry", country: "Japan", price: 5.99, category: "cookies", image: "🍓" },
    { id: 9, name: "American Oreo Cookies", country: "USA", price: 4.99, category: "cookies", image: "🍪" },
    { id: 10, name: "Korean Pepero", country: "Korea", price: 6.99, category: "cookies", image: "🍫" },
    { id: 11, name: "Japanese Calbee Chips", country: "Japan", price: 7.99, category: "chips", image: "🥔" },
    { id: 12, name: "Mexican Churritos", country: "Mexico", price: 3.99, category: "chips", image: "🌽" },
    { id: 13, name: "Thai Mango Sticky Rice Snack", country: "Thailand", price: 9.99, category: "candy", image: "🥭" },
    { id: 14, name: "German Ritter Sport", country: "Germany", price: 6.99, category: "chocolate", image: "🍫" },
    { id: 15, name: "French Bonne Maman Cookies", country: "France", price: 8.99, category: "cookies", image: "🍪" },
    { id: 16, name: "American Pop-Tarts", country: "USA", price: 5.99, category: "cookies", image: "🧁" },
    { id: 17, name: "Japanese Hi-Chew", country: "Japan", price: 4.99, category: "candy", image: "🍬" },
    { id: 18, name: "Korean Choco Pie", country: "Korea", price: 7.99, category: "cookies", image: "🍰" },
    { id: 19, name: "Thai Coconut Chips", country: "Thailand", price: 6.99, category: "chips", image: "🥥" },
    { id: 20, name: "British Walkers Crisps", country: "UK", price: 4.99, category: "chips", image: "🥔" },
    { id: 21, name: "Japanese Ramune Soda", country: "Japan", price: 5.99, category: "drinks", image: "🥤" },
    { id: 22, name: "Korean Banana Milk", country: "Korea", price: 4.99, category: "drinks", image: "🍌" },
    { id: 23, name: "Mexican Jarritos", country: "Mexico", price: 3.99, category: "drinks", image: "🍹" },
    { id: 24, name: "American Mountain Dew", country: "USA", price: 2.99, category: "drinks", image: "🥤" },
    { id: 25, name: "Japanese Almonds", country: "Japan", price: 11.99, category: "nuts", image: "🥜" },
    { id: 26, name: "Korean Roasted Seaweed", country: "Korea", price: 5.99, category: "chips", image: "🌿" },
    { id: 27, name: "Thai Cashew Nuts", country: "Thailand", price: 9.99, category: "nuts", image: "🥜" },
    { id: 28, name: "German Nutella", country: "Germany", price: 6.99, category: "chocolate", image: "🍫" },
    { id: 29, name: "French Madeleines", country: "France", price: 10.99, category: "cookies", image: "🍰" },
    { id: 30, name: "American Twizzlers", country: "USA", price: 3.99, category: "candy", image: "🍬" }
];

let filteredProducts = [...products];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('productsGrid')) {
        renderProducts(products);
        setupFilters();
        checkURLParams();
    }
    updateCartBadge();
});

// Check URL parameters for category filter
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category) {
        // Map URL category to checkbox values
        const categoryMap = {
            'international': null, // Show all
            'popular': null, // Could implement popularity logic
            'new': null // Could implement new arrivals logic
        };
        
        // For now, just scroll to products
        window.scrollTo({ top: document.getElementById('productsGrid').offsetTop - 100, behavior: 'smooth' });
    }
}

// Setup filter event listeners
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sortFilter = document.getElementById('sortFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');

    if (!searchInput) return; // Exit if not on products page

    // Search input
    searchInput.addEventListener('input', applyFilters);
    
    // Country filter
    countryFilter.addEventListener('change', applyFilters);
    
    // Price filter
    priceFilter.addEventListener('change', applyFilters);
    
    // Category filters
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
    
    // Sort filter
    sortFilter.addEventListener('change', applyFilters);
    
    // Clear filters
    clearFiltersBtn.addEventListener('click', clearFilters);
}

// Apply all filters
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sortFilter = document.getElementById('sortFilter');

    if (!searchInput) return; // Exit if not on products page

    const searchTerm = searchInput.value.toLowerCase();
    const selectedCountry = countryFilter.value;
    const selectedPrice = priceFilter.value;
    const selectedCategories = Array.from(categoryFilters).filter(cb => cb.checked).map(cb => cb.value);
    const sortOption = sortFilter.value;

    // Filter products
    filteredProducts = products.filter(product => {
        // Search filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        
        // Country filter
        const matchesCountry = !selectedCountry || product.country === selectedCountry;
        
        // Price filter
        let matchesPrice = true;
        if (selectedPrice) {
            if (selectedPrice === '20+') {
                matchesPrice = product.price >= 20;
            } else {
                const [min, max] = selectedPrice.split('-').map(Number);
                matchesPrice = product.price >= min && product.price <= max;
            }
        }
        
        // Category filter
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        return matchesSearch && matchesCountry && matchesPrice && matchesCategory;
    });

    // Sort products
    sortProducts(sortOption);
    
    // Render filtered products
    renderProducts(filteredProducts);
    
    // Update results count
    updateResultsCount();
}

// Sort products
function sortProducts(sortOption) {
    switch(sortOption) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Keep original order
            break;
    }
}

// Render products to grid
function renderProducts(productsToRender) {
    const productsGrid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!productsGrid) return; // Exit if not on products page
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = '';
        noResults.classList.remove('d-none');
        return;
    }
    
    noResults.classList.add('d-none');
    
    productsGrid.innerHTML = productsToRender.map(product => `
        <div class="col-md-6 col-lg-4">
            <div class="card product-card shadow-sm">
                <div class="product-image">
                    <span style="font-size: 4rem;">${product.image}</span>
                </div>
                <div class="card-body">
                    <span class="product-country">
                        <i class="bi bi-geo-alt"></i> ${product.country}
                    </span>
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-capitalize">${product.category}</p>
                    <div class="d-flex justify-content-between align-items-center mt-auto">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (!resultsCount) return; // Exit if not on products page
    
    const count = filteredProducts.length;
    const total = products.length;
    
    if (count === total) {
        resultsCount.textContent = `Showing all ${total} products`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${total} products`;
    }
}

// Clear all filters
function clearFilters() {
    const searchInput = document.getElementById('searchInput');
    const countryFilter = document.getElementById('countryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const sortFilter = document.getElementById('sortFilter');

    if (!searchInput) return; // Exit if not on products page

    searchInput.value = '';
    countryFilter.value = '';
    priceFilter.value = '';
    categoryFilters.forEach(cb => cb.checked = false);
    sortFilter.value = 'default';
    
    applyFilters();
}

// Add to cart function
function addToCart(productId) {
    // Simple cart functionality
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Update cart badge
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        if (badge.textContent.trim() === '0' || !isNaN(parseInt(badge.textContent))) {
            badge.textContent = totalItems;
        }
    });
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show position-fixed';
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}


