// FILE: scripts.js
// SnackWave Archive + Favorites (no cart/checkout)

// Demo product data
const PRODUCTS = [
  {id:1,name:'Wasabi Chips',country:'Japan',category:'chips',price:4.5,img:'images/p1.jpg',desc:'Crispy wasabi flavored chips.'},
  {id:2,name:'Pocky Chocolate',country:'Japan',category:'cookies',price:3.0,img:'images/p2.jpg',desc:'Classic chocolate biscuit sticks.'},
  {id:3,name:'Shrimp Crackers',country:'Korea',category:'chips',price:5.0,img:'images/p3.jpg',desc:'Savory shrimp flavored crackers.'},
  {id:4,name:'Mango Gummies',country:'Thailand',category:'candy',price:2.5,img:'images/p4.jpg',desc:'Sweet mango gummy candies.'},
  {id:5,name:'Matcha Cookies',country:'Japan',category:'cookies',price:6.0,img:'images/p5.jpg',desc:'Green tea sandwich cookies.'}
];

// Favorite utilities using localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')||'[]');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
  updateFavoritesCount();
}

function toggleFavorite(id) {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(x=>x!==id);
  } else {
    favs.push(id);
  }
  saveFavorites(favs);
}

// Update favorites badge
function updateFavoritesCount() {
  const count = getFavorites().length;
  document.querySelectorAll('#favorites-count').forEach(el=>el.textContent=count);
}

// Render product card
function renderProductCard(p){
  const favs = getFavorites();
  const isFav = favs.includes(p.id);
  return `
  <div class="col-sm-6 col-md-4">
    <div class="card product-card p-3 h-100">
      <img src="${p.img}" class="prod-img mx-auto d-block" alt="${p.name}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${p.name}</h5>
        <p class="text-muted mb-2 small">${p.country} • ${p.category}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <strong>$${p.price.toFixed(2)}</strong>
          <button class="btn btn-sm btn-outline-primary fav-btn" data-id="${p.id}">
            ${isFav ? '★' : '☆'}
          </button>
        </div>
      </div>
    </div>
  </div>`;
}

// Populate home page popular snacks
function populateHome(){
  const el = document.getElementById('home-products');
  if (!el) return;
  const picks = PRODUCTS.slice(0,4);
  el.innerHTML = picks.map(renderProductCard).join('');
}

// Populate browse / shop page
function populateProducts(){
  const list = document.getElementById('product-list');
  if(!list) return;

  const countrySel = document.getElementById('filter-country');
  const cats = [...new Set(PRODUCTS.map(p=>p.country))];
  countrySel.innerHTML = '<option value="all">All countries</option>' + cats.map(c=>`<option>${c}</option>`).join('');

  applyFilters();
}

// Apply search + filters
function applyFilters(){
  const list = document.getElementById('product-list');
  if(!list) return;

  const country = document.getElementById('filter-country')?.value || 'all';
  const cat = document.getElementById('filter-category')?.value || 'all';
  const term = document.getElementById('search-term')?.value.toLowerCase() || '';

  let out = PRODUCTS.filter(p=>{
    if(country!=='all' && p.country!==country) return false;
    if(cat!=='all' && p.category!==cat) return false;
    if(term && !p.name.toLowerCase().includes(term)) return false;
    return true;
  });

  document.getElementById('result-count')?.textContent = out.length;
  list.innerHTML = out.map(renderProductCard).join('');
}

// Populate favorites page
function populateFavorites(){
  const el = document.getElementById('favorites-list');
  if(!el) return;
  const favs = getFavorites();
  if(!favs.length){
    el.innerHTML = '<div class="alert alert-light">No favorites yet. <a href="shop.html">Browse snacks</a></div>';
    return;
  }
  const out = PRODUCTS.filter(p=>favs.includes(p.id));
  el.innerHTML = out.map(renderProductCard).join('');
}

// Global binder for favorite buttons
function globalBinder(){
  document.body.addEventListener('click', e=>{
    if(e.target.matches('.fav-btn')){
      const id = Number(e.target.dataset.id);
      toggleFavorite(id);
      // re-render depending on page
      populateHome(); populateProducts(); populateFavorites();
    }
  });
}

// Initialize page
window.addEventListener('DOMContentLoaded', ()=>{
  updateFavoritesCount();
  populateHome();
  populateProducts();
  populateFavorites();
  globalBinder();

  document.getElementById('apply-filters')?.addEventListener('click', applyFilters);
  document.getElementById('clear-filters')?.addEventListener('click', ()=>{
    document.getElementById('filter-country').value='all';
    document.getElementById('filter-category').value='all';
    document.getElementById('search-term').value='';
    applyFilters();
  });
});

// Expose PRODUCTS for debugging
window.PRODUCTS = PRODUCTS;
