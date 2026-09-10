// Product Data
const productsData = [
  { id: 1, name: 'NOVA Oversized Jacket', category: 'Jackets', price: 4999, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80', rating: 4.8, desc: 'A signature oversized silhouette crafted from premium water-resistant materials. Designed for layering and fluid motion.' },
  { id: 2, name: 'NOVA Essential Hoodie', category: 'Hoodies', price: 2999, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', rating: 4.9, desc: 'Heavyweight organic cotton blend. Features a structured hood and minimalist dropped shoulders for a relaxed fit.' },
  { id: 3, name: 'NOVA Tech Cargo', category: 'Men', price: 3499, img: 'https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&q=80', rating: 4.7, desc: 'Utility meets modern aesthetics. Articulated knees and concealed pockets in a lightweight, breathable fabric.' },
  { id: 4, name: 'NOVA Motion Tee', category: 'T-Shirts', price: 1799, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', rating: 4.5, desc: 'Our core t-shirt. Moisture-wicking technology combined with an ultra-soft feel for everyday performance.' },
  { id: 5, name: 'NOVA Street Runner', category: 'Sneakers', price: 5499, img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80', rating: 4.9, desc: 'Aerodynamic design with advanced cushioning. Built for urban exploration and all-day comfort.' },
  { id: 6, name: 'NOVA Core Shirt', category: 'Women', price: 2499, img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80', rating: 4.6, desc: 'A versatile essential. Crisp lines and a tailored fit that transitions seamlessly from day to night.' },
  { id: 7, name: 'NOVA Aero Jacket', category: 'Jackets', price: 6999, img: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?w=800&q=80', rating: 5.0, desc: 'The pinnacle of our outerwear collection. Reflective details and modular components for ultimate adaptability.' },
  { id: 8, name: 'NOVA Studio Hoodie', category: 'Hoodies', price: 3999, img: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80', rating: 4.8, desc: 'Refined comfort. Minimalist design featuring hidden seams and a buttery-soft interior.' },
  { id: 9, name: 'NOVA Utility Pants', category: 'Women', price: 4299, img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80', rating: 4.7, desc: 'High-waisted utility trousers designed for optimal movement and contemporary styling.' },
  { id: 10, name: 'NOVA Frame Sneakers', category: 'Sneakers', price: 6499, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', rating: 4.9, desc: 'Architectural footwear. A bold exoskeleton structure over a breathable mesh core.' },
  { id: 11, name: 'NOVA Onyx Watch', category: 'Accessories', price: 8999, img: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80', rating: 4.9, desc: 'Matte black minimalist timepiece with a durable silicone strap.' }
];

const featuredIds = [1, 2, 3, 4, 5, 6];
const newArrivalIds = [7, 8, 9, 10];

// State
let cart = JSON.parse(localStorage.getItem('nova_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('nova_wishlist')) || [];
let currentTheme = localStorage.getItem('nova_theme') || 'dark';
let currentFilter = 'All';
let currentSort = 'featured';
const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// SVG Icons
const icons = {
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`,
  eye: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
};

// DOM Elements
const body = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay-backdrop');
const searchBtn = document.getElementById('search-btn');
const closeSearchBtn = document.getElementById('close-search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('quick-view-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const toast = document.getElementById('toast');
const customCursor = document.getElementById('custom-cursor');
const cursorText = document.getElementById('cursor-text');

// 1. Initial Loading Sequence
function runLoaderSequence() {
  const loader = document.getElementById('loader');
  if(!loader) return;
  
  if (isReducedMotion) {
    loader.style.display = 'none';
    init();
    return;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      loader.style.display = 'none';
      init();
    }
  });

  tl.to('#loader-progress', { width: '100%', duration: 1.5, ease: 'power3.inOut' })
    .to('.loader-logo', { opacity: 0, y: -20, duration: 0.4 }, "-=0.2")
    .to('.loader-tagline', { opacity: 0, y: -20, duration: 0.4 }, "-=0.3")
    .to('#loader-progress', { opacity: 0, duration: 0.2 }, "-=0.2")
    .to(loader, { opacity: 0, duration: 0.6, ease: 'power2.inOut' });
}

// 2. Initialize App
function init() {
  body.setAttribute('data-theme', currentTheme);
  renderFeatured();
  renderNewArrivals();
  updateCartUI();
  updateWishlistCount();
  setupEventListeners();
  
  if (!isReducedMotion) {
    initThreeJSHero();
    initThreeJSObject();
    initGSAPScroll();
    initCursor();
    initMagneticButtons();
    init3DCards();
  }
}

// Formatting & HTML Gen
function formatPrice(price) { return '₹' + price.toLocaleString('en-IN'); }

function createProductHTML(product) {
  const inWishlist = wishlist.includes(product.id);
  return `
    <div class="product-card gs-fade-up" data-id="${product.id}" data-tilt>
      <div class="product-img-wrapper" data-cursor="view">
        <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
        <div class="card-actions">
          <button class="icon-btn wishlist-toggle ${inWishlist ? 'active' : ''}" data-id="${product.id}" aria-label="Toggle Wishlist" data-magnetic>
            ${icons.heart}
          </button>
          <button class="icon-btn quick-view-btn" data-id="${product.id}" aria-label="Quick View" data-magnetic>
            ${icons.eye}
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-cat">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="add-to-bag-btn" data-id="${product.id}" data-cursor="add">ADD TO BAG</button>
      </div>
    </div>
  `;
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  let displayProducts = productsData.filter(p => featuredIds.includes(p.id));
  if (currentFilter !== 'All') displayProducts = productsData.filter(p => p.category === currentFilter);
  if (currentSort === 'price-low') displayProducts.sort((a, b) => a.price - b.price);
  else if (currentSort === 'price-high') displayProducts.sort((a, b) => b.price - a.price);
  else if (currentSort === 'newest') displayProducts = displayProducts.reverse();
  
  grid.innerHTML = displayProducts.length ? displayProducts.map(createProductHTML).join('') : '<p style="grid-column: 1/-1; text-align:center; color: var(--text-sec)">No products found.</p>';
  
  if (!isReducedMotion) {
    ScrollTrigger.refresh();
    initMagneticButtons();
    init3DCards();
  }
}

function renderNewArrivals() {
  const grid = document.getElementById('new-arrivals-grid');
  const displayProducts = productsData.filter(p => newArrivalIds.includes(p.id));
  grid.innerHTML = displayProducts.map(createProductHTML).join('');
}

// 3. Cinematic Theme Toggle
function handleThemeToggle(e) {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  if (isReducedMotion) {
    currentTheme = newTheme;
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('nova_theme', currentTheme);
    return;
  }

  // Circular transition
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const layer = document.getElementById('theme-transition-layer');
  
  layer.style.backgroundColor = newTheme === 'dark' ? 'var(--bg-dark)' : 'var(--bg-light)';
  layer.style.transformOrigin = `${x}px ${y}px`;
  layer.style.opacity = 1;
  
  // Need to scale enough to cover screen from any point
  const maxDim = Math.max(window.innerWidth, window.innerHeight);
  const scale = (maxDim / rect.width) * 3;

  gsap.fromTo(layer, 
    { scale: 0 }, 
    { 
      scale: scale, 
      duration: 0.7, 
      ease: "power2.inOut",
      onComplete: () => {
        currentTheme = newTheme;
        body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('nova_theme', currentTheme);
        
        gsap.to(layer, { opacity: 0, duration: 0.4, ease: "power2.inOut", onComplete: () => {
          gsap.set(layer, { scale: 0 });
        }});
      }
    }
  );
}

// 4. Cart & Wishlist with GSAP Animations
function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsContainer = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-price');
  
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  
  // Animate count change
  if (parseInt(countEl.textContent) !== totalItems && !isReducedMotion) {
    countEl.classList.remove('bump');
    void countEl.offsetWidth; 
    countEl.classList.add('bump');
  }
  countEl.textContent = totalItems;
  
  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="cart-empty">Your bag is empty.</div>';
    totalEl.textContent = '₹0';
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = cart.map(item => {
    const p = productsData.find(x => x.id === item.id);
    if(!p) return '';
    total += p.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${p.img}" alt="${p.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div>
            <div class="cart-item-title">${p.name}</div>
            <div class="cart-item-price">${formatPrice(p.price)}</div>
            <div style="font-size:12px; color:var(--text-sec); margin-top:4px;">Size: ${item.size}</div>
          </div>
          <div class="cart-controls">
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', -1)">-</button>
              <span class="qty-val">${item.qty}</span>
              <button class="qty-btn" onclick="updateQty(${item.id}, '${item.size}', 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Animate subtotal text color briefly
  if (!isReducedMotion) {
    gsap.fromTo(totalEl, { color: 'var(--text-primary)' }, { color: 'var(--accent)', duration: 0.3, yoyo: true, repeat: 1 });
  }
  totalEl.textContent = formatPrice(total);
  localStorage.setItem('nova_cart', JSON.stringify(cart));
}

// Fly to Cart Animation
function flyToCartAnim(btn, pId) {
  if (isReducedMotion || window.innerWidth < 768) {
    addToCart(pId, 'M', 1);
    return;
  }
  
  const card = btn.closest('.product-card');
  const modalContent = btn.closest('.modal-content');
  const imgToClone = card ? card.querySelector('.product-img') : (modalContent ? modalContent.querySelector('.modal-img') : null);
  
  if (!imgToClone) {
    addToCart(pId, 'M', 1);
    return;
  }
  
  const startRect = imgToClone.getBoundingClientRect();
  const cartIcon = document.getElementById('cart-btn').getBoundingClientRect();
  
  const clone = imgToClone.cloneNode(true);
  clone.className = 'fly-item';
  clone.style.left = startRect.left + 'px';
  clone.style.top = startRect.top + 'px';
  clone.style.width = startRect.width + 'px';
  clone.style.height = startRect.height + 'px';
  document.body.appendChild(clone);
  
  // Close modal if open so we see the fly
  if (modal.classList.contains('open')) {
    closeModal();
  }
  
  gsap.to(clone, {
    x: cartIcon.left - startRect.left,
    y: cartIcon.top - startRect.top,
    scale: 0.1,
    opacity: 0.5,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      clone.remove();
      addToCart(pId, 'M', 1);
    }
  });
}

function addToCart(id, size = 'M', qty = 1) {
  const existing = cart.find(item => item.id === id && item.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id, size, qty });
  }
  updateCartUI();
  openCart();
}

window.updateQty = function(id, size, change) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (item) {
    item.qty += change;
    if (item.qty <= 0) cart = cart.filter(i => !(i.id === id && i.size === size));
    updateCartUI();
  }
};

window.removeFromCart = function(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  updateCartUI();
};

function updateWishlistCount() {
  const countEl = document.getElementById('wishlist-count');
  const old = countEl.textContent;
  countEl.textContent = wishlist.length;
  if(old !== countEl.textContent && !isReducedMotion) {
    countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump');
  }
  localStorage.setItem('nova_wishlist', JSON.stringify(wishlist));
}

function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else {
    wishlist.push(id);
    showToast('Added to wishlist');
  }
  updateWishlistCount();
  renderFeatured(); 
  renderNewArrivals();
}

// 5. Cinematic Modal (Quick View)
function openQuickView(id) {
  const p = productsData.find(x => x.id === id);
  if (!p) return;
  
  const modalBody = document.getElementById('modal-body');
  modalBody.innerHTML = `
    <div class="modal-img-container">
      <img src="${p.img}" alt="${p.name}" class="modal-img">
    </div>
    <div class="modal-info">
      <div class="product-cat">${p.category}</div>
      <h2 class="modal-title brand-font">${p.name}</h2>
      <div class="modal-price">${formatPrice(p.price)}</div>
      <p class="modal-desc">${p.desc}</p>
      
      <div class="modal-selectors">
        <select id="modal-size" class="modal-select">
          <option value="S">Size: S</option>
          <option value="M" selected>Size: M</option>
          <option value="L">Size: L</option>
          <option value="XL">Size: XL</option>
        </select>
        <select id="modal-qty" class="modal-select">
          <option value="1">Qty: 1</option>
          <option value="2">Qty: 2</option>
          <option value="3">Qty: 3</option>
        </select>
      </div>
      
      <button class="btn btn-primary w-full" id="modal-add-btn" data-magnetic>ADD TO BAG</button>
    </div>
  `;
  
  modal.classList.add('open');
  overlay.classList.add('active');
  
  // Cinematic Entry
  if (!isReducedMotion) {
    gsap.fromTo('.modal-content', { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power4.out" });
    gsap.fromTo('.modal-img-container', { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" });
    gsap.fromTo('.modal-info', { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" });
    gsap.fromTo('.modal-info > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" });
    initMagneticButtons();
  } else {
    gsap.set('.modal-content', { scale: 1, y: 0, opacity: 1 });
  }

  document.getElementById('modal-add-btn').addEventListener('click', (e) => {
    const size = document.getElementById('modal-size').value;
    const qty = parseInt(document.getElementById('modal-qty').value);
    
    // Check if we can fly to cart
    if(!isReducedMotion && window.innerWidth >= 768) {
       flyToCartAnim(e.target, p.id);
    } else {
       addToCart(p.id, size, qty);
       closeModal();
    }
  });
}

function closeModal() {
  if (!isReducedMotion) {
    gsap.to('.modal-content', { scale: 0.95, y: 20, opacity: 0, duration: 0.4, ease: "power2.in", onComplete: () => {
      modal.classList.remove('open');
      overlay.classList.remove('active');
    }});
  } else {
    modal.classList.remove('open');
    overlay.classList.remove('active');
    gsap.set('.modal-content', { scale: 0.95, y: 20, opacity: 0 });
  }
}

// Triggers
function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('active');
  if(!isReducedMotion) gsap.fromTo('.cart-item', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2, ease: "power2.out" });
}
function closeCart() { cartDrawer.classList.remove('open'); overlay.classList.remove('active'); }
function openSearch() { searchOverlay.classList.add('open'); searchInput.focus(); document.body.style.overflow = 'hidden'; }
function closeSearch() { searchOverlay.classList.remove('open'); document.body.style.overflow = ''; }
function showToast(msg) {
  toast.textContent = msg;
  gsap.fromTo(toast, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" });
  setTimeout(() => gsap.to(toast, { y: 100, opacity: 0, duration: 0.4, ease: "power2.in" }), 3000);
}

// Event Listeners
function setupEventListeners() {
  themeToggle.addEventListener('click', handleThemeToggle);
  
  const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      handleThemeToggle(e);
    });
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  closeMenuBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
  document.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  document.getElementById('checkout-btn').addEventListener('click', () => {
    if(cart.length === 0) return showToast('Cart is empty');
    showToast('Checkout simulated. Order placed!');
    cart = []; updateCartUI(); closeCart();
  });

  overlay.addEventListener('click', () => { closeCart(); closeModal(); });
  closeModalBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') { closeModal(); closeSearch(); closeCart(); mobileMenu.classList.remove('open'); }
  });

  searchBtn.addEventListener('click', openSearch);
  closeSearchBtn.addEventListener('click', closeSearch);
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const resultsGrid = document.getElementById('search-results-grid');
    const info = document.getElementById('search-results-info');
    if (q.length < 2) { resultsGrid.innerHTML = ''; info.textContent = ''; return; }
    
    const results = productsData.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    info.textContent = results.length ? `Search results for "${q}"` : `NO PRODUCTS FOUND`;
    resultsGrid.innerHTML = results.map(createProductHTML).join('');
  });

  document.body.addEventListener('click', (e) => {
    const wishlistBtn = e.target.closest('.wishlist-toggle');
    if (wishlistBtn) { toggleWishlist(parseInt(wishlistBtn.dataset.id)); return; }
    
    const quickViewBtn = e.target.closest('.quick-view-btn');
    if (quickViewBtn) { openQuickView(parseInt(quickViewBtn.dataset.id)); return; }
    
    const addBtn = e.target.closest('.add-to-bag-btn');
    if (addBtn && !e.target.closest('#modal-add-btn')) { 
      flyToCartAnim(addBtn, parseInt(addBtn.dataset.id));
      return; 
    }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      
      if (!isReducedMotion) {
        gsap.to('.product-card', { opacity: 0, y: 20, stagger: 0.05, duration: 0.3, onComplete: () => {
          renderFeatured();
          gsap.fromTo('.product-card', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 });
        }});
      } else {
        renderFeatured();
      }
    });
  });

  document.getElementById('sort-select').addEventListener('change', (e) => { currentSort = e.target.value; renderFeatured(); });
  document.getElementById('newsletter-form').addEventListener('submit', (e) => { e.preventDefault(); document.getElementById('newsletter-msg').textContent = "You're on the list."; e.target.reset(); });
  document.getElementById('discover-object-btn').addEventListener('click', () => showToast('Discovering 3D object details...'));

  // Smooth scroll and category linking
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      if(!targetId) return;
      
      const filterNames = ["men", "women", "accessories"];
      if (filterNames.includes(targetId) || targetId === 'sale') {
         e.preventDefault();
         const collectionsSec = document.querySelector('#collections');
         if(collectionsSec) collectionsSec.scrollIntoView({ behavior: 'smooth' });
         
         const filterVal = targetId === 'sale' ? 'All' : targetId.charAt(0).toUpperCase() + targetId.slice(1);
         const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterVal}"]`);
         if(filterBtn) filterBtn.click();
         return;
      }

      const targetEl = document.getElementById(targetId);
      if(targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// 6. Custom Interactions
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  document.addEventListener('mousemove', (e) => {
    gsap.to(customCursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
  });

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('[data-cursor]');
    const magnetic = e.target.closest('[data-magnetic]');
    
    customCursor.className = 'custom-cursor';
    cursorText.textContent = '';
    
    if (target) {
      const type = target.dataset.cursor;
      if (type === 'view') {
        customCursor.classList.add('active-view');
        cursorText.textContent = 'VIEW';
      } else if (type === 'add') {
        customCursor.classList.add('active-add');
        cursorText.textContent = 'ADD';
      } else if (type === 'explore') {
        customCursor.classList.add('active-explore');
        cursorText.textContent = 'EXPLORE';
      }
    } else if (magnetic) {
      customCursor.classList.add('active-magnetic');
    }
  });
}

function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    });
  });
}

function init3DCards() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: "power1.out", transformPerspective: 1200 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    });
  });
}

// 7. Scroll Storytelling (GSAP)
function initGSAPScroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Parallax Hero
  gsap.to('.hero-image-wrapper', {
    y: 100,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });

  // Reveal Elements
  const fadeUps = gsap.utils.toArray('.gs-fade-up');
  fadeUps.forEach(elem => {
    gsap.fromTo(elem, 
      { autoAlpha: 0, y: 40 },
      { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", 
        scrollTrigger: { trigger: elem, start: "top 85%" }
      }
    );
  });

  // Image Clip Reveals
  const reveals = gsap.utils.toArray('.gs-reveal');
  reveals.forEach(elem => {
    const imgWrapper = elem.querySelector('.lb-img-wrapper') || elem.querySelector('.category-img-wrapper');
    const img = elem.querySelector('img');
    if(!imgWrapper || !img) return;
    
    gsap.fromTo(imgWrapper, 
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: elem, start: "top 80%" }
      }
    );
    gsap.fromTo(img, 
      { scale: 1.2 },
      { scale: 1, duration: 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: elem, start: "top 80%" }
      }
    );
  });
}

// 8. Advanced Three.js
function initThreeJSHero() {
  const container = document.getElementById('hero-3d-container');
  if(!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  const pointLight1 = new THREE.PointLight(0x00D9FF, 2, 50);
  pointLight1.position.set(5, 5, 2);
  scene.add(pointLight1);
  const pointLight2 = new THREE.PointLight(0x7C5CFF, 2, 50);
  pointLight2.position.set(-5, -5, 2);
  scene.add(pointLight2);

  // Group for abstract objects
  const group = new THREE.Group();
  scene.add(group);

  // Metallic Ring
  const ringGeo = new THREE.TorusGeometry(3, 0.05, 16, 100);
  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1, envMapIntensity: 1.0 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  // Glass Icosahedron
  const icoGeo = new THREE.IcosahedronGeometry(2, 1);
  const icoMat = new THREE.MeshPhysicalMaterial({ color: 0x00D9FF, transmission: 0.9, opacity: 1, metalness: 0.1, roughness: 0.1, thickness: 0.5 });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  group.add(ico);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const pCount = window.innerWidth < 768 ? 50 : 200;
  const posArray = new Float32Array(pCount * 3);
  for(let i=0; i<pCount*3; i++) posArray[i] = (Math.random() - 0.5) * 20;
  pGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.4 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  camera.position.z = 8;

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
  });

  let raf;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    
    group.rotation.x += 0.001;
    group.rotation.y += 0.002;
    ico.rotation.y -= 0.003;
    ring.rotation.x += 0.002;
    
    particles.rotation.y += 0.0005;

    camera.position.x += (mouseX * 4 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 4 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
  };

  // Performance Observer
  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) animate();
    else cancelAnimationFrame(raf);
  });
  observer.observe(container);

  window.addEventListener('resize', () => {
    if(!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

function initThreeJSObject() {
  const container = document.getElementById('object-3d-container');
  if(!container || !window.THREE) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group for abstract objects
  const group = new THREE.Group();
  scene.add(group);

  const geometry = new THREE.TorusKnotGeometry(1.2, 0.3, 128, 32);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x7C5CFF, metalness: 0.7, roughness: 0.2, wireframe: true, transparent: true, opacity: 0.6 });
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  const innerGeo = new THREE.SphereGeometry(0.8, 64, 64);
  const innerMat = new THREE.MeshStandardMaterial({ color: 0x111722, metalness: 0.9, roughness: 0.1 });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  group.add(innerMesh);

  // Outer Glowing Rings
  const ringGeo1 = new THREE.TorusGeometry(2, 0.02, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00D9FF, transparent: true, opacity: 0.5 });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 2;
  group.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(2.5, 0.01, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 3;
  group.add(ring2);

  // Particles
  const pGeo = new THREE.BufferGeometry();
  const pCount = 150;
  const posArray = new Float32Array(pCount * 3);
  for(let i=0; i<pCount*3; i++) posArray[i] = (Math.random() - 0.5) * 10;
  pGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.04, color: 0x00D9FF, transparent: true, opacity: 0.6 });
  const particles = new THREE.Points(pGeo, pMat);
  group.add(particles);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  const light = new THREE.PointLight(0x00D9FF, 3, 20);
  light.position.set(2, 3, 4);
  scene.add(light);
  const light2 = new THREE.PointLight(0x7C5CFF, 3, 20);
  light2.position.set(-2, -3, -4);
  scene.add(light2);

  camera.position.z = 5;

  let mouseX = 0, mouseY = 0;
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) - 0.5;
    mouseY = ((e.clientY - rect.top) / rect.height) - 0.5;
  });

  let raf;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    group.rotation.y += 0.003;
    mesh.rotation.y += 0.005;
    mesh.rotation.x += 0.003;
    innerMesh.rotation.y -= 0.002;
    ring1.rotation.y += 0.01;
    ring2.rotation.x -= 0.005;
    particles.rotation.y -= 0.001;

    camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  };

  const observer = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting) animate();
    else cancelAnimationFrame(raf);
  });
  observer.observe(container);

  window.addEventListener('resize', () => {
    if(!container.clientWidth) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

// Boot
window.addEventListener('load', runLoaderSequence);
