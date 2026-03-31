// Department Filter Function
function filterDepartments() {
  const searchInput = document.getElementById("searchDepartmentInput");
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
  const activeFilter = document.querySelector(".filter-btn.active");
  const filterType = activeFilter
    ? activeFilter.getAttribute("data-filter")
    : "all";

  const rows = document.querySelectorAll("#departmentsTableBody tr");
  let visibleCount = 0;

  rows.forEach((row) => {
    const deptName =
      row.querySelector(".dept-name-cell span")?.textContent.toLowerCase() ||
      "";
    const deptId =
      row.querySelector(".dept-id-badge")?.textContent.toLowerCase() || "";
    const hodName =
      row.querySelector(".hod-info span")?.textContent.toLowerCase() || "";

    let matchesSearch =
      deptName.includes(searchTerm) ||
      deptId.includes(searchTerm) ||
      hodName.includes(searchTerm);
    let matchesFilter = true;

    if (filterType !== "all") {
      if (filterType === "dental") {
        matchesFilter =
          deptName.includes("dentistry") ||
          deptName.includes("ortho") ||
          deptName.includes("endo") ||
          deptName.includes("prostho") ||
          deptName.includes("pediatric") ||
          deptName.includes("oral");
      } else if (filterType === "medical") {
        matchesFilter =
          deptName.includes("medical") || deptName.includes("surgery");
      } else if (filterType === "support") {
        matchesFilter =
          deptName.includes("support") || deptName.includes("lab");
      }
    }

    if (matchesSearch && matchesFilter) {
      row.style.display = "";
      visibleCount++;
    } else {
      row.style.display = "none";
    }
  });

  const displayCountSpan = document.getElementById("displayCount");
  if (displayCountSpan) {
    displayCountSpan.textContent = visibleCount;
  }
}

// Filter Button Event Listeners
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    filterDepartments();
  });
});

// Search Input Event
const searchInput = document.getElementById("searchDepartmentInput");
if (searchInput) {
  searchInput.addEventListener("keyup", filterDepartments);
}

// Edit Department Function
function editDepartment(deptId) {
  console.log("Edit department:", deptId);
  Swal.fire({
    title: "Edit Department",
    text: `Edit functionality for ${deptId}`,
    icon: "info",
    confirmButtonColor: "#00c6fb",
  });
}

// View Department Function
function viewDepartment(deptId) {
  console.log("View department:", deptId);
  Swal.fire({
    title: "Department Details",
    text: `Viewing details for ${deptId}`,
    icon: "info",
    confirmButtonColor: "#00c6fb",
  });
}

//
