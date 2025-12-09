document.addEventListener('DOMContentLoaded', () => {
    // Sample snack data
    const snacks = [
        {id: 1, name: "Chocolate Mochi", country: "Japan", price: 4.5, type: "Sweet", image: "https://via.placeholder.com/200?text=Mochi"},
        {id: 2, name: "Spicy Chips", country: "USA", price: 3.0, type: "Spicy", image: "https://via.placeholder.com/200?text=Chips"},
        {id: 3, name: "Honey Cookies", country: "France", price: 6.0, type: "Sweet", image: "https://via.placeholder.com/200?text=Cookies"},
        {id: 4, name: "Seaweed Snack", country: "Korea", price: 2.5, type: "Salty", image: "https://via.placeholder.com/200?text=Seaweed"}
    ];

    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Render snacks dynamically
    function renderSnacks(snackList, containerId, showRemove = false) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';
        snackList.forEach(snack => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-4';
            col.innerHTML = `
                <div class="card h-100">
                    <img src="${snack.image}" class="card-img-top" alt="${snack.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${snack.name}</h5>
                        <p class="card-text">$${snack.price} • ${snack.country} • ${snack.type}</p>
                        <button class="btn ${showRemove ? 'btn-danger' : 'btn-outline-danger'} mt-auto" data-id="${snack.id}">
                            ${showRemove ? 'Remove' : (favorites.find(f => f.id === snack.id) ? 'Remove from Favorites' : 'Add to Favorites')}
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(col);
        });

        // Add button functionality
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const snackId = parseInt(btn.dataset.id);
                if(showRemove) {
                    favorites = favorites.filter(f => f.id !== snackId);
                } else {
                    const existing = favorites.find(f => f.id === snackId);
                    if(existing) {
                        favorites = favorites.filter(f => f.id !== snackId);
                    } else {
                        const snackToAdd = snacks.find(s => s.id === snackId);
                        favorites.push(snackToAdd);
                    }
                }
                localStorage.setItem('favorites', JSON.stringify(favorites));
                renderSnacks(snackList, containerId, showRemove);
            });
        });
    }

    // Apply filters
    function applyFilters() {
        const country = document.getElementById('filterCountry')?.value;
        const price = document.getElementById('filterPrice')?.value;
        const type = document.getElementById('filterType')?.value;

        let filtered = snacks.slice();

        if(country && country !== "Filter by Country") filtered = filtered.filter(s => s.country === country);
        if(type && type !== "Filter by Type") filtered = filtered.filter(s => s.type === type);
        if(price && price !== "Filter by Price") {
            if(price === "Under $5") filtered = filtered.filter(s => s.price < 5);
            else if(price === "$5-$10") filtered = filtered.filter(s => s.price >= 5 && s.price <= 10);
            else if(price === "Over $10") filtered = filtered.filter(s => s.price > 10);
        }

        renderSnacks(filtered, 'snackGrid');
    }

    // Initial render
    renderSnacks(snacks, 'snackGrid');
    renderSnacks(favorites, 'favoritesGrid', true);

    const applyBtn = document.getElementById('applyFilters');
    if(applyBtn) applyBtn.addEventListener('click', applyFilters);
});
