document.addEventListener("DOMContentLoaded", () => {

  /* ================= ELEMENTS ================= */
  const pName = document.getElementById("pName");
  const pDesc = document.getElementById("pDesc");
  const pMrp = document.getElementById("pMrp");
  const pPrice = document.getElementById("pPrice");

  const mainImage = document.getElementById("mainImage");
  const thumbs = document.getElementById("thumbs");
  const addToCartBtn = document.getElementById("addToCartBtn");

  if (!mainImage || !addToCartBtn) {
    console.error("Required elements missing in product.html");
    return;
  }

  /* ================= GET PRODUCT ID ================= */
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    alert("Invalid product");
    return;
  }

  /* ================= GET PRODUCTS ================= */
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const product = products.find(p => String(p.id) === String(productId));

  if (!product) {
    alert("Product not found");
    return;
  }

  /* ================= RENDER PRODUCT ================= */
  pName.textContent = product.name;
  pDesc.textContent = product.description || "";
  pMrp.textContent = `₹${product.mrp}`;
  pPrice.textContent = `₹${product.price}`;

  /* ================= IMAGES ================= */
  if (Array.isArray(product.images) && product.images.length > 0) {
    mainImage.src = product.images[0];
  } else {
    mainImage.src = "images/no-image.png";
  }

  mainImage.onerror = () => {
    mainImage.src = "images/no-image.png";
  };

  thumbs.innerHTML = "";

  (product.images || []).forEach(img => {
    const t = document.createElement("img");
    t.src = img;

    t.onclick = () => {
      mainImage.src = img;
    };

    thumbs.appendChild(t);
  });

  /* ================= ADD TO CART ================= */
  addToCartBtn.onclick = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find(i => i.id === product.id);

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        qty: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    addToCartBtn.textContent = "Added ✓";
    addToCartBtn.disabled = true;

    setTimeout(() => {
      addToCartBtn.textContent = "Add to Cart";
      addToCartBtn.disabled = false;
    }, 1200);
  };

});
