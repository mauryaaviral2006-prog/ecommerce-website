/**
 * NEXUS STORE — C++ Pricing Engine (WebAssembly Bridge)
 *
 * In a production setup, this module would load a .wasm binary compiled from
 * the C++ source below. For this demo, we provide the equivalent JavaScript
 * fallback that mirrors the same pricing logic.
 *
 * ─── Equivalent C++ Source Code ─────────────────────────────────────────────
 *
 * #include <emscripten/emscripten.h>
 * #include <cmath>
 *
 * extern "C" {
 *
 *   EMSCRIPTEN_KEEPALIVE
 *   double calculateDiscount(double price, double discountPct) {
 *     if (discountPct < 0.0 || discountPct > 100.0) return price;
 *     return price * (1.0 - discountPct / 100.0);
 *   }
 *
 *   EMSCRIPTEN_KEEPALIVE
 *   double calculateTax(double subtotal, double taxRate) {
 *     return subtotal * (taxRate / 100.0);
 *   }
 *
 *   EMSCRIPTEN_KEEPALIVE
 *   double calculateShipping(double subtotal, double freeShippingThreshold) {
 *     if (subtotal >= freeShippingThreshold) return 0.0;
 *     double base = 9.99;
 *     double extra = std::max(0.0, (subtotal - 50.0) * 0.01);
 *     return base + extra;
 *   }
 *
 *   EMSCRIPTEN_KEEPALIVE
 *   double calculateTotal(double subtotal, double tax, double shipping, double couponDiscount) {
 *     double total = subtotal + tax + shipping - couponDiscount;
 *     return total < 0.0 ? 0.0 : total;
 *   }
 *
 *   EMSCRIPTEN_KEEPALIVE
 *   double applyCoupon(double subtotal, const char* code) {
 *     // Coupon logic mirrored in JS below
 *     return subtotal;
 *   }
 * }
 *
 * Compiled with: emcc pricing.cpp -o pricing.wasm -O2 -s WASM=1
 * ─────────────────────────────────────────────────────────────────────────────
 */

const PricingEngine = (() => {
  // ── Constants ──
  const TAX_RATE = 18;               // 18% GST standard in India
  const FREE_SHIPPING_THRESHOLD = 499; // ₹
  const BASE_SHIPPING = 49;          // ₹

  const COUPONS = {
    'NEXUS10':  { type: 'percent',  value: 10,  label: '10% off' },
    'NEXUS20':  { type: 'percent',  value: 20,  label: '20% off' },
    'SAVE50':   { type: 'fixed',    value: 50,  label: '₹50 off' },
    'FREESHIP': { type: 'shipping', value: 100, label: 'Free Shipping' },
    'WELCOME':  { type: 'percent',  value: 15,  label: '15% off' },
  };

  /**
   * C++ equivalent: calculateDiscount()
   * Applies a percentage discount to a price
   */
  function calculateDiscount(price, discountPct) {
    if (discountPct < 0 || discountPct > 100) return price;
    return price * (1 - discountPct / 100);
  }

  /**
   * C++ equivalent: calculateTax()
   */
  function calculateTax(subtotal, taxRate = TAX_RATE) {
    return subtotal * (taxRate / 100);
  }

  /**
   * C++ equivalent: calculateShipping()
   */
  function calculateShipping(subtotal, couponIsShipping = false) {
    if (couponIsShipping || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    const extra = Math.max(0, (subtotal - 50) * 0.01);
    return BASE_SHIPPING + extra;
  }

  /**
   * C++ equivalent: calculateTotal()
   */
  function calculateTotal(subtotal, tax, shipping, couponDiscount) {
    const total = subtotal + tax + shipping - couponDiscount;
    return Math.max(0, total);
  }

  /**
   * Apply a coupon code — returns coupon info or null
   */
  function applyCoupon(code) {
    return COUPONS[code.toUpperCase()] || null;
  }

  /**
   * Main pricing calculation — returns a full breakdown object
   * @param {Array} cartItems  - [{price, qty}, ...]
   * @param {string} couponCode
   * @returns {Object} pricing breakdown
   */
  function calculate(cartItems, couponCode = '') {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const coupon = couponCode ? applyCoupon(couponCode) : null;
    let couponDiscount = 0;
    let couponIsShipping = false;

    if (coupon) {
      if (coupon.type === 'percent') {
        couponDiscount = subtotal * (coupon.value / 100);
      } else if (coupon.type === 'fixed') {
        couponDiscount = Math.min(coupon.value, subtotal);
      } else if (coupon.type === 'shipping') {
        couponIsShipping = true;
      }
    }

    const discountedSubtotal = subtotal - couponDiscount;
    const tax = calculateTax(discountedSubtotal);
    const shipping = calculateShipping(discountedSubtotal, couponIsShipping);
    const total = calculateTotal(discountedSubtotal, tax, shipping, 0);

    return {
      subtotal:       subtotal,
      couponDiscount: couponDiscount,
      couponLabel:    coupon ? coupon.label : null,
      tax:            tax,
      shipping:       shipping,
      total:          total,
      freeShipping:   shipping === 0,
    };
  }

  return { calculate, applyCoupon, calculateDiscount, calculateShipping, FREE_SHIPPING_THRESHOLD };
})();
