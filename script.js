const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Automatically display the current year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact Form Validation
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  // Reset previous validation messages
  formStatus.textContent = "";
  formStatus.className = "text-center";
  contactForm.classList.add("was-validated");

  // Validate the name
  const nameValid = name.value.trim().length >= 2;
  name.setCustomValidity(nameValid ? "" : "Enter at least 2 characters.");

  // Validate the email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailPattern.test(email.value.trim());
  email.setCustomValidity(emailValid ? "" : "Enter a valid email.");

  // Validate the subject
  const subjectValid = subject.value.trim().length > 0;
  subject.setCustomValidity(subjectValid ? "" : "Subject is required.");

  // Validate the message
  const messageValid = message.value.trim().length >= 10;
  message.setCustomValidity(
    messageValid ? "" : "Enter at least 10 characters.",
  );

  // Check all form fields
  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Please correct the highlighted fields.";
    formStatus.classList.add("text-danger");
    contactForm.reportValidity();
    return;
  }

  // Demo success: no backend or email service is connected
  formStatus.textContent =
    "Form validated successfully! This is a demo; no message was sent.";
  formStatus.classList.add("text-success");

  contactForm.reset();
  contactForm.classList.remove("was-validated");

  [name, email, subject, message].forEach(function (field) {
    field.setCustomValidity("");
  });
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Close the mobile navigation menu after selecting a section
document.querySelectorAll("#navbarNav .nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    const navbar = document.getElementById("navbarNav");
    const bsCollapse = bootstrap.Collapse.getInstance(navbar);

    if (bsCollapse && navbar.classList.contains("show")) {
      bsCollapse.hide();
    }
  });
});
