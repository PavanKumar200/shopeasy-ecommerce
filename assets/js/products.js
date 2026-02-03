// ========== PRODUCTS DATA ==========
const productsData = [
    { id: 1, name: "Wireless Headphones", category: "electronics", price: 2499, rating: 4, image: "assets/img/products/product-1.jpg" },
    { id: 2, name: "Smart Watch", category: "electronics", price: 4999, rating: 5, image: "assets/img/products/product-2.jpg" },
    { id: 3, name: "Running Shoes", category: "sports", price: 3299, rating: 4, image: "assets/img/products/product-3.jpg" },
    { id: 4, name: "Backpack", category: "fashion", price: 1799, rating: 4, image: "assets/img/products/product-4.jpg" },
    { id: 5, name: "Bluetooth Speaker", category: "electronics", price: 1999, rating: 5, image: "assets/img/products/product-5.jpg" },
    { id: 6, name: "Yoga Mat", category: "sports", price: 899, rating: 4, image: "assets/img/products/product-6.jpg" },
    { id: 7, name: "Laptop Bag", category: "fashion", price: 2299, rating: 4, image: "assets/img/products/product-7.jpg" },
    { id: 8, name: "Desk Lamp", category: "home", price: 1299, rating: 3, image: "assets/img/products/product-8.jpg" },
    { id: 9, name: "Coffee Maker", category: "home", price: 3499, rating: 5, image: "assets/img/products/product-9.jpg" },
    { id: 10, name: "Dumbbells Set", category: "sports", price: 2999, rating: 4, image: "assets/img/products/product-10.jpg" },
    { id: 11, name: "Sunglasses", category: "fashion", price: 1499, rating: 4, image: "assets/img/products/product-11.jpg" },
    { id: 12, name: "USB Charger", category: "electronics", price: 599, rating: 3, image: "assets/img/products/product-12.jpg" }
];

let filteredProducts = [...productsData];

// ========== RENDER PRODUCTS ==========
function renderProducts(products) {
    const productsList = $('#productsList');
    $('#productCount').text(products.length);
    
    if (products.length === 0) {
        productsList.html('<div class="col-12 text-center py-5"><p class="text-muted">No products found</p></div>');
        return;
    }
    
    let html = '';
    products.forEach(product => {
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        html += `
            <div class="col-md-6 col-lg-4">
                <div class="card border-0 shadow-sm h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" onerror="this.src='https://placehold.co/300x200/cccccc/333333?text=${product.name}'">
                    <div class="card-body">
                        <span class="badge bg-secondary mb-2">${product.category}</span>
                        <h5 class="card-title">${product.name}</h5>
                        <div class="text-warning mb-2">${stars}</div>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="h4 text-primary mb-0">₹${product.price.toLocaleString()}</p>
                            <a href="product-view.html?id=${product.id}" class="btn btn-primary btn-sm">View</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    productsList.html(html);
}

// ========== APPLY FILTERS ==========
function applyFilters() {
    // Get selected categories
    const selectedCategories = [];
    $('.category-filter:checked').each(function() {
        selectedCategories.push($(this).val());
    });
    
    // Get price range
    const minPrice = parseInt($('#minPrice').val()) || 0;
    const maxPrice = parseInt($('#maxPrice').val()) || parseInt($('#priceRange').val()) || 10000;
    
    // Filter products
    filteredProducts = productsData.filter(product => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const priceMatch = product.price >= minPrice && product.price <= maxPrice;
        return categoryMatch && priceMatch;
    });
    
    renderProducts(filteredProducts);
}

// ========== RESET FILTERS ==========
function resetFilters() {
    $('.category-filter').prop('checked', false);
    $('#minPrice').val('');
    $('#maxPrice').val('');
    $('#priceRange').val(10000);
    $('#rangeValue').text('₹10,000');
    filteredProducts = [...productsData];
    renderProducts(filteredProducts);
}

// ========== SORT PRODUCTS ==========
function sortProducts(sortBy) {
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    renderProducts(filteredProducts);
}

// ========== UPDATE PRICE RANGE ==========
function updatePriceRange(value) {
    $('#rangeValue').text('₹' + parseInt(value).toLocaleString());
    $('#maxPrice').val(value);
}

// ========== INITIALIZE ==========
$(document).ready(function() {
    // Render all products on page load
    renderProducts(productsData);
    
    // Apply filters button
    $('#applyFilters').click(function() {
        applyFilters();
    });
    
    // Reset filters button
    $('#resetFilters').click(function() {
        resetFilters();
    });
    
    // Sort dropdown
    $('#sortSelect').change(function() {
        sortProducts($(this).val());
    });
    
    // Price range slider
    $('#priceRange').on('input', function() {
        updatePriceRange($(this).val());
    });
    
    // Real-time category filter (optional)
    $('.category-filter').change(function() {
        applyFilters();
    });
});
