/* ================= RENDER ORDERS ================= */

function renderOrders(isAdmin = false) {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  container.innerHTML = "";

  orders.slice().reverse().forEach(order => {
    // Backward compatibility
    const customer = order.customer || {};
    const status = order.status || "active";
    const paid = order.paid === true;
    const items = order.items || [];
    const paymentMode = order.paymentMode || "COD";

    const itemsHTML = items
      .map(
        item => `
        <li>
          ${item.name || "Item"} × ${item.qty || 1}
          — ₹${(item.price || 0) * (item.qty || 1)}
        </li>
      `
      )
      .join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p><strong>Date:</strong> ${order.date || "-"}</p>

      ${
        isAdmin
          ? `
            <p><strong>Name:</strong> ${customer.name || "-"}</p>
            <p><strong>Email:</strong> ${customer.email || "-"}</p>
            <p><strong>Address:</strong> ${customer.address || "-"}</p>
          `
          : ""
      }

      <p>
        <strong>Status:</strong>
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
      <p><strong>Total:</strong> ₹${order.total || 0}</p>

      ${
        isAdmin && status === "active"
          ? `
            <button onclick="togglePaid(${order.id})">
              ${paid ? "Mark Unpaid" : "Mark Paid"}
            </button>

            <button
              style="background:#ef4444;margin-left:10px"
              onclick="cancelOrder(${order.id})">
              Cancel Order
            </button>
          `
          : ""
      }
    `;

    container.appendChild(div);
  });
}

/* ================= ADMIN ACTIONS ================= */

function togglePaid(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(o =>
    o.id === id ? { ...o, paid: !o.paid } : o
  );

  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}

function cancelOrder(id) {
  if (!confirm("Cancel this order?")) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(o =>
    o.id === id ? { ...o, status: "cancelled" } : o
  );

  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}
