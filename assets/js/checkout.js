const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Order Items
function renderOrderItems() {
    const orderItemsDiv = $('#orderItems');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let html = '';
    cart.forEach(item => {
        html += `
            <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div class="d-flex align-items-center">
                    <img src="${item.image}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;" alt="${item.name}">
                    <div>
                        <p class="mb-0 small">${item.name}</p>
                        <small class="text-muted">x${item.quantity}</small>
                    </div>
                </div>
                <span class="fw-bold">₹${(item.price * item.quantity).toLocaleString()}</span>
            </div>
        `;
    });
    
    orderItemsDiv.html(html);
    updateCheckoutSummary();
}

// Update Summary
function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 50;
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + shipping + tax;
    
    $('#checkoutSubtotal').text('₹' + subtotal.toLocaleString());
    $('#checkoutShipping').text(shipping === 0 ? 'FREE' : '₹' + shipping);
    $('#checkoutTax').text('₹' + tax.toLocaleString());
    $('#checkoutTotal').text('₹' + total.toLocaleString());
}

// Form Submission
$('#checkoutForm').submit(function(e) {
    e.preventDefault();
    
    // Get form data
    const orderData = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        address: $('#address').val(),
        address2: $('#address2').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        zipcode: $('#zipcode').val(),
        country: $('#country').val(),
        notes: $('#notes').val(),
        items: cart,
        orderNumber: 'ORD' + Date.now(),
        orderDate: new Date().toLocaleDateString('en-IN')
    };
    
    // Save order to localStorage
    localStorage.setItem('lastOrder', JSON.stringify(orderData));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Redirect to confirmation page
    window.location.href = 'order-confirmation.html';
});

// Initialize
$(document).ready(function() {
    renderOrderItems();
});
