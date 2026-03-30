$(document).ready(function () {
  // DOM elements
  const $newPass = $("#newPassword");
  const $confirmPass = $("#confirmPassword");
  const $strengthFill = $("#strengthFill");
  const $strengthValue = $("#strengthValue");
  const $submitBtn = $("#submitBtn");
  const $cancelBtn = $("#cancelBtn");
  const $loading = $("#loading");
  const $statusMsg = $("#statusMessage");
  const $statusText = $("#statusText");

  // Requirements mapping
  const requirements = {
    length: {
      element: $("#reqLength"),
      condition: (pwd) => pwd.length >= 6,
    },
    uppercase: {
      element: $("#reqUppercase"),
      condition: (pwd) => /[A-Z]/.test(pwd),
    },
    lowercase: {
      element: $("#reqLowercase"),
      condition: (pwd) => /[a-z]/.test(pwd),
    },
    number: {
      element: $("#reqNumber"),
      condition: (pwd) => /[0-9]/.test(pwd),
    },
    // special: {
    //   element: $("#reqSpecial"),
    //   condition: (pwd) => /[!@#$%^&*]/.test(pwd),
    // },
  };

  function updateRequirements(pwd) {
    let validCount = 0;
    for (let key in requirements) {
      const isValid = requirements[key].condition(pwd);
      if (isValid) {
        requirements[key].element.addClass("valid");
        validCount++;
      } else {
        requirements[key].element.removeClass("valid");
      }
    }
    return validCount;
  }

  function getStrengthLevel(validCount, pwdLen) {
    if (pwdLen === 0)
      return { text: "Very Weak", width: "10%", color: "#e11d48" };
    if (validCount <= 1)
      return { text: "Very Weak", width: "20%", color: "#e11d48" };
    if (validCount === 2)
      return { text: "Weak", width: "35%", color: "#f59e0b" };
    if (validCount === 3)
      return { text: "Fair", width: "55%", color: "#fbbf24" };
    if (validCount === 4)
      return { text: "Good", width: "75%", color: "#10b981" };
    return { text: "Strong", width: "95%", color: "#10b981" };
  }

  function updateStrengthMeter() {
    const pwd = $newPass.val();
    const validCount = updateRequirements(pwd);
    const level = getStrengthLevel(validCount, pwd.length);
    $strengthValue.text(level.text);
    $strengthFill.css({
      width: level.width,
      backgroundColor: level.color,
    });
  }

  function checkPasswordMatch() {
    const newPwd = $newPass.val();
    const confirmPwd = $confirmPass.val();
    const $matchDiv = $("#passwordMatch");
    if (confirmPwd === "") {
      $matchDiv.html("");
      return false;
    }
    if (newPwd === confirmPwd) {
      $matchDiv.html(
        '<i class="fas fa-check-circle" style="color:#10b981"></i> <span style="color:#10b981">Passwords match</span>',
      );
      return true;
    } else {
      $matchDiv.html(
        '<i class="fas fa-times-circle" style="color:#ef4444"></i> <span style="color:#ef4444">Passwords do not match</span>',
      );
      return false;
    }
  }

  function isPasswordValid() {
    const pwd = $newPass.val();
    const lengthOk = pwd.length >= 6;
    const upperOk = /[A-Z]/.test(pwd);
    const lowerOk = /[a-z]/.test(pwd);
    const numberOk = /[0-9]/.test(pwd);
    // const specialOk = /[!@#$%^&*]/.test(pwd);
    return lengthOk && upperOk && lowerOk && numberOk;
  }

  function validateForm() {
    const pwdValid = isPasswordValid();
    const matchOk = checkPasswordMatch();
    return pwdValid && matchOk && $newPass.val().length > 0;
  }

  function showMessage(text, isError) {
    $statusMsg.removeClass("message-success message-error");
    $statusMsg.addClass(isError ? "message-error" : "message-success");
    $statusText.text(text);
    $statusMsg.fadeIn(180);
    setTimeout(() => {
      $statusMsg.fadeOut(300);
    }, 3600);
  }

  // Event listeners
  $newPass.on("input", function () {
    updateStrengthMeter();
    checkPasswordMatch();
  });

  $confirmPass.on("input", function () {
    checkPasswordMatch();
  });

  // toggle visibility
  $("#toggleNewPassword").on("click", function () {
    const type = $newPass.attr("type") === "password" ? "text" : "password";
    $newPass.attr("type", type);
    $(this).find("i").toggleClass("fa-eye fa-eye-slash");
  });
  $("#toggleConfirmPassword").on("click", function () {
    const type = $confirmPass.attr("type") === "password" ? "text" : "password";
    $confirmPass.attr("type", type);
    $(this).find("i").toggleClass("fa-eye fa-eye-slash");
  });

  // Cancel button: redirect or clear
  $cancelBtn.on("click", function () {
    Swal.fire({
      title: "Cancel?",
      text: "Are you sure you want to cancel? Your password won't be changed.",
      icon: "question",
      background: "#1e1a2f",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html"; // fallback to login
      }
    });
  });

  // Submit: simulate password reset with SweetAlert & loading
  $submitBtn.on("click", function () {
    if (!validateForm()) {
      let errorMsg = "";
      if (!isPasswordValid())
        errorMsg = "Password does not meet all requirements.";
      else if (!checkPasswordMatch()) errorMsg = "Passwords do not match.";
      else errorMsg = "Please fill all fields correctly.";
      showMessage(errorMsg, true);
      return;
    }

    // ======================================

    const password = $("#newPassword").val();
    $.ajax({
      url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/updatePassword?username=${localStorage.getItem("uName")}&password=${password}`,
      method: "POST",
      contentType: "application/json",
      success: function (res) {
        let rsp = res.data;

        if (rsp == true) {
          $loading.addClass("active");
          // Simulate API call
          setTimeout(() => {
            $loading.removeClass("active");
            Swal.fire({
              icon: "success",
              title: "Password Updated!",
              text: "Your password has been successfully reset. You can now log in.",
              background: "#1f1a2e",
              color: "#ffffff",
              confirmButtonColor: "#00c6fb",
              confirmButtonText: "Go to Login",
            }).then(() => {
              // redirect to login page after success
              window.location.href = "../index.html";
            });
          }, 1000);
        }

        alert(rsp);
        console.log("====================**");
        console.log(rsp);
      },

      error: function (err) {
        console.error(err + "==============");
      },
    });

    // ======================================
  });

  // initial updates
  updateStrengthMeter();
  checkPasswordMatch();
});
