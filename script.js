
// ================= CONTACT FORM: VALIDATION + FORMSPREE =================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Your Formspree endpoint
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwlvajap";

// Automatically display the current year
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form submission
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    if (!name || !email || !subject || !message) {
      formStatus.textContent =
        "Something went wrong with the form. Please try again later.";
      formStatus.className = "text-center text-danger";
      return;
    }

    // Reset previous status
    formStatus.textContent = "";
    formStatus.className = "text-center";

    contactForm.classList.add("was-validated");

    // Validate name
    const nameValid = name.value.trim().length >= 2;

    name.setCustomValidity(
      nameValid ? "" : "Enter at least 2 characters."
    );

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailPattern.test(email.value.trim());

    email.setCustomValidity(
      emailValid ? "" : "Enter a valid email address."
    );

    // Validate subject
    const subjectValid = subject.value.trim().length > 0;

    subject.setCustomValidity(
      subjectValid ? "" : "Subject is required."
    );

    // Validate message
    const messageValid = message.value.trim().length >= 10;

    message.setCustomValidity(
      messageValid ? "" : "Enter at least 10 characters."
    );

    // Stop if validation fails
    if (!contactForm.checkValidity()) {
      formStatus.textContent =
        "Please correct the highlighted fields.";

      formStatus.classList.add("text-danger");

      contactForm.reportValidity();
      return;
    }

    // Find submit button
    const submitButton = contactForm.querySelector(
      'button[type="submit"], input[type="submit"]'
    );

    const originalButtonHTML = submitButton
      ? submitButton.innerHTML
      : "";

    if (submitButton) {
      submitButton.disabled = true;

      submitButton.innerHTML =
        'Sending... <span class="spinner-border spinner-border-sm ms-2" aria-hidden="true"></span>';
    }

    try {
      // Send form data to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent =
          "Thank you! Your message has been sent successfully.";

        formStatus.className =
          "text-center alert alert-success mt-3";

        // Clear the form after successful submission
        contactForm.reset();

        contactForm.classList.remove("was-validated");

        [name, email, subject, message].forEach(function (field) {
          field.setCustomValidity("");
        });
      } else {
        let errorMessage =
          "Unable to send your message. Please try again.";

        try {
          const result = await response.json();

          if (result.errors && result.errors.length > 0) {
            errorMessage = result.errors
              .map(function (error) {
                return error.message;
              })
              .join(" ");
          }
        } catch (error) {
          // Keep the default error message
        }

        formStatus.textContent = errorMessage;

        formStatus.className =
          "text-center alert alert-danger mt-3";
      }
    } catch (error) {
      formStatus.textContent =
        "Network error. Please check your internet connection and try again.";

      formStatus.className =
        "text-center alert alert-danger mt-3";
    } finally {
      // Restore the submit button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });

  // Clear custom validation errors when the user edits a field
  ["name", "email", "subject", "message"].forEach(function (fieldId) {
    const field = document.getElementById(fieldId);

    if (field) {
      field.addEventListener("input", function () {
        field.setCustomValidity("");
      });
    }
  });
}

// ================= BACK TO TOP BUTTON =================

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  // Set initial visibility
  backToTop.style.display =
    window.scrollY > 300 ? "block" : "none";

  // Show or hide on scroll
  window.addEventListener("scroll", function () {
    backToTop.style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  // Scroll smoothly to the top
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ================= MOBILE NAVIGATION =================

// Close the mobile menu after selecting a section
document.querySelectorAll("#navbarNav .nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    const navbar = document.getElementById("navbarNav");

    if (
      navbar &&
      navbar.classList.contains("show") &&
      typeof bootstrap !== "undefined"
    ) {
      const collapse =
        bootstrap.Collapse.getInstance(navbar) ||
        bootstrap.Collapse.getOrCreateInstance(navbar);

      collapse.hide();
    }
  });
});
