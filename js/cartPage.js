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

    const div = document.createElement("div");
    div.className = "cart-item";

    const imgSrc =
  item.image ||
  item.images?.[0] ||
  "assets/images/default.jpg";

div.innerHTML = `
  <img src="${imgSrc}" onerror="this.src='assets/images/default.jpg'">
  <div class="cart-info">
    <h4>${item.name}</h4>
    <p>₹${item.price}</p>
    <input type="number" min="1" value="${item.qty}">
  </div>
`;


    div.querySelector("input").onchange = e => {
      item.qty = Number(e.target.value);
      saveCart(cart);
      renderCart();
    };

    cartContainer.appendChild(div);
  });

  totalPriceEl.textContent = "Total: ₹" + total;
}

renderCart();
