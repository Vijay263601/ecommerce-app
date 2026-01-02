function logout() {
  // Remove admin session
  localStorage.removeItem("adminLoggedIn");

  // Optional: clear admin-related temp state
  localStorage.removeItem("editingProductId");

  // Redirect to login page
  window.location.href = "login.html";
}
