const HOURS = { 1: [420, 1140], 2: [420, 1140], 3: [420, 1140], 4: [420, 1140], 5: [420, 1110] };
const EMAIL = "info@kitapekitas.ch";

function zurichNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zurich",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type).value;
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function initOpenStatus() {
  const targets = document.querySelectorAll("[data-open-status]");
  if (!targets.length) return;
  const { day, minutes } = zurichNow();
  const slot = HOURS[day];
  const open = Boolean(slot && minutes >= slot[0] && minutes < slot[1]);
  targets.forEach((el) => {
    el.dataset.state = open ? "open" : "closed";
    el.textContent = open ? "Jetzt geöffnet" : "Zurzeit geschlossen";
  });
  document.querySelectorAll(`[data-day="${day}"]`).forEach((el) => el.classList.add("is-today"));
}

function initYear() {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = year));
}

function initForms() {
  document.querySelectorAll("form[data-mail]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [];
      form.querySelectorAll("[data-label]").forEach((field) => {
        const name = field.name || field.dataset.name;
        const values = data.getAll(name).filter(Boolean);
        if (values.length) lines.push(`${field.dataset.label}: ${values.join(", ")}`);
      });
      const subject = form.dataset.mail;
      const body = lines.join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      form.classList.add("is-sent");
    });
  });
}

function initLightbox() {
  const links = [...document.querySelectorAll("[data-lightbox]")];
  const dialog = document.querySelector(".lightbox");
  if (!links.length || !dialog) return;
  const img = dialog.querySelector("img");
  const count = dialog.querySelector(".lightbox__count");
  let index = 0;

  const show = (i) => {
    index = (i + links.length) % links.length;
    const link = links[index];
    img.src = link.href;
    img.alt = link.querySelector("img")?.alt || "";
    count.textContent = `${index + 1} / ${links.length}`;
    const next = new Image();
    next.src = links[(index + 1) % links.length].href;
  };

  links.forEach((link, i) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(i);
      dialog.showModal();
    })
  );

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lightbox__prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lightbox__next").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });

  let startX = 0;
  dialog.addEventListener("touchstart", (event) => (startX = event.touches[0].clientX), { passive: true });
  dialog.addEventListener(
    "touchend",
    (event) => {
      const delta = event.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 50) show(index + (delta < 0 ? 1 : -1));
    },
    { passive: true }
  );
}

initOpenStatus();
initYear();
initForms();
initLightbox();
