(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    status.textContent = "";
    status.className = "form-status";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    // Validación básica
    if (!data.name || !data.email || !data.subject || !data.message) {
      showError("Por favor complete todos los campos.");
      return;
    }

    if (!isValidEmail(data.email)) {
      showError("Correo electrónico no válido.");
      return;
    }

    // Simulación de envío (placeholder)
    setLoading(true);

    //ESTO SE CAMBIA CUANDO SE IMPLEMENTE LA API DE ENVIO
    //fetch("/api/contact", { ... })
    setTimeout(() => {
      setLoading(false);
      showSuccess("Mensaje enviado correctamente.");
      form.reset();
    }, 1200);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function setLoading(loading) {
    const btn = form.querySelector("button");
    btn.disabled = loading;
    btn.textContent = loading ? "Enviando..." : "Enviar";
  }

  function showError(msg) {
    status.textContent = msg;
    status.classList.add("error");
  }

  function showSuccess(msg) {
    status.textContent = msg;
    status.classList.add("success");
  }
})();