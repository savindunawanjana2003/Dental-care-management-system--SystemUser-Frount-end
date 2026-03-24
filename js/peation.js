function blinkField(fieldId) {
  const field = $("#" + fieldId);
  const modal = field.closest(".modal");
  $(document).ready(function () {
    getAllpation();
  });

  if (modal.length) {
    if (!modal.hasClass("show")) {
      const bsModal = new bootstrap.Modal(modal[0]);
      bsModal.show();
    }
  }
  $(".modal-body").animate(
    {
      scrollTop: field.offset().top - 200,
    },
    400,
  );

  field.addClass("error-border");

  for (let i = 0; i < 4; i++) {
    field.fadeOut(150).fadeIn(150);
  }
  // setTimeout(() => {
  //   field.removeClass("error-border");
  // }, 1200);
  field.focus();
}

$("#SaveBtnBostrapModal").on("click", () => {
  const firstName = $("#customerName");
  const age = $("#PatientAge");
  const nic = $("#Patientnic");
  const phone = $("#phoneNumber");
  const address = $("#patienAddress");
  const city = $("#cityId");
  const country = $("#Countryid");
  const gender = $("#patienGenderId");
  const email = $("#emailid");

  // ================= REGEX =================
  const namePattern = /^[A-Za-z ]{3,}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const phonePattern = /^07\d{8}$/;
  const agePattern = /^(?:1[0-2][0-9]|[1-9][0-9]|[1-9])$/; // 1–129
  const oldNICPattern = /^[0-9]{9}[vVxX]$/;
  const newNICPattern = /^[0-9]{12}$/;

  // ================= VALIDATION =================

  if (!namePattern.test(firstName.val())) {
    blinkField("customerName");
    return;
  }

  if (!agePattern.test(age.val())) {
    blinkField("PatientAge");
    return;
  }

  if (!(oldNICPattern.test(nic.val()) || newNICPattern.test(nic.val()))) {
    blinkField("Patientnic");
    Swal.fire("Error", "Invalid NIC!", "error");
    return;
  }

  if (!phonePattern.test(phone.val())) {
    blinkField("phoneNumber");
    return;
  }

  if (address.val().trim() === "") {
    blinkField("patienAddress");
    return;
  }

  if (city.val().trim() === "") {
    blinkField("cityId");
    return;
  }

  if (country.val().trim() === "") {
    blinkField("Countryid");
    return;
  }

  if (!emailPattern.test(email.val())) {
    blinkField("emailid");
    return;
  }

  if (!gender.val()) {
    blinkField("patienGenderId");
    return;
  }

  // ================= SUCCESS =================
  // url: "http://localhost:8080/api/v1/dentalcare/CustomerController/PhysicalRegistration",
  //
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/CustomerController/PhysicalRegistration",
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    data: JSON.stringify({
      id: "",
      firstName: firstName.val(),
      lastName: "",
      age: age.val(),
      gender: gender.val(),
      nic: nic.val(),
      email: email.val(),
      pone: phone.val(),
      address: address.val(),
      city: city.val(),
      country: country.val(),
      password: "",
      userName: "",
      navigator: "physical",
    }),
    success: function (data, textStatus, jqXHR) {
      console.log(data);

      if (data.status === 201) {
        console.log(data.messege);

        localStorage.setItem("token", data.data);

        Swal.fire({
          icon: "success",
          title: "Saved Successful",
          text: "Redirecting to home page...",
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#4caf50",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          cleare();
          getAllpation();
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
        getAll();
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
});

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

$("#tbodyPeation").on("click", "tr", function () {
  const id = $(this).find("td:eq(0)").text();
  const address = $(this).find("td:eq(1)").text();
  const age = $(this).find("td:eq(2)").text();
  const name = $(this).find("td:eq(3)").text();
  const contact = $(this).find("td:eq(4)").text();
  const visitCount = $(this).find("td:eq(5)").text();
  const city = $(this).find("td:eq(6)").text();
  const contry = $(this).find("td:eq(7)").text();
  const email = $(this).find("td:eq(8)").text();
  const gender = $(this).find("td:eq(9)").text().trim();
  const navigeter = $(this).find("td:eq(11)").text().trim();
  localStorage.setItem("navigeter", navigeter);

  const nic = $(this).find("td:eq(10)").text();

  const gendernew = gender.trim();

  // const length = gender.length;
  // console.log("Gender:", gender);
  // console.log("Character count:", length);
  // console.log(gender + "--------------------------");
  // console.log("Gender from table:", gender);
  console.log("Selected value:", $("#patienGenderId").val());
  // .removeClass("select-error error-border")
  $("#patienGenderId").val(gender);

  $("#PatientId").val(id);
  $("#patienAddress").val(address);
  $("#PatientAge").val(age);
  $("#customerName").val(name);
  $("#phoneNumber").val(contact);
  $("#cityId").val(city);
  $("#Countryid").val(contry);
  $("#emailid").val(email);
  $("#Patientnic").val(nic);
  // $("#patienGenderId").val();

  showEditMode();
  const modal = new bootstrap.Modal(
    document.getElementById("addCustomerModal"),
  );
  modal.show();
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
  $("#patienGenderId").val("Other");
}

function getAllpation() {
  $("#addCustomerModal").on("hidden.bs.modal", () => {
    cleare();
    showAddMode();
  });
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/CustomerController/getPeations",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    //methanata heder eka danna one tocken eka samaga
    contentType: "application/json",
    success: function (data, textStatus, jqXHR) {
      console.log(data);
      const tableBody = $("#tbodyPeation");
      tableBody.empty();
      data.data.forEach((patient) => {
        const row = `
        <tr>
          <td>${patient.id}</td>
          <td>${patient.address}</td>
          <td>${patient.age + ""}</td>
          <td>${patient.firstName}
          <td>${patient.pone + ""}</td>
          <td>${patient.visitCount + ""}</td>
           <td>${patient.city}</td>
          <td>${patient.country}</td>
          <td>${patient.email}</td>
          <td>${patient.gender}</td>
          <td>${patient.nic}</td>
          <td>${patient.navigator}</td>
        </tr>
      `;
        tableBody.append(row);
      });
    },
    error: function (jqXHR) {},
  });
}

window.addEventListener("DOMContentLoaded", () => {
  getAllpation();
  loadPieChart();
});

$("#DeleteBtnBostrapModal").on("click", () => {
  const id = $("#PatientId").val();
  const firstName = $("#customerName").val();
  // const age = $("#PatientAge");
  // const nic = $("#Patientnic");
  // const phone = $("#phoneNumber");
  // const address = $("#patienAddress");
  // const city = $("#cityId");
  // const country = $("#Countryid");
  // const gender = $("#patienGenderId");
  // const email = $("#emailid");

  if ($("#PatientId").val().trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Pleas select avelable row to delete",
      text: "",
      background: "#1e1e2f",
      color: "#ffffff",
      iconColor: "#500105",
      showConfirmButton: "Ok",
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/CustomerController/deletePetition?id=${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    contentType: "application/json",
    success: function (data, textStatus, jqXHR) {
      // data = already parsed JSON
      console.log(data);

      if (data.status === 200) {
        console.log(data.messege);

        // token save
        localStorage.setItem("token", data.data);

        Swal.fire({
          icon: "success",
          title: "Delete Successful",
          text: "",
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#4caf50",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          // window.location.href = "index.html";
          cleare();
          getAll();
        });
      } else {
        getAllpation();
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
      let message = jqXHR.responseJSON.message;

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
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
});

$("#EditeBtnBostrapModal").on("click", () => {
  // alert("ksjdks");

  const id = $("#PatientId");
  const firstName = $("#customerName");
  const age = $("#PatientAge");
  const nic = $("#Patientnic");
  const phone = $("#phoneNumber");
  const address = $("#patienAddress");
  const city = $("#cityId");
  const country = $("#Countryid");
  const gender = $("#patienGenderId");
  const email = $("#emailid");

  if ($("#PatientId").val().trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Pleas select avelable row to delete",
      text: "",
      background: "#1e1e2f",
      color: "#ffffff",
      iconColor: "#500105",
      showConfirmButton: "Ok",
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/CustomerController/updatePetition",
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    contentType: "application/json",
    data: JSON.stringify({
      id: id.val(),
      firstName: firstName.val(),
      lastName: "",
      age: age.val(),
      gender: gender.val(),
      nic: nic.val(),
      email: email.val(),
      pone: phone.val(),
      address: address.val(),
      city: city.val(),
      country: country.val(),
      password: "",
      userName: "",
      navigator: localStorage.getItem("navigeter"),
    }),
    success: function (data, textStatus, jqXHR) {
      // data = already parsed JSON
      console.log(data);

      if (data.status === 200) {
        console.log(data.messege);

        // token save
        localStorage.setItem("token", data.data);

        Swal.fire({
          icon: "success",
          title: "Update Successful",
          text: "Redirecting to home page...",
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#4caf50",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          // window.location.href = "index.html";
          cleare();
          getAllpation();
        });
      } else {
        getAll();
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.messege,
          background: "#1e1e2f",
          color: "#ffffff",
          iconColor: "#ff4d4f",
        });
      }
    },
    error: function (jqXHR) {
      let message = jqXHR.responseJSON.message;

      Swal.fire({
        icon: "error",
        title: "Update Failed",
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
});

$("#refreshId").on("click", () => {
  getAllpation();
  cleare();
});

function searchPations() {
  let text = $("#serchBarIdPation").val().trim();
  text;

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/CustomerController/serchPeations?text=${text}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    success: function (respons) {
      const pationsList = respons.data;
      $("#tbodyPeation").empty();
      for (let i = 0; i < pationsList.length; i++) {
        var patient = pationsList[i];
        const trow = document.createElement("tr");
        // trow.classList.add("item-row");
        trow.innerHTML = `
                     <tr>
          <td>${patient.id}</td>
          <td>${patient.address}</td>
          <td>${patient.age + ""}</td>
          <td>${patient.firstName}
          <td>${patient.pone + ""}</td>
          <td>${patient.visitCount + ""}</td>
           <td>${patient.city}</td>
          <td>${patient.country}</td>
          <td>${patient.email}</td>
          <td>${patient.gender}</td>
          <td>${patient.nic}</td>
          <td>${patient.navigator}</td>
        </tr>

`;

        $("#tbodyPeation").append(trow);
      }
    },
    error: function (respons) {},
  });
}

// Patient Pie Chart
const pieCtx = document.getElementById("patientPieChart").getContext("2d");
new Chart(pieCtx, {
  type: "pie",
  data: {
    labels: [
      "0-18 Years",
      "19-35 Years",
      "36-50 Years",
      "51-65 Years",
      "65+ Years",
    ],
    datasets: [
      {
        data: [156, 423, 389, 201, 76],
        backgroundColor: [
          "#00c6fb",
          "#f093fb",
          "#fa709a",
          "#4facfe",
          "#667eea",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgba(255,255,255,0.8)",
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} patients (${percentage}%)`;
          },
        },
      },
    },
  },
});

// ================= CHART CODE =================
const API_BASE_URL =
  "http://localhost:8080/api/v1/dentalcare/CustomerController";

async function loadPieChart() {
  try {
    // 🔐 Get token
    const token = localStorage.getItem("usertoken");

    if (!token) {
      console.error("No token found. Please login again.");
      return;
    }

    // 📡 API call with Authorization
    const response = await fetch(`${API_BASE_URL}/age-stats`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // ❌ Handle HTTP errors
    if (!response.ok) {
      console.error("HTTP Error:", response.status);
      return;
    }

    const data = await response.json();

    // ❌ API level error
    if (data.status !== 200) {
      console.error("API Error:", data.message);
      return;
    }

    const stats = data.data;

    // ❌ No data check
    if (!stats?.ageDistribution?.length) {
      console.warn("No data available for chart");
      return;
    }

    // 📊 Prepare data
    const labels = stats.ageDistribution.map((item) => item.ageGroup);
    const counts = stats.ageDistribution.map((item) => Number(item.count) || 0);

    // 🎯 Get canvas safely
    const canvas = document.getElementById("patientPieChart");
    if (!canvas) {
      console.error("Canvas element not found!");
      return;
    }

    const ctx = canvas.getContext("2d");

    // 🔄 Destroy old chart
    if (window.patientPieChart) {
      window.patientPieChart.destroy();
    }

    // 🎨 Create chart
    window.patientPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: [
              "#00c6fb",
              "#f093fb",
              "#fa709a",
              "#4facfe",
              "#667eea",
            ],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "rgba(255,255,255,0.8)",
              font: { size: 12 },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = total
                  ? ((value / total) * 100).toFixed(1)
                  : 0;

                return `${label}: ${value} patients (${percentage}%)`;
              },
            },
          },
        },
      },
    });

    // 🔢 Update total count
    const totalElement = document.getElementById("totalPatientsCount");
    if (totalElement) {
      totalElement.innerHTML = `Total: ${stats.totalPatients}`;
    }
  } catch (error) {
    console.error("Error loading pie chart:", error);
  }
}

// const API_BASE_URL =
//   "http://localhost:8080/api/v1/dentalcare/CustomerController";

// async function loadPieChart() {
//   try {
//     const response = await fetch(`${API_BASE_URL}/age-stats`);
//     const data = await response.json();

//     if (data.status === 200) {
//       const stats = data.data;

//       if (
//         !stats ||
//         !stats.ageDistribution ||
//         stats.ageDistribution.length === 0
//       ) {
//         console.log("No data available");
//         return;
//       }

//       const ageDistribution = stats.ageDistribution;
//       const totalPatients = stats.totalPatients;
//       const labels = ageDistribution.map((item) => item.ageGroup);
//       const counts = ageDistribution.map((item) => parseInt(item.count));

//       const ctx = document.getElementById("patientPieChart").getContext("2d");

//       if (window.patientPieChart) {
//         window.patientPieChart.destroy();
//       }

//       window.patientPieChart = new Chart(ctx, {
//         type: "pie",
//         data: {
//           labels: labels,
//           datasets: [
//             {
//               data: counts,
//               backgroundColor: [
//                 "#00c6fb", // 0-18
//                 "#f093fb", // 19-35
//                 "#fa709a", // 36-50
//                 "#4facfe", // 51-65
//                 "#667eea", // 65+
//               ],
//               borderWidth: 0,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               position: "bottom",
//               labels: {
//                 color: "rgba(255,255,255,0.8)",
//                 font: { size: 12 },
//               },
//             },
//             tooltip: {
//               callbacks: {
//                 label: function (context) {
//                   const label = context.label || "";
//                   const value = context.raw || 0;
//                   const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                   const percentage = ((value / total) * 100).toFixed(1);
//                   return `${label}: ${value} patients (${percentage}%)`;
//                 },
//               },
//             },
//           },
//         },
//       });

//       const totalElement = document.getElementById("totalPatientsCount");
//       if (totalElement) {
//         totalElement.innerHTML = `Total: ${totalPatients}`;
//       }
//     }
//   } catch (error) {
//     console.error("Error loading pie chart:", error);
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    loadPieChart();
  }, 500);

  const refreshBtn = document.getElementById("refreshId");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      loadPieChart();
    });
  }
});

document
  .getElementById("saveBtnPationsection")
  ?.addEventListener("click", function () {
    $("#addCustomerModal").modal("show");
  });
