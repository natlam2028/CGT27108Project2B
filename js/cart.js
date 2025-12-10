// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
    updateCartBadge();
});

// Render cart items
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (cart.length === 0) {
        emptyCart.classList.remove('d-none');
        cartContent.classList.add('d-none');
        return;
    }

    emptyCart.classList.add('d-none');
    cartContent.classList.remove('d-none');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item mb-4 pb-4 border-bottom" data-id="${item.id}">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <div class="product-image-small d-flex align-items-center justify-content-center" style="height: 80px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; overflow: hidden;">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid" style="max-height: 100%; max-width: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/80x80?text=No+Image'">
                    </div>
                </div>
                <div class="col-md-4">
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">
                        <i class="bi bi-geo-alt"></i> ${item.country} | 
                        <span class="text-capitalize">${item.category}</span>
                    </small>
                </div>
                <div class="col-md-2">
                    <span class="text-muted">Price:</span>
                    <strong class="d-block">$${item.price.toFixed(2)}</strong>
                </div>
                <div class="col-md-2">
                    <label class="text-muted small">Quantity:</label>
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.id}, -1)">
                            <i class="bi bi-dash"></i>
                        </button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" min="1" 
                               onchange="updateQuantityInput(${item.id}, this.value)" id="qty-${item.id}">
                        <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${item.id}, 1)">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-md-2 text-end">
                    <strong class="text-primary">$${(item.price * item.quantity).toFixed(2)}</strong>
                    <br>
                    <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    updateOrderSummary();
}

// Update quantity
function updateQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

// Update quantity from input
function updateQuantityInput(productId, value) {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
        renderCart(); // Reset to current value
        return;
    }
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartBadge();
    }
}

// Remove from cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartBadge();
    showNotification('Item removed from cart');
}

// Update order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5.99;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Checkout button handler
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            alert('Thank you for your order! This is a demo site, so no actual purchase will be made.');
            // In a real application, you would redirect to a checkout page or payment gateway
        });
    }
});

