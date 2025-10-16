const wrapper = document.getElementById("tickerWrapper");
const postsList = document.getElementById("postsList");
const video = document.getElementById("specialVideo");
const lastUpdatedEl = document.getElementById("lastUpdated");

// Učitaj i prikaži vesti
async function fetchPosts() {
  try {
    const res = await fetch("/api/posts", { cache: "no-store" });
    const posts = await res.json();

    // Očisti listu
    postsList.innerHTML = "";

    // Renderuj stavke
    posts.forEach(p => {
      const li = document.createElement("li");

      // Link (naslov)
      const link = document.createElement("a");
      link.href = p.link;
      link.textContent = p.title;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.className = "post-title";

      // Vreme
      const date = document.createElement("span");
      const dt = new Date(p.date);
      date.textContent = dt.toLocaleString();
      date.className = "post-date";

      // QR kod
      const qr = document.createElement("img");
      qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(p.link)}`;
      qr.alt = "QR";
      qr.className = "qr";

      // Wrapper za vreme + QR u jednom redu
      const infoWrapper = document.createElement("div");
      infoWrapper.className = "info-wrapper";
      infoWrapper.appendChild(date);
      infoWrapper.appendChild(qr);

      li.appendChild(link);
      li.appendChild(infoWrapper);
      postsList.appendChild(li);
    });

    // Ažuriraj status traku
    updateLastUpdated();
  } catch (err) {
    console.error("Greška pri učitavanju:", err);
  }
}

// Auto-scroll ticker
function startAutoScroll() {
  let direction = 1;
  function scroll() {
    wrapper.scrollTop += direction;

    // dno
    if (wrapper.scrollTop + wrapper.clientHeight >= wrapper.scrollHeight) {
      direction = -1;
      setTimeout(() => requestAnimationFrame(scroll), 5000);
      return;
    }
    // vrh
    if (wrapper.scrollTop <= 0) {
      direction = 1;
      setTimeout(() => requestAnimationFrame(scroll), 5000);
      return;
    }

    requestAnimationFrame(scroll);
  }
  scroll();
}

// Preklop između tikera i videa
function startSwitcher() {
  function showTicker() {
    wrapper.style.display = "block";
    video.style.display = "none";
    // posle 10 min prikaži video
    setTimeout(showVideo, 1 * 60 * 1000);
  }

  function showVideo() {
    wrapper.style.display = "none";
    video.style.display = "block";
    video.currentTime = 0;
    video.play();

    // posle ~3.5 min vrati se na tiker
    setTimeout(() => {
      video.pause();
      showTicker();
    }, 1* 60 * 1000);
  }

  showTicker();
}

// Status traka – poslednje ažuriranje
function updateLastUpdated() {
  if (!lastUpdatedEl) return;
  const now = new Date();
  const stamp = now.toLocaleString();
  lastUpdatedEl.textContent =
    `Напомена: Садржај странице се ажурира на сваких сат времена. Последње ажурирање: ${stamp}.`;
}

// Inicijalizacija
window.addEventListener("load", () => {
  fetchPosts();
  startAutoScroll();
  startSwitcher();

  // Automatsko osvežavanje svakih 60 minuta
  setInterval(fetchPosts, 60 * 60 * 1000);
});
