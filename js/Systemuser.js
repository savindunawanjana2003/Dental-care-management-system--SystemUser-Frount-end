// ========================
// SYSTEM USERS MANAGEMENT MODULE
// ========================

const SystemUserManager = (() => {
  let currentUserId = null;
  const API_BASE_URL = "http://localhost:8080/api/v1/dentalcare";

  // Validation patterns
  const patterns = {
    name: /^[A-Za-z\s]{3,}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    phone: /^07\d{8}$/,
    username: /^[A-Za-z0-9_]{4,20}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  };

  // Clear form fields
  const clearForm = () => {
    $(
      "#userId, #userFullName, #userEmail, #userUsername, #userDepartment, #userPhone, #userAddress, #userPassword, #userConfirmPassword",
    ).val("");
    $("#userRole").val("");
    $("#userStatus").val("Active");
    $("#userJoinDate").val(new Date().toISOString().split("T")[0]);
    $(".error-border").removeClass("error-border");
    currentUserId = null;
  };

  // Set modal to add mode
  const setAddMode = () => {
    $("#modalTitle").text("Add New User");
    $("#saveUserBtn").show();
    $("#updateUserBtn").hide();
    $("#deleteUserBtn").hide();
    $("#passwordField, #confirmPasswordField").show();
    clearForm();
  };

  // Set modal to edit mode
  const setEditMode = () => {
    $("#modalTitle").text("Edit User");
    $("#saveUserBtn").hide();
    $("#updateUserBtn").show();
    $("#deleteUserBtn").show();
    $("#passwordField, #confirmPasswordField").hide();
  };

  $("#saveUserBtn").on("click", () => {
    alert("ds");
  });

  // Show modal
  const showModal = () => {
    const modal = new bootstrap.Modal(
      document.getElementById("systemUserModal"),
    );
    modal.show();
  };

  // Hide modal
  const hideModal = () => {
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("systemUserModal"),
    );
    if (modal) modal.hide();
  };

  // Blink field on error
  const blinkField = (fieldId) => {
    const field = $("#" + fieldId);
    const modal = field.closest(".modal");

    if (modal.length && !modal.hasClass("show")) {
      const bsModal = new bootstrap.Modal(modal[0]);
      bsModal.show();
    }

    field.addClass("error-border");
    for (let i = 0; i < 4; i++) {
      field.fadeOut(150).fadeIn(150);
    }
    field.focus();
  };

  // Validate form
  const validateForm = (isAddMode = true) => {
    const name = $("#userFullName").val().trim();
    const email = $("#userEmail").val().trim();
    const username = $("#userUsername").val().trim();
    const phone = $("#userPhone").val().trim();
    const role = $("#userRole").val();
    const password = $("#userPassword").val();
    const confirmPassword = $("#userConfirmPassword").val();

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

      if (password !== confirmPassword) {
        blinkField("userConfirmPassword");
        Swal.fire("Error", "Passwords do not match", "error");
        return false;
      }
    }

    return true;
  };

  // Get form data
  const getFormData = () => ({
    id: currentUserId || "",
    firstName: $("#userFullName").val().trim(),
    lastName: "",
    email: $("#userEmail").val().trim(),
    userName: $("#userUsername").val().trim(),
    role: $("#userRole").val(),
    department: $("#userDepartment").val().trim(),
    pone: $("#userPhone").val().trim(),
    status: $("#userStatus").val(),
    address: $("#userAddress").val().trim(),
    joinDate: $("#userJoinDate").val(),
    password: $("#userPassword").val(),
    navigator: "system",
  });

  // Save user (Create)
  const saveUser = () => {
    if (!validateForm(true)) return;

    // $.ajax({

    //   url:




    // });
  };

  // Update user
  const updateUser = () => {
    if (!validateForm(false)) return;
    if (!currentUserId) {
      Swal.fire("Error", "No user selected", "error");
      return;
    }

    $.ajax({
      url: `${API_BASE_URL}/auth/systemUsers`,
      method: "PUT",
      contentType: "application/json",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      data: JSON.stringify(getFormData()),
      success: (response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "User updated successfully",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
          hideModal();
          getAllUsers();
          clearForm();
        } else {
          Swal.fire(
            "Error",
            response.messege || "Failed to update user",
            "error",
          );
        }
      },
      error: (xhr) => {
        const message =
          xhr.responseJSON?.messege ||
          xhr.responseJSON?.message ||
          "Server error";
        Swal.fire("Error", message, "error");
      },
    });
  };

  // Delete user
  const deleteUser = () => {
    if (!currentUserId) {
      Swal.fire("Error", "No user selected", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: `${API_BASE_URL}/auth/systemUsers?id=${currentUserId}`,
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          success: (response) => {
            if (response.status === 200) {
              Swal.fire("Deleted!", "User has been deleted.", "success");
              hideModal();
              getAllUsers();
              clearForm();
            } else {
              Swal.fire(
                "Error",
                response.messege || "Failed to delete user",
                "error",
              );
            }
          },
          error: (xhr) => {
            Swal.fire("Error", "Failed to delete user", "error");
          },
        });
      }
    });
  };

  // Get all users
  const getAllUsers = () => {
    $.ajax({
      url: `${API_BASE_URL}/auth/systemUsers`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      success: (response) => {
        if (response.status === 200 && response.data) {
          renderUserTable(response.data);
          updateStats(response.data);
        } else {
          console.log("No data or invalid response");
        }
      },
      error: (xhr) => {
        console.error("Error fetching users:", xhr);
      },
    });
  };

  // Render user table
  const renderUserTable = (users) => {
    const tbody = $("#usersTableBody");
    tbody.empty();

    if (!users || users.length === 0) {
      tbody.html(
        '<tr><td colspan="9" class="text-center">No users found</td></tr>',
      );
      return;
    }

    users.forEach((user) => {
      const roleColors = {
        ADMIN: "#667eea",
        DOCTOR: "#00c6fb",
        CASHIER: "#f093fb",
        RECEPTIONIST: "#4facfe",
        NURSE: "#fa709a",
      };

      const row = `
        <tr data-user-id="${user.id}">
          <td>${user.id || user.userId || "N/A"}</td>
          <td>${user.firstName || ""} ${user.lastName || ""}</td>
          <td>${user.email || ""}</td>
          <td><span style="background: ${roleColors[user.role] || "#999"}; padding: 5px 10px; border-radius: 20px; color: white; font-size: 12px;">${user.role || "N/A"}</span></td>
          <td>${user.department || "-"}</td>
          <td>${user.pone || user.phone || "-"}</td>
          <td><span style="background: ${user.status === "Active" ? "#4caf50" : "#ff9800"}; padding: 5px 10px; border-radius: 20px; color: white; font-size: 12px;">${user.status || "Active"}</span></td>
          <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "-"}</td>
          <td>
            <div class="action-buttons">
              <button class="action-btn edit" onclick="SystemUserManager.editUserById('${user.id}')"><i class="fas fa-edit"></i></button>
              <button class="action-btn delete" onclick="SystemUserManager.deleteUserById('${user.id}')"><i class="fas fa-trash"></i></button>
              <button class="action-btn view" onclick="SystemUserManager.viewUserById('${user.id}')"><i class="fas fa-eye"></i></button>
            </div>
          </td>
        </tr>
      `;
      tbody.append(row);
    });
  };

  // Update statistics cards
  const updateStats = (users) => {
    const stats = {
      total: users.length,
      ADMIN: 0,
      DOCTOR: 0,
      CASHIER: 0,
      RECEPTIONIST: 0,
      NURSE: 0,
    };

    users.forEach((user) => {
      if (stats[user.role] !== undefined) stats[user.role]++;
    });

    $("#totalUsers").text(stats.total);
    $("#totalDoctors").text(stats.DOCTOR);
    $("#totalCashiers").text(stats.CASHIER);
    $("#totalReceptionists").text(stats.RECEPTIONIST);
    $("#totalNurses").text(stats.NURSE);
  };

  // Search users
  const searchUsers = () => {
    const searchText = $("#searchUserBar").val().trim().toLowerCase();

    $("#usersTableBody tr").each(function () {
      const name = $(this).find("td:eq(1)").text().toLowerCase();
      const email = $(this).find("td:eq(2)").text().toLowerCase();
      const role = $(this).find("td:eq(3)").text().toLowerCase();

      if (
        name.includes(searchText) ||
        email.includes(searchText) ||
        role.includes(searchText) ||
        searchText === ""
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  };

  // Edit user by ID (called from table row click or button)
  const editUserById = (userId) => {
    $.ajax({
      url: `${API_BASE_URL}/auth/systemUsers/${userId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      success: (response) => {
        if (response.status === 200 && response.data) {
          const user = response.data;
          currentUserId = user.id;

          $("#userId").val(user.id);
          $("#userFullName").val(user.firstName || "");
          $("#userEmail").val(user.email || "");
          $("#userUsername").val(user.userName || "");
          $("#userRole").val(user.role || "");
          $("#userDepartment").val(user.department || "");
          $("#userPhone").val(user.pone || user.phone || "");
          $("#userStatus").val(user.status || "Active");
          $("#userAddress").val(user.address || "");
          $("#userJoinDate").val(
            user.joinDate
              ? user.joinDate.split("T")[0]
              : new Date().toISOString().split("T")[0],
          );

          setEditMode();
          showModal();
        } else {
          Swal.fire("Error", "User not found", "error");
        }
      },
      error: () => {
        Swal.fire("Error", "Failed to load user data", "error");
      },
    });
  };

  // Delete user by ID
  const deleteUserById = (userId) => {
    currentUserId = userId;
    deleteUser();
  };

  // View user details
  const viewUserById = (userId) => {
    $.ajax({
      url: `${API_BASE_URL}/auth/systemUsers/${userId}`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      success: (response) => {
        if (response.status === 200 && response.data) {
          const user = response.data;
          Swal.fire({
            title: "User Details",
            html: `
              <div style="text-align: left;">
                <p><strong>ID:</strong> ${user.id}</p>
                <p><strong>Name:</strong> ${user.firstName} ${user.lastName || ""}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Username:</strong> ${user.userName}</p>
                <p><strong>Role:</strong> ${user.role}</p>
                <p><strong>Department:</strong> ${user.department || "-"}</p>
                <p><strong>Phone:</strong> ${user.pone || user.phone || "-"}</p>
                <p><strong>Status:</strong> ${user.status}</p>
                <p><strong>Address:</strong> ${user.address || "-"}</p>
                <p><strong>Join Date:</strong> ${user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "-"}</p>
              </div>
            `,
            icon: "info",
            confirmButtonText: "Close",
          });
        }
      },
    });
  };

  // Table row click handler (select row)
  const initTableClickHandler = () => {
    $("#usersTableBody")
      .off("click", "tr")
      .on("click", "tr", function () {
        const userId = $(this).data("user-id");
        if (userId) {
          editUserById(userId);
        }
      });
  };

  // Initialize event listeners
  const init = () => {
    // Button events
    $("#addUserBtn")
      .off("click")
      .on("click", () => {
        setAddMode();
        showModal();
      });

    $("#refreshUsersBtn")
      .off("click")
      .on("click", () => {
        getAllUsers();
      });

    $("#saveUserBtn").off("click").on("click", saveUser);
    $("#updateUserBtn").off("click").on("click", updateUser);
    $("#deleteUserBtn").off("click").on("click", deleteUser);

    // Search handler
    $("#searchUserBar").off("keyup").on("keyup", searchUsers);

    // Initialize table
    getAllUsers();
    initTableClickHandler();

    // Modal cleanup on close
    $("#systemUserModal")
      .off("hidden.bs.modal")
      .on("hidden.bs.modal", () => {
        clearForm();
      });
  };

  // Public API
  return {
    init,
    getAllUsers,
    editUserById,
    deleteUserById,
    viewUserById,
    searchUsers,
  };
})();

// Initialize System Users module when document is ready
$(document).ready(() => {
  SystemUserManager.init();
});

// $("#addUserBtn").on("click", () => {
//   alert("lakslas");
// });
