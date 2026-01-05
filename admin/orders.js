console.log("ADMIN ORDERS JS LOADED");

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

    const itemsHTML = items.map(i =>
      `<li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>`
    ).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>

      <p><strong>Name:</strong> ${customer.name || "-"}</p>
      <p><strong>Email:</strong> ${customer.email || "-"}</p>
      <p><strong>Address:</strong> ${customer.address || "-"}</p>

      <!-- STATUS BADGE -->
      <div class="admin-status ${status}">
        ${status.replaceAll("_"," ").toUpperCase()}
      </div>

      <!-- STATUS CONTROL -->
      <label>Status:</label>
      <select onchange="updateStatus(${order.id}, this.value)">
        <option value="processing" ${status==="processing"?"selected":""}>Processing</option>
        <option value="placed" ${status==="placed"?"selected":""}>placed</option>
        <option value="out_for_delivery" ${status==="out_for_delivery"?"selected":""}>Out for Delivery</option>
        <option value="delivered" ${status==="delivered"?"selected":""}>Delivered</option>
        <option value="cancelled" ${status==="cancelled"?"selected":""}>Cancelled</option>
      </select>

      <label>Delivery Date:</label>
      <input type="date"
        value="${deliveryDate}"
        onchange="updateDeliveryDate(${order.id}, this.value)">

      <!-- TIMELINE -->
      <div class="timeline">
        <span class="${statusStep(status,1)}">Placed</span>
        <span class="${statusStep(status,2)}">Processing</span>
        <span class="${statusStep(status,3)}">Out</span>
        <span class="${statusStep(status,4)}">Delivered</span>
      </div>

      <ul>${itemsHTML}</ul>
      <p><strong>Total:</strong> ₹${order.total}</p>

      ${
        status !== "cancelled"
          ? `<button class="danger" onclick="cancelOrder(${order.id})">Cancel Order</button>`
          : `<p class="cancelled-text">Order Cancelled</p>`
      }

      <button onclick="sendNotification('${customer.email}','${status}')">
        Send Email / SMS
      </button>

      ${
        status === "delivered"
          ? `<button class="success" onclick="confirmDelivery(${order.id})">
              Confirm Delivered
            </button>`
          : ""
      }
    `;

    container.appendChild(div);
  });
}

/* ================= HELPERS ================= */

function statusStep(status, step) {
  const map = {
    processing: 2,
    out_for_delivery: 3,
    delivered: 4,
    cancelled: 0
  };
  return map[status] >= step ? "done" : "";
}

/* ================= ACTIONS ================= */

function updateStatus(id, status) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o => o.id === id ? { ...o, status } : o);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}

function updateDeliveryDate(id, date) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o => o.id === id ? { ...o, deliveryDate: date } : o);
  localStorage.setItem("orders", JSON.stringify(orders));
}

function cancelOrder(id) {
  if (!confirm("Cancel this order?")) return;
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o => o.id === id ? { ...o, status:"cancelled" } : o);
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}

/* ================= SIMULATIONS ================= */

function sendNotification(email, status) {
  alert(
    `📧 Email / SMS sent to ${email}\n\nOrder status: ${status.toUpperCase()}`
  );
}

function confirmDelivery(id) {
  alert("✅ Delivery confirmed by customer");
}
