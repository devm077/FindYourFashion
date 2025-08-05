function validateLogin() {
  var username = document.getElementById("aid").value;
  var password = document.getElementById("apass").value;

  // Replace these values with your actual login credentials
  var validUsername = "abc";
  var validPassword = "123456";

  if (username === validUsername && password === validPassword) {
    // Successful login
    // Redirect to another page
    window.location.href = "../admin.html"; // Replace 'success.html' with the URL of the page you want to redirect to
    return true;
  } else {
    // Failed login
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = "Invalid username or password. Please try again.";
    return false;
  }
}
