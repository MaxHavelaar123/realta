// Function to check authentication
function checkAuth() {
    // Check for auth token in localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      // Redirect to login page if not authenticated
      window.location.href = 'components/login';
    }
  }
  
  // Run the checkAuth function when the page loads
  document.addEventListener('DOMContentLoaded', checkAuth);
  