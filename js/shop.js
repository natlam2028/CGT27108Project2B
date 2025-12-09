// Shop page filtering and sorting logic

let currentFilters = {
    search: '',
    country: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    sort: 'name-asc'
};

// Initialize shop page
function initShop() {
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');
    
    if (countryParam) {
        currentFilters.country = countryParam;
        document.getElementById('country-filter').value = countryParam;
    }
    
    // Add event listeners
    document.getElementById('search-input').addEventListener('input', handleFilterChange);
    document.getElementById('country-filter').addEventListener('change', handleFilterChange);
    document.getElementById('category-filter').addEventListener('change', handleFilterChange);
    document.getElementById('min-price').addEventListener('input', handleFilterChange);
    document.getElementById('max-price').addEventListener('input', handleFilterChange);
    document.getElementById('sort-filter').addEventListener('change', handleFilterChange);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
    
    // Initial render
    renderProducts();
}

// Handle filter changes
function handleFilterChange() {
    currentFilters.search = document.getElementById('search-input').value.toLowerCase();
    currentFilters.country = document.getElementById('country-filter').value;
    currentFilters.category = document.getElementById('category-filter').value;
    currentFilters.minPrice = parseFloat(document.getElementById('min-price').value) || null;
    currentFilters.maxPrice = parseFloat(document.getElementById('max-price').value) || null;
    currentFilters.sort = document.getElementById('sort-filter').value;
    
    renderProducts();
}

// Clear all filters
function clearFilters() {
    currentFilters = {
        search: '',
        country: '',
        category: '',
        minPrice: null,
        maxPrice: null,
        sort: 'name-asc'
    };
    
    document.getElementById('search-input').value = '';
    document.getElementById('country-filter').value = '';
    document.getElementById('category-filter').value = '';
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    document.getElementById('sort-filter').value = 'name-asc';
    
    // Clear URL parameters
    window.history.pushState({}, '', 'shop.html');
    
    renderProducts();
}

// Filter products
function filterProducts(products) {
    return products.filter(product => {
        // Search filter
        if (currentFilters.search) {
            const searchLower = currentFilters.search;
            const matchesSearch = 
                product.name.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower) ||
                product.country.toLowerCase().includes(searchLower);
            
            if (!matchesSearch) return false;
        }
        
        // Country filter
        if (currentFilters.country && product.country !== currentFilters.country) {
            return false;
        }
        
        // Category filter
        if (currentFilters.category && product.category !== currentFilters.category) {
            return false;
        }
        
        // Price range filter
        if (currentFilters.minPrice !== null && product.price < currentFilters.minPrice) {
            return false;
        }
        
        if (currentFilters.maxPrice !== null && product.price > currentFilters.maxPrice) {
            return false;
        }
        
        return true;
    });
}

// Sort products
function sortProducts(products) {
    const sorted = [...products];
    
    switch (currentFilters.sort) {
        case 'name-asc':
            sorted.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
    }
    
    return sorted;
}

// Render products
function renderProducts() {
    const container = document.getElementById('products-container');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    // Filter and sort
    let products = filterProducts(snacksData);
    products = sortProducts(products);
    
    // Update results count
    resultsCount.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;
    
    // Show/hide no results message
    if (products.length === 0) {
        container.classList.add('d-none');
        noResults.classList.remove('d-none');
        return;
    }
    
    container.classList.remove('d-none');
    noResults.classList.add('d-none');
    
    // Render products
    container.innerHTML = '';
    products.forEach(product => {
        container.innerHTML += createSnackCard(product);
    });
    
    // Update favorite icons after rendering
    updateFavoriteIcons();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShop);
} else {
    initShop();
}