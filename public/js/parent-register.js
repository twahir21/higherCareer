// JavaScript part
const loginForm = document.getElementById("loginForm");
const usernameLogin = document.getElementById("loginUsername");
const passwordLogin = document.getElementById("loginPassword");

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric + underscores, 3-20 characters
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

let isValid = true;

// Helper function for sanitization
const sanitizeInput = (input) => {
    const sanitized = input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    return sanitized.trim();
};

const loginValidator = (event) => {
    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(usernameLogin.value);
    const sanitizedPassword = sanitizeInput(passwordLogin.value);

    isValid = true; // Reset validation state

    if (sanitizedUsername === "" || sanitizedPassword === "") {
        isValid = false;
        Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'All form inputs must be filled with some data'
        });
    } else if (!usernameRegex.test(sanitizedUsername)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid username'
        });
    } else if (!passwordRegex.test(sanitizedPassword)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid password. Password must have at least 8 characters'
        });
    }

    if (!isValid) {
        event.preventDefault(); // Prevent form submission
    }

    return isValid;
};

loginForm.addEventListener("submit", (event) => {
    loginValidator(event);
});
