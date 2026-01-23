(async function () {
  await Promise.all([
    loadPartial("site-header", "/partials/navbar.html"),
    loadPartial("site-footer", "/partials/footer.html"),
  ]);

  // espera a que el navegador termine layout + estilos
  requestAnimationFrame(() => {
    document.documentElement.classList.add("app-ready");
  });
})();

async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();

  syncThemeUI();
}

(() => {
  const saved = localStorage.getItem("theme");
  if (saved) {
    document.documentElement.classList.toggle("dark", saved === "dark");
  }
})();
