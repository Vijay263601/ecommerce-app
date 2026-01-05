const productListEl = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");

let searchTerm = "";

function renderProducts(list) {
  if (!productListEl) return;
  productListEl.innerHTML = "";

  if (list.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
    `;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = e => {
      e.stopPropagation();
      addToCart(product);
    };

    div.appendChild(btn);
    productListEl.appendChild(div);
  });
}

function applySearch() {
  const products = getProducts();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
}

if (searchInput) {
  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value.toLowerCase();
    applySearch();
  });
}

applySearch();
