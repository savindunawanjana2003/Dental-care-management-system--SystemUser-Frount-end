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
      // window.location.href = 'dashboard.html';
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
