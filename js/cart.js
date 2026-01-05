function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const image =
    product.images?.[0] ||
    product.image ||
    "assets/images/default.jpg";

  const found = cart.find(i => i.id === product.id);

  if (found) {
    found.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: image,
      qty: 1
    });
  }

  saveCart(cart);

  if (typeof updateCartCount === "function") {
    updateCartCount();
  }
}
