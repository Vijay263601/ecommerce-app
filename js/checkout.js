/* ================= CONFIG ================= */

const RAZORPAY_KEY = "rzp_test_xxxxxxxxx"; // 🔴 replace with your Razorpay TEST key

/* ================= ELEMENTS ================= */

const orderItemsEl = document.getElementById("orderItems");
const orderTotalEl = document.getElementById("orderTotal");
const form = document.getElementById("checkoutForm");

/* ================= DATA ================= */

const cart = getCart();
const appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon")) || null;

let finalTotal = 0;

renderOrderSummary();

/* ================= ORDER SUMMARY ================= */

function renderOrderSummary() {
  orderItemsEl.innerHTML = "";

  if (cart.length === 0) {
    orderItemsEl.innerHTML = "<p>No items in cart.</p>";
    orderTotalEl.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "order-item";
    div.innerHTML = `
      <p>${item.name} × ${item.qty}</p>
      <strong>₹${item.price * item.qty}</strong>
    `;
    orderItemsEl.appendChild(div);
  });

  let discount = 0;
  if (appliedCoupon) {
    discount =
      appliedCoupon.type === "percent"
        ? total * (appliedCoupon.value / 100)
        : appliedCoupon.value;
  }

  finalTotal = Math.max(total - discount, 0);

  orderTotalEl.textContent =
    `Total: ₹${Math.round(finalTotal)} (Saved ₹${Math.round(discount)})`;
}

/* ================= RAZORPAY PAYMENT ================= */

form.addEventListener("submit", e => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !email || !address) {
    alert("Please fill all billing details");
    return;
  }

  // 🔥 DIRECT RAZORPAY CHECKOUT
  const options = {
    key: RAZORPAY_KEY,
    amount: Math.round(finalTotal * 100), // paise
    currency: "INR",
    name: "My Shop",
    description: "Order Payment",
    prefill: {
      name,
      email
    },
    handler: function (response) {
      saveOrder(response.razorpay_payment_id);
    },
    theme: {
      color: "#2563eb"
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});

/* ================= SAVE ORDER ================= */

function saveOrder(paymentId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    id: Date.now(),
    date: new Date().toLocaleString(),
    customer: {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      address: document.getElementById("address").value.trim()
    },
    items: cart,
    total: Math.round(finalTotal),
    paymentMode: "RAZORPAY",
    paid: true,
    paymentId,
    status: "Active"
  });

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");
  localStorage.removeItem("appliedCoupon");

  alert("Payment successful 🎉 Order placed!");
  window.location.href = "orders.html";
}
