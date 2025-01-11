fetch('/admin')
  .then(response => {
    console.log('Response status:', response.status); // Log the response status
    return response.json(); // Ensure to parse the response
  })
  .then(data => {
    if (data.success === false) {
      // If session expired message is returned, show the popup
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
      }).then(() => {
        window.location.href = '/login'; // Redirect to login page
      });
    } else {
      console.log('Session is active:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
