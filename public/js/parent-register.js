// Variables declarations
const parentRegisterForm = document.getElementById("parentRegisterForm");
const parent_UserName = document.getElementById("parent_UserName");
const parent_fullName = document.getElementById("parent_fullName");
const parent_email = document.getElementById("parent_email");
const parent_tel = document.getElementById("parent_tel");
const relationship = document.getElementById("relationship");
const student_fullName = document.getElementById("student_fullName");
const student_class = document.getElementById("student_class");
const parent_password = document.getElementById("parent_password");
const parent_confirmPswd = document.getElementById("parent_confirmPswd");

// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric + underscores, 3-20 characters
const fullNameRegex = /^[a-zA-Z ,.'-]{1,50}$/; // Full name validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International phone format
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const safeTextRegex = /^[a-zA-Z0-9 _.,'"!?-]{1,100}$/; // For relationship and student class

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

// Validation function
const validateParentForm = (event) => {
  let isValid = true;

  // Sanitize inputs
  const sanitizedUsername = sanitizeInput(parent_UserName.value);
  const sanitizedFullName = sanitizeInput(parent_fullName.value);
  const sanitizedEmail = sanitizeInput(parent_email.value);
  const sanitizedPhone = sanitizeInput(parent_tel.value);
  const sanitizedRelationship = sanitizeInput(relationship.value);
  const sanitizedStudentName = sanitizeInput(student_fullName.value);
  const sanitizedPassword = sanitizeInput(parent_password.value);
  const sanitizedConfirmPassword = sanitizeInput(parent_confirmPswd.value);

  // Validation checks
  if (!usernameRegex.test(sanitizedUsername)) {
    isValid = false;
    Swal.fire("Invalid Username", "Username must be 3-20 alphanumeric characters.", "error");
  } else if (!fullNameRegex.test(sanitizedFullName)) {
    isValid = false;
    Swal.fire("Invalid Full Name", "Please enter a valid full name.", "error");
  } else if (!emailRegex.test(sanitizedEmail)) {
    isValid = false;
    Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
  } else if (!phoneRegex.test(sanitizedPhone)) {
    isValid = false;
    Swal.fire("Invalid Phone Number", "Please enter a valid phone number.", "error");
  } else if (!safeTextRegex.test(sanitizedRelationship)) {
    isValid = false;
    Swal.fire("Invalid Relationship", "Enter a valid relationship to the student.", "error");
  } else if (!fullNameRegex.test(sanitizedStudentName)) {
    isValid = false;
    Swal.fire("Invalid Student Name", "Enter a valid student name.", "error");
  } else if (!passwordRegex.test(sanitizedPassword)) {
    isValid = false;
    Swal.fire("Invalid Password", "Password must meet security criteria.", "error");
  } else if (sanitizedPassword !== sanitizedConfirmPassword) {
    isValid = false;
    Swal.fire("Password Mismatch", "Passwords do not match.", "error");
  }

  if (!isValid) {
    event.preventDefault();
  }
};

// Event listener for form submission
parentRegisterForm.addEventListener("submit", validateParentForm);
