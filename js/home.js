// Age Distribution Chart
const ageCtx = document
  .getElementById("ageDistributionChart")
  ?.getContext("2d");
if (ageCtx) {
  new Chart(ageCtx, {
    type: "doughnut",
    data: {
      labels: ["0-18 yrs", "19-35 yrs", "36-50 yrs", "50+ yrs"],
      datasets: [
        {
          data: [24, 38, 22, 16],
          backgroundColor: ["#00c6fb", "#005bea", "#8b5cf6", "#10b981"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "white", font: { size: 10 } },
        },
      },
    },
  });
}

// Gender Distribution Chart
const genderCtx = document
  .getElementById("genderDistributionChart")
  ?.getContext("2d");
if (genderCtx) {
  new Chart(genderCtx, {
    type: "doughnut",
    data: {
      labels: ["Female", "Male"],
      datasets: [
        {
          data: [58, 42],
          backgroundColor: ["#ec489a", "#3b82f6"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "white", font: { size: 10 } },
        },
      },
    },
  });
}

// Set current date
const dateElement = document.getElementById("currentDateDisplay");
if (dateElement) {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  dateElement.textContent = today.toLocaleDateString("en-US", options);
}
