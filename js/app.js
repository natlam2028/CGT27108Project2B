// Cart and Favorites Management

// Get cart from memory
window.getCart = function() {
    if (!window.cart) {
        window.cart = [];
    }
    return window.cart;
};

// Save cart to memory
window.saveCart = function(cart) {
    window.cart = cart;
    updateCartCount();
};

// Get favorites from memory
window.getFavorites = function() {
    if (!window.favorites) {
        window.favorites = [];
    }
    return window.favorites;
};

// Save favorites to memory
window.saveFavorites = function(favorites) {
    window.favorites = favorites;
};

// Add to cart
window.addToCart = function(productId) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    
    saveCart(cart);
    showToast('Added to cart!', 'success');
};

// Remove from cart
window.removeFromCart = function(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    showToast('Removed from cart', 'info');
};

// Update quantity
window.updateQuantity = function(productId, newQuantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }
};

// Toggle favorite
window.toggleFavorite = function(productId) {
    let favorites = getFavorites();
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
        showToast('Removed from favorites', 'info');
    } else {
        favorites.push(productId);
        showToast('Added to favorites!', 'success');
    }
    
    saveFavorites(favorites);
    
    // Update heart icons on current page
    updateFavoriteIcons();
};

// Update favorite icons
window.updateFavoriteIcons = function() {
    const favorites = getFavorites();
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const productId = parseInt(btn.dataset.productId);
        if (favorites.includes(productId)) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="bi bi-heart"></i>';
        }
    });
};

// Update cart count in navbar
window.updateCartCount = function() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
};

// Create snack card HTML
window.createSnackCard = function(snack) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(snack.id);
    
    return `
        <div class="col-md-6 col-lg-4 fade-in">
            <div class="card snack-card shadow-sm">
                <div class="position-relative">
                    <div class="snack-image">${snack.icon}</div>
                    <span class="badge bg-primary country-badge">${snack.country}</span>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" 
                            data-product-id="${snack.id}" 
                            onclick="toggleFavorite(${snack.id})">
                        <i class="bi bi-heart${isFavorite ? '-fill' : ''}"></i>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${snack.name}</h5>
                    <p class="card-text text-muted small">${snack.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fs-4 fw-bold text-primary">${snack.price.toFixed(2)}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${snack.id})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                    <div class="mt-2">
                        <span class="badge bg-light text-dark">${snack.category}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Show toast notification
window.showToast = function(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.style.cssText = 'position: fixed; top: 80px; right: 20px; z-index: 9999;';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-success' : type === 'danger' ? 'bg-danger' : 'bg-info';
    
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateFavoriteIcons();
});