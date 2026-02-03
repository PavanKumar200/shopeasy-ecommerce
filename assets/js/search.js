const productsData = [
    { id: 1, name: "Wireless Headphones", category: "electronics", price: 2499, rating: 4, image: "assets/img/products/product-1.jpg", description: "Premium wireless headphones with noise cancellation" },
    { id: 2, name: "Smart Watch", category: "electronics", price: 4999, rating: 5, image: "assets/img/products/product-2.jpg", description: "Advanced smartwatch with fitness tracking" },
    { id: 3, name: "Running Shoes", category: "sports", price: 3299, rating: 4, image: "assets/img/products/product-3.jpg", description: "Lightweight running shoes for comfort" },
    { id: 4, name: "Backpack", category: "fashion", price: 1799, rating: 4, image: "assets/img/products/product-4.jpg", description: "Stylish and durable backpack" },
    { id: 5, name: "Bluetooth Speaker", category: "electronics", price: 1999, rating: 5, image: "assets/img/products/product-5.jpg", description: "Portable speaker with powerful bass" },
    { id: 6, name: "Yoga Mat", category: "sports", price: 899, rating: 4, image: "assets/img/products/product-6.jpg", description: "Premium non-slip yoga mat" },
    { id: 7, name: "Laptop Bag", category: "fashion", price: 2299, rating: 4, image: "assets/img/products/product-7.jpg", description: "Professional laptop bag with padding" },
    { id: 8, name: "Desk Lamp", category: "home", price: 1299, rating: 3, image: "assets/img/products/product-8.jpg", description: "LED desk lamp with adjustable brightness" },
    { id: 9, name: "Coffee Maker", category: "home", price: 3499, rating: 5, image: "assets/img/products/product-9.jpg", description: "Automatic coffee maker" },
    { id: 10, name: "Dumbbells Set", category: "sports", price: 2999, rating: 4, image: "assets/img/products/product-10.jpg", description: "Adjustable dumbbell set" },
    { id: 11, name: "Sunglasses", category: "fashion", price: 1499, rating: 4, image: "assets/img/products/product-11.jpg", description: "Stylish polarized sunglasses" },
    { id: 12, name: "USB Charger", category: "electronics", price: 599, rating: 3, image: "assets/img/products/product-12.jpg", description: "Fast charging USB adapter" }
];

// Search Products
function searchProducts(query) {
    if (!query || query.trim() === '') {
        $('#searchInfo').html('');
        $('#searchResults').html(`
            <div class="col-12 text-center py-5">
                <i class="fas fa-search fa-4x text-muted mb-3"></i>
                <p class="text-muted">Enter a search term to find products</p>
            </div>
        `);
        return;
    }
    
    const searchTerm = query.toLowerCase();
    const results = productsData.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    
    displayResults(results, query);
}

// Display Results
function displayResults(results, query) {
    const searchInfo = $('#searchInfo');
    const searchResults = $('#searchResults');
    
    if (results.length === 0) {
        searchInfo.html(`
            <div class="alert alert-warning">
                <i class="fas fa-exclamation-triangle me-2"></i>
                No products found for "<strong>${query}</strong>"
            </div>
        `);
        searchResults.html(`
            <div class="col-12 text-center py-5">
                <i class="fas fa-box-open fa-4x text-muted mb-3"></i>
                <p class="text-muted">Try searching with different keywords</p>
            </div>
        `);
        return;
    }
    
    searchInfo.html(`
        <div class="alert alert-success">
            <i class="fas fa-check-circle me-2"></i>
            Found <strong>${results.length}</strong> product(s) for "<strong>${query}</strong>"
        </div>
    `);
    
    let html = '';
    results.forEach(product => {
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        html += `
            <div class="col-md-6 col-lg-3">
                <div class="card border-0 shadow-sm h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <span class="badge bg-secondary mb-2">${product.category}</span>
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-muted small">${product.description}</p>
                        <div class="text-warning mb-2">${stars}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="h5 text-primary mb-0">₹${product.price.toLocaleString()}</p>
                            <a href="product-view.html?id=${product.id}" class="btn btn-primary btn-sm">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    searchResults.html(html);
}

// Event Handlers
$(document).ready(function() {
    // Search button click
    $('#searchBtn').click(function() {
        const query = $('#searchInput').val();
        searchProducts(query);
    });
    
    // Enter key press
    $('#searchInput').keypress(function(e) {
        if (e.which === 13) {
            const query = $(this).val();
            searchProducts(query);
        }
    });
    
    // Popular search tags
    $('.search-tag').click(function() {
        const keyword = $(this).data('keyword');
        $('#searchInput').val(keyword);
        searchProducts(keyword);
    });
});
