// Initial seed products (used only once)
const seedProducts = [
  {
    id: 1,
    name: "Men's T-Shirt",
    mrp: 699,
    price: 499,
    images: ["assets/images/tshirt.jpg"],
    description: "Comfortable cotton t-shirt",
    stock: 7
  },
  {
    id: 2,
    name: "Running Shoes",
    mrp: 2499,
    price: 1999,
    images: ["assets/images/shoes.jpg"],
    description: "Lightweight running shoes",
    stock: 5
  }
];

/* ================= PRODUCT HELPERS ================= */

function getProducts() {
  return JSON.parse(localStorage.getItem("products")) || seedProducts;
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
