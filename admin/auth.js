/* ================= ADMIN AUTH ================= */

const ADMIN_USER = "Vijay";
const ADMIN_PASS = "7248";

const loginBtn = document.getElementById("loginBtn");
const errorEl = document.getElementById("error");

if (loginBtn) {
  loginBtn.onclick = () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (!user || !pass) {
      errorEl.textContent = "Enter username and password";
      return;
    }

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "index.html";
    } else {
      errorEl.textContent = "Invalid credentials";
    }
  };
}
