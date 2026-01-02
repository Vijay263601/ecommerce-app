/* ================= ADMIN AUTH ================= */

// Change these credentials
const ADMIN_USER = "Vijay";
const ADMIN_PASS = "7248";

const loginBtn = document.getElementById("loginBtn");
const errorEl = document.getElementById("error");

if (loginBtn) {
  loginBtn.onclick = () => {
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem("adminLoggedIn", "true");
      window.location.href = "index.html"; // admin home
    } else {
      errorEl.textContent = "Invalid username or password";
    }
  };
}
