/* ================= CART STORAGE ================= */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= ADD TO CART ================= */

function addToCart(product) {
  let cart = getCart();

  // image safety (MOST IMPORTANT FIX)
  const image =
    product?.images?.[0] ||
    product?.image ||
    "assets/images/default.jpg";

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: image,
      qty: 1
    });
  }

  saveCart(cart);

  // update badge if exists
  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

/* ================= REMOVE ITEM ================= */

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}

/* ================= UPDATE QUANTITY ================= */

function updateCartQty(id, qty) {
  if (qty < 1) return;

  const cart = getCart();
  const item = cart.find(i => i.id === id);

  if (!item) return;

  item.qty = qty;
  saveCart(cart);
}

/* ================= CLEAR CART ================= */

function clearCart() {
  localStorage.removeItem("cart");

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}
