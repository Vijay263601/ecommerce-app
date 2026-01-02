function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || products;
}
function getStock() {
  return JSON.parse(localStorage.getItem("stock")) || {};
}
function saveStock(stock) {
  localStorage.setItem("stock", JSON.stringify(stock));
}

const table = document.getElementById("inventoryTable");
let stock = getStock();

renderInventory();

function renderInventory() {
  table.innerHTML = "";
  getProducts().forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${stock[p.id] || 0}</td>
        <td>
          <input type="number" id="s${p.id}">
          <button onclick="addStock(${p.id})">Add</button>
        </td>
      </tr>
    `;
  });
}

function addStock(id) {
  const qty = +document.getElementById("s"+id).value;
  if (!qty) return;
  stock[id] = (stock[id] || 0) + qty;
  saveStock(stock);
  renderInventory();
}
