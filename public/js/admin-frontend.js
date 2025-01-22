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
            responsive: true,
            plugins: {
                datalabels: {
                    formatter: (value, ctx) => {
                        // Calculate percentage
                        const total = ctx.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1); // One decimal place
                        return `${percentage}%`; // Display percentage
                    },
                    color: '#fff', // Text color
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    backgroundColor: '#343a40', // Label background color
                    borderRadius: 4, // Rounded corners for labels
                    padding: 6 // Padding inside labels
                }
            }
        },
        plugins: [ChartDataLabels] // Register the Data Labels Plugin
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


        // Dummy data
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const totalAttendance = [350, 420, 400, 380, 450, 460, 440, 430, 410, 470, 480, 490];
        const totalFeesCollected = [5000, 6000, 5800, 5500, 7000, 7200, 6800, 6600, 6400, 7500, 7800, 8000];

        // Chart configuration
        const ctx = document.getElementById('attendanceFeesChart').getContext('2d');
        const attendanceFeesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Total Attendance',
                        data: totalAttendance,
                        borderColor: '#007bff',
                        backgroundColor: 'rgba(0, 123, 255, 0.2)',
                        pointBackgroundColor: '#007bff',
                        tension: 0.4,
                        yAxisID: 'y',
                    },
                    {
                        label: 'Total Fees Collected ($)',
                        data: totalFeesCollected,
                        borderColor: '#28a745',
                        backgroundColor: 'rgba(40, 167, 69, 0.2)',
                        pointBackgroundColor: '#28a745',
                        tension: 0.4,
                        yAxisID: 'y1',
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Attendance and Fees Collected Over the Year',
                        font: {
                            size: 18
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Attendance',
                            font: {
                                size: 14
                            }
                        }
                    },
                    y1: {
                        type: 'linear',
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Fees Collected ($)',
                            font: {
                                size: 14
                            }
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });


