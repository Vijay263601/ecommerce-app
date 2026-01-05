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

    const status = order.status || "processing";
    const deliveryDate = order.deliveryDate || "";

    const itemsHTML = items.map(i => `
      <li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>
    `).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>

      <p><strong>Name:</strong> ${customer.name || "-"}</p>
      <p><strong>Email:</strong> ${customer.email || "-"}</p>
      <p><strong>Address:</strong> ${customer.address || "-"}</p>

      <label><strong>Status:</strong></label>
      <select onchange="updateStatus(${order.id}, this.value)">
        <option value="processing" ${status==="processing"?"selected":""}>Processing</option>
        <option value="out_for_delivery" ${status==="out_for_delivery"?"selected":""}>Out for Delivery</option>
        <option value="delivered" ${status==="delivered"?"selected":""}>Delivered</option>
        <option value="cancelled" ${status==="cancelled"?"selected":""}>Cancelled</option>
      </select>

      <br><br>

      <label><strong>Delivery Date:</strong></label>
      <input type="date"
        value="${deliveryDate}"
        onchange="updateDeliveryDate(${order.id}, this.value)">

      <ul>${itemsHTML}</ul>
      <p><strong>Total:</strong> ₹${order.total}</p>
    `;

    container.appendChild(div);
  });
}

/* ===== ADMIN ACTIONS ===== */

function updateStatus(id, newStatus) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o =>
    o.id === id ? { ...o, status: newStatus } : o
  );
  localStorage.setItem("orders", JSON.stringify(orders));
}

function updateDeliveryDate(id, date) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o =>
    o.id === id ? { ...o, deliveryDate: date } : o
  );
  localStorage.setItem("orders", JSON.stringify(orders));
}
