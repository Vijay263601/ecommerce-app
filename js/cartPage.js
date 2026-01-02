const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");
const couponInput = document.getElementById("couponInput");
const applyCouponBtn = document.getElementById("applyCoupon");
const couponMsg = document.getElementById("couponMsg");

// Applied coupon object (from admin)
let appliedCoupon = JSON.parse(localStorage.getItem("appliedCoupon")) || null;

renderCart();

/* ================= HELPERS ================= */

function getCoupons() {
  return JSON.parse(localStorage.getItem("coupons")) || [];
}

/* ================= RENDER CART ================= */

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "Total: ₹0";
    couponMsg.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}">
      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <input type="number" min="1" value="${item.qty}">
        <button class="remove">Remove</button>
      </div>
    `;

    div.querySelector("input").onchange = e => {
      updateQty(item.id, Number(e.target.value));
      renderCart();
    };

    div.querySelector(".remove").onclick = () => {
      removeFromCart(item.id);
      renderCart();
    };

    cartContainer.appendChild(div);
  });

  /* ================= APPLY COUPON ================= */

  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.type === "percent") {
      discount = total * (appliedCoupon.value / 100);
    } else if (appliedCoupon.type === "flat") {
      discount = appliedCoupon.value;
    }
  }

  const finalTotal = Math.max(total - discount, 0);

  totalPriceEl.textContent =
    `Total: ₹${Math.round(finalTotal)} (Saved ₹${Math.round(discount)})`;
}

/* ================= APPLY COUPON BUTTON ================= */

applyCouponBtn.addEventListener("click", () => {
  const code = couponInput.value.trim().toUpperCase();
  const coupons = getCoupons();

  const coupon = coupons.find(c => c.code === code);

  if (!coupon) {
    appliedCoupon = null;
    localStorage.removeItem("appliedCoupon");
    couponMsg.textContent = "Invalid coupon code";
    couponMsg.style.color = "red";
    renderCart();
    return;
  }

  appliedCoupon = coupon;
  localStorage.setItem("appliedCoupon", JSON.stringify(coupon));

  couponMsg.textContent = `Coupon ${coupon.code} applied ✔`;
  couponMsg.style.color = "green";

  renderCart();
});
