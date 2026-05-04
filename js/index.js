// $(document).ready(function () {
//   $("username").val("");
//   $("password").val("");
// });

$(window).on("load", function () {
  $("#username").val("");
  $("#password").val("");
});

// Password Toggle
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
}
// ============================

// Form Submit with Loading Animation
function handleLogin(event) {
  event.preventDefault();

  // Show Loading
  const loading = document.getElementById("loading");
  loading.classList.add("active");

  // Get form values
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Simulate login (replace with actual authentication)
  setTimeout(() => {
    loading.classList.remove("active");

    // Here you can add your authentication logic
    if (username && password) {
      // Successful login - redirect to dashboard
      // window.location.href = "../pages/Dashbord.html";
      alert("Login Successful! Redirecting to dashboard...");
    } else {
      alert("Please enter username and password");
    }
  }, 2000);
}

// Input Focus Animations
document.querySelectorAll(".input-wrapper input").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.querySelector("i:first-child").style.color = "#00c6fb";
  });

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.querySelector("i:first-child").style.color =
        "rgba(255,255,255,0.5)";
    }
  });
});

// Add floating animation to teeth
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

$("#loginButten").on("click", () => {
  const namePattern = /^[A-Za-z ]{3,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const phonePattern = /^07\d{8}$/;
  const agePattern = /^(?:1[0-2][0-9]|[1-9][0-9]|[1-9])$/; // 1–129
  const oldNICPattern = /^[0-9]{9}[vVxX]$/;
  const newNICPattern = /^[0-9]{12}$/;

  const username = $("#username").val();
  const password = $("#password").val();

  if (!username && !password) {
    Swal.fire({
      icon: "error",
      title: "⛔ Access Denied",
      text: "Please enter both user name and password!",
      background: "#1e1e2f",
      backdrop: "rgba(0,0,0,0.7)",
      showConfirmButton: true,
      confirmButtonText: "✋ Understood",
      confirmButtonColor: "#00c6fb",
      showCancelButton: true,
      cancelButtonText: "🚪 Go Back",
      cancelButtonColor: "#ff4d4f",
      reverseButtons: true,
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
    return;
  } else if (!username) {
    Swal.fire({
      icon: "error",
      title: "⛔ Access Denied",
      text: "Please enter User name",
      background: "#1e1e2f",
      backdrop: "rgba(0,0,0,0.7)",
      showConfirmButton: true,
      confirmButtonText: "✋ Understood",
      confirmButtonColor: "#00c6fb",
      showCancelButton: true,
      cancelButtonText: "🚪 Go Back",
      cancelButtonColor: "#ff4d4f",
      reverseButtons: true,
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
    return;
  } else if (!password) {
    Swal.fire({
      icon: "error",
      title: "⛔ Access Denied",
      text: "Please enter password",
      background: "#1e1e2f",
      backdrop: "rgba(0,0,0,0.7)",
      showConfirmButton: true,
      confirmButtonText: "✋ Understood",
      confirmButtonColor: "#00c6fb",
      showCancelButton: true,
      cancelButtonText: "🚪 Go Back",
      cancelButtonColor: "#ff4d4f",
      reverseButtons: true,
      timer: 4000,
      timerProgressBar: true,
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    });
    return;
  }

  // ======================================================================

  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/auth/LoginSystemUser",
    method: "POST",
    contentType: "application/json",
    //methanata heder eka danna one tocken eka samaga
    data: JSON.stringify({
      username: username,
      password: password,
      email: "",
    }),
    success: function (data, textStatus, jqXHR) {
      // console.log(data);
      localStorage.setItem("Rolle", data.message);

      const loading = document.getElementById("loading");
      loading.classList.add("active");

      if (data.status === 200) {
        // console.log(data.messege);

        localStorage.setItem("usertoken", data.data);

        Swal.fire({
          icon: "success",
          title: "LOGIN SUCCESSFUL",
          html: `
    <div style="font-family: 'Inter', sans-serif;">
      <p style="margin: 10px 0; color: #e0e0e0;">Redirecting to dashboard...</p>
      <div style="width: 100%; height: 2px; background: rgba(255,255,255,0.1); margin-top: 15px;">
        <div id="progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00b09b, #96c93d); transition: width 2s linear;"></div>
      </div>
    </div>
  `,
          background: "rgba(255, 255, 255, 0.05)",
          backdrop: "rgba(0,0,30,0.7)",
          color: "#ffffff",
          iconColor: "#96c93d",
          showConfirmButton: false,
          timer: 2000,
          didOpen: () => {
            const progress = document.getElementById("progress");
            if (progress) {
              setTimeout(() => {
                progress.style.width = "100%";
              }, 50);
            }
          },
          customClass: {
            popup: "glassmorphism-popup",
          },
        }).then(() => {
          // ===================================================================play this after the uncomi =======================================================================================
          const audio = document.getElementById("loginSound");
          audio.play();

          // ⏳ wait karala redirect
          setTimeout(() => {
            window.location.href = "../pages/Dashbord.html";
          }, 1500);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "⛔ Access Denied",
          text: "Please enter valide  username of password",
          background: "#1e1e2f",
          backdrop: "rgba(0,0,0,0.7)",
          showConfirmButton: true,
          confirmButtonText: "✋ Understood",
          confirmButtonColor: "#00c6fb",
          showCancelButton: true,
          cancelButtonText: "🚪 Go Back",
          cancelButtonColor: "#ff4d4f",
          reverseButtons: true,
          timer: 4000,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
        });
      }
    },
    error: function (jqXHR) {
      // const massege = jqXHR.responseJSON.massege;
      console.log("============");
      let message = "";
      if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        message = jqXHR.responseJSON.message;
      } else {
        message = jqXHR.responseText;
      }
      console.log("Error message from server:", message);
      // ===================================================================play this after the uncomi =======================================================================================
      const audio = document.getElementById("invalidSound");
      audio.play();

      Swal.fire({
        icon: "error",
        title: "⛔ Access Denied",
        text: message,

        background: "#1e1e2f",
        color: "#f1f1f1",

        iconColor: "#ff4d4f",

        confirmButtonText: "OK",
        confirmButtonColor: "#ff4d4f",

        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },

        timer: 3000,
        timerProgressBar: true,
        allowOutsideClick: false,
      });
    },
  });
  // =========================================================================
  $(document).ready(function () {
    // Prevent back button
    window.history.pushState(null, null, window.location.href);

    window.onpopstate = function () {
      window.history.pushState(null, null, window.location.href);
    };
  });
});

$("#forgotPasswordLink").on("click", () => {
  // alert("akjdka");
  const username = $("#username").val();
  if (!username) {
    Swal.fire({
      icon: "Error",
      title: "Please enter Your password !",
    });
    return;
  }
  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/genarateOtpByUsername?username=${username}`,
    method: "GET",
    contentType: "application/json",
    success: function (res) {
      let appointments = res.data;
      localStorage.setItem("uName", username);
      window.location.href = "./pages/OtpConfirmPage.html";
    },

    error: function (err) {
      console.error(err);
    },
  });
});
// ===============================================
$("#forgotPasswordLink").on("click", () => {
  // alert("akjdka");
  const username = $("#username").val();
  if (!username) {
    Swal.fire({
      icon: "error",
      title: "⛔ Please enter Your Username !",
      text: "",

      background: "#1e1e2f",
      color: "#f1f1f1",

      iconColor: "#ff4d4f",

      confirmButtonText: "OK",
      confirmButtonColor: "#ff4d4f",

      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },

      timer: 3000,
      timerProgressBar: true,
      allowOutsideClick: false,
    });

    return;
  }
  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/passwordResetController/genarateOtpByUsername?username=${username}`,
    method: "GET",
    contentType: "application/json",
    success: function (res) {
      let appointments = res.data;
      localStorage.setItem("uName", username);
      window.location.href = "./pages/OtpConfirmPage.html";
    },

    error: function (err) {
      console.error(err);
    },
  });
});
