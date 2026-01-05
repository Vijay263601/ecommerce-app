console.log("ADMIN ORDERS JS LOADED");

function renderOrders(isAdmin = false) {
  console.log("renderOrders called", isAdmin);

  const container = document.getElementById("ordersContainer");
  console.log("container:", container);

  if (!container) return;

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  console.log("orders:", orders);

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders found.</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";
    div.innerHTML = `
      <h3>Order #${order.id}</h3>
      <p>Status: ${order.status}</p>
      <p>Total: ₹${order.total}</p>
      <button onclick="cancelOrder(${order.id})"
        style="background:red;color:white">
        Cancel Order
      </button>
    `;
    container.appendChild(div);
  });
}

function cancelOrder(id) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders = orders.map(o =>
    o.id === id ? { ...o, status: "cancelled" } : o
  );
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders(true);
}
