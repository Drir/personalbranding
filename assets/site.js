(() => {
  "use strict";

  const logoMarquee = document.querySelector(".logo-marquee");
  const logoToggle = document.getElementById("logos-toggle");

  if (logoMarquee && logoToggle) {
    const updateLogoToggle = (paused) => {
      logoMarquee.dataset.paused = String(paused);
      logoToggle.setAttribute("aria-pressed", String(paused));
      logoToggle.textContent = paused ? "Reprendre le défilement" : "Pause";
      logoToggle.setAttribute(
        "aria-label",
        paused ? "Reprendre le défilement des références" : "Mettre les références en pause"
      );
    };
    updateLogoToggle(logoMarquee.dataset.paused === "true");
    logoToggle.addEventListener("click", () => {
      updateLogoToggle(logoMarquee.dataset.paused !== "true");
    });
  }

  const dialog = document.getElementById("lead-dialog");
  const form = document.getElementById("lead-form");
  if (!dialog || !form) return;

  const title = document.getElementById("lead-title");
  const description = document.getElementById("lead-description");
  const status = document.getElementById("lead-status");
  const modeNote = document.getElementById("lead-mode-note");
  const submit = document.getElementById("lead-submit");
  const email = form.elements.namedItem("email");
  const resource = form.elements.namedItem("resource");
  const message = form.elements.namedItem("message");
  const consent = form.elements.namedItem("consent");
  const honeypot = form.elements.namedItem("_gotcha");
  const recipient = "remibuczek@gmail.com";
  const requests = {
    givaudan: { subject: "Étude de cas — Le Parfumeur", request: "Je souhaite explorer votre étude de cas Givaudan : Le Parfumeur." },
    galileo: { subject: "Étude de cas — Le Pédagogue", request: "Je souhaite explorer votre étude de cas Galileo : Le Pédagogue." },
    invivo: { subject: "Étude de cas — Le Malteur", request: "Je souhaite explorer votre étude de cas InVivo / Soufflet : Le Malteur." },
    epex: { subject: "Étude de cas — Le Trader", request: "Je souhaite explorer votre étude de cas EPEX SPOT : Le Trader." },
    methode: { subject: "Méthode — Head of Product Hands-on", request: "Je souhaite recevoir votre méthode « Head of Product Hands-on »." },
    contact: { subject: "Échange autour de mon projet", request: "Je souhaite échanger avec vous au sujet de mon projet." }
  };

  let opener = null;
  let session = 0;
  let pending = false;
  let previousOverflow = "";

  const setStatus = (text, state = "") => {
    if (!status) return;
    status.textContent = text;
    status.dataset.state = state;
  };

  const getEndpoint = () => {
    const configured = (form.dataset.endpoint || "").trim();
    if (!configured) return null;
    try {
      const url = new URL(configured);
      if (url.protocol !== "https:" || url.username || url.password) return false;
      return url.href;
    } catch {
      return false;
    }
  };

  const refreshDeliveryMode = () => {
    const endpoint = getEndpoint();
    if (submit) {
      submit.textContent = endpoint ? "Envoyer ma demande" : "Ouvrir mon email";
      submit.disabled = endpoint === false;
    }
    if (modeNote) {
      modeNote.textContent = endpoint === false
        ? "Le formulaire est momentanément indisponible. Écrivez-moi à remibuczek@gmail.com."
        : endpoint
          ? "Votre adresse sert uniquement à vous répondre et à vous transmettre la ressource demandée."
          : "Cette demande s’envoie depuis votre messagerie. Vous pourrez relire l’email avant de l’envoyer.";
    }
  };

  document.addEventListener("click", (event) => {
    const trigger = event.target instanceof Element ? event.target.closest("[data-lead]") : null;
    if (!trigger) return;
    const key = trigger.dataset.lead;
    if (!Object.hasOwn(requests, key)) return;

    event.preventDefault();
    opener = trigger;
    session += 1;
    pending = false;
    form.reset();
    form.removeAttribute("aria-busy");
    for (const field of [email, message, consent]) {
      if (field && typeof field.setCustomValidity === "function") field.setCustomValidity("");
    }
    if (resource) resource.value = key;
    if (title) title.textContent = trigger.dataset.title || requests[key].subject;
    if (description) description.textContent = trigger.dataset.description || "Laissez-moi votre email pour poursuivre l’échange.";
    setStatus("");
    refreshDeliveryMode();

    if (!dialog.open) {
      previousOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (email) email.focus();
  });

  dialog.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  dialog.addEventListener("close", () => {
    session += 1;
    document.body.style.overflow = previousOverflow;
    if (opener && opener.isConnected) opener.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    if (honeypot && honeypot.value.trim()) {
      setStatus("La demande ne peut pas être préparée. Écrivez-moi à remibuczek@gmail.com.", "error");
      return;
    }

    const resourceKey = resource ? resource.value : "contact";
    const request = requests[resourceKey] || requests.contact;
    const endpoint = getEndpoint();
    if (endpoint === false) {
      setStatus("Le formulaire est momentanément indisponible. Écrivez-moi à remibuczek@gmail.com.", "error");
      return;
    }

    if (!endpoint) {
      const body = [
        "Bonjour Rémi,",
        "",
        request.request,
        "",
        `Mon email : ${email ? email.value.trim() : ""}`,
        message && message.value.trim() ? `\n${message.value.trim()}` : "",
        "",
        "Merci !"
      ].join("\n");
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("Votre messagerie s’ouvre avec la demande préparée. Envoyez cet email pour me la transmettre.", "prepared");
      return;
    }

    const currentSession = session;
    pending = true;
    form.setAttribute("aria-busy", "true");
    if (submit) {
      submit.disabled = true;
      submit.textContent = "Envoi en cours…";
    }
    setStatus("Envoi de votre demande…", "pending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Request rejected");
      if (currentSession !== session) return;
      form.reset();
      if (resource) resource.value = resourceKey;
      setStatus(form.dataset.delivery || "Votre demande a bien été transmise. Je vous recontacte par email.", "success");
    } catch {
      if (currentSession !== session) return;
      setStatus("L’envoi n’a pas pu être confirmé. Réessayez ou écrivez-moi à remibuczek@gmail.com.", "error");
    } finally {
      if (currentSession === session) {
        pending = false;
        form.removeAttribute("aria-busy");
        refreshDeliveryMode();
      }
    }
  });

  refreshDeliveryMode();
})();
