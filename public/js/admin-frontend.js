        // Student Population Bar Chart
        const studentBarChartCtx = document.getElementById('studentBarChart').getContext('2d');
        new Chart(studentBarChartCtx, {
            type: 'bar',
            data: {
                labels: ['KG1', 'KG2', 'Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5', 'Standard 6', 'Standard 7'],
                datasets: [{
                    label: 'Number of Students',
                    data: [30, 28, 35, 40, 45, 50, 48, 42, 38],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Fees Collection Line Chart
        const feesLineChartCtx = document.getElementById('feesLineChart').getContext('2d');
        new Chart(feesLineChartCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Fees Collected ($)',
                    data: [5000, 4500, 4800, 5200, 5100, 5300, 5000, 5200, 5500, 5600, 5700, 5900],
                    backgroundColor: 'rgba(75, 192, 192, 0.4)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Enrollment Distribution Pie Chart
        const enrollmentPieChartCtx = document.getElementById('enrollmentPieChart').getContext('2d');
        new Chart(enrollmentPieChartCtx, {
            type: 'pie',
            data: {
                labels: ['KG1', 'KG2', 'Standard 1', 'Standard 2', 'Standard 3', 'Standard 4', 'Standard 5', 'Standard 6', 'Standard 7'],
                datasets: [{
                    label: 'Enrollment Distribution',
                    data: [30, 28, 35, 40, 45, 50, 48, 42, 38],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(201, 203, 207, 0.7)',
                        'rgba(100, 149, 237, 0.7)',
                        'rgba(220, 20, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(201, 203, 207, 1)',
                        'rgba(100, 149, 237, 1)',
                        'rgba(220, 20, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true
            }
        });

        // Average Attendance Graph
        const attendanceGraphCtx = document.getElementById('attendanceGraph').getContext('2d');
        new Chart(attendanceGraphCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Average Attendance (%)',
                    data: [95, 92, 93, 94, 96, 94, 95, 97, 93, 92, 91, 94],
                    backgroundColor: 'rgba(153, 102, 255, 0.4)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 2,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Real-time Chat (Simplified Example)
        $('#sendMessage').on('click', function() {
            const message = $('#chatMessage').val();
            if (message.trim() !== '') {
                const messageHtml = `<div class="chat-message my-message">${message}</div>`;
                $('#chatWindow').append(messageHtml);
                $('#chatMessage').val('');
                $('#chatWindow').scrollTop($('#chatWindow')[0].scrollHeight);
            }
        });

        // Recent Announcements Animation
        $('.announcement-item').hover(
            function() {
                $(this).addClass('highlight');
            },
            function() {
                $(this).removeClass('highlight');
            }
        );

        // Profile Dropdown Icons Fix
        $('#profileDropdown a').each(function() {
            const iconClass = $(this).data('icon');
            if (iconClass) {
                $(this).prepend(`<i class="${iconClass} mr-2"></i>`);
            }
        });
