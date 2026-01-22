(async function () {
  await Promise.all([
    loadPartial("site-header", "partials/navbar.html"),
    loadPartial("site-footer", "partials/footer.html"),
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
}

Promise.all([
  loadPartial("site-header", "partials/navbar.html"),
  loadPartial("site-footer", "partials/footer.html"),
]).then(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.add("app-ready");
  });
});


async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();

  syncThemeUI();
}
