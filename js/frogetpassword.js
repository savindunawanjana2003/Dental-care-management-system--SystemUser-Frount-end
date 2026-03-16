$(document).ready(function () {
  // DOM Elements
  const newPasswordInput = document.getElementById("newPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const toggleNewPassword = document.getElementById("toggleNewPassword");
  const toggleConfirmPassword = document.getElementById(
    "toggleConfirmPassword",
  );
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const strengthFill = document.getElementById("strengthFill");
  const strengthValue = document.getElementById("strengthValue");
  const passwordMatchElement = document.getElementById("passwordMatch");
  const statusMessage = document.getElementById("statusMessage");
  const statusText = document.getElementById("statusText");
  const loading = document.getElementById("loading");

  // Requirements elements
  const reqLength = document.getElementById("reqLength");
  const reqUppercase = document.getElementById("reqUppercase");
  const reqLowercase = document.getElementById("reqLowercase");
  const reqNumber = document.getElementById("reqNumber");
  const reqSpecial = document.getElementById("reqSpecial");

  // Toggle Password Visibility
  function togglePassword(input, toggle) {
    const type = input.type === "password" ? "text" : "password";
    input.type = type;
    const icon = toggle.querySelector("i");
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  }

  toggleNewPassword.addEventListener("click", () => {
    togglePassword(newPasswordInput, toggleNewPassword);
  });

  toggleConfirmPassword.addEventListener("click", () => {
    togglePassword(confirmPasswordInput, toggleConfirmPassword);
  });

  // Check Password Strength
  function checkPasswordStrength(password) {
    let strength = 0;
    const requirements = {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false,
    };

    // Length check
    if (password.length >= 8) {
      strength += 20;
      requirements.length = true;
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 20;
      requirements.uppercase = true;
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 20;
      requirements.lowercase = true;
    }

    // Number check
    if (/[0-9]/.test(password)) {
      strength += 20;
      requirements.number = true;
    }

    // Special character check
    if (/[!@#$%^&*]/.test(password)) {
      strength += 20;
      requirements.special = true;
    }

    // Update strength meter
    strengthFill.style.width = strength + "%";

    // Update strength text and color
    let strengthText = "";
    let color = "";

    if (password.length === 0) {
      strengthText = "Very Weak";
      color = "#ef4444";
    } else if (strength < 40) {
      strengthText = "Very Weak";
      color = "#ef4444";
    } else if (strength < 60) {
      strengthText = "Weak";
      color = "#f97316";
    } else if (strength < 80) {
      strengthText = "Fair";
      color = "#eab308";
    } else if (strength < 100) {
      strengthText = "Good";
      color = "#10b981";
    } else {
      strengthText = "Strong";
      color = "#10b981";
    }

    strengthFill.style.backgroundColor = color;
    strengthValue.textContent = strengthText;
    strengthValue.style.color = color;

    // Update requirement indicators
    updateRequirement(reqLength, requirements.length);
    updateRequirement(reqUppercase, requirements.uppercase);
    updateRequirement(reqLowercase, requirements.lowercase);
    updateRequirement(reqNumber, requirements.number);
    updateRequirement(reqSpecial, requirements.special);

    return strength;
  }

  // Update Requirement Indicator
  function updateRequirement(element, isValid) {
    if (isValid) {
      element.classList.add("valid");
      const icon = element.querySelector("i");
      icon.classList.remove("fa-circle");
      icon.classList.add("fa-check-circle");
    } else {
      element.classList.remove("valid");
      const icon = element.querySelector("i");
      icon.classList.remove("fa-check-circle");
      icon.classList.add("fa-circle");
    }
  }

  // Check Password Match
  function checkPasswordMatch() {
    const password = newPasswordInput.value;
    const confirm = confirmPasswordInput.value;

    if (confirm === "") {
      passwordMatchElement.innerHTML = "";
      return false;
    }

    if (password === confirm) {
      passwordMatchElement.innerHTML =
        '<i class="fas fa-check-circle" style="color: #10b981;"></i> <span style="color: #10b981;">Passwords match</span>';
      return true;
    } else {
      passwordMatchElement.innerHTML =
        '<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i> <span style="color: #ef4444;">Passwords do not match</span>';
      return false;
    }
  }

  // Show Status Message
  function showStatus(message, type) {
    statusText.textContent = message;
    statusMessage.className = "status-message message-" + type;
    statusMessage.style.display = "flex";

    setTimeout(() => {
      statusMessage.style.display = "none";
    }, 5000);
  }

  // Validate Form
  function validateForm() {
    const password = newPasswordInput.value.trim();
    const confirm = confirmPasswordInput.value.trim();

    if (password === "") {
      showStatus("Please enter a new password", "error");
      newPasswordInput.focus();
      return false;
    }

    const strength = checkPasswordStrength(password);
    if (strength < 60) {
      showStatus("Please use a stronger password", "error");
      newPasswordInput.focus();
      return false;
    }

    if (!checkPasswordMatch()) {
      showStatus("Passwords do not match", "error");
      confirmPasswordInput.focus();
      return false;
    }

    return true;
  }

  // Submit Form
  $("#submitBtn").on("click", function () {
    if (validateForm()) {
      // Show loading
      loading.classList.add("active");

      // Disable button
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Setting Password...';

      // Get email from localStorage
      const emailinStorege = localStorage.getItem("emailinStorege");
      console.log("Email:", emailinStorege);

      // API Call
      $.ajax({
        url: "http://localhost:8080/login_war_exploded/ChengePassword",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
          newPassword: $("#confirmPassword").val().trim(),
          email: emailinStorege,
        }),
        success: function (response) {
          loading.classList.remove("active");
          showStatus(
            "Password changed successfully! Redirecting to login...",
            "success",
          );

          // Reset form
          $("#passwordForm")[0].reset();
          strengthFill.style.width = "10%";
          strengthValue.textContent = "Very Weak";
          strengthValue.style.color = "#ef4444";

          // Reset requirements
          $(".requirement-list li").removeClass("valid");
          $(".requirement-list li i")
            .removeClass("fa-check-circle")
            .addClass("fa-circle");

          // Redirect to login after 2 seconds
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        },
        error: function (xhr, status, error) {
          loading.classList.remove("active");
          showStatus(
            "Error: " + (xhr.responseText || "Failed to change password"),
            "error",
          );
        },
        complete: function () {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            '<i class="fas fa-check-circle"></i> Set Password';
        },
      });
    }
  });

  // Real-time validation
  newPasswordInput.addEventListener("input", function () {
    checkPasswordStrength(this.value);
    checkPasswordMatch();
  });

  confirmPasswordInput.addEventListener("input", checkPasswordMatch);

  // Cancel button
  cancelBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to cancel? Any changes will be lost.")) {
      $("#passwordForm")[0].reset();
      strengthFill.style.width = "10%";
      strengthValue.textContent = "Very Weak";
      strengthValue.style.color = "#ef4444";
      passwordMatchElement.innerHTML = "";
      statusMessage.style.display = "none";

      // Reset requirements
      $(".requirement-list li").removeClass("valid");
      $(".requirement-list li i")
        .removeClass("fa-check-circle")
        .addClass("fa-circle");
    }
  });

  // Mouse parallax effect
  document.addEventListener("mousemove", function (e) {
    const teeth = document.querySelectorAll(".floating-teeth i");
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    teeth.forEach((tooth, index) => {
      const speed = index + 1;
      const x = (window.innerWidth - mouseX * speed) / 100;
      const y = (window.innerHeight - mouseY * speed) / 100;
      tooth.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Initialize
  checkPasswordStrength("");
  checkPasswordMatch();
});
