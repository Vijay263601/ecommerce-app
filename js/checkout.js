/* ================= ELEMENTS ================= */

const orderItemsEl = document.getElementById("orderItems");
const orderTotalEl = document.getElementById("orderTotal");
const form = document.getElementById("checkoutForm");

/* ================= GET CART SAFELY ================= */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

const cart = getCart();

orderItemsEl.innerHTML = "";

if (cart.length === 0) {
  orderItemsEl.innerHTML = "<p>No items in cart.</p>";
  orderTotalEl.textContent = "Total: ₹0";
} else {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML = `
      <p>${item.name} × ${item.qty}</p>
      <strong>₹${item.price * item.qty}</strong>
    `;
    orderItemsEl.appendChild(div);
  });

  orderTotalEl.textContent = "Total: ₹" + total;
}

/* ================= SUBMIT SAFETY ================= */

if (form) {
  form.addEventListener("submit", e => {
    if (cart.length === 0) {
      e.preventDefault();
      alert("Your cart is empty");
    }
  });
}
