// Variables declarations
const teacherRegisterForm = document.getElementById("teacher-register");
const teacher_fullName = document.getElementById("teacher_fullName");
const teacher_confirmPswd = document.getElementById("teacher_confirmPswd");
const teacher_password = document.getElementById("teacher_password");
const qualifications = document.getElementById("qualifications");
const teacher_tel = document.getElementById("teacher_tel");
const teacher_email = document.getElementById("teacher_email");
const teacher_UserName = document.getElementById("teacher_UserName");

// Button
const teacherRegisterBtn = document.getElementById("teacherRegisterBtn");

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric + underscores, 3-20 characters
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const fullNameRegex = /^[a-zA-Z ,.'-]{1,50}$/; // Accepts names with special characters like apostrophes
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
const safeTextRegex = /^[a-zA-Z0-9 _.,'"!?-]{1,100}$/; // Allows safe characters for qualifications

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

// Validator function
const RegisterValidator = (event) => {
    isValid = true; // Reset validation state

    // Sanitize inputs
    const sanitizedFullName = sanitizeInput(teacher_fullName.value);
    const sanitizedUsername = sanitizeInput(teacher_UserName.value);
    const sanitizedPassword = sanitizeInput(teacher_password.value);
    const sanitizedConfirmPassword = sanitizeInput(teacher_confirmPswd.value);
    const sanitizedEmail = sanitizeInput(teacher_email.value);
    const sanitizedPhone = sanitizeInput(teacher_tel.value);
    const sanitizedQualifications = sanitizeInput(qualifications.value);

    // Full Name Validation
    if (!fullNameRegex.test(sanitizedFullName)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid full name. Please enter a valid name.'
        });
    }

    // Username Validation
    else if (!usernameRegex.test(sanitizedUsername)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid username. Use only alphanumeric characters or underscores (3-20 characters).'
        });
    }

    // Password Validation
    else if (!passwordRegex.test(sanitizedPassword)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid password. Password must have at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
        });
    }

    // Confirm Password Match
    else if (sanitizedPassword !== sanitizedConfirmPassword) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Passwords do not match. Please confirm your password.'
        });
    }

    // Email Validation
    else if (!emailRegex.test(sanitizedEmail)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid email format. Please enter a valid email.'
        });
    }

    // Phone Validation
    else if (!phoneRegex.test(sanitizedPhone)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid phone number. Use international format (+1234567890).'
        });
    }

    // Qualifications Validation
    else if (!safeTextRegex.test(sanitizedQualifications)) {
        isValid = false;
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Invalid qualifications input. Use only safe characters (alphanumeric, punctuation).'
        });
    }

    // Prevent submission if not valid
    if (!isValid) {
        event.preventDefault();
    }

    return isValid;
};

// Event listener for form submission
teacherRegisterForm.addEventListener("submit", (event) => {
    RegisterValidator(event);
});
