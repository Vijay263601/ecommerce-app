function renderOrders(isAdmin = false) {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.reverse().forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p>Total: ₹${order.total}</p>
      <p>Status: ${order.status || "Active"}</p>
    `;

    container.appendChild(div);
  });
}
