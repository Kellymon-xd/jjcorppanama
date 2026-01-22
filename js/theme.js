function syncThemeUI() {
  const html = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  if (!toggle) return;

  toggle.textContent = html.classList.contains("dark") ? "☀️" : "🌙";
}

// restaurar tema
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
}

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  localStorage.setItem("theme", theme);
  syncThemeUI();
}

/* =========================
   NAVBAR + DROPDOWN (MOBILE FIX)
========================= */

/* ===== NOSOTROS: MOBILE → ABRE / LUEGO NAVEGA ===== */
document.addEventListener("pointerdown", (e) => {
  const link = e.target.closest(".dropdown-toggle");
  if (!link) return;
  if (window.innerWidth > 768) return;

  const parent = link.closest(".has-dropdown");
  const navLinks = document.querySelector(".nav-links");

  // Primer tap → abre y marca
  if (!parent.classList.contains("open")) {
    e.preventDefault();
    parent.classList.add("open");
    link.dataset.opened = "true"; // 👈 flag
    return;
  }
});

/* ===== CLICK GENERAL ===== */
document.addEventListener("click", (e) => {
  syncThemeUI();


  /* ===== DARK MODE ===== */
  if (e.target.id === "themeToggle") {
    const html = document.documentElement;

    html.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      html.classList.contains("dark") ? "dark" : "light"
    );

    syncThemeUI();
    return;
  }

  /* ===== HAMBURGER ===== */
  if (e.target.closest(".nav-toggle")) {
    document.querySelector(".nav-links")?.classList.toggle("open");
    return;
  }

  /* HAMBURGER */
  if (e.target.closest(".nav-toggle")) {
    document.querySelector(".nav-links")?.classList.toggle("open");
    return;
  }

  const link = e.target.closest(".dropdown-toggle");

  /* BLOQUEAR NAVEGACIÓN EN PRIMER TAP */
  if (link && window.innerWidth <= 768 && link.dataset.opened === "true") {
    e.preventDefault();              // ⛔ bloquea navegación
    delete link.dataset.opened;      // limpia flag
    return;
  }

  /* CERRAR MENÚ AL NAVEGAR */
  if (e.target.closest(".nav-links a")) {
    document.querySelector(".nav-links")?.classList.remove("open");
  }
});

/* =========================
   NAVBAR SCROLL
========================= */
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

/* =========================
   PROJECTS CAROUSEL
========================= */
document.querySelectorAll(".project-card").forEach(card => {
  const track = card.querySelector(".project-track");
  const images = card.dataset.images.split(",");
  let index = 0;

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = "img/proyectos/" + src;
    track.appendChild(img);

    img.onclick = () => {
      document.getElementById("modalImage").src = img.src;
      document.getElementById("imageModal").style.display = "flex";
    };
  });

  card.querySelector(".next").onclick = () => {
    index = (index + 1) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  card.querySelector(".prev").onclick = () => {
    index = (index - 1 + images.length) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
});

/* =========================
   IMAGE MODAL
========================= */
document.querySelector(".modal-close").onclick = () =>
  document.getElementById("imageModal").style.display = "none";

document.getElementById("imageModal").onclick = e => {
  if (e.target.id === "imageModal") {
    e.currentTarget.style.display = "none";
  }
};


/* =========================
   EQUIPMENT IMAGE MODAL
========================= */
document.querySelectorAll(".equipment-grid img").forEach(img => {
  img.addEventListener("click", () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    modalImg.src = img.src;
    modal.style.display = "flex";
  });
});

/* cerrar modal */
document.querySelector(".modal-close").onclick = () => {
  document.getElementById("imageModal").style.display = "none";
};

document.getElementById("imageModal").onclick = e => {
  if (e.target.id === "imageModal") {
    e.currentTarget.style.display = "none";
  }
};
