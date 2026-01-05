const DEFAULT_IMAGE = "assets/images/default.jpg";

function normalizeProduct(p) {
  const images = Array.isArray(p.images)
    ? p.images
    : p.image
      ? [p.image]
      : [];

  return {
    ...p,
    images: images.length ? images : [DEFAULT_IMAGE],
    description: p.description || ""
  };
}

function getProducts() {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  return products.map(normalizeProduct);
}

function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
