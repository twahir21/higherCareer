const loginForm = document.getElementById("loginForm");
const usernameLogin = document.getElementById("loginUsername");
const passwordLogin = document.getElementById("loginPassword");

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric + underscores, 3-20 characters
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

// Helper function for sanitization
const sanitizeInput = (input) => {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .trim();
};

const loginValidator = () => {
    const sanitizedUsername = sanitizeInput(usernameLogin.value);
    const sanitizedPassword = sanitizeInput(passwordLogin.value);

    if (!sanitizedUsername || !sanitizedPassword) {
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'All form inputs must be filled with some data'
        });
        return false;
    }

    if (!usernameRegex.test(sanitizedUsername)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid username'
        });
        return false;
    }

    if (!passwordRegex.test(sanitizedPassword)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid password. Password must have at least 8 characters'
        });
        return false;
    }

    return true; // All validations passed
};

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!loginValidator()) {
        return; // Stop execution if validation fails
    }

    // Prepare sanitized data for submission
    const formData = {
        username: sanitizeInput(usernameLogin.value),
        password: sanitizeInput(passwordLogin.value)
    };

    const url = "/auth/login";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json(); // server sends a JSON response if using fetch API
        Swal.fire({
            icon: response.ok ? 'success' : 'error',
            title: response.ok ? 'Success 😊' : 'Failed 😔',
            text: result.message,
        }).then(() => {
            // If the response has a redirect, go to that URL
            if (result.redirect) {
                window.location.href = result.redirect;
            }
        });

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Failed to submit form: ${error.message}`,
        });
    }
});


fetch('/admin')
  .then(response => {
    if (response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
      }).then(() => {
        window.location.href = '/login'; // Redirect to login page
      });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
