/**
 * NEXUS STORE — Cart Operations
 * Handles all cart state management with localStorage persistence
 */

const Cart = (() => {
  const STORAGE_KEY = 'nexus_cart';

  // ── State ──
  let items = [];

  // ── Init ──
  function init() {
    load();
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
    } catch { items = []; }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  // ── CRUD ──
  function addItem(productId, qty = 1) {
    const product = getProductById(productId);
    if (!product) return false;

    const existing = items.find(i => i.id === productId);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, product.stock);
    } else {
      items.push({
        id:       product.id,
        name:     product.name,
        category: product.category,
        price:    product.price,
        image:    product.image,
        qty:      Math.min(qty, product.stock),
        stock:    product.stock,
      });
    }
    save();
    updateCartUI();
    return true;
  }

  function removeItem(productId) {
    items = items.filter(i => i.id !== productId);
    save();
    updateCartUI();
  }

  function updateQty(productId, qty) {
    const item = items.find(i => i.id === productId);
    if (!item) return;
    if (qty <= 0) {
      removeItem(productId);
      return;
    }
    item.qty = Math.min(qty, item.stock);
    save();
    updateCartUI();
  }

  function clear() {
    items = [];
    save();
    updateCartUI();
  }

  function getItems() { return [...items]; }

  function getCount() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function getSubtotal() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function hasItem(productId) {
    return items.some(i => i.id === productId);
  }

  // ── UI Update ──
  function updateCartUI() {
    const count = getCount();
    // Update all badge elements
    document.querySelectorAll('.cart-badge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
      // Trigger bounce animation
      el.classList.remove('cart-badge-bounce');
      void el.offsetWidth;
      el.classList.add('cart-badge-bounce');
    });
  }

  return { init, addItem, removeItem, updateQty, clear, getItems, getCount, getSubtotal, hasItem, load };
})();

// ── Wishlist ──
const Wishlist = (() => {
  const KEY = 'nexus_wishlist';
  let ids = [];

  function load() {
    try { ids = JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { ids = []; }
  }

  function save() { localStorage.setItem(KEY, JSON.stringify(ids)); }

  function toggle(id) {
    const idx = ids.indexOf(id);
    if (idx === -1) { ids.push(id); save(); return true; }
    ids.splice(idx, 1); save(); return false;
  }

  function has(id) { return ids.includes(id); }
  function getAll() { return [...ids]; }

  load();
  return { toggle, has, getAll };
})();
