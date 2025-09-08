// Contact Form JavaScript
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  // Form elements
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const queryTypeRadios = document.querySelectorAll('input[name="queryType"]');
  const message = document.getElementById("message");
  const consent = document.getElementById("consent");

  // Error message elements
  const firstNameError = document.getElementById("firstName-error");
  const lastNameError = document.getElementById("lastName-error");
  const emailError = document.getElementById("email-error");
  const queryTypeError = document.getElementById("queryType-error");
  const messageError = document.getElementById("message-error");
  const consentError = document.getElementById("consent-error");

  // Radio button styling
  queryTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      document.querySelectorAll(".radio-option").forEach((option) => {
        option.classList.remove("selected");
      });

      // Add selected class to the parent of the checked radio
      if (this.checked) {
        this.closest(".radio-option").classList.add("selected");
      }
    });
  });

  // Real-time validation
  firstName.addEventListener("blur", validateFirstName);
  firstName.addEventListener("input", clearError.bind(null, firstName, firstNameError));

  lastName.addEventListener("blur", validateLastName);
  lastName.addEventListener("input", clearError.bind(null, lastName, lastNameError));

  email.addEventListener("blur", validateEmail);
  email.addEventListener("input", clearError.bind(null, email, emailError));

  queryTypeRadios.forEach((radio) => {
    radio.addEventListener("change", validateQueryType);
  });

  message.addEventListener("blur", validateMessage);
  message.addEventListener("input", clearError.bind(null, message, messageError));

  consent.addEventListener("change", validateConsent);

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isQueryTypeValid = validateQueryType();
    const isMessageValid = validateMessage();
    const isConsentValid = validateConsent();

    // If all fields are valid, show success message
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isQueryTypeValid &&
      isMessageValid &&
      isConsentValid
    ) {
      showToast("success");
      form.reset();

      // Clear all error messages
      clearAllErrors();

      // Remove selected styling from radio buttons
      document.querySelectorAll(".radio-option").forEach((option) => {
        option.classList.remove("selected");
      });
    } else showToast("error")
  });

  // Validation functions
  function validateFirstName() {
    const value = firstName.value.trim();

    if (!value) {
      showError(firstName, firstNameError, "This field is required");
      return false;
    }

    clearError(firstName, firstNameError);
    return true;
  }

  function validateLastName() {
    const value = lastName.value.trim();

    if (!value) {
      showError(lastName, lastNameError, "This field is required");
      return false;
    }

    clearError(lastName, lastNameError);
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      showError(email, emailError, "This field is required");
      return false;
    }

    if (!emailRegex.test(value)) {
      showError(email, emailError, "Please enter a valid email address");
      return false;
    }

    clearError(email, emailError);
    return true;
  }

  function validateQueryType() {
    const isChecked = Array.from(queryTypeRadios).some((radio) => radio.checked);

    if (!isChecked) {
      queryTypeError.textContent = "Please select a query type";
      return false;
    }

    queryTypeError.textContent = "";
    return true;
  }

  function validateMessage() {
    const value = message.value.trim();

    if (!value) {
      showError(message, messageError, "This field is required");
      return false;
    }

    clearError(message, messageError);
    return true;
  }

  function validateConsent() {
    if (!consent.checked) {
      consentError.textContent = "To submit this form, please consent to being contacted";
      return false;
    }

    consentError.textContent = "";
    return true;
  }

  // Helper functions
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add("error");
    errorElement.textContent = message;

    // Set focus to the first error field
    if (!document.querySelector(".error")) {
      inputElement.focus();
    }
  }

  function clearError(inputElement, errorElement) {
    inputElement.classList.remove("error");
    errorElement.textContent = "";
  }

  function clearAllErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    const inputElements = document.querySelectorAll("input, textarea");

    errorElements.forEach((el) => (el.textContent = ""));
    inputElements.forEach((el) => el.classList.remove("error"));
  }

  function showToast(state) {
    toast.classList.add("show");
    const toastTitle = document.getElementById("toast-title");  
    const toastMessage = document.getElementById("toast-message");

    if(state === "error") {
      toastTitle.textContent = "Error!";
      toastMessage.textContent = "Please fix the errors in the form and try again.";
    } else {
      toastTitle.textContent = "Message Sent!";
      toastMessage.textContent = "Thanks for completing the form. We'll be in touch soon!";
    }

    // Auto-hide after 5 seconds
    setTimeout(() => hideToast(), 5000);

    // Allow manual close by clicking
    toast.addEventListener("click", hideToast);
  }

  function hideToast() {
    toast.classList.remove("show");
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", function (e) {
    // Close toast with Escape key
    if (e.key === "Escape" && toast.classList.contains("show")) {
      hideToast();
    }
  });

  // Improve radio button keyboard navigation
  queryTypeRadios.forEach((radio, index) => {
    radio.addEventListener("keydown", function (e) {
      let targetIndex;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          targetIndex = (index + 1) % queryTypeRadios.length;
          queryTypeRadios[targetIndex].focus();
          queryTypeRadios[targetIndex].checked = true;
          queryTypeRadios[targetIndex].dispatchEvent(new Event("change"));
          break;

        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          targetIndex = (index - 1 + queryTypeRadios.length) % queryTypeRadios.length;
          queryTypeRadios[targetIndex].focus();
          queryTypeRadios[targetIndex].checked = true;
          queryTypeRadios[targetIndex].dispatchEvent(new Event("change"));
          break;
      }
    });
  });

  // Form reset handling
  form.addEventListener("reset", function () {
    clearAllErrors();
    document.querySelectorAll(".radio-option").forEach((option) => {
      option.classList.remove("selected");
    });
  });
});
