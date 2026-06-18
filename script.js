// ============================================
// CONFIG — fill these in with your own EmailJS values
// Get them from https://dashboard.emailjs.com/admin
// ============================================
const EMAILJS_PUBLIC_KEY = "PNqrfLf0c8FZ5jmnl";
const EMAILJS_SERVICE_ID = "service_6wz0eba";
const EMAILJS_TEMPLATE_ID = "template_p7oiub8";

// ============================================
// Footer year
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.querySelector(".footer-year");
  if (yearEl) {
    yearEl.textContent = `© ${new Date().getFullYear()}`;
  }
});

// ============================================
// EmailJS init
// ============================================
if (window.emailjs && EMAILJS_PUBLIC_KEY !== "PNqrfLf0c8FZ5jmnl") {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  
}

// ============================================
// Contact form submission
// ============================================
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const submitBtn = form.querySelector(".btn-submit");
const submitText = form.querySelector(".btn-submit-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (EMAILJS_PUBLIC_KEY === "PNqrfLf0c8FZ5jmnl") {
    statusEl.textContent = "Contact form isn't wired up yet — add your EmailJS keys in script.js.";
    statusEl.className = "form-status error";
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = "Sending...";
  statusEl.textContent = "";
  statusEl.className = "form-status";

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value,
    });

    statusEl.textContent = "Message sent — I'll get back to you soon.";
    statusEl.className = "form-status success";
    form.reset();
  } catch (err) {
    console.error("EmailJS error:", err);
    statusEl.textContent = "Something went wrong. Try emailing directly instead.";
    statusEl.className = "form-status error";
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = "Send message";
  }
});

// ============================================
// Smooth-scroll active nav state (optional polish)
// ============================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute("href") === `#${id}`
              ? "var(--text)"
              : "";
          });
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}