function logout() {
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("editingProductId");
  window.location.href = "login.html";
}
