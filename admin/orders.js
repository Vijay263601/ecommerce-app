/* ================= ADMIN ORDER RENDER ================= */

function renderOrders(isAdmin = false) {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.slice().reverse().forEach(order => {
    const customer = order.customer || {};
    const items = order.items || [];
    const status = order.status || "active";
    const paid = order.paid === true;
    const paymentMode = order.paymentMode || "Online";

    const itemsHTML = items.map(item => `
      <li>
        ${item.name} × ${item.qty}
        — ₹${item.price * item.qty}
      </li>
    `).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p><strong>Date:</strong> ${order.date || "-"}</p>

      <p><strong>Name:</strong> ${customer.name || "-"}</p>
      <p><strong>Email:</strong> ${customer.email || "-"}</p>
      <p><strong>Address:</strong> ${customer.address || "-"}</p>

      <p>
        <strong>Order Status:</strong>
        <span style="color:${status === "cancelled" ? "red" : "green"}">
          ${status.toUpperCase()}
        </span>
      </p>

      <p>
        <strong>Payment Mode:</strong> ${paymentMode}
      </p>

      <p>
        <strong>Payment Status:</strong>
        <span style="color:${paid ? "green" : "orange"}">
          ${paid ? "PAID" : "NOT PAID"}
        </span>
      </p>

      <ul>${itemsHTML}</ul>

      <p><strong>Total:</strong> ₹${order.total}</p>

      ${
        status !== "cancelled" ? `
          <button onclick="cancelOrder(${order.id})"
            style="background:#ef4444">
            Cancel Order
          </button>
        ` : `<p style="color:red;font-weight:600">Order Cancelled</p>`
      }
    `;

    container.appendChild(div);
  });
}

/* ================= CANCEL ORDER ================= */

function cancelOrder(id) {
  if (!confirm("Cancel this order?")) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order =>
    order.id === id
      ? { ...order, status: "cancelled" }
      : order
  );

  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}
