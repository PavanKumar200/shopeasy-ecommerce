const productsData = [
    { id: 1, name: "Wireless Headphones", category: "electronics", price: 2499, originalPrice: 3999, rating: 4, image: "assets/img/products/product-1.jpg", description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality.", features: ["Active Noise Cancellation", "30-hour battery life", "Bluetooth 5.0", "Comfortable over-ear design", "Built-in microphone"] },
    { id: 2, name: "Smart Watch", category: "electronics", price: 4999, originalPrice: 6999, rating: 5, image: "assets/img/products/product-2.jpg", description: "Advanced smartwatch with fitness tracking, heart rate monitoring, GPS, and water resistance.", features: ["Heart rate monitor", "GPS tracking", "Water resistant (5ATM)", "7-day battery life", "Sleep tracking"] },
    { id: 3, name: "Running Shoes", category: "sports", price: 3299, originalPrice: 4499, rating: 4, image: "assets/img/products/product-3.jpg", description: "Lightweight running shoes designed for maximum comfort and performance.", features: ["Breathable mesh material", "Cushioned EVA sole", "Lightweight design", "Anti-slip rubber outsole", "Available in multiple sizes"] },
    { id: 4, name: "Backpack", category: "fashion", price: 1799, originalPrice: 2499, rating: 4, image: "assets/img/products/product-4.jpg", description: "Stylish and durable backpack with multiple compartments.", features: ["Water-resistant fabric", "Padded laptop compartment (15.6\")", "Multiple pockets", "Ergonomic design", "USB charging port"] },
    { id: 5, name: "Bluetooth Speaker", category: "electronics", price: 1999, originalPrice: 2999, rating: 5, image: "assets/img/products/product-5.jpg", description: "Portable Bluetooth speaker with powerful bass.", features: ["360° sound", "Waterproof (IPX7)", "12-hour battery", "Built-in microphone", "Compact design"] },
    { id: 6, name: "Yoga Mat", category: "sports", price: 899, originalPrice: 1299, rating: 4, image: "assets/img/products/product-6.jpg", description: "Premium non-slip yoga mat with extra cushioning.", features: ["Non-slip surface", "6mm thickness", "Eco-friendly material", "Easy to clean", "Carrying strap"] },
    { id: 7, name: "Laptop Bag", category: "fashion", price: 2299, originalPrice: 3299, rating: 4, image: "assets/img/products/product-7.jpg", description: "Professional laptop bag with padded compartment.", features: ["Fits 15.6\" laptops", "Water-resistant", "Multiple compartments", "Padded shoulder strap", "Durable construction"] },
    { id: 8, name: "Desk Lamp", category: "home", price: 1299, originalPrice: 1899, rating: 3, image: "assets/img/products/product-8.jpg", description: "Modern LED desk lamp with adjustable brightness.", features: ["LED technology", "Adjustable brightness", "3 color modes", "USB powered", "Flexible arm"] },
    { id: 9, name: "Coffee Maker", category: "home", price: 3499, originalPrice: 4999, rating: 5, image: "assets/img/products/product-9.jpg", description: "Automatic coffee maker with programmable settings.", features: ["12-cup capacity", "Programmable timer", "Auto shut-off", "Reusable filter", "Keep-warm function"] },
    { id: 10, name: "Dumbbells Set", category: "sports", price: 2999, originalPrice: 3999, rating: 4, image: "assets/img/products/product-10.jpg", description: "Adjustable dumbbell set perfect for home workouts.", features: ["Adjustable weight (2.5kg - 12.5kg)", "Rubber coated", "Anti-roll design", "Comfortable grip", "Storage case"] },
    { id: 11, name: "Sunglasses", category: "fashion", price: 1499, originalPrice: 2299, rating: 4, image: "assets/img/products/product-11.jpg", description: "Stylish polarized sunglasses with UV protection.", features: ["UV400 protection", "Polarized lenses", "Lightweight frame", "Anti-glare", "Comes with case"] },
    { id: 12, name: "USB Charger", category: "electronics", price: 599, originalPrice: 999, rating: 3, image: "assets/img/products/product-12.jpg", description: "Fast charging USB adapter with multiple ports.", features: ["4 USB ports", "Fast charging (3A)", "Compact design", "Overcharge protection", "Universal compatibility"] }
];

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id')) || 1;
const currentProduct = productsData.find(p => p.id === productId) || productsData[0];

let quantity = 1;

// Render Product Details
function renderProductView() {
    $('#mainImage').attr('src', currentProduct.image);
    $('.product-thumbnail').attr('src', currentProduct.image);
    
    $('#productCategory').text(currentProduct.category);
    $('#productTitle').text(currentProduct.name);
    
    const stars = '<i class="fas fa-star"></i>'.repeat(currentProduct.rating) + '<i class="far fa-star"></i>'.repeat(5 - currentProduct.rating);
    $('#ratingStars').html(stars);
    
    $('#currentPrice').text('₹' + currentProduct.price.toLocaleString());
    $('#originalPrice').text('₹' + currentProduct.originalPrice.toLocaleString());
    
    const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
    $('#discountBadge').text(discount + '% OFF');
    
    $('#productDescription').text(currentProduct.description);
    
    let featuresHtml = '';
    currentProduct.features.forEach(feature => {
        featuresHtml += `<li class="mb-2"><i class="fas fa-check text-success me-2"></i>${feature}</li>`;
    });
    $('#featuresList').html(featuresHtml);
}

// Render Related Products
function renderRelatedProducts() {
    const related = productsData.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
    
    let html = '';
    related.forEach(product => {
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        html += `
            <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <div class="text-warning mb-2">${stars}</div>
                        <p class="h5 text-primary mb-3">₹${product.price.toLocaleString()}</p>
                        <a href="product-view.html?id=${product.id}" class="btn btn-primary w-100">View</a>
                    </div>
                </div>
            </div>
        `;
    });
    $('#relatedProductsGrid').html(html);
}

// Thumbnail click
$('.product-thumbnail').click(function() {
    $('.product-thumbnail').removeClass('active');
    $(this).addClass('active');
    $('#mainImage').attr('src', $(this).attr('src'));
});

// Quantity controls
$('#decreaseQty').click(function() {
    if (quantity > 1) {
        quantity--;
        $('#quantity').val(quantity);
    }
});

$('#increaseQty').click(function() {
    quantity++;
    $('#quantity').val(quantity);
});

// Add to Cart
$('#addToCartBtn').click(function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${currentProduct.name} added to cart!`);
});

// Buy Now
$('#buyNowBtn').click(function() {
    $('#addToCartBtn').click();
    setTimeout(() => { window.location.href = 'cart.html'; }, 500);
});

// Initialize
$(document).ready(function() {
    renderProductView();
    renderRelatedProducts();
});
