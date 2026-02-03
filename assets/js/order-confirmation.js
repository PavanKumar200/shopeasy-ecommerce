$(document).ready(function() {
    const lastOrder = JSON.parse(localStorage.getItem('lastOrder'));
    
    if (!lastOrder) {
        window.location.href = 'index.html';
        return;
    }
    
    // Populate order details
    $('#orderNumber').text(lastOrder.orderNumber);
    $('#orderDate').text(lastOrder.orderDate);
    $('#customerEmail').text(lastOrder.email);
    
    // Calculate estimated delivery (7 days from order date)
    const orderDate = new Date();
    const deliveryDate = new Date(orderDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    $('#deliveryDate').text(deliveryDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }));
    
    // Populate shipping address
    const addressHtml = `
        <p class="mb-1"><strong>${lastOrder.firstName} ${lastOrder.lastName}</strong></p>
        <p class="mb-1">${lastOrder.address}</p>
        ${lastOrder.address2 ? `<p class="mb-1">${lastOrder.address2}</p>` : ''}
        <p class="mb-1">${lastOrder.city}, ${lastOrder.state} ${lastOrder.zipcode}</p>
        <p class="mb-1">${lastOrder.country}</p>
        <p class="mb-1"><i class="fas fa-phone me-2"></i>${lastOrder.phone}</p>
        <p class="mb-0"><i class="fas fa-envelope me-2"></i>${lastOrder.email}</p>
    `;
    $('#shippingAddress').html(addressHtml);
});
