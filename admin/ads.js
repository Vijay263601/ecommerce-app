const adsList = document.getElementById("adsList");
const adText = document.getElementById("adText");

function getAds() {
  return JSON.parse(localStorage.getItem("ads")) || [];
}
function saveAds(list) {
  localStorage.setItem("ads", JSON.stringify(list));
}

function renderAds() {
  adsList.innerHTML = "";
  getAds().forEach(a => {
    adsList.innerHTML += `
      <li>${a.text} <button onclick="removeAd(${a.id})">❌</button></li>
    `;
  });
}

function removeAd(id) {
  saveAds(getAds().filter(a => a.id !== id));
  renderAds();
}

document.getElementById("addAdBtn").onclick = () => {
  if (!adText.value) return;
  const ads = getAds();
  ads.push({ id: Date.now(), text: adText.value });
  saveAds(ads);
  adText.value = "";
  renderAds();
};

renderAds();
