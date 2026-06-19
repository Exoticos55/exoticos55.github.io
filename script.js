// Reveal sections on scroll
document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".about, .projects, .contact, .project-card"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));

  // Adjust transmission line height to match full document height
  const path = document.getElementById("trace-path");
  const svg = document.querySelector(".transmission-line");
  function resizeLine() {
    const height = document.body.scrollHeight;
    svg.setAttribute("viewBox", `0 0 100 ${height}`);
    path.setAttribute("d", `M50,0 L50,${height}`);
  }
  resizeLine();
  window.addEventListener("resize", resizeLine);
});
