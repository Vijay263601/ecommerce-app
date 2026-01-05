const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const products = getProducts();
const product = products.find(p => String(p.id) === String(productId));

if (!product) {
  alert("Product not found");
  window.location.href = "index.html";
}

document.getElementById("pName").textContent = product.name;
document.getElementById("pDesc").textContent = product.description;
document.getElementById("pMrp").textContent = "₹" + (product.mrp || product.price);
document.getElementById("pPrice").textContent = "₹" + product.price;

const mainImage = document.getElementById("mainImage");
const thumbs = document.getElementById("thumbs");

mainImage.src = product.images[0];

thumbs.innerHTML = "";
product.images.forEach(img => {
  const t = document.createElement("img");
  t.src = img;
  t.onclick = () => (mainImage.src = img);
  thumbs.appendChild(t);
});

document.getElementById("addToCartBtn").onclick = () => {
  addToCart(product);
};
