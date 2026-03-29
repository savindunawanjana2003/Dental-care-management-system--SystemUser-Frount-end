$(document).ready(function () {
  const role = localStorage.getItem("Rolle");

  showRoleAlert(role);
  function showRoleAlert(role) {
    switch (role) {
      case "ADMIN":
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Welcome Admin 👑",
          showConfirmButton: false,
          timer: 5000,
        });
        break;

      case "DOCTOR":
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Welcome Doctor 🩺",
          showConfirmButton: false,
          timer: 5000,
        });
        break;

      case "RECEPTIONIST":
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Welcome Receptionist 📞",
          showConfirmButton: false,
          timer: 5000,
        });
        break;

      case "CASHIER":
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Welcome Cashier 💰",
          showConfirmButton: false,
          timer: 5000,
        });
        break;

      default:
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Access Denied ❌",
          showConfirmButton: false,
          timer: 5000,
        });
    }
  }

  // ========================
  // if (!role) {
  //   alert("No role found. Please login again");
  //   return;
  // }
  const accessMap = {
    ADMIN: [
      "dashboard",
      "departments",
      "doctor",
      "patient",
      "doctorDailyTracking",
      "patientAppointment",
      "caseStudies",
      "systemUsers",
      "insurances",
      "lab",
      "financing",
      "frontEnd",
      "logout",
    ],

    DOCTOR: [
      "doctor",
      "dashboard",
      "patient",
      "doctorSchedule",
      "patientAppointment",
      "caseStudies",
      "logout",
    ],

    RECEPTIONIST: ["dashboard", "patient", "patientAppointment", "logout"],

    CASHIER: ["dashboard", "financing", "logout"],
  };

  applyRoleAccess(role);
  // ============================
  // mata one  user roll eka anuwa  navebar eke thiyena  option walata accsess eka denna
  // Navigation - FLEX layout: icon bar controls right side data
  // $(".nav-link").click(function (e) {
  //   e.preventDefault();

  //   // Remove active class from all links
  //   $(".nav-link").removeClass("active");
  //   // Add active class to clicked link
  //   $(this).addClass("active");

  //   // Get section to shows
  //   const section = $(this).data("section");

  //   // Hide all sections
  //   $(".section-container").removeClass("active");

  //   // Show selected section (convert camelCase to proper ID)
  //   let sectionId = section + "Section";
  //   $("#" + sectionId).addClass("active");
  // });

  // ==============================
  function applyRoleAccess(role) {
    const allowedSections = accessMap[role];

    $(".nav-link").each(function () {
      const section = $(this).data("section");

      if (!allowedSections.includes(section)) {
        // $(this).hide(); // hide menu
        $(this).addClass("disabled-link");
        $(this).addClass("active2");
      } else {
        // $(this).show(); // show menu
        $(this).removeClass("disabled-link");
      }
    });
  }

  $(".nav-link").click(function (e) {
    e.preventDefault();

    const section = $(this).data("section");

    const allowedSections = accessMap[role];

    if (!allowedSections.includes(section)) {
      alert("Access Denied ❌");
      return;
    }

    $(".nav-link").removeClass("active");
    $(this).addClass("active");

    $(".section-container").removeClass("active");

    let sectionId = section + "Section";
    $("#" + sectionId).addClass("active");
  });

  // =======================

  // ===================================

  // Logout
  $("#logoutBtn").click(function (e) {
    // const tocken = localStorage.getItem("usertoken");
    window.location.href = "../index.html";

    localStorage.removeItem("usertoken");
    localStorage.removeItem("Rolle");
  });

  // Login
  $("#loginBtn").click(function () {
    const email = $("#loginEmail").val();
    const password = $("#loginPassword").val();

    if (email && password) {
      $("#loadingOverlay").addClass("active");
      setTimeout(function () {
        $("#loadingOverlay").removeClass("active");
        $("#loginPage").hide();
        $(".dashboard-wrapper").show();
      }, 1500);
    } else {
      alert("Please enter email and password");
    }
  });
});

function cleare() {
  $("#customerId").val("");
  $("#patienAddress").val("");
  $("#PatientAge").val("");
  $("#customerName").val("");
  $("#phoneNumber").val("");
  $("#cityId").val("");
  $("#Countryid").val("");
  $("#emailid").val("");
  $("#Patientnic").val("");
  $("#patienGenderId").val("Male");
}

function showAddMode() {
  $("#SaveBtnBostrapModal").show();
  $("#EditeBtnBostrapModal").hide();
  $("#DeleteBtnBostrapModal").hide();
}

function showEditMode() {
  $("#SaveBtnBostrapModal").hide();
  $("#EditeBtnBostrapModal").show();
  $("#DeleteBtnBostrapModal").show();
}

$("#saveBtnPationsection").on("click", () => {
  showAddMode();
  const modal = new bootstrap.Modal(
    document.getElementById("addCustomerModal"),
  );
  modal.show();

  cleare();
});
