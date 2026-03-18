function blinkField(fieldId) {
  const field = $("#" + fieldId);
  const modal = field.closest(".modal");

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
    url: "http://localhost:8080/api/v1/dentalcare/auth/PhysicalRegistration",
    method: "POST",
    contentType: "application/json",
    //methanata heder eka danna one tocken eka samaga
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
      // data = already parsed JSON
      console.log(data);

      if (data.status === 201) {
        console.log(data.messege);

        // token save
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
          // window.location.href = "index.html";
          cleare();
          getAll();
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
      // let body = jqXHR.responseJSON;
      // alert(body);
      let message = "";
      if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
        message = jqXHR.responseJSON.message;
      } else {
        message = jqXHR.responseText; // fallback: raw text
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

  // 👉 API call එක මෙතන දාන්න පුළුවන්
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
  // console.log("+++" + navigeter);
  // const gender = $(this).find("td:eq(9)").text().replace(/\s+/g, "").trim();
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

function getAll() {
  $("#addCustomerModal").on("hidden.bs.modal", () => {
    cleare();
    showAddMode(); // default state
  });
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/auth/getPeations",
    method: "GET",
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
  getAll();
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
    url: `http://localhost:8080/api/v1/dentalcare/auth/deletePetition?id=${id}`,
    method: "DELETE",
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
        getAll();
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
    url: `http://localhost:8080/api/v1/dentalcare/auth/updatePetition`,
    method: "PUT",
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
          getAll();
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
  getAll();
  cleare();
});

function searchPations() {
  let text = $("#serchBarIdPation").val().trim();
  text;

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/auth/serchPeations?text=${text}`,
    method: "GET",
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
