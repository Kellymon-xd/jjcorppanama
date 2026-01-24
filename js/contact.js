(() => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = document.getElementById("form-status");
  const ENDPOINT = "https://formspree.io/f/xdaebgjv";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    status.textContent = "";
    status.className = "form-status";

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    if (!data.name || !data.email || !data.subject || !data.message) {
      return showError("Por favor complete todos los campos.");
    }

    if (!isValidEmail(data.email)) {
      return showError("Correo electrónico no válido.");
    }

    setLoading(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error();

      showSuccess("Mensaje enviado correctamente. Gracias por contactarnos.");
      form.reset();
    } catch {
      showError("No se pudo enviar el mensaje. Intente más tarde.");
    } finally {
      setLoading(false);
    }
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