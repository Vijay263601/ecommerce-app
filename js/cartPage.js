const cartContainer = document.getElementById("cartContainer");
const totalPriceEl = document.getElementById("totalPrice");

function renderCart() {
  const cart = getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const imgSrc =
      item.image ||
      item.images?.[0] ||
      "assets/images/default.jpg";

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${imgSrc}" onerror="this.src='assets/images/default.jpg'">

      <div class="cart-info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>

        <input type="number" min="1" value="${item.qty}">

        <button class="remove-btn"
          style="background:#ef4444;margin-top:8px">
          Remove
        </button>
      </div>
    `;

    /* ===== qty change (per product) ===== */
    div.querySelector("input").addEventListener("change", e => {
      const qty = Number(e.target.value);
      if (qty < 1) return;
      item.qty = qty;
      saveCart(cart);
      renderCart();
    });

    /* ===== remove THIS product only ===== */
    div.querySelector(".remove-btn").addEventListener("click", () => {
      const updatedCart = cart.filter(p => p.id !== item.id);
      saveCart(updatedCart);
      renderCart();

      if (typeof updateCartCount === "function") {
        updateCartCount();
      }
    });

    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = "Total: ₹" + total;
}

renderCart();
