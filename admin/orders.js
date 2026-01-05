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
    const status = order.status || "active";
    const paid = order.paid === true;
    const items = order.items || [];

    const itemsHTML = items.map(i => `
      <li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>
    `).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      ${isAdmin ? `
        <p><strong>Name:</strong> ${customer.name || "-"}</p>
        <p><strong>Email:</strong> ${customer.email || "-"}</p>
        <p><strong>Address:</strong> ${customer.address || "-"}</p>
      ` : ""}
      <p>Status: <strong style="color:${status === "cancelled" ? "red" : "green"}">${status}</strong></p>
      <p>Payment: ${paid ? "PAID" : "NOT PAID"}</p>
      <ul>${itemsHTML}</ul>
      <p><strong>Total:</strong> ₹${order.total}</p>

      ${isAdmin && status === "active" ? `
        <button onclick="togglePaid(${order.id})">${paid ? "Mark Unpaid" : "Mark Paid"}</button>
        <button style="background:#ef4444;margin-left:10px" onclick="cancelOrder(${order.id})">Cancel</button>
      ` : ""}
    `;

    container.appendChild(div);
  });
}

function togglePaid(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o => o.id === id ? { ...o, paid: !o.paid } : o);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}

function cancelOrder(id) {
  if (!confirm("Cancel this order?")) return;
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o => o.id === id ? { ...o, status: "cancelled" } : o);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}
