
document.addEventListener('DOMContentLoaded', async () => {
    const users = await fetchUsers();

    // Render users in the table
    renderUsers(users);
});


// delete data on click
async function deleteUser(username) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/users/${username}`, {
                    method: 'DELETE',
                });

                const result = await response.json();
                if (result.success) {
                    Swal.fire({
                        title: "Success 😊",
                        text: "User has been rejected.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    const users = await fetchUsers(); // Refresh the user list
                    renderUsers(users);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops 😟",
                        text: result.message,
                    });
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred while deleting the user.",
                });
            }
        }
    });
}


// Fetch user data from the server
async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

// Render users in the table
function renderUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // Clear the existing list

    users.forEach(user => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.student_fullName}</td>
            <td>${user.student_class}</td>
            <td>${user.isApproved ? 'Approved' : 'Pending'}</td>
            <td>
                <button class="accept-btn" onclick="changeUserStatus('${user.username}', true)">Accept</button>
                <button class="reject-btn" onclick="deleteUser('${user.username}')">Reject</button>
            </td>
        `;

        userList.appendChild(row);
    });
}

// Handle accept/reject action
async function changeUserStatus(username, isApproved) {
    try {
        const response = await fetch(`/api/users/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isApproved }),
        });

        const result = await response.json();
        if (result.success) {
            Swal.fire({
                icon: response.ok ? "success" : "error",
                title: response.ok ? "Success 😊": "Failed! 😔",
                text: result.message,
                showConfirmButton: false,
                timer: 2000
            })
            
            const users = await fetchUsers(); // Refresh user list
            renderUsers(users);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops 😟',
                text: 'Failed to update user status',
                showConfirmButton: false,
                timer: 2000
            })
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('An error occurred while updating the status.');
    }
}
