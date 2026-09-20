/**
 * NEXUS STORE — Product Catalog
 * All product data used across the site
 */

const PRODUCTS = [
  {
    id: 1,
    name: 'ProSound Elite Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 1248,
    badge: 'Best Seller',
    badgeClass: '',
    image: 'assets/images/headphones.jpg',
    description: 'Experience audio like never before with our flagship ProSound Elite headphones. Featuring 40mm custom drivers, active noise cancellation, and 30-hour battery life for an unparalleled listening experience.',
    features: [
      '40mm Custom Neodymium Drivers',
      'Active Noise Cancellation (ANC)',
      '30-Hour Battery Life',
      'Quick Charge: 15min = 3hrs playback',
      'Premium Protein Leather Earcups',
      'Foldable & Travel-Ready Design',
    ],
    stock: 45,
    tags: ['audio', 'wireless', 'anc'],
  },
  {
    id: 2,
    name: 'Apex Chrono Smartwatch',
    category: 'Accessories',
    price: 449.99,
    originalPrice: 599.99,
    rating: 4.7,
    reviews: 867,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    image: 'assets/images/watch.jpg',
    description: 'The Apex Chrono blends Swiss craftsmanship with cutting-edge smart technology. Track your health, stay connected, and make a bold statement — all from your wrist.',
    features: [
      'AMOLED Always-On Display',
      'Advanced Health Monitoring (ECG, SpO2)',
      '7-Day Battery Life',
      '50m Water Resistance',
      'GPS & LTE Connectivity',
      'Stainless Steel Build',
    ],
    stock: 23,
    tags: ['smartwatch', 'health', 'luxury'],
  },
  {
    id: 3,
    name: 'UltraSlim Pro Laptop 14"',
    category: 'Computers',
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.9,
    reviews: 2341,
    badge: 'New',
    badgeClass: 'badge-new',
    image: 'assets/images/laptop.jpg',
    description: 'Redefine productivity with the UltraSlim Pro. At just 13mm thin, this powerhouse packs next-gen processing, a stunning 2K OLED display, and all-day battery into a feather-light chassis.',
    features: [
      'Next-Gen 12-Core Processor',
      '2K OLED 120Hz Display',
      '32GB LPDDR5 RAM',
      '1TB NVMe SSD',
      '18-Hour Battery Life',
      '13mm Ultra-Thin Design',
    ],
    stock: 12,
    tags: ['laptop', 'productivity', 'oled'],
  },
  {
    id: 4,
    name: 'Vortex Runner Pro Sneakers',
    category: 'Footwear',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 543,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    image: 'assets/images/sneakers.jpg',
    description: 'Built for champions. The Vortex Runner Pro features responsive cushioning, a breathable mesh upper, and our patented EnergyReturn sole system for peak performance.',
    features: [
      'EnergyReturn Cushioning System',
      'Breathable Knit Upper',
      'Carbon Fiber Plate',
      'Reflective Safety Elements',
      'Wide Toe Box for Comfort',
      'Machine Washable',
    ],
    stock: 78,
    tags: ['sports', 'running', 'performance'],
  },
  {
    id: 5,
    name: 'Lumière Gold Perfume 100ml',
    category: 'Beauty',
    price: 129.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 328,
    badge: 'Luxury',
    badgeClass: '',
    image: 'assets/images/perfume.jpg',
    description: 'Lumière Gold captures the essence of elegance. A sophisticated blend of bergamot top notes, rose heart, and amber base that lingers beautifully throughout the day.',
    features: [
      'Long-Lasting: 12+ Hours',
      'French Artisan Formula',
      'Bergamot & Rose Heart',
      'Warm Amber & Sandalwood Base',
      '100ml Crystal Flacon',
      'Cruelty-Free & Vegan',
    ],
    stock: 34,
    tags: ['fragrance', 'luxury', 'beauty'],
  },
  {
    id: 6,
    name: 'Visionary X Pro Camera',
    category: 'Photography',
    price: 2199.99,
    originalPrice: 2699.99,
    rating: 4.8,
    reviews: 712,
    badge: 'Pro',
    badgeClass: '',
    image: 'assets/images/camera.jpg',
    description: 'Capture the world in breathtaking detail. The Visionary X Pro mirrorless camera features a full-frame 45MP sensor, 20fps burst shooting, and AI-powered subject tracking.',
    features: [
      '45MP Full-Frame BSI CMOS Sensor',
      '20fps Continuous Shooting',
      'AI-Powered Subject Tracking',
      '8K Video at 30fps',
      '5-Axis In-Body Stabilization',
      'Dual CFexpress Card Slots',
    ],
    stock: 8,
    tags: ['camera', 'photography', '8k'],
  },
  {
    id: 7,
    name: 'EcoSound Wireless Earbuds',
    category: 'Electronics',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviews: 1893,
    badge: 'Sale',
    badgeClass: 'badge-sale',
    image: 'assets/images/headphones.jpg',
    description: 'True wireless freedom meets premium sound quality. These eco-conscious earbuds deliver hi-fi audio while being built from sustainable recycled materials.',
    features: [
      'Hi-Fi Balanced Armature Drivers',
      'Hybrid Active Noise Cancellation',
      '8hr + 24hr (case) Battery',
      'IPX5 Water Resistant',
      'Sustainable Recycled Build',
      'Multi-device Pairing',
    ],
    stock: 156,
    tags: ['audio', 'wireless', 'eco'],
  },
  {
    id: 8,
    name: 'Nomad Leather Backpack',
    category: 'Accessories',
    price: 249.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 234,
    badge: 'New',
    badgeClass: 'badge-new',
    image: 'assets/images/watch.jpg',
    description: 'The Nomad Leather Backpack is your perfect travel companion — crafted from full-grain Italian leather with smart organization features and a hidden anti-theft pocket.',
    features: [
      'Full-Grain Italian Leather',
      '25L Capacity',
      'USB-A & USB-C Charging Ports',
      'Hidden Anti-Theft Pocket',
      'Padded 16" Laptop Sleeve',
      'Waterproof Lining',
    ],
    stock: 42,
    tags: ['bag', 'travel', 'leather'],
  },
];

const CATEGORIES = [
  { name: 'Electronics',   icon: '🎧', color: 'rgba(108,63,199,0.2)',  border: 'rgba(108,63,199,0.4)',  count: 142 },
  { name: 'Computers',     icon: '💻', color: 'rgba(61,31,140,0.2)',   border: 'rgba(61,31,140,0.4)',   count: 78  },
  { name: 'Accessories',   icon: '⌚', color: 'rgba(245,200,66,0.15)', border: 'rgba(245,200,66,0.35)', count: 213 },
  { name: 'Footwear',      icon: '👟', color: 'rgba(34,211,165,0.15)', border: 'rgba(34,211,165,0.35)', count: 95  },
  { name: 'Beauty',        icon: '✨', color: 'rgba(245,91,91,0.15)',  border: 'rgba(245,91,91,0.35)',  count: 67  },
  { name: 'Photography',   icon: '📷', color: 'rgba(245,166,66,0.15)', border: 'rgba(245,166,66,0.35)', count: 54  },
];

/**
 * Get a product by ID
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === parseInt(id));
}

/**
 * Get products filtered by category
 */
function getProductsByCategory(category) {
  if (!category || category === 'All') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get featured products (first 4)
 */
function getFeaturedProducts() {
  return PRODUCTS.slice(0, 4);
}

/**
 * Search products by name or tags
 */
function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  );
}

/**
 * Sort products
 */
function sortProducts(products, sortBy) {
  const copy = [...products];
  switch (sortBy) {
    case 'price-asc':  return copy.sort((a, b) => a.price - b.price);
    case 'price-desc': return copy.sort((a, b) => b.price - a.price);
    case 'rating':     return copy.sort((a, b) => b.rating - a.rating);
    case 'reviews':    return copy.sort((a, b) => b.reviews - a.reviews);
    case 'name':       return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:           return copy;
  }
}

/**
 * Generate star HTML
 */
function generateStars(rating) {
  let stars = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < full; i++) stars += '★';
  if (half) stars += '☆';
  while (stars.length < 5) stars += '☆';
  return stars;
}

/**
 * Format price in Indian Rupees (₹)
 */
function formatPrice(price) {
  return '₹' + Number(price).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Build a product card HTML string
 */
function buildProductCard(product, inWishlist = false) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;
  const wishClass = inWishlist ? 'wishlisted' : '';
  const wishIcon = inWishlist ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

  return `
    <article class="product-card" data-id="${product.id}" onclick="window.location='product-detail.html?id=${product.id}'" aria-label="${product.name}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${product.badge ? `<span class="product-badge ${product.badgeClass}">${product.badge}</span>` : ''}
        ${discount ? `<span class="product-badge badge-sale" style="top:auto;bottom:12px;left:12px;">-${discount}%</span>` : ''}
        <div class="product-actions-overlay">
          <button class="action-icon-btn ${wishClass}" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)" title="Wishlist" aria-label="Add to wishlist">
            <i class="${wishIcon}"></i>
          </button>
          <button class="action-icon-btn" onclick="event.stopPropagation(); quickView(${product.id})" title="Quick View" aria-label="Quick view">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="rating-count">(${product.reviews.toLocaleString()})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
          </div>
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})" aria-label="Add to cart">
            <i class="fa-solid fa-cart-plus"></i> Add
          </button>
        </div>
      </div>
    </article>
  `;
}
