const orderItemsEl = document.getElementById("orderItems");
const orderTotalEl = document.getElementById("orderTotal");

const cart = getCart();
let total = 0;

orderItemsEl.innerHTML = "";

cart.forEach(item => {
  total += item.price * item.qty;
  const p = document.createElement("p");
  p.textContent = `${item.name} × ${item.qty}`;
  orderItemsEl.appendChild(p);
});

orderTotalEl.textContent = "Total: ₹" + total;
