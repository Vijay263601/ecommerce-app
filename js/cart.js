/* ================= CART STORAGE ================= */
function getStock() {
  return JSON.parse(localStorage.getItem("stock")) || {};
}

function saveStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

// Initialize stock once
(function initStock() {
  if (!localStorage.getItem("stock")) {
    const initialStock = {};
    products.forEach(p => {
      initialStock[p.id] = p.stock;
    });
    saveStock(initialStock);
  }
})();

// Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= CART ACTIONS ================= */

// Add product to cart
function addToCart(product) {
  const stock = getStock();

  if (stock[product.id] <= 0) {
    alert("Out of stock");
    return;
  }

  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  stock[product.id] -= 1;

  saveCart(cart);
  saveStock(stock);
  updateCartCount()
}


// Remove product from cart
function removeFromCart(id) {
  const cart = getCart().filter(item => item.id !== id);
  saveCart(cart);
}

// Update quantity of a product
function updateQty(id, qty) {
  if (qty < 1) return;

  const cart = getCart().map(item =>
    item.id === id ? { ...item, qty: qty } : item
  );

  saveCart(cart);
}

// Clear entire cart (optional utility)
function clearCart() {
  localStorage.removeItem("cart");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
