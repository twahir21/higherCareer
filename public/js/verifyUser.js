
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch user data from backend (you can replace this with an actual API call)
    const users = await fetchUsers();

    // Render users in the table
    renderUsers(users);
});

// Fetch user data from the server
async function fetchUsers() {
    try {
        const response = await fetch('/api/users'); // Replace with your actual API route
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
                <button class="reject-btn" onclick="changeUserStatus('${user.username}', false)">Reject</button>
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
            alert(result.message);
            const users = await fetchUsers(); // Refresh user list
            renderUsers(users);
        } else {
            alert('Error updating user status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
        alert('An error occurred while updating the status.');
    }
}
