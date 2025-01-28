document.addEventListener('DOMContentLoaded', function() {
    // Initially show the dashboard section
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });
    document.getElementById('dashboardSection').style.display = 'block'; // Show the dashboard section by default

    // Add event listeners to each menu item
    document.getElementById('dashboard').addEventListener('click', function() {
        showSection('dashboardSection');
    });
    document.getElementById('verifyUsers').addEventListener('click', function() {
        showSection('verifyUsersSection');
    });
    document.getElementById('teacher').addEventListener('click', function() {
        showSection('teacherSection');
    });

    document.getElementById('parent').addEventListener('click', function() {
        showSection('parentSection');
    });

    document.getElementById('student').addEventListener('click', function() {
        showSection('studentSection');
    });
    document.getElementById('linking').addEventListener('click', function() {
        showSection('linkingSection');
    });

    document.querySelectorAll('.teacher_profile').forEach(
        profile => {
            profile.addEventListener('click', () => {
                showSection('teacherProfile');
            })
        }
    )
    document.getElementById('communicationHistory').addEventListener('click', function() {
        showSection('communicationHistorySection');
    });
    document.getElementById('teacherManagement').addEventListener('click', function() {
        showSection('teacherManagementSection');
    });
    document.getElementById('attendance').addEventListener('click', function() {
        showSection('attendanceSection');
    });
    document.getElementById('communication').addEventListener('click', function() {
        showSection('communicationSection');
    });
    document.getElementById('settings').addEventListener('click', function() {
        showSection('settingsSection');
    });

    // Function to show the selected section
    function showSection(sectionId) {
        sections.forEach(section => {
            section.style.display = 'none'; // Hide all sections
        });
        document.getElementById(sectionId).style.display = 'block'; // Show the selected section
    }
});
