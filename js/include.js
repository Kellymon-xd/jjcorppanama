async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  el.innerHTML = await res.text();
  syncThemeUI();

}

loadPartial("site-header", "partials/navbar.html");
loadPartial("site-footer", "partials/footer.html");