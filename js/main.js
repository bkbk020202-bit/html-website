const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
const carousel = document.getElementById("projectCarousel");
const modal = document.getElementById("videoModal");
const header = document.querySelector(".header");

toggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
});

document.getElementById("prevProject").addEventListener("click", () => {
  carousel.scrollBy({ left: -240, behavior: "smooth" });
});

document.getElementById("nextProject").addEventListener("click", () => {
  carousel.scrollBy({ left: 240, behavior: "smooth" });
});

document.getElementById("watchVideo").addEventListener("click", () => {
  modal.hidden = false;
});

document.getElementById("closeVideo").addEventListener("click", () => {
  modal.hidden = true;
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.hidden = true;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modal.hidden = true;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

const links = document.querySelectorAll(".nav a");
const sections = [...links].map((link) => document.querySelector(link.getAttribute("href")));

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
  const y = window.scrollY + 120;
  sections.forEach((section, i) => {
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    links[i].classList.toggle("is-active", y >= top && y < bottom);
  });
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(
  ".services article, .projects .section-head, .project-card, .locations__copy, .locations__list, .stats > div, .footer__about, .cta-box"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.transitionDelay = `${Math.min(index * 45, 300)}ms`;
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));
