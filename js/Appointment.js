$(document).ready(function () {
  lodeDoctornames();
  lodeNextId();
});

function lodeNextId() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/AppointmentController/getNextId",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (data, textStatus, jqXHR) {
      const lastId = data.data;

      $("#appointmentId").val(lastId);
    },
    error: function (jqXHR) {
      alert("error");
    },
  });
}

function lodeDoctornames() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/getall",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (data) {
      const doctorsLis = data.data;

      $("#appointmentDoctor").empty();
      $("#appointmentDoctor").append(
        `<option value="">-- Select Doctor --</option>`,
      );

      for (let i = 0; i < doctorsLis.length; i++) {
        let doctor = doctorsLis[i];

        const option = `<option value="${doctor.doctorId}">
                          ${doctor.fullname}
                        </option>`;

        $("#appointmentDoctor").append(option);
      }
    },
    error: function () {
      alert("error");
    },
  });
}

$("#saveAppointmentBtn").on("click", () => {
  // Input values
  let appointmentDate = $("#appointmentDate").val();
  let appointmentDoctor = $("#appointmentDoctor").val();
  let appointmentReason = $("#appointmentReason").val();
  let appointmentStatus = $("#appointmentStatus").val();
  let pationId = $("#pationId").val();
  let times = $("#timeId").val();
  let id = $("#appointmentId").val();

  // Check if any field is empty
  if (
    !appointmentDate ||
    !appointmentDoctor ||
    !appointmentReason ||
    !appointmentStatus
  ) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please fill all required fields!",
    });
    return;
  }

  if (!pationId) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please serch  pation. from using  above  search bar ",
    });
    return;
  }

  if (!times) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Please give the time for the Apointmant..",
    });
    return;
  }
  // =============================
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/AppointmentController/saveApoinmant",
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    data: JSON.stringify({
      appointmentId: id,
      pationId: pationId,
      doctorId: appointmentDoctor,
      appointmentDate: appointmentDate,
      appointmentTime: times,
      status: appointmentStatus,
      description: appointmentReason,
      navigeter: "Pisical",
      createAtApoinmant: "",
    }),
    success: function (data, textStatus, jqXHR) {
      console.log(data);

      if (data.status === 200) {
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
          lodeNextId();
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

  // ===============================
});

function searchPetionsForApoinmants() {
  let text = $("#searchPatientsInputId").val().trim();

  // If input is empty, hide results
  if (text === "") {
    $("#patientSearchResults").empty().hide();
    return;
  }

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/CustomerController/serchPeations?text=${text}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    success: function (response) {
      const patientsList = response.data;

      // Clear previous results
      const resultsDiv = $("#patientSearchResults");
      resultsDiv.empty();

      if (patientsList.length === 0) {
        resultsDiv
          .append(`<div class="no-results">No patients found</div>`)
          .show();
        return;
      }

      // Append each patient to the dropdown
      patientsList.forEach((patient) => {
        resultsDiv.append(`
          <div class="search-item" onclick="selectPatient('${patient.id}', '${patient.firstName}')">
            ${patient.firstName} - ${patient.nic} - ${patient.pone}
          </div>
        `);
      });

      resultsDiv.show();
    },
    error: function (error) {
      console.error("Search error:", error);
    },
  });
}

// Function to handle selecting a patient
function selectPatient(id, name) {
  $("#searchPatientsInputId").val(name);
  $("#pationId").val(id);
  $("#patientSearchResults").empty().hide();

  // Optionally, do something with the selected patient id
  console.log("Selected patient ID:", id);
}

$("#appointmentDoctor").on("change", function () {
  let selectedDoctor = $(this).val();

  let appointmentDate = $("#appointmentDate").val();

  if (!appointmentDate) {
    Swal.fire({
      icon: "error",
      title: "Please select adate for the Appoinmant",
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
    url: `http://localhost:8080/api/v1/dentalcare/AppointmentController/${selectedDoctor}/${$("#appointmentDate").val()}`,
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (res) {
      console.log(res);

      const tabody = $("#appointmentsTableBody");
      tabody.empty();
      const appointments = res.data;

      appointments.forEach((app) => {
        console.log(app.pationId);
        console.log("===============================");

        const html = `
        <tr>
          <td>${app.appointmentId}</td>
          <td>${app.pationId}</td>
          <td>${app.doctorId}</td>
          <td>${app.appointmentDate}</td>
          <td>${app.appointmentTime}</td>
          <td>${app.status}</td>
          <td>
            <button class="btn btn-danger btn-sm delete-btn" data-id="${app.appointmentId}">
              Delete
            </button>
          </td>
        </tr>
      `;

        tabody.append(html);
      });
    },

    error: function (err) {
      console.error(err);
    },
  });

  console.log("Selected Doctor:", selectedDoctor);
});
