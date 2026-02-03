let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Cart Items
function renderCart() {
    const cartItemsDiv = $('#cartItems');
    const cartCount = $('#cartCount');
    
    if (cart.length === 0) {
        cartItemsDiv.html(`
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `);
        cartCount.text('0');
        updateSummary();
        return;
    }
    
    cartCount.text(cart.length);
    
    let html = '';
    cart.forEach((item, index) => {
        html += `
            <div class="row border-bottom pb-3 mb-3 cart-item">
                <div class="col-md-2 col-3 mb-3">
                    <img src="${item.image}" class="img-fluid rounded" alt="${item.name}">
                </div>
                <div class="col-md-4 col-9">
                    <h6 class="mb-2">${item.name}</h6>
                    <p class="text-primary fw-bold mb-0">₹${item.price.toLocaleString()}</p>
                </div>
                <div class="col-md-3 col-6">
                    <div class="input-group input-group-sm">
                        <button class="btn btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
                <div class="col-md-2 col-4 text-end">
                    <p class="fw-bold mb-2">₹${(item.price * item.quantity).toLocaleString()}</p>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsDiv.html(html);
    updateSummary();
}

// Update Order Summary
function updateSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 999 ? 0 : 50) : 0;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    
    $('#subtotal').text('₹' + subtotal.toLocaleString());
    $('#shipping').text(shipping === 0 && subtotal > 0 ? 'FREE' : '₹' + shipping);
    $('#tax').text('₹' + tax.toLocaleString());
    $('#total').text('₹' + total.toLocaleString());
}

// Increase Quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Decrease Quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Remove Item
function removeItem(index) {
    if (confirm('Remove this item from cart?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Checkout
$('#checkoutBtn').click(function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    window.location.href = 'checkout.html';
});

// Initialize
$(document).ready(function() {
    renderCart();
});
