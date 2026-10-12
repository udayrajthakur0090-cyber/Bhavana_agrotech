const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the navigation item for the section currently in view.
const sections = document.querySelectorAll("main section[id], main section");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    if (!id) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

document.querySelectorAll("#about, #services, #projects, #team, #contact").forEach((section) => {
  sectionObserver.observe(section);
});

document.getElementById("year").textContent = new Date().getFullYear();

// This front-end demo opens the visitor's email app; connect a backend or form service for live submissions.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const subject = encodeURIComponent(`Website enquiry: ${service}`);
  const body = encodeURIComponent(
    `Hello Bhawana Biotech team,\n\nMy name is ${name}.\nEmail: ${email}\nInterested in: ${service}\n\nProject details:\n${message || "Not provided"}\n\nPlease contact me to discuss the next steps.`
  );

  document.getElementById("formMessage").textContent = "Your email app should open with the enquiry drafted.";
  window.location.href = `mailto:info@bhawanabiotech.com?subject=${subject}&body=${body}`;
});
