/**
 * NEXUS STORE — Main Application Script
 * Global state, navigation, toasts, scroll effects, and page-level logic
 */

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  initNavbar();
  initScrollReveal();
  initMobileMenu();
  markActiveNav();

  // Page-specific init
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '')     initHomePage();
  if (page === 'products.html')                 initProductsPage();
  if (page === 'product-detail.html')          initProductDetailPage();
  if (page === 'cart.html')                     initCartPage();
  if (page === 'checkout.html')                 initCheckoutPage();
});

// ── Navbar ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function markActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === page || (page === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    mobileMenu.classList.contains('open')
      ? openHamburger(spans)
      : closeHamburger(spans);
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      closeHamburger(hamburger.querySelectorAll('span'));
    }
  });
}

function openHamburger(spans) {
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
}
function closeHamburger(spans) {
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
}

// ── Scroll Reveal ──
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ── Toast System ──
function showToast(type, title, message, duration = 3500) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const icons = { success: 'fa-check', error: 'fa-xmark', info: 'fa-info' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${icons[type] || icons.info}"></i></div>
    <div class="toast-text">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="dismissToast(this.parentElement)" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  container.appendChild(toast);

  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;
}

function dismissToast(toast) {
  if (!toast || !toast.parentElement) return;
  clearTimeout(toast._timer);
  toast.classList.add('toast-exit');
  toast.addEventListener('animationend', () => toast.remove(), { once: true });
}

// ── Global Cart Actions ──
function addToCart(productId, qty = 1) {
  const success = Cart.addItem(productId, qty);
  if (success) {
    const product = getProductById(productId);
    showToast('success', 'Added to Cart!', product ? `${product.name} added` : '');
  }
}

function toggleWishlist(productId, btn) {
  const added = Wishlist.toggle(productId);
  if (btn) {
    const icon = btn.querySelector('i');
    if (added) {
      icon.className = 'fa-solid fa-heart';
      btn.classList.add('wishlisted');
      showToast('info', 'Added to Wishlist', '');
    } else {
      icon.className = 'fa-regular fa-heart';
      btn.classList.remove('wishlisted');
      showToast('info', 'Removed from Wishlist', '');
    }
    icon.style.animation = 'heartBeat 0.3s ease';
    icon.addEventListener('animationend', () => icon.style.animation = '', { once: true });
  }
}

function quickView(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

// ── Home Page ──
function initHomePage() {
  renderFeaturedProducts();
  renderCategories();
  initHeroCounter();
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const products = getFeaturedProducts();
  grid.innerHTML = products.map(p => buildProductCard(p, Wishlist.has(p.id))).join('');
  grid.classList.add('stagger-children');
  grid.querySelectorAll('.product-card').forEach(c => c.classList.add('reveal'));
  setTimeout(() => initScrollReveal(), 100);
}

function renderCategories() {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <a href="products.html?cat=${encodeURIComponent(c.name)}" class="category-card reveal hover-lift" style="--cat-color:${c.color}; --cat-border:${c.border};">
      <div class="cat-icon" style="background:${c.color}; border:1px solid ${c.border};">${c.icon}</div>
      <span class="cat-name">${c.name}</span>
      <span class="cat-count">${c.count} items</span>
    </a>
  `).join('');
  setTimeout(() => initScrollReveal(), 100);
}

function initHeroCounter() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      el.textContent = (target % 1 === 0 ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

// ── Products Page ──
function initProductsPage() {
  let currentProducts = [...PRODUCTS];
  let activeCategory = 'All';
  let activeSortBy = 'default';

  const searchEl = document.getElementById('product-search');
  const sortEl = document.getElementById('sort-select');
  const gridEl = document.getElementById('products-grid');
  const countEl = document.getElementById('product-count');
  const chips = document.querySelectorAll('.filter-chip');

  // URL param category
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat');
  if (catParam) {
    activeCategory = catParam;
    chips.forEach(c => {
      c.classList.toggle('active', c.dataset.cat === catParam || (catParam === 'All' && c.dataset.cat === 'All'));
    });
  }

  function render() {
    let filtered = activeCategory === 'All'
      ? [...PRODUCTS]
      : PRODUCTS.filter(p => p.category === activeCategory);

    if (searchEl && searchEl.value.trim()) {
      const q = searchEl.value.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      );
    }

    filtered = sortProducts(filtered, activeSortBy);
    currentProducts = filtered;

    if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

    if (gridEl) {
      if (filtered.length === 0) {
        gridEl.innerHTML = `
          <div class="empty-state" style="grid-column:1/-1;">
            <div class="empty-icon"><i class="fa-solid fa-magnifying-glass"></i></div>
            <h3>No products found</h3>
            <p>Try a different search term or category filter.</p>
            <button class="btn btn-outline" onclick="resetFilters()">Clear Filters</button>
          </div>`;
      } else {
        gridEl.innerHTML = filtered.map(p => buildProductCard(p, Wishlist.has(p.id))).join('');
        gridEl.querySelectorAll('.product-card').forEach((c, i) => {
          c.style.animationDelay = `${i * 0.05}s`;
          c.classList.add('animate-fadeInUp');
        });
      }
    }
  }

  window.resetFilters = function() {
    activeCategory = 'All';
    if (searchEl) searchEl.value = '';
    chips.forEach(c => c.classList.toggle('active', c.dataset.cat === 'All'));
    render();
  };

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.cat;
      render();
    });
  });

  if (searchEl) {
    let timer;
    searchEl.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(render, 250);
    });
  }

  if (sortEl) {
    sortEl.addEventListener('change', () => {
      activeSortBy = sortEl.value;
      render();
    });
  }

  render();
}

// ── Product Detail Page ──
function initProductDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = getProductById(id);
  if (!product) {
    document.getElementById('detail-root').innerHTML = `
      <div class="empty-state">
        <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
        <h3>Product Not Found</h3>
        <a href="products.html" class="btn btn-primary">Browse Products</a>
      </div>`;
    return;
  }

  // Populate
  document.title = `${product.name} — NEXUS Store`;
  document.getElementById('detail-category').textContent = product.category;
  document.getElementById('detail-name').textContent = product.name;
  document.getElementById('detail-stars').textContent = generateStars(product.rating);
  document.getElementById('detail-rating-val').textContent = product.rating;
  document.getElementById('detail-reviews').textContent = `(${product.reviews.toLocaleString()} reviews)`;
  document.getElementById('detail-price').textContent = formatPrice(product.price);
  document.getElementById('detail-desc').textContent = product.description;
  document.getElementById('breadcrumb-name').textContent = product.name;

  if (product.originalPrice) {
    document.getElementById('detail-original-price').textContent = formatPrice(product.originalPrice);
    const discount = Math.round((1 - product.price / product.originalPrice) * 100);
    document.getElementById('detail-discount-badge').textContent = `-${discount}%`;
    document.getElementById('detail-discount-badge').style.display = 'inline';
  }

  // Main image
  const mainImg = document.getElementById('main-product-img');
  mainImg.src = product.image;
  mainImg.alt = product.name;

  // Thumbnails (reuse same image)
  const thumbStrip = document.getElementById('thumb-strip');
  if (thumbStrip) {
    thumbStrip.innerHTML = [product.image, product.image, product.image].map((src, i) => `
      <div class="thumb ${i === 0 ? 'active' : ''}" onclick="switchThumb(this, '${src}')">
        <img src="${src}" alt="View ${i+1}" />
      </div>`).join('');
  }

  // Features
  const featList = document.getElementById('feature-list');
  if (featList) {
    featList.innerHTML = product.features.map(f => `
      <div class="feature-item">
        <i class="fa-solid fa-circle-check"></i>
        <span>${f}</span>
      </div>`).join('');
  }

  // Wishlist btn
  const wishBtn = document.getElementById('wishlist-btn');
  if (wishBtn) {
    const icon = wishBtn.querySelector('i');
    if (Wishlist.has(product.id)) {
      icon.className = 'fa-solid fa-heart';
      wishBtn.classList.add('wishlisted');
    }
    wishBtn.addEventListener('click', () => toggleWishlist(product.id, wishBtn));
  }

  // Add to cart btn
  const cartBtn = document.getElementById('detail-add-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('detail-qty').textContent);
      addToCart(product.id, qty);
    });
  }

  // Stock
  const stockEl = document.getElementById('stock-info');
  if (stockEl) {
    if (product.stock <= 10) {
      stockEl.textContent = `Only ${product.stock} left in stock!`;
      stockEl.style.color = 'var(--warning)';
    } else {
      stockEl.textContent = 'In Stock';
      stockEl.style.color = 'var(--success)';
    }
  }

  // Related products
  renderRelated(product);
}

function switchThumb(el, src) {
  document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const main = document.getElementById('main-product-img');
  if (main) { main.style.opacity = 0; main.src = src; main.onload = () => { main.style.opacity = 1; }; }
}

function changeDetailQty(delta) {
  const qtyEl = document.getElementById('detail-qty');
  if (!qtyEl) return;
  const current = parseInt(qtyEl.textContent);
  const newQty = Math.max(1, Math.min(current + delta, 99));
  qtyEl.textContent = newQty;
}

function renderRelated(product) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;
  const related = PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  if (!related.length) {
    grid.innerHTML = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4)
      .map(p => buildProductCard(p, Wishlist.has(p.id))).join('');
  } else {
    grid.innerHTML = related.map(p => buildProductCard(p, Wishlist.has(p.id))).join('');
  }
}

// ── Cart Page ──
function initCartPage() {
  let couponCode = '';

  function render() {
    const items = Cart.getItems();
    const container = document.getElementById('cart-items');
    const empty = document.getElementById('cart-empty');
    const filled = document.getElementById('cart-filled');

    if (!container) return;

    if (items.length === 0) {
      if (empty)  empty.style.display  = 'block';
      if (filled) filled.style.display = 'none';
      return;
    }

    if (empty)  empty.style.display  = 'none';
    if (filled) filled.style.display = 'grid';

    container.innerHTML = items.map(item => `
      <div class="cart-item animate-fadeInUp" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-cat">${item.category}</div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)" aria-label="Decrease">−</button>
            <div class="qty-value">${item.qty}</div>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)" aria-label="Increase">+</button>
          </div>
        </div>
        <div>
          <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
          <button class="cart-remove" onclick="removeCartItem(${item.id})">
            <i class="fa-solid fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    `).join('');

    renderSummary(items, couponCode);
  }

  function renderSummary(items, code) {
    const pricing = PricingEngine.calculate(items, code);

    setText('summary-subtotal', formatPrice(pricing.subtotal));
    setText('summary-tax',      formatPrice(pricing.tax));
    setText('summary-shipping', pricing.freeShipping ? 'FREE' : formatPrice(pricing.shipping));
    setText('summary-total',    formatPrice(pricing.total));

    const discRow = document.getElementById('coupon-row');
    if (discRow) {
      if (pricing.couponDiscount > 0 || pricing.freeShipping) {
        discRow.style.display = 'flex';
        setText('summary-coupon', pricing.couponDiscount > 0
          ? `−${formatPrice(pricing.couponDiscount)}`
          : 'Free Shipping');
        setText('coupon-label', pricing.couponLabel || '');
      } else {
        discRow.style.display = 'none';
      }
    }

    // Free shipping progress
    const progressEl = document.getElementById('shipping-progress-bar');
    const progressMsg = document.getElementById('shipping-progress-msg');
    if (progressEl && progressMsg) {
      const threshold = PricingEngine.FREE_SHIPPING_THRESHOLD;
      const pct = Math.min((pricing.subtotal / threshold) * 100, 100);
      progressEl.style.width = pct + '%';
      if (pricing.freeShipping || pricing.subtotal >= threshold) {
        progressMsg.innerHTML = `<i class="fa-solid fa-truck text-success"></i> You've got <strong>FREE shipping!</strong>`;
      } else {
        const left = formatPrice(threshold - pricing.subtotal);
        progressMsg.innerHTML = `Add <strong>${left}</strong> more for FREE shipping`;
      }
    }
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  window.changeQty = (id, delta) => {
    const item = Cart.getItems().find(i => i.id === id);
    if (item) Cart.updateQty(id, item.qty + delta);
    render();
  };

  window.removeCartItem = (id) => {
    Cart.removeItem(id);
    showToast('info', 'Item Removed', 'Item removed from cart');
    render();
  };

  // Coupon
  const couponBtn = document.getElementById('apply-coupon-btn');
  const couponInput = document.getElementById('coupon-input');
  if (couponBtn && couponInput) {
    couponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim();
      const coupon = PricingEngine.applyCoupon(code);
      if (coupon) {
        couponCode = code;
        showToast('success', 'Coupon Applied!', coupon.label);
        render();
      } else {
        showToast('error', 'Invalid Coupon', 'This coupon code is not valid.');
      }
    });
  }

  render();
}

// ── Checkout Page ──
function initCheckoutPage() {
  const steps = ['shipping', 'payment', 'review'];
  let currentStep = 0;

  function showStep(index) {
    document.querySelectorAll('.checkout-panel').forEach((p, i) => {
      p.style.display = i === index ? 'block' : 'none';
    });
    document.querySelectorAll('.step').forEach((s, i) => {
      s.classList.toggle('active', i === index);
      s.classList.toggle('done', i < index);
      if (i < index) {
        const num = s.querySelector('.step-num');
        if (num) num.innerHTML = '<i class="fa-solid fa-check"></i>';
      }
    });
    currentStep = index;
  }

  window.nextStep = (index) => {
    if (index === 1) {
      // Validate shipping form
      const required = ['first-name', 'last-name', 'email', 'address', 'city', 'zip'];
      let valid = true;
      required.forEach(f => {
        const el = document.getElementById(f);
        if (el && !el.value.trim()) {
          el.style.borderColor = 'var(--danger)';
          valid = false;
        } else if (el) {
          el.style.borderColor = '';
        }
      });
      if (!valid) {
        showToast('error', 'Missing Fields', 'Please fill in all required fields.');
        return;
      }
    }
    if (index === 2) {
      // Update review
      const items = Cart.getItems();
      const pricing = PricingEngine.calculate(items, '');
      const reviewItems = document.getElementById('review-items');
      if (reviewItems) {
        reviewItems.innerHTML = items.map(i => `
          <div style="display:flex;justify-content:space-between;font-size:.88rem;padding:6px 0;border-bottom:1px solid var(--border);">
            <span>${i.name} × ${i.qty}</span>
            <span>${formatPrice(i.price * i.qty)}</span>
          </div>`).join('');
      }
      const reviewTotal = document.getElementById('review-total');
      if (reviewTotal) reviewTotal.textContent = formatPrice(pricing.total);
    }
    showStep(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.placeOrder = () => {
    Cart.clear();
    showToast('success', 'Order Placed! 🎉', 'Thank you! Your order is confirmed.');
    setTimeout(() => window.location.href = 'index.html', 2000);
  };

  // Populate order review items
  const items = Cart.getItems();
  const pricing = PricingEngine.calculate(items, '');
  setText2('checkout-subtotal', formatPrice(pricing.subtotal));
  setText2('checkout-shipping', pricing.freeShipping ? 'FREE' : formatPrice(pricing.shipping));
  setText2('checkout-tax',      formatPrice(pricing.tax));
  setText2('checkout-total',    formatPrice(pricing.total));

  function setText2(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  showStep(0);
}
