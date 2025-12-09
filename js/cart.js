// Cart page logic

document.addEventListener('DOMContentLoaded', function() {
    
    function displayCart() {
        const cart = getCart();
        const container = document.getElementById('cart-items-container');
        const emptyCart = document.getElementById('empty-cart');
        const cartSummary = document.getElementById('cart-summary');
        
        if (cart.length === 0) {
            container.innerHTML = '';
            emptyCart.classList.remove('d-none');
            cartSummary.classList.add('d-none');
            return;
        }
        
        emptyCart.classList.add('d-none');
        cartSummary.classList.remove('d-none');
        container.innerHTML = '';
        
        cart.forEach(item => {
            const product = snacksData.find(p => p.id === item.id);
            if (!product) return;
            
            const itemTotal = (product.price * item.quantity).toFixed(2);
            
            const cartItemHTML = `
                <div class="card mb-3 cart-item shadow-sm">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-md-2">
                                <div class="cart-item-image">${product.icon}</div>
                            </div>
                            <div class="col-md-4">
                                <h5 class="mb-1">${product.name}</h5>
                                <p class="text-muted small mb-1">${product.country} • ${product.category}</p>
                                <span class="text-primary fw-bold">${product.price.toFixed(2)}</span>
                            </div>
                            <div class="col-md-3">
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, -1)">
                                        <i class="bi bi-dash"></i>
                                    </button>
                                    <span class="fw-bold">${item.quantity}</span>
                                    <button class="quantity-btn" onclick="changeQuantity(${product.id}, 1)">
                                        <i class="bi bi-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="fw-bold fs-5">${itemTotal}</div>
                            </div>
                            <div class="col-md-1 text-end">
                                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCartAndRefresh(${product.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            container.innerHTML += cartItemHTML;
        });
        
        updateCartSummary();
    }

    function updateCartSummary() {
        const cart = getCart();
        let subtotal = 0;
        
        cart.forEach(item => {
            const product = snacksData.find(p => p.id === item.id);
            if (product) {
                subtotal += product.price * item.quantity;
            }
        });
        
        const shipping = subtotal >= 50 ? 0 : 5.99;
        const tax = subtotal * 0.08;
        const total = subtotal + shipping + tax;
        
        document.getElementById('subtotal').textContent = ' + subtotal.toFixed(2);
        document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : ' + shipping.toFixed(2);
        document.getElementById('tax').textContent = ' + tax.toFixed(2);
        document.getElementById('total').textContent = ' + total.toFixed(2);
    }

    // Make functions globally available
    window.changeQuantity = function(productId, change) {
        const cart = getCart();
        const item = cart.find(i => i.id === productId);
        
        if (item) {
            const newQuantity = item.quantity + change;
            updateQuantity(productId, newQuantity);
            displayCart();
        }
    };

    window.removeFromCartAndRefresh = function(productId) {
        removeFromCart(productId);
        displayCart();
    };

    // Checkout button handler
    document.getElementById('checkout-btn').addEventListener('click', function() {
        const cart = getCart();
        
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'danger');
            return;
        }
        
        // Simulate checkout
        showToast('Thank you for your order! (This is a demo)', 'success');
        
        // Clear cart after 2 seconds
        setTimeout(() => {
            window.cart = [];
            updateCartCount();
            displayCart();
        }, 2000);
    });

    // Initialize cart display
    displayCart();
    updateCartCount();
});