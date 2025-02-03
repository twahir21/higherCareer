const reports = Array.from({ length: 50 }, (_, i) => ({
    name: `Student${i + 1}`,
    class: `Class ${((i % 4) + 1)}`,
    type: i % 2 === 0 ? "Academic" : "Attendance",
    details: `Report details for Student${i + 1}`
}));

let currentPage = 1;
const rowsPerPage = 10;
let filteredReports = [...reports];

function animateTable(direction) {
    const tableBody = document.getElementById("reportTableBody");

    // Add animation class based on direction
    tableBody.classList.add(direction === "next" ? "slide-left" : "slide-right");

    // Wait for the animation to complete before updating data
    setTimeout(() => {
        tableBody.classList.remove("slide-left", "slide-right");
        displayReports();
    }, 300);
}

function displayReports() {
    const tableBody = document.getElementById("reportTableBody");
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const currentReports = filteredReports.slice(start, end);

    tableBody.innerHTML = currentReports.map(report => `
        <tr>
            <td>${report.name}</td>
            <td>${report.class}</td>
            <td>${report.type}</td>
            <td>${report.details}</td>
            <td>
                <button>View</button>
                <button>Download</button>
            </td>
        </tr>
    `).join("");

    document.getElementById("pageInfo").textContent = `Page ${currentPage} of ${Math.ceil(filteredReports.length / rowsPerPage)}`;
}

function nextPage() {
    if (currentPage < Math.ceil(filteredReports.length / rowsPerPage)) {
        currentPage++;
        animateTable("prev");
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        animateTable("next");
    }
}

function filterReports() {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    const selectedClass = document.getElementById("classFilter").value;
    const selectedType = document.getElementById("reportType").value;

    filteredReports = reports.filter(report => {
        const matchesName = report.name.toLowerCase().includes(searchQuery);
        const matchesClass = selectedClass === "" || report.class === selectedClass;
        const matchesType = selectedType === "all" || report.type.toLowerCase() === selectedType;

        return matchesName && matchesClass && matchesType;
    });

    currentPage = 1; // Reset to first page for filtered results
    displayReports();
}

// Event listeners for filters
document.getElementById("searchInput").addEventListener("input", filterReports);
document.getElementById("classFilter").addEventListener("change", filterReports);
document.getElementById("reportType").addEventListener("change", filterReports);

// Initial load
displayReports();
