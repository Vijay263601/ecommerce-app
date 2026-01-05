document.addEventListener("DOMContentLoaded", () => {

  const orderItemsEl = document.getElementById("orderItems");
  const orderTotalEl = document.getElementById("orderTotal");
  const form = document.getElementById("checkoutForm");

  if (!orderItemsEl || !orderTotalEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  orderItemsEl.innerHTML = "";

  if (cart.length === 0) {
    orderItemsEl.innerHTML = "<p>No items in cart.</p>";
    orderTotalEl.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const imgSrc =
      item.image ||
      item.images?.[0] ||
      "assets/images/default.jpg";

    const div = document.createElement("div");
    div.className = "order-item";

    div.innerHTML = `
      <div style="display:flex;gap:10px;align-items:center">
        <img src="${imgSrc}" width="60" onerror="this.src='assets/images/default.jpg'">
        <div>
          <p>${item.name} × ${item.qty}</p>
          <strong>₹${item.price * item.qty}</strong>
        </div>
      </div>
    `;

    orderItemsEl.appendChild(div);
  });

  orderTotalEl.textContent = "Total: ₹" + total;

  if (form) {
    form.addEventListener("submit", e => {
      if (cart.length === 0) {
        e.preventDefault();
        alert("Your cart is empty");
      }
    });
  }

});
