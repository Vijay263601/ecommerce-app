function renderOrders() {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet.</p>";
    return;
  }

  orders.slice().reverse().forEach(order => {
    const status = order.status || "processing";
    const deliveryDate = order.deliveryDate || "To be updated";

    const itemsHTML = (order.items || []).map(i =>
      `<li>${i.name} × ${i.qty}</li>`
    ).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>

      <!-- STATUS BADGE -->
      <div class="status-badge ${status}">
        ${status.replaceAll("_"," ").toUpperCase()}
      </div>

      <!-- TIMELINE -->
      <div class="order-timeline">
        <span class="${stepDone(status,1)}">Placed</span>
        <span class="${stepDone(status,2)}">Processing</span>
        <span class="${stepDone(status,3)}">Out for Delivery</span>
        <span class="${stepDone(status,4)}">Delivered</span>
      </div>

      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>

      <ul>${itemsHTML}</ul>

      <p><strong>Total:</strong> ₹${order.total}</p>

      ${
        status === "delivered"
          ? `<p class="delivered-msg">✅ Delivered Successfully</p>`
          : ""
      }
    `;

    container.appendChild(div);
  });
}

/* ===== TIMELINE HELPER ===== */
function stepDone(status, step) {
  const map = {
    processing: 2,
    out_for_delivery: 3,
    delivered: 4,
    cancelled: 0
  };
  return map[status] >= step ? "done" : "";
}
