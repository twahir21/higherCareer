// Variables declarations
const teacherRegisterForm = document.getElementById("teacher-register");
const teacher_fullName = document.getElementById("teacher_fullName");
const teacher_confirmPswd = document.getElementById("teacher_confirmPswd");
const teacher_password = document.getElementById("teacher_password");
const qualifications = document.getElementById("qualifications");
const teacher_tel = document.getElementById("teacher_tel");
const teacher_email = document.getElementById("teacher_email");
const subjectTaught = document.getElementById("subject");
const teacher_UserName = document.getElementById("teacher_UserName");


// Regular expressions for validation
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Alphanumeric + underscores, 3-20 characters
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const fullNameRegex = /^[a-zA-Z ,.'-]{1,50}$/; // Accepts names with special characters like apostrophes
const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 international format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
const safeTextRegex = /^[a-zA-Z0-9 _.,'"!?-]{1,100}$/; // Allows safe characters for qualifications

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

// Validation function
const validateTeacherForm = () => {

  // Sanitize inputs
  const sanitizedUsername = sanitizeInput(teacher_UserName.value);
  const sanitizedFullName = sanitizeInput(teacher_fullName.value);
  const sanitizedEmail = sanitizeInput(teacher_email.value);
  const sanitizedPhone = sanitizeInput(teacher_tel.value);
  const sanitizedQualifications = sanitizeInput(qualifications.value);
  const sanitizedSubjectTaught = sanitizeInput(subjectTaught.value);
  const sanitizedPassword = sanitizeInput(teacher_password.value);
  const sanitizedConfirmPassword = sanitizeInput(teacher_confirmPswd.value);

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
  } else if (!safeTextRegex.test(sanitizedQualifications)) {
    Swal.fire("Invalid Qualifications", "Enter a valid qualifications of your career", "error");
    return false;
  } else if (!fullNameRegex.test(sanitizedSubjectTaught)) {
    Swal.fire("Invalid Subject", "Enter a valid subject name.", "error");
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
teacherRegisterForm.addEventListener("submit", async(e) => {
  e.preventDefault();

  if(!validateTeacherForm()){
    return; // stop execution
  }

  // Prepare sanitized data for submission
  const formData = {
    username: sanitizeInput(teacher_UserName.value),
    password: sanitizeInput(teacher_password.value),
    fullName: sanitizeInput(teacher_fullName.value),
    email: sanitizeInput(teacher_email.value),
    tel: sanitizeInput(teacher_tel.value),
    qualifications: sanitizeInput(qualifications.value),
    subjectTaught: sanitizeInput(subjectTaught.value),
};

  const url = "/auth/teacher-register";

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
