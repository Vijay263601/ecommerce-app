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

    const status = order.status || "placed";
    const deliveryDate = order.deliveryDate || "";

    const itemsHTML = items.map(i =>
      `<li>${i.name} × ${i.qty} — ₹${i.price * i.qty}</li>`
    ).join("");

    const div = document.createElement("div");
    div.className = `order-card ${status === "cancelled" ? "cancelled" : ""}`;

    div.innerHTML = `
      <h3>Order #${order.id}</h3>

      <p><strong>Name:</strong> ${customer.name || "-"}</p>
      <p><strong>Email:</strong> ${customer.email || "-"}</p>
      <p><strong>Address:</strong> ${customer.address || "-"}</p>

      <!-- STATUS BADGE -->
      <div class="admin-status ${status}">
        ${status.replaceAll("_", " ").toUpperCase()}
      </div>

      <!-- STATUS CONTROL -->
      <label>Status:</label>
      <select onchange="updateStatus(${order.id}, this.value)">
        <option value="placed" ${status==="placed"?"selected":""}>Placed</option>
        <option value="processing" ${status==="processing"?"selected":""}>Processing</option>
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
        <span class="${statusStep(status, 1)}">Placed</span>
        <span class="${statusStep(status, 2)}">Processing</span>
        <span class="${statusStep(status, 3)}">Out for Delivery</span>
        <span class="${statusStep(status, 4)}">Delivered</span>
      </div>

      <ul>${itemsHTML}</ul>
      <p><strong>Total:</strong> ₹${order.total}</p>

      ${
        status !== "cancelled"
          ? `<button class="danger" onclick="cancelOrder(${order.id})">
              Cancel Order
            </button>`
          : `<p class="cancelled-text">❌ Order Cancelled</p>`
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

/* ================= TIMELINE HELPER ================= */

function statusStep(status, step) {
  const steps = {
    placed: 1,
    processing: 2,
    out_for_delivery: 3,
    delivered: 4,
    cancelled: 4
  };
  return steps[status] >= step ? "done" : "";
}

/* ================= ACTIONS ================= */

function updateStatus(id, newStatus) {
  const allowed = ["placed","processing","out_for_delivery","delivered","cancelled"];
  if (!allowed.includes(newStatus)) return;

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (order.id !== id) return order;

    const updated = { ...order, status: newStatus };

    // auto set delivery date on delivered
    if (newStatus === "delivered" && !order.deliveryDate) {
      updated.deliveryDate = new Date().toISOString().split("T")[0];
    }

    return updated;
  });

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
  orders = orders.map(o =>
    o.id === id ? { ...o, status: "cancelled" } : o
  );

  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}

/* ================= SIMULATIONS ================= */

function sendNotification(email, status) {
  alert(`📧 Email / SMS sent to ${email}\n\nOrder status: ${status.toUpperCase()}`);
}

function confirmDelivery(id) {
  alert("✅ Delivery confirmed by customer");
}
