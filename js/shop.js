/* ===================== ADS ===================== */

function loadAds() {
  const adsTrack = document.getElementById("adsTrack");
  if (!adsTrack) return;

  const ads = JSON.parse(localStorage.getItem("ads")) || [];
  adsTrack.innerHTML = "";

  ads.forEach(ad => {
    const span = document.createElement("span");
    span.textContent = ad.text;
    adsTrack.appendChild(span);
  });
}

loadAds();

/* ===================== PRODUCTS ===================== */

const productListEl = document.getElementById("productList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-box button");

let currentSearch = "";
let currentPriceFilter = "all";

// 🔥 SINGLE SOURCE OF TRUTH
function getAllProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

// Render products
function renderProducts(list) {
  productListEl.innerHTML = "";

  if (!list || list.length === 0) {
    productListEl.innerHTML = "<p>No products found.</p>";
    return;
  }

  const stock = getStock();

  list.forEach(product => {
    const mrp = product.mrp || product.price;
    const price = product.price;
    const discount = Math.round(((mrp - price) / mrp) * 100);

    const imgSrc =
      Array.isArray(product.images) && product.images.length
        ? product.images[0]
        : product.image || "assets/images/default.jpg";

    const div = document.createElement("div");
    div.className = "product";

    // click to open product page
    div.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };

    div.innerHTML = `
      <img src="${imgSrc}">
      <h3>${product.name}</h3>

      <p>
        ₹${price}
        <small style="text-decoration:line-through;color:gray">
          ₹${mrp}
        </small>
      </p>

      <small style="color:green;font-weight:600">
        ${discount}% OFF
      </small>
    `;

    const btn = document.createElement("button");

    if ((stock[product.id] ?? 0) <= 0) {
      btn.textContent = "Out of Stock";
      btn.disabled = true;
    } else {
      btn.textContent = `Add to Cart (${stock[product.id]} left)`;
      btn.onclick = e => {
        e.stopPropagation(); // 🔥 prevent page navigation
        addToCart(product);
        applyFilters();
      };
    }

    div.appendChild(btn);
    productListEl.appendChild(div);
  });
}

/* ===================== FILTERS ===================== */

function applyFilters() {
  let data = getAllProducts();

  let filtered = data.filter(p =>
    p.name.toLowerCase().includes(currentSearch)
  );

  if (currentPriceFilter === "low") {
    filtered = filtered.filter(p => p.price < 1000);
  } else if (currentPriceFilter === "mid") {
    filtered = filtered.filter(p => p.price >= 1000 && p.price <= 2000);
  } else if (currentPriceFilter === "high") {
    filtered = filtered.filter(p => p.price > 2000);
  }

  renderProducts(filtered);
}

// Initial render
applyFilters();

/* ===================== EVENTS ===================== */

// Search
searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.toLowerCase();
  applyFilters();
});

// Price filters
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentPriceFilter = btn.dataset.price;
    applyFilters();
  });
});
