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

    const statusClass = {
      processing: "status processing",
      out_for_delivery: "status out",
      delivered: "status delivered",
      cancelled: "status cancelled"
    }[status];

    const itemsHTML = order.items.map(i => `
      <li>${i.name} × ${i.qty}</li>
    `).join("");

    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>

      <div class="${statusClass}">
        ${status.replaceAll("_"," ").toUpperCase()}
      </div>

      <p><strong>Delivery Date:</strong> ${deliveryDate}</p>

      <ul>${itemsHTML}</ul>

      <p><strong>Total:</strong> ₹${order.total}</p>
    `;

    container.appendChild(div);
  });
}
