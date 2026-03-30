$(window).on("load", function () {
  $("#usernamrForOtpId").val(localStorage.getItem("uName"));
});

$(document).ready(function () {
  // State variables
  let otpSent = false;
  let otpVerified = false;
  let timerInterval = null;
  let remainingSeconds = 0;
  let generatedOtp = "123456"; // For demo, fixed OTP. In real API you'd generate random
  let verifiedEmail = "";

  // DOM elements
  const $panelOtp = $("#panelOtp");
  const $panelPassword = $("#panelPassword");
  const $step1Circle = $("#step1Circle");
  const $step2Circle = $("#step2Circle");
  const $stepLineFill = $("#stepLineFill");
  const $step1Box = $("#step1Box");
  const $step2Box = $("#step2Box");
  const $sendOtpBtn = $("#sendOtpBtn");
  const $verifyOtpBtn = $("#verifyOtpBtn");
  const $emailInput = $("#emailInput");
  const $otpInput = $("#otpInput");
  const $emailError = $("#emailError");
  const $otpError = $("#otpError");
  const $otpTimer = $("#otpTimer");
  const $loadingOverlay = $("#loadingOverlay");
  const $newPassword = $("#newPassword");
  const $confirmPassword = $("#confirmPassword");
  const $matchMsg = $("#matchMsg");
  const $strengthFill = $("#strengthFill");
  const $strengthLabel = $("#strengthLabel");
  const $resetBtn = $("#resetPasswordBtn");

  function verifyOtp() {
    if (!otpSent) {
      $otpError.text("Please request OTP first").show();
      return;
    }
    const enteredOtp = $otpInput.val().trim();
    if (enteredOtp === "") {
      $otpError.text("Enter OTP code").show();
      return;
    }
    if (enteredOtp !== generatedOtp) {
      $otpError.text("Invalid OTP. Please try again.").show();
      return;
    }
    // OTP valid
    if (timerInterval) clearInterval(timerInterval);
    otpVerified = true;
    verifiedEmail = $emailInput.val().trim();
    $otpError.hide();
    // move to step 2
    showStep(2);
    Swal.fire({
      icon: "success",
      title: "OTP Verified!",
      text: "Now you can set your new password.",
      timer: 1800,
      showConfirmButton: false,
      background: "#1f1a2e",
    });
  }

  // Password strength & requirements
  function checkStrength(pwd) {
    let score = 0;
    const checks = {
      len: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      num: /[0-9]/.test(pwd),
      spec: /[!@#$%^&*]/.test(pwd),
    };
    if (checks.len) score++;
    if (checks.upper) score++;
    if (checks.lower) score++;
    if (checks.num) score++;
    if (checks.spec) score++;

    // update UI requirements
    $("#reqLen").toggleClass("valid", checks.len);
    $("#reqUpper").toggleClass("valid", checks.upper);
    $("#reqLower").toggleClass("valid", checks.lower);
    $("#reqNum").toggleClass("valid", checks.num);
    $("#reqSpec").toggleClass("valid", checks.spec);

    let strengthText = "Very Weak";
    let widthPercent = 10;
    let color = "#e11d48";
    if (score === 1) {
      strengthText = "Very Weak";
      widthPercent = 15;
      color = "#e11d48";
    } else if (score === 2) {
      strengthText = "Weak";
      widthPercent = 35;
      color = "#f59e0b";
    } else if (score === 3) {
      strengthText = "Fair";
      widthPercent = 55;
      color = "#fbbf24";
    } else if (score === 4) {
      strengthText = "Good";
      widthPercent = 80;
      color = "#10b981";
    } else if (score === 5) {
      strengthText = "Strong";
      widthPercent = 100;
      color = "#10b981";
    }
    $strengthFill.css({
      width: widthPercent + "%",
      backgroundColor: color,
    });
    $strengthLabel.text(strengthText);
    return score === 5;
  }

  function checkMatch() {
    const newPwd = $newPassword.val();
    const confirmPwd = $confirmPassword.val();
    if (confirmPwd === "") {
      $matchMsg.html("");
      return false;
    }
    if (newPwd === confirmPwd && newPwd !== "") {
      $matchMsg
        .html('<i class="fas fa-check-circle"></i> Passwords match')
        .css("color", "#10b981");
      return true;
    } else {
      $matchMsg
        .html('<i class="fas fa-times-circle"></i> Passwords do not match')
        .css("color", "#ff8a7a");
      return false;
    }
  }

  function isPasswordValidFull() {
    const pwd = $newPassword.val();
    const lenOk = pwd.length >= 8;
    const upperOk = /[A-Z]/.test(pwd);
    const lowerOk = /[a-z]/.test(pwd);
    const numOk = /[0-9]/.test(pwd);
    const specOk = /[!@#$%^&*]/.test(pwd);
    return lenOk && upperOk && lowerOk && numOk && specOk;
  }

  // Reset password final submit
  function finalReset() {
    if (!otpVerified) {
      Swal.fire("Error", "OTP not verified, please go back", "error");
      showStep(1);
      return;
    }
    const newPwd = $newPassword.val();
    if (!isPasswordValidFull()) {
      Swal.fire(
        "Weak Password",
        "Please meet all password requirements",
        "warning",
      );
      return;
    }
    if (!checkMatch()) {
      Swal.fire("Mismatch", "Passwords do not match", "error");
      return;
    }
    showLoading(true);
    setTimeout(() => {
      showLoading(false);
      // Simulate password update
      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: `Your password has been changed successfully for ${verifiedEmail}`,
        background: "#1f1a2e",
        confirmButtonColor: "#00c6fb",
      }).then(() => {
        // redirect to login page
        window.location.href = "../login.html";
      });
    }, 1000);
  }

  $newPassword.on("input", function () {
    checkStrength($(this).val());
    checkMatch();
  });
  $confirmPassword.on("input", checkMatch);

  $resetBtn.on("click", finalReset);

  // initial step1 active
  showStep(1);
  // reset any timers
  otpSent = false;
  otpVerified = false;
  generatedOtp = "123456";
});
// ======================
// $("#verifyOtpBtn").on("click", () => {
//   alert("jkldew");
// });
//   ==================

// =============

$("#sendOtpBtn").on("click", () => {
  // alert("ksjaks");
  const username = $("#usernamrForOtpId").val();
  if (!username) {
    Swal.fire({
      icon: "Error",
      title: "Please enter Your password !",
    });
    return;
  }

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/sendMail?username=${localStorage.getItem("uName")}`,
    method: "GET",
    contentType: "application/json",
    success: function (res) {
      let appointments = res.data;
    },

    error: function (err) {
      console.error(err);
    },
  });
});

$("#resendOtpId").on("click", () => {
  //  resentOtp

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/resentOtp?username=${localStorage.getItem("uName")}`,
    method: "GET",
    contentType: "application/json",
    success: function (res) {
      let appointments = res.data;
    },

    error: function (err) {
      console.error(err);
    },
  });
});
// =====================
$("#verifyOtpBtn").on("click", () => {
  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/chekOtpIsValid?username=${localStorage.getItem("uName")}&otp=${$("#otpInput").val()}`,
    method: "GET",
    contentType: "application/json",
    success: function (res) {
      let rsp = res.data;

      if (rsp == true) {
        window.location.href = "../pages/frogetPassword.html";
      }

      alert(rsp);
      console.log("====================**");
      console.log(rsp);
    },

    error: function (err) {
      console.error(err + "==============");
    },
  });
});

$("#backToLogin").on("click",()=>{
// alert("ksjd")
window.location.href = "../index.html";

})

//
