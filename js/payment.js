// Load order details from localStorage
document.getElementById('productName').innerText =
    `Product: ${localStorage.getItem('productName')}`;
document.getElementById('productPrice').innerText =
    `Price:${localStorage.getItem('productPrice')}`;

// Handle Payment Form Submission
document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Payment Successful! Thank you for your purchase.');
    localStorage.clear(); // Clear stored data
    window.location.href = 'index.html'; // Redirect back to home page
})