const couponList = document.getElementById("couponList");

function getCoupons() {
  return JSON.parse(localStorage.getItem("coupons")) || [];
}
function saveCoupons(list) {
  localStorage.setItem("coupons", JSON.stringify(list));
}

function renderCoupons() {
  couponList.innerHTML = "";
  getCoupons().forEach(c => {
    couponList.innerHTML += `
      <li>${c.code} (${c.type} ${c.value})
      <button onclick="removeCoupon('${c.code}')">❌</button></li>
    `;
  });
}

function removeCoupon(code) {
  saveCoupons(getCoupons().filter(c => c.code !== code));
  renderCoupons();
}

document.getElementById("addCouponBtn").onclick = () => {
  const code = couponCode.value.toUpperCase();
  saveCoupons([...getCoupons(), { code, type:couponType.value, value:+couponValue.value }]);
  renderCoupons();
};

renderCoupons();
