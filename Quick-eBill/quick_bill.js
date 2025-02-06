 

  function toggleCollapsible(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector(".toggle-icon");
    content.classList.toggle("collapsed");
    icon.classList.toggle("collapsed");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector(".collapsible-content");
    const icon = document.querySelector(".toggle-icon");
    if (content) content.classList.remove("collapsed");
    if (icon) icon.classList.remove("collapsed");
  });

  // Service number validation
  function validateServiceNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, "");
    checkFormValidity();
  }

  // ID number validation
  function validateIdNumber(input) {
    input.value = input.value.replace(/[^A-Za-z0-9]/g, "");
    checkFormValidity();
  }

  // Check if form is valid to enable/disable submit button
  // function checkFormValidity() {
  //   const serviceNumber = document.getElementById("serviceNumber").value.trim();
  //   const idNumber = document.getElementById("idNumber").value.trim();
  //   const submitBtn = document.getElementById("submitBtn");

  //   const isValid = serviceNumber && idNumber && idNumber.length >= 7 && idNumber.length <= 13;
  //   submitBtn.disabled = !isValid;
  // }

  // Form validation on submit
  function validateForm(event) {
    event.preventDefault();

    const serviceNumber = document.getElementById("serviceNumber");
    const idNumber = document.getElementById("idNumber");
    const serviceNumberError = document.getElementById("serviceNumberError");
    const idNumberError = document.getElementById("idNumberError");

    let isValid = true;

    // Validate service number
    if (!serviceNumber.value.trim()) {
      serviceNumber.classList.add("error");
      serviceNumberError.style.display = "block";
      isValid = false;
    } else {
      serviceNumber.classList.remove("error");
      serviceNumberError.style.display = "none";
    }

    // Validate ID number
    const idValue = idNumber.value.trim();
    const isIdValid = idValue.length >= 7 && idValue.length <= 13;

    if (!idValue || !isIdValid) {
      idNumber.classList.add("error");
      idNumberError.style.display = "block";
      isValid = false;
    } else {
      idNumber.classList.remove("error");
      idNumberError.style.display = "none";
    }

    if (isValid) {
      window.location.href = "quick_bill_step2.html";
    }

    return isValid;
  }

  // Example modal functions
  function showExample() {
    document.getElementById("exampleModal").style.display = "block";
  }

  function closeExample() {
    document.getElementById("exampleModal").style.display = "none";
  }

  // Close modal when clicking outside
  window.onclick = function (event) {
    const modal = document.getElementById("exampleModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ebillForm");
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      if (input.id === "serviceNumber") {
        input.addEventListener("input", () => validateServiceNumber(input));
      } else if (input.id === "idNumber") {
        input.addEventListener("input", () => validateIdNumber(input));
      }
    });
  });
