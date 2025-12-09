//<!-- FILE: scripts.js -->
// Minimal JavaScript for demo functionality (no backend)
const PRODUCTS = [
{id:1,name:'Wasabi Chips',country:'Japan',category:'chips',price:4.5,img:'images/p1.jpg',desc:'Crispy wasabi flavored chips.'},
{id:2,name:'Pocky Chocolate',country:'Japan',category:'cookies',price:3.0,img:'images/p2.jpg',desc:'Classic chocolate biscuit sticks.'},
{id:3,name:'Shrimp Crackers',country:'Korea',category:'chips',price:5.0,img:'images/p3.jpg',desc:'Savory shrimp flavored crackers.'},
{id:4,name:'Mango Gummies',country:'Thailand',category:'candy',price:2.5,img:'images/p4.jpg',desc:'Sweet mango gummy candies.'},
{id:5,name:'Matcha Cookies',country:'Japan',category:'cookies',price:6.0,img:'images/p5.jpg',desc:'Green tea sandwich cookies.'}
];


// Simple cart using localStorage
function getCart(){
return JSON.parse(localStorage.getItem('cart')||'{}');
}
function saveCart(c){
localStorage.setItem('cart',JSON.stringify(c));
updateNavCounts();
}
function addToCart(id, qty=1){
const cart = getCart();
cart[id] = (cart[id]||0)+Number(qty);
saveCart(cart);
showToast('Added to cart');
}
function setQty(id, qty){
const cart=getCart();
if(qty<=0) delete cart[id]; else cart[id]=Number(qty);
saveCart(cart);
}
function updateNavCounts(){
const cart=getCart();
const count=Object.values(cart).reduce((a,b)=>a+b,0);
document.querySelectorAll('#nav-cart-count, #nav-cart-count-2, #nav-cart-count-3').forEach(el=>{el.textContent=count});
}

// Small toast for feedback
function showToast(msg){
const t = document.createElement('div');
t.className='toast align-items-center text-bg-dark border-0 position-fixed bottom-0 end-0 m-3';
t.innerHTML=`<div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
document.body.appendChild(t);
const bs = new bootstrap.Toast(t,{delay:1200});
bs.show();
t.addEventListener('hidden.bs.toast',()=>t.remove());
}


// Rendering utilities
function el(html){const d=document.createElement('div');d.innerHTML=html.trim();return d.firstChild}


// Product list rendering (for home & products page)
function renderProductCard(p){
return `<div class="col-sm-6 col-md-4">
<div class="card product-card p-3 h-100">
<img src="${p.img}" class="prod-img mx-auto d-block" alt="${p.name}">
<div class="card-body d-flex flex-column">
<h5 class="card-title">${p.name}</h5>
<p class="text-muted mb-2 small">${p.country} • ${p.category}</p>
<div class="mt-auto d-flex justify-content-between align-items-center">
<div>
<strong>$${p.price.toFixed(2)}</strong>
</div>
<div class="d-flex gap-2 align-items-center">
<input type="number" min="1" value="1" data-id="${p.id}" class="form-control form-control-sm qty-input" style="width:70px;">
<button class="btn btn-sm btn-primary add-cart" data-id="${p.id}">Add</button>
</div>
</div>
</div>
</div>
</div>`;
}

function populateHome(){
const elHome = document.getElementById('home-products');
if(!elHome) return;
const picks = PRODUCTS.slice(0,4);
elHome.innerHTML = picks.map(renderProductCard).join('');
}


function populateProducts(){
const list = document.getElementById('product-list');
if(!list) return;
const countrySel = document.getElementById('filter-country');
const cats = [...new Set(PRODUCTS.map(p=>p.country))];
countrySel.innerHTML = '<option value="all">All countries</option>' + cats.map(c=>`<option>${c}</option>`).join('');
applyFilters();
}


function applyFilters(){
const list = document.getElementById('product-list');
if(!list) return;
const country=document.getElementById('filter-country').value;
const cat=document.getElementById('filter-category').value;
const min=document.getElementById('price-min').value;
const max=document.getElementById('price-max').value;
let out = PRODUCTS.filter(p=>{
if(country!=='all' && p.country!==country) return false;
if(cat!=='all' && p.category!==cat) return false;
if(min && p.price < Number(min)) return false;
if(max && p.price > Number(max)) return false;
return true;
});
document.getElementById('result-count').textContent = out.length;
list.innerHTML = out.map(renderProductCard).join('');
}

function populateProductDetail(){
const el = document.getElementById('product-detail');
if(!el) return;
const params = new URLSearchParams(location.search);
const id = Number(params.get('id'))||1;
const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
el.innerHTML = `
<div class="col-md-5">
<img src="${p.img}" class="img-fluid rounded" alt="${p.name}">
</div>
<div class="col-md-7">
<h3>${p.name}</h3>
<p class="text-muted">${p.country} • ${p.category}</p>
<h4 class="mt-3 mb-3">$${p.price.toFixed(2)}</h4>
<p>${p.desc}</p>
<div class="d-flex gap-2 mt-3">
<input id="pd-qty" type="number" min="1" value="1" class="form-control" style="width:100px;">
<button id="pd-add" class="btn btn-primary">Add to cart</button>
<a href="cart.html" class="btn btn-outline-secondary">View cart</a>
</div>
</div>
`;
document.getElementById('pd-add').addEventListener('click',()=>{
const q = document.getElementById('pd-qty').value; addToCart(p.id,q);
});
}


function populateCartPage(){
const el = document.getElementById('cart-contents');
if(!el) return;
const cart = getCart();
if(Object.keys(cart).length===0){ el.innerHTML='<div class="alert alert-light">Your cart is empty. <a href="shop.html">Browse snacks</a></div>'; return; }
const rows = Object.entries(cart).map(([id,qty])=>{
const p = PRODUCTS.find(x=>x.id==id);
return `<div class="d-flex align-items-center gap-3 border-bottom py-3">
<img src="${p.img}" style="width:84px;height:84px;object-fit:contain;background:#fff;padding:.5rem;border-radius:6px;">
<div class="flex-grow-1">
<div class="d-flex justify-content-between">
<div><strong>${p.name}</strong><div class="small text-muted">${p.country} • ${p.category}</div></div>
<div><strong>$${(p.price*qty).toFixed(2)}</strong></div>
</div>
<div class="mt-2 d-flex gap-2 align-items-center">
<input type="number" min="0" value="${qty}" data-id="${id}" class="form-control form-control-sm cart-qty" style="width:100px;">
<button class="btn btn-sm btn-outline-danger remove-item" data-id="${id}">Remove</button>
</div>
</div>
</div>`;
});
el.innerHTML = rows.join('') + `<div class="mt-4 text-end"><h5>Total: $${cartTotal().toFixed(2)}</h5></div>`;
document.querySelectorAll('.cart-qty').forEach(i=>i.addEventListener('change',e=>{ setQty(e.target.dataset.id, Number(e.target.value)); populateCartPage(); }));
document.querySelectorAll('.remove-item').forEach(b=>b.addEventListener('click',e=>{ setQty(e.target.dataset.id,0); populateCartPage(); }));
}

function cartTotal(){
const cart=getCart();
return Object.entries(cart).reduce((sum,[id,qty])=>{
const p=PRODUCTS.find(x=>x.id==id); return sum + (p.price*qty);
},0);
}


function populateCheckout(){
const el = document.getElementById('checkout-summary');
if(!el) return;
const cart = getCart();
if(!Object.keys(cart).length){ el.innerHTML='<div class="alert alert-light">Cart is empty.</div>'; document.getElementById('checkout-form').querySelector('button').disabled=true; return; }
const rows = Object.entries(cart).map(([id,qty])=>{
const p = PRODUCTS.find(x=>x.id==id);
return `<div class="d-flex justify-content-between"><div>${p.name} x${qty}</div><div>$${(p.price*qty).toFixed(2)}</div></div>`;
}).join('');
el.innerHTML = rows + `<hr><div class="d-flex justify-content-between"><strong>Subtotal</strong><strong>$${cartTotal().toFixed(2)}</strong></div>`;
}


// Generic binder for dynamic buttons (add to cart on lists)
function globalBinder(){
document.body.addEventListener('click', e=>{
if(e.target.matches('.add-cart')){
const id=e.target.dataset.id; const qty = e.target.closest('.card')?.querySelector('.qty-input')?.value||1; addToCart(id,qty);
}
if(e.target.matches('.product-card, .product-card *')){
// ignore
}
});
document.body.addEventListener('change', e=>{
if(e.target.matches('.qty-input')){
// nothing yet
}
});
}

// Page initialization
window.addEventListener('DOMContentLoaded',()=>{
updateNavCounts(); populateHome(); populateProducts(); populateProductDetail(); populateCartPage(); populateCheckout(); globalBinder();
document.getElementById('apply-filters')?.addEventListener('click',applyFilters);
document.getElementById('clear-filters')?.addEventListener('click',()=>{document.getElementById('filter-country').value='all';document.getElementById('filter-category').value='all';document.getElementById('price-min').value='';document.getElementById('price-max').value='';applyFilters();});
document.getElementById('checkout-form')?.addEventListener('submit',(e)=>{e.preventDefault(); localStorage.removeItem('cart'); showToast('Order placed — demo only'); window.location.href='home.html';});
});


// Expose PRODUCTS for debugging in demo
window.PRODUCTS = PRODUCTS;