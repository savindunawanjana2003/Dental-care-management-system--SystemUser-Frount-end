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
  //  else if (!emailPattern.test(email)) {
  //   Swal.fire({
  //     icon: "error",
  //     title: "⛔ Access Denied",
  //     text: "Please enter corect Email address",
  //     background: "#1e1e2f",
  //     backdrop: "rgba(0,0,0,0.7)",
  //     showConfirmButton: true,
  //     confirmButtonText: "✋ Understood",
  //     confirmButtonColor: "#00c6fb",
  //     showCancelButton: true,
  //     cancelButtonText: "🚪 Go Back",
  //     cancelButtonColor: "#ff4d4f",
  //     reverseButtons: true,
  //     timer: 4000,
  //     timerProgressBar: true,
  //     showClass: {
  //       popup: "animate__animated animate__bounceIn",
  //     },
  //     hideClass: {
  //       popup: "animate__animated animate__bounceOut",
  //     },
  //   });
  //   return;
  // }

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
      console.log(data);

      if (data.status === 200) {
        console.log(data.messege);

        localStorage.setItem("usertoken", data.data);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to home page...",
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#4caf50",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          // cleare();
          // getAll();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: data.messege,
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#ff4d4f",
        });
      }
    },
    error: function (jqXHR) {
      console.log("============");
      let message = "";
      if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        message = jqXHR.responseJSON.message;
      } else {
        message = jqXHR.responseText;
      }
      console.log("Error message from server:", message);

      Swal.fire({
        icon: "error",
        title: "Saved Failed",
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

  // alert("ljkda");
});
