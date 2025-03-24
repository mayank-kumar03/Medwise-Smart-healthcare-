// Function to validate if input is a valid email or 10-digit mobile number
function validateContact(contact) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email pattern
    const mobilePattern = /^\d{10}$/; // 10-digit number pattern

    return emailPattern.test(contact) || mobilePattern.test(contact);
}

// Event listener for "Login" button
document.getElementById("login-btn").addEventListener("click", function() {
    const contact = document.getElementById("contact").value;
    const password = document.getElementById("password").value;

    // Check if the contact input and password are valid
    if (!contact || !password) {
        alert("Please enter both email/mobile number and password.");
        return;
    }
    
    if (!validateContact(contact)) {
        alert("Please enter a valid email address or 10-digit mobile number.");
        return;
    }

    // Mock authentication (replace with backend call in production)
    if (password === "yourPasswordHere") { // Replace this line with actual backend logic
        alert("Login successful!");
        // Redirect to the dashboard or another page, e.g., window.location.href = "/dashboard";
    } else {
        alert("Invalid email, mobile number, or password.");
    }
});
