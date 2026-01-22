(() => {
  const carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".hero-track");
  const slides = carousel.querySelectorAll("img");
  const prev = carousel.querySelector(".prev");
  const next = carousel.querySelector(".next");

  let index = 0;
  const total = slides.length;

  function go(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prev.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));

  // autoplay
  setInterval(() => go(index + 1), 5000);
})();


/* =========================
   THEME
========================= */

function syncThemeUI() {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;
  toggle.textContent =
    document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
}

function applyTheme(theme) {
  const html = document.documentElement;
  html.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  syncThemeUI();
}

/* =========================
   NAVBAR
========================= */

document.addEventListener("click", (e) => {
  /* ===== DARK MODE ===== */
  if (e.target.id === "themeToggle") {
    applyTheme(
      document.documentElement.classList.contains("dark")
        ? "light"
        : "dark"
    );
    return;
  }

  /* ===== HAMBURGER ===== */
  if (e.target.closest(".nav-toggle")) {
    document.querySelector(".nav-links")?.classList.toggle("open");
    return;
  }

  /* ===== DROPDOWN MOBILE ===== */
  const dropdownLink = e.target.closest(".dropdown-toggle");
  if (dropdownLink && window.innerWidth <= 768) {
    e.preventDefault();
    dropdownLink.closest(".has-dropdown")?.classList.toggle("open");
    return;
  }

  /* ===== CERRAR MENÚ AL NAVEGAR ===== */
  if (e.target.closest(".nav-links a")) {
    document.querySelector(".nav-links")?.classList.remove("open");
  }
});

/* ===== NAVBAR SCROLL ===== */
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    ?.classList.toggle("scrolled", window.scrollY > 60);
});

/* =========================
   IMAGE MODAL (GENÉRICO)
========================= */

function enableImageModal(selector) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  document.querySelectorAll(selector).forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });
}

// cerrar modal
document.querySelector(".modal-close")?.addEventListener("click", () => {
  document.getElementById("imageModal").style.display = "none";
});

document.getElementById("imageModal")?.addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    e.currentTarget.style.display = "none";
  }
});

/* =========================
   ACTIVAR MODAL EN IMÁGENES
========================= */

// servicios
enableImageModal(".service-images img");

// equipos
enableImageModal(".equipment-grid img");

/* =========================
   PROJECTS CAROUSEL
========================= */
document.querySelectorAll(".project-card").forEach(card => {
  const track = card.querySelector(".project-track");
  const images = card.dataset.images.split(",");
  let index = 0;
  const total = images.length;

  function go(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = "img/proyectos/" + src;
    track.appendChild(img);

    img.onclick = () => {
      document.getElementById("modalImage").src = img.src;
      document.getElementById("imageModal").style.display = "flex";
    };
  });

  card.querySelector(".next").onclick = () => go(index + 1);
  card.querySelector(".prev").onclick = () => go(index - 1);

  // autoplay (cada 4s, puedes ajustar)
  setInterval(() => {
    go(index + 1);
  }, 4000);
});

window.addEventListener("load", () => {
  const track = document.querySelector(".hero-track");
  if (!track) return;

  track.style.display = "flex";
  track.style.flexWrap = "nowrap";
});
