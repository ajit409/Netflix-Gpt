export const checkValidData = (email, password) => {
  const errors = {};

  // Email validation
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  if (!isEmailValid) {
    errors.email = "Email is not valid";
  }

  // Password validation
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  if (!isPasswordValid) {
    errors.password = "Invalid Password.";
  }

  return errors;
};