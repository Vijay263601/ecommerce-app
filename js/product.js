const table = document.getElementById("productTable");

const pName = document.getElementById("pName");
const pDesc = document.getElementById("pDesc");
const pMrp = document.getElementById("pMrp");
const pPrice = document.getElementById("pPrice");
const pImages = document.getElementById("pImages");
const pStock = document.getElementById("pStock");

const saveBtn = document.getElementById("addProductBtn");
const cancelBtn = document.getElementById("cancelEditBtn");

let editId = null;

/* ================= HELPERS ================= */

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || [];
}

function saveProducts(list) {
  localStorage.setItem("products", JSON.stringify(list));
}

function getStock() {
  return JSON.parse(localStorage.getItem("stock")) || {};
}

function saveStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

/* ================= RENDER ================= */

function renderProducts() {
  const products = getProducts();
  const stock = getStock();
  table.innerHTML = "";

  products.forEach(p => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.name}</td>
      <td>₹${p.price}</td>
      <td>${stock[p.id] ?? p.stock ?? 0}</td>
      <td>
        <button onclick="editProduct(${p.id})">✏ Edit</button>
        <button style="background:#ef4444" onclick="deleteProduct(${p.id})">
          ❌ Delete
        </button>
      </td>
    `;

    table.appendChild(tr);
  });
}

/* ================= ADD / EDIT ================= */

saveBtn.onclick = () => {
  const name = pName.value.trim();
  const desc = pDesc.value.trim();
  const mrp = Number(pMrp.value);
  const price = Number(pPrice.value);
  const stockQty = Number(pStock.value);
  const images = pImages.value
    .split(",")
    .map(i => i.trim())
    .filter(Boolean);

  if (!name || !price || !mrp || images.length === 0) {
    alert("Please fill all required fields");
    return;
  }

  let products = getProducts();
  let stock = getStock();

  if (editId) {
    // UPDATE
    products = products.map(p =>
      p.id === editId
        ? { ...p, name, description: desc, mrp, price, images }
        : p
    );
    stock[editId] = stockQty;
  } else {
    // ADD
    const id = Date.now();
    products.push({
      id,
      name,
      description: desc,
      mrp,
      price,
      images
    });
    stock[id] = stockQty;
  }

  saveProducts(products);
  saveStock(stock);
  resetForm();
  renderProducts();
};

function editProduct(id) {
  const products = getProducts();
  const stock = getStock();
  const p = products.find(x => x.id === id);
  if (!p) return;

  editId = id;

  pName.value = p.name;
  pDesc.value = p.description || "";
  pMrp.value = p.mrp;
  pPrice.value = p.price;
  pImages.value = p.images.join(", ");
  pStock.value = stock[id] ?? 0;

  saveBtn.textContent = "Update Product";
  cancelBtn.style.display = "inline-block";
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  const products = getProducts().filter(p => p.id !== id);
  const stock = getStock();
  delete stock[id];

  saveProducts(products);
  saveStock(stock);

  // remove from cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));

  renderProducts();
}

function resetForm() {
  editId = null;
  pName.value = "";
  pDesc.value = "";
  pMrp.value = "";
  pPrice.value = "";
  pImages.value = "";
  pStock.value = "";

  saveBtn.textContent = "Save Product";
  cancelBtn.style.display = "none";
}

cancelBtn.onclick = resetForm;

/* ================= INIT ================= */

renderProducts();
