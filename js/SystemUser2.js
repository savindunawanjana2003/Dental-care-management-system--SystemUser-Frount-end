// window.onload = function () {};

$(document).ready(function () {
  sayHello();
});

const patterns = {
  name: /^[A-Za-z\s]{3,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  phone: /^07\d{8}$/,
  username: /^[A-Za-z0-9_]{2,20}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/,
  oldNICPattern: /^[0-9]{9}[vVxX]$/,
  newNICPattern: /^[0-9]{12}$/,
};

refreshUsersBtn;

const validateForm = (isAddMode = true) => {
  const name = $("#userFullName").val().trim();
  const email = $("#userEmail").val().trim();
  const username = $("#userUsername").val().trim();
  const phone = $("#userPhone").val().trim();
  const role = $("#userRole").val();
  const password = $("#userPassword").val();
  const confirmPassword = $("#userConfirmPassword").val();
  const userNic = $("#usernic").val();

  if (!patterns.name.test(name)) {
    blinkField("userFullName");
    Swal.fire("Error", "Name must contain at least 3 letters", "error");
    return false;
  }

  if (!patterns.email.test(email)) {
    blinkField("userEmail");
    Swal.fire("Error", "Enter a valid email address", "error");
    return false;
  }

  if (
    !patterns.oldNICPattern.test(userNic) &&
    !patterns.newNICPattern.test(userNic)
  ) {
    blinkField("usernic");
    Swal.fire("Error", "Enter a valid  Nic patten !", "error");
    return false;
  }

  if (!patterns.username.test(username)) {
    blinkField("userUsername");
    Swal.fire(
      "Error",
      "Username must be 4-20 characters (letters, numbers, underscore)",
      "error",
    );
    return false;
  }

  const userType = localStorage.getItem("UserType");

  if (userType === "SYSTEMUSER") {
    if (isAddMode) {
      if (!patterns.password.test(password)) {
        blinkField("userPassword");
        Swal.fire(
          "Error",
          "Password must be at least 6 characters with letters and numbers",
          "error",
        );
        return false;
      }

      if (password !== confirmPassword) {
        blinkField("userConfirmPassword");
        Swal.fire("Error", "Passwords do not match", "error");
        return false;
      }
    }
  }

  if (!patterns.phone.test(phone)) {
    blinkField("userPhone");
    Swal.fire(
      "Error",
      "Phone number must start with 07 and have 10 digits",
      "error",
    );
    return false;
  }

  if (!role) {
    blinkField("userRole");
    Swal.fire("Error", "Please select a role", "error");
    return false;
  }

  return true;
};

const validateForm2 = (isAddMode = true) => {
  const name = $("#userFullName").val().trim();
  const email = $("#userEmail").val().trim();
  const username = $("#userUsername").val().trim();
  const phone = $("#userPhone").val().trim();
  const role = $("#userRole").val();
  const password = $("#userPassword").val();
  const confirmPassword = $("#userConfirmPassword").val();
  const userNic = $("#usernic").val();

  if (!patterns.name.test(name)) {
    blinkField("userFullName");
    Swal.fire("Error", "Name must contain at least 3 letters", "error");
    return false;
  }

  if (!patterns.email.test(email)) {
    blinkField("userEmail");
    Swal.fire("Error", "Enter a valid email address", "error");
    return false;
  }

  if (
    !patterns.oldNICPattern.test(userNic) &&
    !patterns.newNICPattern.test(userNic)
  ) {
    blinkField("usernic");
    Swal.fire("Error", "Enter a valid  Nic patten !", "error");
    return false;
  }

  if (!patterns.username.test(username)) {
    blinkField("userUsername");
    Swal.fire(
      "Error",
      "Username must be 4-20 characters (letters, numbers, underscore)",
      "error",
    );
    return false;
  }

  if (!patterns.phone.test(phone)) {
    blinkField("userPhone");
    Swal.fire(
      "Error",
      "Phone number must start with 07 and have 10 digits",
      "error",
    );
    return false;
  }

  if (!role) {
    blinkField("userRole");
    Swal.fire("Error", "Please select a role", "error");
    return false;
  }

  if (isAddMode) {
    if (!patterns.password.test(password)) {
      blinkField("userPassword");
      Swal.fire(
        "Error",
        "Password must be at least 6 characters with letters and numbers",
        "error",
      );
      return false;
    }
  }

  return true;
};

// ==========================================
function saveUser() {
  if (!validateForm(true)) return;

  const id = $("#userId").val().trim();
  const userFullname = $("#userFullName").val().trim();
  const email = $("#userEmail").val().trim();
  const systemUsername = $("#userUsername").val().trim();
  const rolle = $("#userRole").val().trim();
  const poneNumber = $("#userPhone").val().trim();
  const status = $("#userStatus").val().trim();
  const nic = $("#usernic").val().trim();
  const password = $("#userPassword").val().trim();
  console.log(password);
  const userType = $("#userType").val().trim();

  const now = new Date();

  let year = now.getFullYear(); // 2026
  let month = now.getMonth() + 1; // 0-11 (so +1)
  let day = now.getDate(); // 1-31

  console.log(year, month, day);
  // console.log();

  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/systemUser/registerSystemUser",
    method: "POST",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    data: JSON.stringify({
      userId: id,
      fullname: userFullname,
      email: email,
      username: systemUsername,
      role: rolle,
      phoneNumber: poneNumber,
      status: status,
      password: password,
      createdAt: `${year}` + `/` + `${month}` + `/` + `${day}`,
      nicNumber: nic,
      userType: userType,
    }),
    success: function (data, textStatus, jqXHR) {
      // alert("ok");
      Swal.fire({
        icon: "success",
        title: "Saved Successful",
        text: "Redirecting to User page...",
        background: "#1e1e2f",
        color: "#ffffff",
        iconColor: "#4caf50",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
      }).then(() => {
        cleare();
        getAll();
        if (typeof lodetableDoctor() === "function") {
          lodetableDoctor();
        }
      });
      clear();
      //   getAllUsers();
    },
    error: function (jqXHR) {
      alert("error");
    },
  });
}

const userType = $("#userType").val();
if (userType === "EMPLOYEE") {
  $("#passwordField").hide();
  $("#confirmPasswordField").hide();
} else {
  $("#passwordField").show();
  $("#confirmPasswordField").show();
}

const modalElement = document.getElementById("systemUserModal");

modalElement.addEventListener("hidden.bs.modal", function () {
  localStorage.removeItem("passwordForedit");
  localStorage.removeItem("UserType");
  clear();
});

function handleUserTypeChange(type, rsp) {
  if (type === null) {
  } else {
    console.log("User type:", type);

    if (rsp === "SYSTEMUSER") {
      $("#passwordField").show();
      $("#confirmPasswordField").show();

      $("#userPassword").prop("required", true);
      $("#userConfirmPassword").prop("required", true);
      $("#userPassword").val(localStorage.getItem("passwordForedit"));
      $("#userConfirmPassword").val(localStorage.getItem("passwordForedit"));
    } else if (rsp === "EMPLOYEE") {
      $("#passwordField").hide();
      $("#confirmPasswordField").hide();
      // $("#confirmpassworlblId").hide();
      // $("#lblusername1").hide();

      $("#userPassword").prop("required", false);
      $("#userConfirmPassword").prop("required", false);

      $("#userPassword").val("");
      $("#userConfirmPassword").val("");
    }
  }
}

// Add change event listener
$("#userType").on("change", function () {
  const selectedValue = $(this).val();
  localStorage.setItem("UserType", selectedValue);
  const key = localStorage.getItem("passwordForedit");
  handleUserTypeChange(key, selectedValue);

  console.log("Selected user type:", selectedValue);

  if (selectedValue === "SYSTEMUSER") {
    console.log("System User selected - showing password fields");
    $("#passwordField").show();
    $("#confirmPasswordField").show();
    $("#userPassword").prop("required", true);
    $("#userConfirmPassword").prop("required", true);
  } else if (selectedValue === "EMPLOYEE") {
    console.log("Employee selected - hiding password fields");
    $("#passwordField").hide();
    $("#confirmPasswordField").hide();
    $("#userPassword").prop("required", false);
    $("#userConfirmPassword").prop("required", false);
    // Clear password fields when hiding
    $("#userPassword").val("");
    $("#userConfirmPassword").val("");
  }
});

$("#addUserBtn").on("click", () => {
  clear();

  // Reset user type to default
  $("#userType").val("SYSTEMUSER");

  // Show password fields for new user
  $("#passwordField").show();
  $("#confirmPasswordField").show();

  $("#modalTitle").text("Add User");
  $("#userPassword").prop("readonly", false);
  $("#userConfirmPassword").prop("readonly", false);
  $("#userJoinDate").prop("readonly", false);
  $("#userPassword").prop("required", true);
  $("#userConfirmPassword").prop("required", true);

  $("#updateUserBtn").css("display", "none");
  $("#saveUserBtn").css("display", "block");
  getNextId();

  const modal = new bootstrap.Modal(document.getElementById("systemUserModal"));
  modal.show();
});

$("#saveUserBtn").on("click", () => {
  saveUser();
  getAllUsers();
});

function getAllUsers() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/systemUser/getAllUsers",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },

    success: (response) => {
      console.log("FULL RESPONSE:", response);

      if (response.status === 200 && response.data) {
        // 🔥 IMPORTANT: check your backend structure
        const users = response.data.data || response.data;

        $("#usersTableBody").empty();

        if (!users || users.length === 0) {
          $("#usersTableBody").html(
            `<tr><td colspan="9" class="text-center">No Users Found</td></tr>`,
          );
          return;
        }

        // 🎨 Role colors
        const roleColors = {
          ADMIN: "#667eea",
          DOCTOR: "#00c6fb",
          CASHIER: "#f093fb",
          RECEPTIONIST: "#4facfe",
          NURSE: "#fa709a",
        };

        // 🔁 Loop users
        users.forEach((user) => {
          const row = `
            <tr>
              <td>${user.userId || user.id || "N/A"}</td>

              <td>${user.fullname || user.firstName || ""}</td>

              <td>
                <span style="
                  background: ${roleColors[user.role] || "#999"};
                  padding: 5px 12px;
                  border-radius: 20px;
                  color: white;
                  font-size: 12px;">
                  ${user.role || "N/A"}
                </span>
              </td>

              <td>${user.phoneNumber || "-"}</td>

              <td>${user.nicNumber || "-"}</td>

              <td>${user.email || "-"}</td>

              <td>
                ${
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "-"
                }
              </td>
              

              <td>
               
<button class="btn btn-sm btn-warning edit-btn" )">
  <i class="fas fa-edit"></i>
</button>

<button class="btn btn-sm btn-danger" onclick="deleteUser('${user.userId}')">
  <i class="fas fa-trash"></i>
</button>

<button class="btn btn-sm btn-dark" onclick="viewModalUser('${user.userId}')">
  <i class="fas fa-eye"></i>
</button>
              </td>
              <td>
                <span style="
                  background: ${
                    user.status === "Active" ? "#c0260b" : "#ff9800"
                  };
                  padding: 5px 12px;
                  border-radius: 20px;
                  color: white;
                  font-size: 12px;">
                  ${user.status || "Active"}
                </span>
              </td>
               <td>
                ${user.userType}
              </td>
            </tr>
          `;

          $("#usersTableBody").append(row);
        });
      } else {
        console.log("No data or invalid response");
      }
    },

    error: (xhr) => {
      console.error("Error fetching users:", xhr);
      Swal.fire("Error", "Failed to load users", "error");
    },
  });
}
// onclick="editUser('${user.userId}'
// =======================================================

// alert("ksjkd");
$("#refreshUsersBtn").on("click", () => {
  //   SystemUserManager.getAllUsers();
  //   alert("ksjaksja");
  getAllUsers();
  clear();
});

function sayHello() {
  getAllUsers();
  clear();
}

// ===================clik table body and  get relavent row data ===================

// Using closest() to find the row and find() to get specific columns
$(document).on("click", ".edit-btn", function () {
  // Get the row (tr) that contains the clicked button

  $("#updateUserBtn").css("display", "block");
  $("#saveUserBtn").css("display", "none");
  $("#modalTitle").text("Edit User");

  const modal = new bootstrap.Modal(document.getElementById("systemUserModal"));
  modal.show();

  const row = $(this).closest("tr");

  // Get data from specific columns using index
  const userId = row.find("td:eq(0)").text().trim(); // Column 0 - User ID
  const fullName = row.find("td:eq(1)").text().trim(); // Column 1 - Name
  const userRole = row.find("td:eq(2)").text().trim(); // Column 2 - Role
  const userPhone = row.find("td:eq(3)").text().trim(); // Column 3 - Phone
  const userNic = row.find("td:eq(4)").text().trim(); // Column 4 - NIC
  const userEmail = row.find("td:eq(5)").text().trim(); // Column 5 - Email
  const createAt = row.find("td:eq(6)").text().trim(); // Column 6 - createAt
  const status = row.find("td:eq(8)").text().trim(); // Column 7 - staus
  // const isSystemUser = row.find("td:eq(9)").text(); // Column 9 - isSystemUser
  const isSystemUser = row.find("td:eq(9)").text().trim();

  console.log("======+++++++++++++++++++++++++++++++++++++++++++");
  console.log(isSystemUser);
  console.log(userRole);
  console.log(status);

  console.log("======+++++++++++++++++++++++++++++++++++++++++++");

  if (isSystemUser === "SYSTEMUSER") {
    console.log("-------------------------------");
    console.log("System User selected - showing password fields");
    $("#passwordField").show();
    $("#userConfirmPassword").show();
    $("#confirmpassworlblId").show();

    $("#passwordField").prop("required", true);
    $("#userConfirmPassword").prop("required", true);
    // ------------------------------
    $("#userUsername").show();
    $("#userUsername").prop("required", true);

    $("#lblusername1").show();

    // $("#userConfirmPassword").prop("required", true);

    // $("#userUsername").prop("required", true);
    // $("#userConfirmPassword").prop("required", true);

    $.ajax({
      url: `http://localhost:8080/api/v1/dentalcare/systemUser/getUser?id=${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
      },

      success: (response) => {
        const user = response.data;

        $("#userPassword").val(user.password);
        $("#userConfirmPassword").val(user.password);
        $("#userUsername").val(user.username);
        console.log(user.password);
        console.log("=====================");
        localStorage.setItem("passwordForedit", user.password);
      },

      error: (xhr) => {
        console.error("Error fetching users:", xhr);
        Swal.fire("Error", "Failed to load users", "error");
      },
    });
  } else if (isSystemUser === "EMPLOYEE") {
    console.log("Employee selected - hiding password fields");
    $("#passwordField").hide();
    $("#userConfirmPassword").hide();
    $("#passwordField").prop("required", false);
    $("#userConfirmPassword").prop("required", false);

    $("#confirmpassworlblId").hide();
    $("#lblusername1").hide();

    $("#userUsername").hide();
    $("#userUsername").prop("required", false);
  }

  $("#userId").val(userId);
  $("#userFullName").val(fullName);
  $("#userEmail").val(userEmail);
  $("#userRole").val(userRole);
  $("#userPhone").val(userPhone);
  $("#userStatus").val(status);
  $("#userType").val(isSystemUser);

  $("#usernic").val(userNic);
  $("#userJoinDate").val(createAt);

  // console.log("User ID:", userId);
  // console.log("Name:", userName);
  // console.log("Role:", userRole);
  // console.log("Phone:", userPhone);
  // console.log("NIC:", userNic);
  // console.log("Email:", userEmail);

  // Now you can use this data to populate your modal
  // editUser(userId);
});

// ==============================================
// const editUser = (userId) => {
//   alert(userId);

//   $("#updateUserBtn").css("display", "block");
//   $("#saveUserBtn").css("display", "none");
//   $("#modalTitle").text("Edit User");

//   const modal = new bootstrap.Modal(document.getElementById("systemUserModal"));
//   modal.show();

//   $.ajax({
//     url: `http://localhost:8080/api/v1/dentalcare/systemUser/getUser?id=${userId}`,
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//     },

//     success: (response) => {
//       const user = response.data;
//       $("#userId").val(user.userId);
//       $("#userFullName").val(user.fullname);
//       $("#userEmail").val(user.email);
//       $("#userUsername").val(user.username);
//       $("#userRole").val(user.role);
//       $("#userPhone").val(user.phoneNumber);
//       $("#userStatus").val(user.status);
//       $("#usernic").val(user.nicNumber);
//       $("#userPassword").val(user.password);

//       $("#userPassword").prop("readonly", false);
//       $("#userConfirmPassword").prop("readonly", false);
//       $("#userJoinDate").prop("readonly", true);
//     },

//     error: (xhr) => {
//       console.error("Error fetching users:", xhr);
//       Swal.fire("Error", "Failed to load users", "error");
//     },
//   });
// };

// $("").on("click", () => {
//   alert("ksjdks");
// });

// $(document).on("click", ".fa-edit", function () {
//   alert("Edit clicked");
// });

// $(document).on("click", "fa-trash", function () {
//   alert("Edit trash");
// });

// $(document).on("click", ".btn-dark", function () {
//   alert("Edit eye");
// });

$("#updateUserBtn").on("click", () => {
  // alert("ljks");
  if (!validateForm2(true)) return;

  const id = $("#userId").val().trim();
  const userFullname = $("#userFullName").val().trim();
  const email = $("#userEmail").val().trim();
  const systemUsername = $("#userUsername").val().trim();
  const rolle = $("#userRole").val();
  const poneNumber = $("#userPhone").val();
  const status = $("#userStatus").val();
  const nic = $("#usernic").val();
  const password = $("#userPassword").val();

  const now = new Date();

  let year = now.getFullYear(); // 2026
  let month = now.getMonth() + 1; // 0-11 (so +1)
  let day = now.getDate(); // 1-31

  console.log(year, month, day);

  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/systemUser/updateUserDeatiles",
    method: "PUT",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    data: JSON.stringify({
      userId: id,
      fullname: userFullname,
      email: email,
      username: systemUsername,
      role: rolle,
      phoneNumber: poneNumber,
      status: status,
      password: password,
      createdAt: `${year}` + `/` + `${month}` + `/` + `${day}`,
      nicNumber: nic,
    }),
    success: (response) => {
      if (response.status === 200) {
        Swal.fire("success", "Update succsess fully !", "");
        getAllUsers();
        clear();
      } else {
        Swal.fire("Error", "User not found", "error");
        getAllUsers();
        clear();
      }
    },

    error: () => {
      Swal.fire("Error", "Failed to load user", "error");
    },
  });
});

// ================================

const deleteUser = (userId) => {
  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/systemUser/deleteUser?id=${userId}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },

    success: (response) => {
      if (response.status == 200) {
        Swal.fire("success", "Delete succsess fully ", "");
        getAllUsers();
        clear();
      } else {
        Swal.fire("success", "Delete Unsuccsess fully !", "");
        getAllUsers();
        clear();
      }
      const user = response.data;
    },

    error: (xhr) => {
      console.error("Error fetching users:", xhr);
      Swal.fire("Error", "Failed to load users", "error");
      getAllUsers();
    },
  });
};

// ========================================
window.onload = function () {
  getAllUsers();
  clear();
};

function clear() {
  $("#userId").val("");
  $("#userFullName").val("");
  $("#userEmail").val("");
  $("#userUsername").val("");
  $("#userRole").val("");
  $("#userPhone").val("");
  $("#userStatus").val("");
  $("#usernic").val("");
  $("#userPassword").val("");

  $("#userPassword").val("");
  $("#userConfirmPassword").val("");
  $("#userJoinDate").val("");
}

function getNextId() {
  $.ajax({
    url: "http://localhost:8080/api/v1/dentalcare/systemUser/getnextsId",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },

    success: (response) => {
      if (response.status == 200) {
        $("#userId").val(response.data);
      } else {
        // Swal.fire("success", "Delete Unsuccsess fully !", "");
        // getAllUsers();
        clear();
      }
      const user = response.data;
    },

    error: (xhr) => {
      // console.error("Error fetching users:", xhr);
      // Swal.fire("Error", "Failed to load users", "error");
      // getAllUsers();
    },
  });
}

function searchUsers() {
  let text = $("#searchUserBar").val().trim();
  // text;

  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/systemUser/serchUsers?text=${text}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
    },
    success: function (respons) {
      console.log("FULL RESPONSE:", respons);

      if (respons.status === 200 && respons.data) {
        // 🔥 IMPORTANT: check your backend structure
        const users = respons.data.data || respons.data;

        $("#usersTableBody").empty();

        if (!users || users.length === 0) {
          $("#usersTableBody").html(
            `<tr><td colspan="9" class="text-center">No Users Found</td></tr>`,
          );
          return;
        }

        // 🎨 Role colors
        const roleColors = {
          ADMIN: "#667eea",
          DOCTOR: "#00c6fb",
          CASHIER: "#f093fb",
          RECEPTIONIST: "#4facfe",
          NURSE: "#fa709a",
        };

        // 🔁 Loop users
        users.forEach((user) => {
          const row = `
            <tr>
              <td>${user.userId || user.id || "N/A"}</td>

              <td>${user.fullname || user.firstName || ""}</td>

              <td>
                <span style="
                  background: ${roleColors[user.role] || "#999"};
                  padding: 5px 12px;
                  border-radius: 20px;
                  color: white;
                  font-size: 12px;">
                  ${user.role || "N/A"}
                </span>
              </td>

              <td>${user.phoneNumber || "-"}</td>

              <td>${user.nicNumber || "-"}</td>

              <td>${user.email || "-"}</td>

              <td>
                ${
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleString()
                    : "-"
                }
              </td>

              <td>
               
<button class="btn btn-sm btn-warning" onclick="editUser('${user.userId}')">
  <i class="fas fa-edit"></i>
</button>

<button class="btn btn-sm btn-danger" onclick="deleteUser('${user.userId}')">
  <i class="fas fa-trash"></i>
</button>

<button class="btn btn-sm btn-dark" onclick="viewModalUser('${user.userId}')">
  <i class="fas fa-eye"></i>
</button>
              </td>
              <td>
                <span style="
                  background: ${
                    user.status === "Active" ? "#c0260b" : "#ff9800"
                  };
                  padding: 5px 12px;
                  border-radius: 20px;
                  color: white;
                  font-size: 12px;">
                  ${user.status || "Active"}
                </span>
              </td>
            </tr>
          `;

          $("#usersTableBody").append(row);
        });
      } else {
        console.log("No data or invalid response");
      }
    },
    error: function (respons) {
      alert(erroe);
    },
  });
}

// ========================
// SYSTEM USER ROLE CHART
// ========================

// let systemUserRoleChart = null;

// function loadSystemUserRoleChart() {
//   $.ajax({
//     url: "http://localhost:8080/api/v1/dentalcare/systemUser/getRoleStats",
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("usertoken")}`,
//     },
//     success: (response) => {
//       if (response.status === 200 && response.data) {
//         const stats = response.data;

//         // Role colors mapping
//         const roleColors = {
//           ADMIN: "#667eea",
//           DOCTOR: "#00c6fb",
//           CASHIER: "#f093fb",
//           RECEPTIONIST: "#4facfe",
//           NURSE: "#fa709a"
//         };

//         // Prepare data for chart
//         const roles = Object.keys(stats);
//         const counts = roles.map(role => stats[role]);
//         const colors = roles.map(role => roleColors[role] || "#999");

//         // Calculate total
//         const total = counts.reduce((a, b) => a + b, 0);
//         $("#totalUsersCount").text(`Total: ${total} users`);

//         // Destroy existing chart if exists
//         if (systemUserRoleChart) {
//           systemUserRoleChart.destroy();
//         }

//         const ctx = document.getElementById("systemUserRoleChart").getContext("2d");
//         systemUserRoleChart = new Chart(ctx, {
//           type: "pie",
//           data: {
//             labels: roles,
//             datasets: [{
//               data: counts,
//               backgroundColor: colors,
//               borderWidth: 0,
//               hoverOffset: 10
//             }]
//           },
//           options: {
//             responsive: true,
//             maintainAspectRatio: false,
//             plugins: {
//               legend: {
//                 position: "bottom",
//                 labels: {
//                   color: "rgba(255,255,255,0.8)",
//                   font: { size: 12 },
//                   padding: 15
//                 }
//               },
//               tooltip: {
//                 callbacks: {
//                   label: function(context) {
//                     const label = context.label || "";
//                     const value = context.raw || 0;
//                     const total = context.dataset.data.reduce((a, b) => a + b, 0);
//                     const percentage = ((value / total) * 100).toFixed(1);
//                     return `${label}: ${value} users (${percentage}%)`;
//                   }
//                 },
//                 backgroundColor: "rgba(0,0,0,0.8)",
//                 titleColor: "#fff",
//                 bodyColor: "#fff"
//               }
//             },
//             animation: {
//               animateScale: true,
//               animateRotate: true
//             }
//           }
//         });
//       }
//     },
//     error: (xhr) => {
//       console.error("Error loading chart:", xhr);
//       // Fallback to local calculation if backend endpoint not available
//       calculateRoleStatsFromTable();
//     }
//   });
// }

// // Fallback: Calculate stats from current table data
// function calculateRoleStatsFromTable() {
//   const stats = {
//     ADMIN: 0,
//     DOCTOR: 0,
//     CASHIER: 0,
//     RECEPTIONIST: 0,
//     NURSE: 0
//   };

//   $("#usersTableBody tr").each(function() {
//     const roleText = $(this).find("td:eq(2)").text().trim();
//     if (stats[roleText] !== undefined) {
//       stats[roleText]++;
//     }
//   });

//   const roleColors = {
//     ADMIN: "#667eea",
//     DOCTOR: "#00c6fb",
//     CASHIER: "#f093fb",
//     RECEPTIONIST: "#4facfe",
//     NURSE: "#fa709a"
//   };

//   const roles = Object.keys(stats);
//   const counts = roles.map(role => stats[role]);
//   const colors = roles.map(role => roleColors[role] || "#999");
//   const total = counts.reduce((a, b) => a + b, 0);
//   $("#totalUsersCount").text(`Total: ${total} users`);

//   if (systemUserRoleChart) {
//     systemUserRoleChart.destroy();
//   }

//   const ctx = document.getElementById("systemUserRoleChart").getContext("2d");
//   systemUserRoleChart = new Chart(ctx, {
//     type: "pie",
//     data: {
//       labels: roles,
//       datasets: [{
//         data: counts,
//         backgroundColor: colors,
//         borderWidth: 0
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: "bottom",
//           labels: { color: "rgba(255,255,255,0.8)", font: { size: 12 } }
//         },
//         tooltip: {
//           callbacks: {
//             label: function(context) {
//               const label = context.label || "";
//               const value = context.raw || 0;
//               const total = context.dataset.data.reduce((a, b) => a + b, 0);
//               const percentage = ((value / total) * 100).toFixed(1);
//               return `${label}: ${value} users (${percentage}%)`;
//             }
//           }
//         }
//       }
//     }
//   });
// }
