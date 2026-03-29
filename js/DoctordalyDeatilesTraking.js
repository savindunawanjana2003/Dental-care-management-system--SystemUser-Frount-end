// Sample Data

window.onload = function () {
  const selectedDoctor = "D001";
  const date = "2026-03-31";
  $.ajax({
    url: `http://localhost:8080/api/v1/dentalcare/AppointmentController/${selectedDoctor}/${date}`,
    method: "GET",
    contentType: "application/json",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("usertoken"),
    },
    success: function (res) {
      console.log(res);

      // const tabody = $("#appointmentsTableBody");
      // tabody.empty();
      let appointments = res.data;

      trackingPatients.splice(0, trackingPatients.length);
      for (let i = 0; i < appointments.length; i++) {
        const apoinmant = appointments[i];
        console.log(
          apoinmant.pationname +
            " / " +
            apoinmant.doctorFullpayment +
            " " +
            apoinmant.status,
        );
        console.log("===============================");
        const apinmat = {
          id: apoinmant.pationId,
          name: apoinmant.pationname,
          time: apoinmant.appointmentTime,
          treatment: apoinmant.doctorFullpayment,
          paid: apoinmant.avelablePayment,
          status: apoinmant.status,
          paymentStatus: apoinmant.doctorChargeStetus,
        };

        trackingPatients.push(apinmat);
      }

      // =============
      updatePatientList();
      //  ============
    },

    error: function (err) {
      console.error(err);
    },
  });
};

let trackingPatients = [
  // {
  //   id: 1,
  //   name: "Perera, S",
  //   time: "09:00 AM",
  //   treatment: 2000,
  //   paid: 2000,
  //   status: "completed",
  //   paymentStatus: "paid",
  // },
  // {
  //   id: 2,
  //   name: "Silva, A",
  //   time: "09:30 AM",
  //   treatment: 5000,
  //   paid: 0,
  //   status: "pending",
  //   paymentStatus: "unpaid",
  // },
  // {
  //   id: 3,
  //   name: "Jayawardena, N",
  //   time: "10:00 AM",
  //   treatment: 10000,
  //   paid: 0,
  //   status: "pending",
  //   paymentStatus: "unpaid",
  // },
  // {
  //   id: 4,
  //   name: "Fernando, M",
  //   time: "10:30 AM",
  //   treatment: 15000,
  //   paid: 15000,
  //   status: "completed",
  //   paymentStatus: "paid",
  // },
];

let patients = [
  {
    id: 1,
    name: "Perera, S",
    age: 35,
    phone: "0771234567",
    nic: "123456789V",
    gender: "Male",
  },
  {
    id: 2,
    name: "Silva, A",
    age: 28,
    phone: "0772345678",
    nic: "987654321V",
    gender: "Female",
  },
];

let appointments = [
  {
    id: 1,
    patient: "Perera, S",
    doctor: "Dr. Silva",
    date: "2026-03-29",
    time: "09:00 AM",
    status: "Pending",
  },
  {
    id: 2,
    patient: "Silva, A",
    doctor: "Dr. Silva",
    date: "2026-03-29",
    time: "09:30 AM",
    status: "Completed",
  },
];

let nextId = 5;
let nextPatientId = 3;
let recentActivities = [
  "New patient registered: Mrs. Perera",
  "Treatment completed for Mr. Fernando",
  "Payment received from Mr. Jayawardena",
];

// Set current date
const today = new Date();
document.getElementById("currentDateDisplay").innerText =
  today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Navigation
$(".nav-link").click(function (e) {
  e.preventDefault();
  $(".nav-link").removeClass("active");
  $(this).addClass("active");

  const section = $(this).data("section");
  $(".section-container").removeClass("active");
  $("#" + section + "Section").addClass("active");
});

// Logout
$("#logoutBtn").click(function () {
  localStorage.clear();
  window.location.href = "../index.html";
});

// Update UI functions
function updateTrackingUI() {
  updatePatientList();
  updateStats();
  updatePaymentSummary();
  updateRecentActivity();
}

function updatePatientList() {
  const container = document.getElementById("todayPatientsList");
  const countSpan = document.getElementById("todayPatientCount");

  if (!container) return;

  countSpan.innerText = trackingPatients.length;

  if (trackingPatients.length === 0) {
    container.innerHTML =
      '<div style="text-align: center; padding: 20px; color: rgba(255,255,255,0.6);">No patients scheduled for today</div>';
    return;
  }

  let html = "";
  trackingPatients.forEach((patient) => {
    const statusClass =
      patient.status === "pending"
        ? "status-pending"
        : patient.status === "checked"
          ? "status-checked"
          : patient.status === "treatment"
            ? "status-treatment"
            : "status-completed";

    const statusText =
      patient.status === "pending"
        ? "⏳ Pending"
        : patient.status === "checked"
          ? "✅ Checked In"
          : patient.status === "treatment"
            ? "🦷 Treatment"
            : "✔️ Completed";

    const paymentStatus =
      patient.paymentStatus === "paid"
        ? '<span class="status-badge status-paid">Paid</span>'
        : '<span class="status-badge status-unpaid">Unpaid</span>';

    // html += `
    //                 <div class="patient-tracking-item">
    //                     <div class="patient-info">
    //                         <h4>${patient.name}</h4>
    //                         <p>${patient.time} | Treatment: Rs. ${patient.treatment} | ${paymentStatus}</p>
    //                     </div>
    //                     <div class="tracking-actions">
    //                         <span class="status-badge ${statusClass}">${statusText}</span>
    //                         <button class="tracking-btn" onclick="updatePatientStatus(${patient.id})">
    //                             <i class="fas fa-arrow-right"></i>
    //                         </button>
    //                         ${
    //                           patient.paymentStatus !== "paid"
    //                             ? `<button class="tracking-btn" onclick="openPaymentForPatient(${patient.id})">
    //                             <i class="fas fa-money-bill"></i>
    //                         </button>`
    //                             : ""
    //                         }
    //                     </div>
    //                 </div>
    //             `;
    html += `
  <div class="patient-tracking-item" data-patient-id="${patient.id} onclick="onPatientItemClick(this)">
      <div class="patient-info">
          <h4>${patient.name}</h4>
          <p>${patient.time} | Treatment: Rs. ${patient.treatment} | ${paymentStatus}</p>
      </div>
      <div class="tracking-actions">
          <span class="status-badge ${statusClass}">${statusText}</span>
          <button class="tracking-btn" onclick="updatePatientStatus(${patient.id})">
              <i class="fas fa-arrow-right"></i>
          </button>
          ${
            patient.paymentStatus !== "paid"
              ? `<button class="tracking-btn" onclick="openPaymentForPatient(${patient.id})">
                  <i class="fas fa-money-bill"></i>
                </button>`
              : ""
          }
      </div>
  </div>
`;
  });
  container.innerHTML = html;
}

function updateStats() {
  const total = trackingPatients.length;
  const checkedIn = trackingPatients.filter(
    (p) => p.status !== "pending",
  ).length;
  const inTreatment = trackingPatients.filter(
    (p) => p.status === "treatment",
  ).length;
  const revenue = trackingPatients.reduce((sum, p) => sum + (p.paid || 0), 0);

  const statTotal = document.getElementById("statTotalPatients");
  const statChecked = document.getElementById("statCheckedIn");
  const statTreatment = document.getElementById("statInTreatment");
  const statRevenue = document.getElementById("statRevenue");

  if (statTotal) statTotal.innerText = total;
  if (statChecked) statChecked.innerText = checkedIn;
  if (statTreatment) statTreatment.innerText = inTreatment;
  if (statRevenue) statRevenue.innerText = `Rs. ${revenue.toLocaleString()}`;
}

function updatePaymentSummary() {
  const expected = trackingPatients.reduce((sum, p) => sum + p.treatment, 0);
  const collected = trackingPatients.reduce((sum, p) => sum + (p.paid || 0), 0);
  const pending = expected - collected;

  const expectedEl = document.getElementById("expectedTotal");
  const collectedEl = document.getElementById("collectedTotal");
  const pendingEl = document.getElementById("pendingTotal");

  if (expectedEl) expectedEl.innerText = `Rs. ${expected.toLocaleString()}`;
  if (collectedEl) collectedEl.innerText = `Rs. ${collected.toLocaleString()}`;
  if (pendingEl) pendingEl.innerText = `Rs. ${pending.toLocaleString()}`;
}

function updateRecentActivity() {
  const body = document.getElementById("recentActivityBody");
  if (!body) return;

  let html = "";
  recentActivities.slice(0, 5).forEach((activity) => {
    html += `<tr><td><i class="fas fa-notes-medical" style="color: #00c6fb; margin-right: 10px;"></i>${activity}</td></tr>`;
  });
  body.innerHTML = html;
}

function addRecentActivity(message) {
  recentActivities.unshift(message);
  if (recentActivities.length > 10) recentActivities.pop();
  updateRecentActivity();
}

// Add tracking patient
function addTrackingPatient() {
  const name = document.getElementById("trackingPatientName").value.trim();
  const time = document.getElementById("trackingTime").value;
  const treatment = parseInt(
    document.getElementById("trackingTreatment").value,
  );

  if (!name) {
    Swal.fire("Error", "Please enter patient name", "error");
    return;
  }

  const timeFormatted = new Date(`2000-01-01T${time}`).toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "2-digit", hour12: true },
  );

  const newPatient = {
    id: nextId++,
    name: name,
    time: timeFormatted,
    treatment: treatment,
    paid: 0,
    status: "pending",
    paymentStatus: "unpaid",
  };

  trackingPatients.push(newPatient);
  updateTrackingUI();
  addRecentActivity(`New patient added: ${name}`);

  document.getElementById("trackingPatientName").value = "";

  Swal.fire("Success", "Patient added successfully", "success");
}

// Update patient status
function updatePatientStatus(id) {
  const patient = trackingPatients.find((p) => p.id === id);
  if (!patient) return;

  const statusFlow = {
    pending: "checked",
    checked: "treatment",
    treatment: "completed",
    completed: "completed",
  };

  const newStatus = statusFlow[patient.status];
  const statusMessages = {
    checked: "checked in",
    treatment: "started treatment",
    completed: "completed treatment",
  };

  if (newStatus !== patient.status) {
    patient.status = newStatus;
    addRecentActivity(
      `${patient.name} ${statusMessages[newStatus] || "updated status"}`,
    );

    if (newStatus === "completed" && patient.paymentStatus !== "paid") {
      Swal.fire(
        "Payment Required",
        `Please record payment for ${patient.name}`,
        "warning",
      );
      openPaymentForPatient(patient.id);
    }
  }

  updateTrackingUI();
}

// Open payment modal for patient
function openPaymentForPatient(id) {
  const patient = trackingPatients.find((p) => p.id === id);
  if (!patient) return;

  const select = document.getElementById("paymentPatientSelect");
  select.innerHTML = `<option value="${patient.id}">${patient.name} - Due: Rs. ${(patient.treatment - (patient.paid || 0)).toLocaleString()}</option>`;
  document.getElementById("paymentAmount").value =
    patient.treatment - (patient.paid || 0);

  const modal = new bootstrap.Modal(document.getElementById("paymentModal"));
  modal.show();
}

// Record payment
function recordPayment() {
  const patientId = parseInt(
    document.getElementById("paymentPatientSelect").value,
  );
  const amount = parseInt(document.getElementById("paymentAmount").value);
  const method = document.getElementById("paymentMethod").value;

  const patient = trackingPatients.find((p) => p.id === patientId);
  if (!patient) return;

  if (isNaN(amount) || amount <= 0) {
    Swal.fire("Error", "Please enter a valid amount", "error");
    return;
  }

  const remaining = patient.treatment - (patient.paid || 0);
  if (amount > remaining) {
    Swal.fire(
      "Error",
      `Amount cannot exceed remaining balance of Rs. ${remaining.toLocaleString()}`,
      "error",
    );
    return;
  }

  patient.paid = (patient.paid || 0) + amount;
  patient.paymentStatus =
    patient.paid >= patient.treatment ? "paid" : "partial";

  addRecentActivity(
    `Payment received: ${method} - Rs. ${amount.toLocaleString()} from ${patient.name}`,
  );
  updateTrackingUI();

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("paymentModal"),
  );
  modal.hide();

  Swal.fire(
    "Success",
    `Payment recorded: Rs. ${amount.toLocaleString()}`,
    "success",
  );
}

// Start workflow guide animation
function startWorkflowGuide() {
  const steps = document.querySelectorAll(".workflow-step");
  steps.forEach((step) => step.classList.remove("completed", "active"));

  let stepIndex = 0;
  const interval = setInterval(() => {
    if (stepIndex < steps.length) {
      steps.forEach((step) => step.classList.remove("active"));
      steps[stepIndex].classList.add("active");

      if (stepIndex > 0) {
        steps[stepIndex - 1].classList.remove("active");
        steps[stepIndex - 1].classList.add("completed");
      }
      stepIndex++;
    } else {
      clearInterval(interval);
      steps.forEach((step) => {
        step.classList.remove("active");
        step.classList.add("completed");
      });
      Swal.fire(
        "Workflow Complete",
        "You have completed the daily workflow guide!",
        "success",
      );
    }
  }, 1000);
}

// Patient management functions
function updatePatientsTable() {
  const searchTerm =
    document.getElementById("searchPatientInput")?.value.toLowerCase() || "";
  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.nic.includes(searchTerm) ||
      p.phone.includes(searchTerm),
  );

  const tbody = document.getElementById("patientsTableBody");
  if (!tbody) return;

  if (filtered.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">No patients found</td></tr>';
    return;
  }

  let html = "";
  filtered.forEach((p) => {
    html += `<tr>
                    <td>${p.id}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>${p.phone}</td>
                    <td>${p.nic}</td>
                    <td>${p.gender}</td>
                </tr>`;
  });
  tbody.innerHTML = html;
}

// function onPatientItemClick(this) {
//   const itemDiv = this.target.closest(".patient-tracking-item");
//   if (!itemDiv) return;

//   const patientId = parseInt(itemDiv.dataset.patientId);
//   if (!patientId) return;

//   const patient = trackingPatients.find((p) => p.id === patientId);
//   if (!patient) return;

//   console.log("Clicked Patient Data:", patient);
//   alert(patient);
// }

function onPatientItemClick(div) {
  const patientId = parseInt(div.dataset.patientId);
  if (!patientId) return;

  const patient = trackingPatients.find((p) => p.id === patientId);
  if (!patient) return;

  console.log("Clicked Patient Data:", patient);
  alert(
    `Patient: ${patient.name}\nTime: ${patient.time}\nTreatment: Rs. ${patient.treatment}`,
  );
}

// Attach event listener using event delegation
const todayPatientsList = document.getElementById("todayPatientsList");
todayPatientsList.addEventListener("click", onPatientItemClick);

function savePatientFromModal() {
  const name = document.getElementById("modalPatientName").value.trim();
  const age = parseInt(document.getElementById("modalPatientAge").value);
  const phone = document.getElementById("modalPatientPhone").value;
  const nic = document.getElementById("modalPatientNic").value;
  const gender = document.getElementById("modalPatientGender").value;

  if (!name) {
    Swal.fire("Error", "Please enter patient name", "error");
    return;
  }

  const newPatient = {
    id: nextPatientId++,
    name: name,
    age: age || 0,
    phone: phone || "",
    nic: nic || "",
    gender: gender,
  };

  patients.push(newPatient);
  updatePatientsTable();
  addRecentActivity(`New patient registered: ${name}`);

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addPatientModal"),
  );
  modal.hide();

  Swal.fire("Success", "Patient added successfully", "success");
}

function updateAppointmentsTable() {
  const tbody = document.getElementById("appointmentsTableBody");
  if (!tbody) return;

  if (appointments.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6" style="text-align: center;">No appointments found</td></tr>';
    return;
  }

  let html = "";
  appointments.forEach((a) => {
    html += `<tr>
                    <td>${a.id}</td>
                    <td>${a.patient}</td>
                    <td>${a.doctor}</td>
                    <td>${a.date}</td>
                    <td>${a.time}</td>
                    <td><span class="status-badge ${a.status === "Completed" ? "status-completed" : "status-pending"}">${a.status}</span></td>
                </tr>`;
  });
  tbody.innerHTML = html;
}

// Initialize
function init() {
  updateTrackingUI();
  updatePatientsTable();
  updateAppointmentsTable();

  // Set doctor name from localStorage
  const doctorName = localStorage.getItem("doctorName") || "Dr. Silva";
  const doctorRole = localStorage.getItem("Rolle") || "Doctor";
  document.getElementById("doctorName").innerText = doctorName;
  document.getElementById("doctorRole").innerText = doctorRole;

  // Add Patient Button
  const addBtn = document.getElementById("addPatientBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      document.getElementById("modalPatientName").value = "";
      document.getElementById("modalPatientAge").value = "";
      document.getElementById("modalPatientPhone").value = "";
      document.getElementById("modalPatientNic").value = "";
      const modal = new bootstrap.Modal(
        document.getElementById("addPatientModal"),
      );
      modal.show();
    };
  }

  // Search Patient
  const searchInput = document.getElementById("searchPatientInput");
  if (searchInput) {
    searchInput.onkeyup = updatePatientsTable;
  }
}

// Make functions global
window.addTrackingPatient = addTrackingPatient;
window.updatePatientStatus = updatePatientStatus;
window.openPaymentForPatient = openPaymentForPatient;
window.recordPayment = recordPayment;
window.startWorkflowGuide = startWorkflowGuide;
window.savePatientFromModal = savePatientFromModal;

init();
