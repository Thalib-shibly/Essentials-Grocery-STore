// Wait until the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the table body where order details will be added
    const summaryTableBody = document.querySelector('#summaryTable tbody');
    // Select the element where the total price will be displayed
    const summaryTotalPrice = document.getElementById('summaryTotalPrice');

    // Retrieve the order data from local storage. If no data is found, use an empty array
    const order = JSON.parse(localStorage.getItem('order')) || [];
    let totalPrice = 0; // Initialize a variable to keep track of the total price

    // Iterate through each item in the order
    order.forEach(item => {
        // Create a new row for the item
        const row = document.createElement('tr');
        // Populate the row with item details
        row.innerHTML = `<td>${item.item}</td><td>${item.category}</td><td>${item.amount}</td><td>Rs ${item.price.toFixed(2)}</td>`;
        // Add the row to the table body
        summaryTableBody.appendChild(row);
        // Add the item's price to the total price
        totalPrice += item.price;
    });

    // Update the total price in the table footer
    summaryTotalPrice.textContent = `Rs ${totalPrice.toFixed(2)}`;

    // Add an event listener to the "Pay" button
    document.getElementById('payButton').addEventListener('click', function() {
        // Get the values entered by the user
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        const card = document.getElementById('card').value;
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;

        // Check if all required fields are filled
        if (name && email && address && city && zip && card && expiry && cvv) {
            // Validate card details
            if (document.getElementById('card').checkValidity() &&
                document.getElementById('expiry').checkValidity() &&
                document.getElementById('cvv').checkValidity()) {
                
                // Calculate the delivery date (5 days from now)
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 5);
                // Show a thank you message with the estimated delivery date
                alert(`Thank you for your purchase with ESSENTIALS ! Your order will be delivered by ${deliveryDate.toDateString()}.`);
                
            } else {
                // Alert user if card details are invalid
                alert("Please enter valid details.");
            }
        } else {
            // Alert user if any required fields are missing
            alert("Please fill out all required fields.");
        }
        
    });
});



const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const onlinePaymentFields = document.getElementById('onlinePaymentFields');

paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'online') {
            onlinePaymentFields.style.display = 'block';
        } else {
            onlinePaymentFields.style.display = 'none';
        }
    });
});