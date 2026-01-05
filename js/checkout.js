document.addEventListener("DOMContentLoaded", () => {

  const orderItemsEl = document.getElementById("orderItems");
  const orderTotalEl = document.getElementById("orderTotal");
  const form = document.getElementById("checkoutForm");

  if (!orderItemsEl || !orderTotalEl || !form) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  orderItemsEl.innerHTML = "";

  if (cart.length === 0) {
    orderItemsEl.innerHTML = "<p>No items in cart.</p>";
    orderTotalEl.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  /* ===== RENDER CART ITEMS ===== */
  cart.forEach(item => {
    const imgSrc =
      item.image ||
      item.images?.[0] ||
      "assets/images/default.jpg";

    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "order-item";

    div.innerHTML = `
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px">
        <img src="${imgSrc}" width="60"
          onerror="this.src='assets/images/default.jpg'">
        <div>
          <p>${item.name} × ${item.qty}</p>
          <strong>₹${item.price * item.qty}</strong>
        </div>
      </div>
    `;

    orderItemsEl.appendChild(div);
  });

  orderTotalEl.textContent = "Total: ₹" + total;

  /* ===== PLACE ORDER ===== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    const order = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      total: total,
      status: "active",
      paid: true,
      paymentMode: "Online",
      customer: {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value
      }
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // clear cart after order
    localStorage.removeItem("cart");

    // redirect to orders page
    window.location.href = "orders.html";
  });

});
