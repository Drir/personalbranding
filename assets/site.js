(() => {
  "use strict";

  const language = document.documentElement.lang.toLowerCase().startsWith("en") ? "en" : "fr";
  const translations = {
    fr: {
      resumeLogos: "Reprendre le défilement des références",
      pauseLogos: "Mettre les références en pause",
      sendRequest: "Envoyer ma demande",
      openEmail: "Ouvrir mon email",
      unavailable: "Le formulaire est momentanément indisponible. Écrivez-moi à remibuczek@gmail.com.",
      deliveryNote: "Votre adresse sert uniquement à vous répondre et à vous transmettre la ressource demandée.",
      emailNote: "Cette demande s’envoie depuis votre messagerie. Vous pourrez relire l’email avant de l’envoyer.",
      description: "Laissez-moi votre email pour poursuivre l’échange.",
      blockedRequest: "La demande ne peut pas être préparée. Écrivez-moi à remibuczek@gmail.com.",
      greeting: "Bonjour Rémi,",
      emailLabel: "Mon email :",
      thanks: "Merci !",
      prepared: "Votre messagerie s’ouvre avec la demande préparée. Envoyez cet email pour me la transmettre.",
      sendingButton: "Envoi en cours…",
      sendingStatus: "Envoi de votre demande…",
      success: "Votre demande a bien été transmise. Je vous recontacte par email.",
      error: "L’envoi n’a pas pu être confirmé. Réessayez ou écrivez-moi à remibuczek@gmail.com.",
      requests: {
        givaudan: { subject: "Étude de cas — Le Parfumeur", request: "Je souhaite explorer votre étude de cas Givaudan : Le Parfumeur." },
        galileo: { subject: "Étude de cas — Le Pédagogue", request: "Je souhaite explorer votre étude de cas Galileo : Le Pédagogue." },
        invivo: { subject: "Étude de cas — Le Malteur", request: "Je souhaite explorer votre étude de cas InVivo / Soufflet : Le Malteur." },
        epex: { subject: "Étude de cas — Le Trader", request: "Je souhaite explorer votre étude de cas EPEX SPOT : Le Trader." },
        methode: { subject: "Méthode — Head of Product Hands-on", request: "Je souhaite recevoir votre méthode « Head of Product Hands-on »." },
        contact: { subject: "Échange autour de mon projet", request: "Je souhaite échanger avec vous au sujet de mon projet." }
      }
    },
    en: {
      resumeLogos: "Resume scrolling client logos",
      pauseLogos: "Pause client logos",
      sendRequest: "Send my request",
      openEmail: "Open my email app",
      unavailable: "The form is temporarily unavailable. Please email me at remibuczek@gmail.com.",
      deliveryNote: "Your email address is only used to reply to you and send you the resource you requested.",
      emailNote: "This request will open in your email app. You can review the email before sending it.",
      description: "Leave your email address to continue the conversation.",
      blockedRequest: "Your request could not be prepared. Please email me at remibuczek@gmail.com.",
      greeting: "Hi Rémi,",
      emailLabel: "My email:",
      thanks: "Thank you!",
      prepared: "Your email app is opening with your request ready to send. Send the email to get in touch.",
      sendingButton: "Sending…",
      sendingStatus: "Sending your request…",
      success: "Your request has been sent. I’ll get back to you by email.",
      error: "Your request could not be confirmed. Please try again or email me at remibuczek@gmail.com.",
      requests: {
        givaudan: { subject: "Case study — The Perfumer", request: "I’d like to learn more about your Givaudan case study: The Perfumer." },
        galileo: { subject: "Case study — The Educator", request: "I’d like to learn more about your Galileo case study: The Educator." },
        invivo: { subject: "Case study — The Maltster", request: "I’d like to learn more about your InVivo / Soufflet case study: The Maltster." },
        epex: { subject: "Case study — The Trader", request: "I’d like to learn more about your EPEX SPOT case study: The Trader." },
        methode: { subject: "Method — Head of Product Hands-on", request: "I’d like to receive your “Head of Product Hands-on” guide." },
        contact: { subject: "Let’s discuss my project", request: "I’d like to discuss my project with you." }
      }
    }
  };
  const copy = translations[language];

  const logoMarquee = document.querySelector(".logo-marquee");
  const logoToggle = document.getElementById("logos-toggle");

  if (logoMarquee && logoToggle) {
    const logoRegion = logoMarquee.closest(".references") || logoMarquee;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let manuallyPaused = logoMarquee.dataset.paused === "true";
    let hovered = false;
    let pointerPaused = null;

    const updateLogoToggle = () => {
      const paused = manuallyPaused || hovered || reducedMotion.matches;
      logoMarquee.dataset.paused = String(paused);
      logoToggle.setAttribute("aria-pressed", String(paused));
      logoToggle.innerHTML = paused
        ? '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg>'
        : '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M7 5h4v14H7zm6 0h4v14h-4z" fill="currentColor"/></svg>';
      logoToggle.setAttribute(
        "aria-label",
        paused ? copy.resumeLogos : copy.pauseLogos
      );
    };
    logoMarquee.addEventListener("mouseenter", () => {
      hovered = true;
      updateLogoToggle();
    });
    logoMarquee.addEventListener("mouseleave", () => {
      hovered = false;
      updateLogoToggle();
    });
    logoRegion.addEventListener("focusin", () => {
      // Keyboard focus stops rotation until the visitor explicitly restarts it.
      manuallyPaused = true;
      updateLogoToggle();
    });
    logoToggle.addEventListener("pointerdown", () => {
      // Preserve the intended action if pointer focus pauses before click fires.
      pointerPaused = manuallyPaused;
    });
    logoToggle.addEventListener("click", (event) => {
      const wasPaused = event.detail > 0 && pointerPaused !== null
        ? pointerPaused
        : manuallyPaused;
      manuallyPaused = !wasPaused;
      pointerPaused = null;
      updateLogoToggle();
    });
    reducedMotion.addEventListener("change", updateLogoToggle);
    updateLogoToggle();
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
  const requests = copy.requests;

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
      submit.textContent = endpoint ? copy.sendRequest : copy.openEmail;
      submit.disabled = endpoint === false;
    }
    if (modeNote) {
      modeNote.textContent = endpoint === false
        ? copy.unavailable
        : endpoint
          ? copy.deliveryNote
          : copy.emailNote;
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
    if (description) description.textContent = trigger.dataset.description || copy.description;
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
      setStatus(copy.blockedRequest, "error");
      return;
    }

    const resourceKey = resource ? resource.value : "contact";
    const request = requests[resourceKey] || requests.contact;
    const endpoint = getEndpoint();
    if (endpoint === false) {
      setStatus(copy.unavailable, "error");
      return;
    }

    if (!endpoint) {
      const body = [
        copy.greeting,
        "",
        request.request,
        "",
        `${copy.emailLabel} ${email ? email.value.trim() : ""}`,
        message && message.value.trim() ? `\n${message.value.trim()}` : "",
        "",
        copy.thanks
      ].join("\n");
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(request.subject)}&body=${encodeURIComponent(body)}`;
      setStatus(copy.prepared, "prepared");
      return;
    }

    const currentSession = session;
    pending = true;
    form.setAttribute("aria-busy", "true");
    if (submit) {
      submit.disabled = true;
      submit.textContent = copy.sendingButton;
    }
    setStatus(copy.sendingStatus, "pending");

    try {
      const payload = new FormData(form);
      payload.set("_subject", `[remibuczek.com] ${request.subject}`);
      const response = await fetch(endpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" }
      });
      if (!response.ok) throw new Error("Request rejected");
      const result = await response.json().catch(() => ({}));
      if (result.ok === false || result.errors) throw new Error("Request rejected");
      if (currentSession !== session) return;
      form.reset();
      if (resource) resource.value = resourceKey;
      setStatus(form.dataset.delivery || copy.success, "success");
    } catch {
      if (currentSession !== session) return;
      setStatus(copy.error, "error");
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
