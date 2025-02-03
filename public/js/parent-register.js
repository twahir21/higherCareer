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
const validateParentForm = () => {

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
    Swal.fire("Invalid Username", "Username must be 3-20 alphanumeric characters.", "error");
    return false;
  } else if (!fullNameRegex.test(sanitizedFullName)) {
    Swal.fire("Invalid Full Name", "Please enter a valid full name.", "error");
    return false;
  } else if (!emailRegex.test(sanitizedEmail)) {
    Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
    return false;
  } else if (!phoneRegex.test(sanitizedPhone)) {
    Swal.fire("Invalid Phone Number", "Please enter a valid phone number.", "error");
    return false;
  } else if (!safeTextRegex.test(sanitizedRelationship)) {
    Swal.fire("Invalid Relationship", "Enter a valid relationship to the student.", "error");
    return false;
  } else if (!fullNameRegex.test(sanitizedStudentName)) {
    Swal.fire("Invalid Student Name", "Enter a valid student name.", "error");
    return false;
  } else if (!passwordRegex.test(sanitizedPassword)) {
    Swal.fire("Invalid Password", "Password must meet security criteria.", "error");
    return false;
  } else if (sanitizedPassword !== sanitizedConfirmPassword) {
    Swal.fire("Password Mismatch", "Passwords do not match.", "error");
    return false;
  }

  return true;
};

// Event listener for form submission
parentRegisterForm.addEventListener("submit", async(e) => {
  e.preventDefault();

  if(!validateParentForm()){
    return; // stop execution
  }

  // Prepare sanitized data for submission
  const formData = {
    username: sanitizeInput(parent_UserName.value),
    password: sanitizeInput(parent_password.value),
    fullName: sanitizeInput(parent_fullName.value),
    email: sanitizeInput(parent_email.value),
    tel: sanitizeInput(parent_tel.value),
    relationship: sanitizeInput(relationship.value),
    student_fullName: sanitizeInput(student_fullName.value),
    student_class: sanitizeInput(student_class.value)
};

  const url = "/auth/parent-register";

  try {
      const response = await fetch(url, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });
      console.log(formData);
      const result = await response.json(); // server sends a JSON response if using fetch API
      Swal.fire({
          icon: response.ok ? 'success' : 'error',
          title: response.ok ? 'Success 😊' : 'Failed 😔',
          text: result.message,
      }).then(
          () => {
             if(response.ok){
                window.location.href = result.redirect;
             }
          }
      )

  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `Failed to submit form: ${error.message}`,
      });
  }
});
