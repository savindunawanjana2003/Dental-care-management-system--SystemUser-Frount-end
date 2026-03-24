$(document).ready(function () {
  lodeNextDoctorId();
  lodetableDoctor();
  getAll();
});

//   ======================================

$("#doctorsTableBody").on("click", "tr", function () {
  const userid = $(this).find("td:eq(0)").text();
  const fullname = $(this).find("td:eq(1)").text();
  const email = $(this).find("td:eq(2)").text();
  const rolle = $(this).find("td:eq(3)").text();
  const ponNumber = $(this).find("td:eq(4)").text();
  const nic = $(this).find("td:eq(5)").text();
  const regDate = $(this).find("td:eq(6)").text();

  const doctorPhone = $("#doctorPhone").val(ponNumber);
  const doctorNic = $("#doctorNic").val(nic);
  const doctorEmail = $("#doctorEmail").val(email);
  const doctorRegDate = $("#doctorRegDate").val(regDate);
  const doctorFullName = $("#doctorFullName").val(fullname);
  const userId = $("#systemUserId").val(userid);
});

//   ==============================================
function getAll() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/getall",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (data, textStatus, jqXHR) {
      const doctorsList = data.data;

      // const doctorCout = doctorsList.length;
      // console.log(doctorCout + "===========================");
      // $("#doctorListCount").text(doctorCout);

      $("#recentDoctorsBody").empty();
      for (let i = 0; i < doctorsList.length; i++) {
        var doctor = doctorsList[i];
        const trow = document.createElement("tr");
        trow.innerHTML = `
                     <tr>
          <td>${doctor.doctorId}</td>
          <td>${doctor.fullname}</td>
          <td>${doctor.specialty}</td>
          <td>${doctor.experience}
          <td>${doctor.createdAt + ""}</td>
          <td>${doctor.nicNumber + ""}</td>
                    <td>${doctor.createdAt}</td>


        </tr>
`;

        $("#recentDoctorsBody").append(trow);
      }
    },
    error: function (jqXHR) {
      alert("error");
    },
  });
}

//   =======================================

//   function searchDoctors() {
//     const input = document
//       .getElementById("searchDoctorInput")
//       .value.toLowerCase();
//     console.log(input);
//   }

//   function searchDoctors() {
//     console.log("-----------------------");
//     const text = document.getElementById("searchDoctorInput").val().trim();
//     // let text = $("#searchDoctorInput").val().trim();
//     // text;

//     $.ajax({
//       url: `http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/serch?text=${text}`,
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//       },
//       success: function (respons) {
//         const pationsList = respons.data;
//         $("#doctorsTableBody").empty();
//         for (let i = 0; i < pationsList.length; i++) {
//           var doctor = pationsList[i];
//           const trow = document.createElement("tr");
//           trow.innerHTML = `
//                      <tr>
//            <td>${doctor.userId}</td>
//           <td>${doctor.fullname}</td>
//           <td>${doctor.email}</td>
//           <td>${doctor.role}
//           <td>${doctor.phoneNumber + ""}</td>
//           <td>${doctor.nicNumber + ""}</td>
//                     <td>${doctor.createdAt}</td>
//         </tr>

// `;
//           $("#tbodyPeation").append(trow);
//         }
//       },
//       error: function (respons) {},
//     });
//   }

// ===========================================
function lodetableDoctor() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/getDoctors",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (data, textStatus, jqXHR) {
      const doctorsList = data.data;

      const doctorCout = doctorsList.length;
      // console.log(doctorCout + "===========================");
      $("#doctorListCount").text(doctorCout);

      $("#doctorsTableBody").empty();
      for (let i = 0; i < doctorsList.length; i++) {
        var doctor = doctorsList[i];
        const trow = document.createElement("tr");
        trow.innerHTML = `
                     <tr>
          <td>${doctor.userId}</td>
          <td>${doctor.fullname}</td>
          <td>${doctor.email}</td>
          <td>${doctor.role}
          <td>${doctor.phoneNumber + ""}</td>
          <td>${doctor.nicNumber + ""}</td>
                    <td>${doctor.createdAt}</td>


        </tr>
`;

        $("#doctorsTableBody").append(trow);
      }
    },
    error: function (jqXHR) {
      alert("error");
    },
  });
}

function clear() {
  $("#systemUserId").val("");
  $("#doctorSpecialty").val("");
  $("#doctorExperience").val("");
  $("#doctorPhone").val("");
  $("#doctorNic").val("");
  $("#doctorEmail").val("");
  $("#doctorRegDate").val("");
  $("#doctorFullName").val("");
  $("#doctorSchedule").val("");
}

$("#saveDoctorBtn").on("click", () => {
  const doctorId = $("#doctorId").val();
  const userId = $("#systemUserId").val();
  const specialty = $("#doctorSpecialty").val();
  const experience = $("#doctorExperience").val();
  const doctorPhone = $("#doctorPhone").val();
  const doctorNic = $("#doctorNic").val();
  const doctorEmail = $("#doctorEmail").val();
  const doctorRegDate = $("#doctorRegDate").val();
  const doctorFullName = $("#doctorFullName").val();
  const avelableTimeDate = $("#doctorSchedule").val();

  if (!doctorEmail) {
    Swal.fire({
      icon: "warning",
      title: "Doctor Selection Required",
      text: "Please select an employee as a doctor to register.",
      confirmButtonText: "Got it",
      confirmButtonColor: "#e74c3c",
      background: "#1e272e",
      color: "#ffffff",
      iconColor: "#f39c12",
    });
    return;
  }

  if (specialty === "") {
    Swal.fire({
      icon: "warning",
      title: "Doctor Specialty Required",
      text: "Please select a Specialty",
      confirmButtonText: "Got it",
      confirmButtonColor: "#e74c3c",
      background: "#1e272e",
      color: "#ffffff",
      iconColor: "#f39c12",
    });
    return;
  }

  if (!experience || !avelableTimeDate) {
    Swal.fire({
      icon: "warning",
      title: "requird  all inputs filds",
      text: " experience or avelable dates ware  emty",
      confirmButtonText: "Got it",
      confirmButtonColor: "#e74c3c",
      background: "#1e272e",
      color: "#ffffff",
      iconColor: "#f39c12",
    });
    return;
  }

  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/saveDoctorDeatiles",
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    data: JSON.stringify({
      doctorId: doctorId,
      systemUserId: userId,
      specialty: specialty,
      experience: experience,
      rating: 1,
      availability: avelableTimeDate,
      about: "",
      fullname: doctorFullName,
      phoneNumber: doctorPhone,
      nicNumber: doctorNic,
      email: doctorEmail,
      createdAt: doctorRegDate,
    }),
    success: function (data, textStatus, jqXHR) {
      Swal.fire({
        icon: "success",
        title: "Saved Successful",
        text: "Redirecting to User page...",
        background: "#1e1e2f",
        color: "#ffffff",
        iconColor: "#4caf50",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      }).then(() => {
        lodeNextDoctorId();
        clear();
        getAll();
      });
    },
    error: function (jqXHR) {
      // alert("error");
    },
  });
});

function lodeNextDoctorId() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/getLastId",
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (data, textStatus, jqXHR) {
      const nextId = data.data;
      $("#doctorId").val(nextId);
      // alert(nextId);
    },
    error: function (jqXHR) {
      alert("error");
    },
  });
}

function searchDoctors() {
  console.log("-----------------------");
  const text = $("#searchDoctorInput").val().trim();
  // let text = $("#searchDoctorInput").val().trim();
  // text;

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/DoctorDeatiles/serch?text=${text}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    success: function (respons) {
      const pationsList = respons.data;
      // console.log(pationsList);
      $("#doctorsTableBody").empty();
      for (let i = 0; i < pationsList.length; i++) {
        var doctor = pationsList[i];
        const trow = document.createElement("tr");
        trow.innerHTML = `
                     <tr>
           <td>${doctor.userId}</td>
          <td>${doctor.fullname}</td>
          <td>${doctor.email}</td>
          <td>${doctor.role}
          <td>${doctor.phoneNumber + ""}</td>
          <td>${doctor.nicNumber + ""}</td>
                    <td>${doctor.createdAt}</td>
        </tr>

`;

        $("#doctorsTableBody").append(trow);
      }
    },
    error: function (respons) {},
  });
}
