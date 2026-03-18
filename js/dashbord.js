$(document).ready(function () {
  // Navigation - FLEX layout: icon bar controls right side data
  $(".nav-link").click(function (e) {
    e.preventDefault();

    // Remove active class from all links
    $(".nav-link").removeClass("active");
    // Add active class to clicked link
    $(this).addClass("active");

    // Get section to show
    const section = $(this).data("section");

    // Hide all sections
    $(".section-container").removeClass("active");

    // Show selected section (convert camelCase to proper ID)
    let sectionId = section + "Section";
    $("#" + sectionId).addClass("active");
  });

  // Logout
  $("#logoutBtn").click(function (e) {
    e.preventDefault();
    $("#loadingOverlay").addClass("active");
    setTimeout(function () {
      $("#loadingOverlay").removeClass("active");
      $(".dashboard-wrapper").hide();
      $("#loginPage").show();
    }, 1000);
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
