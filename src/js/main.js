// Theme toggle (remembers choice, defaults to system preference)
const root = document.documentElement;
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
root.dataset.theme = savedTheme || (prefersDark ? "dark" : "light");

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", root.dataset.theme);
});

// Mobile menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuToggle").addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("open")));

// Typing terminal
const lines = [
  "$ git push origin main",
  "→ Running CI pipeline...",
  "✔ Lint passed",
  "✔ 128 tests passed",
  "✔ Docker image built: skyline:1.0.0",
  "✔ Deployed to production in 12s 🚀",
];
const term = document.getElementById("terminalText");
let line = 0, char = 0;
function type() {
  if (line >= lines.length) return;
  term.textContent += lines[line][char++] ?? "";
  if (char > lines[line].length) {
    term.textContent += "\n";
    line++;
    char = 0;
    setTimeout(type, 400);
  } else {
    setTimeout(type, 35);
  }
}
type();

// Count-up stats
function countUp(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = el.dataset.count.includes(".") ? 1 : 0;
  const start = performance.now();
  const duration = 1500;
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = (target * p).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll("[data-count]").forEach(countUp);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Signup form (demo only, nothing is sent)
document.getElementById("ctaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formMsg").textContent = "Thanks! You're on the list 🎉";
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
