// Wait until the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element where order inputs are located
    const orderForm = document.getElementById('orderForm');
    // Select the table body where order details will be displayed
    const orderTableBody = document.querySelector('#orderTable tbody');
    // Select the element where the total price will be displayed
    const totalPriceElement = document.getElementById('totalPrice');

    let order = []; // Initialize an empty array to store the order items
    let favourites = []; // Initialize an empty array to store favourite items

    // Function to update the order details in the table and calculate the total price
    function updateOrder() {
        order = []; // Reset the order array
        orderTableBody.innerHTML = ''; // Clear the existing rows in the table body
        let totalPrice = 0; // Initialize a variable to keep track of the total price

        // Select all number input fields in the order form
        const inputs = orderForm.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            const amount = parseFloat(input.value) || 0; // Get the amount from the input, default to 0 if invalid
            if (amount > 0) { // Only process inputs with a positive amount
                const category = input.getAttribute('data-category'); // Get the category from the data attribute
                const price = parseFloat(input.getAttribute('data-price')); // Get the price from the data attribute
                const item = input.previousSibling.nodeValue.trim(); // Get the item name from the previous text node
                const itemPrice = amount * price; // Calculate the total price for this item
                order.push({ item, category, amount, price: itemPrice }); // Add item details to the order array

                // Create a new row for this item
                const row = document.createElement('tr');
                row.innerHTML = `<td>${item}</td><td>${category}</td><td>${amount}</td><td>Rs ${itemPrice.toFixed(2)}</td>`;
                orderTableBody.appendChild(row); // Add the row to the table body

                totalPrice += itemPrice; // Add the item's price to the total price
            }
        });

        // Update the total price element
        totalPriceElement.textContent = `Rs ${totalPrice.toFixed(2)}`;
    }

    // Function to save the current order as favourites in local storage
    function saveFavourites() {
        localStorage.setItem('favourites', JSON.stringify(order)); // Store the order array in local storage
        alert('Order saved as favourites!'); // Show a confirmation alert
    }

    // Function to apply saved favourites to the order form
    function applyFavourites() {
        favourites = JSON.parse(localStorage.getItem('favourites')) || []; // Retrieve and parse favourites from local storage
        favourites.forEach(fav => {
            const inputs = orderForm.querySelectorAll('input'); // Select all input fields in the order form
            inputs.forEach(input => {
                if (input.previousSibling.nodeValue.trim() === fav.item) { // Match the item name
                    input.value = fav.amount; // Set the input value to the saved amount
                }
            });
        });
        updateOrder(); // Update the order details in the table and total price
    }

    // Add event listeners to handle user interactions
    orderForm.addEventListener('input', updateOrder); // Update order details whenever input changes
    document.getElementById('addToFavourites').addEventListener('click', saveFavourites); // Save order as favourites
    document.getElementById('applyFavourites').addEventListener('click', applyFavourites); // Apply saved favourites to the form
    document.getElementById('buyNow').addEventListener('click', function() {
        if (order.length > 0) { // Check if there are items in the order
            localStorage.setItem('order', JSON.stringify(order)); // Store the order in local storage
            window.location.href = 'checkout.html'; // Redirect to the checkout page
        } else {
            alert('Please add items to your order.'); // Show an alert if no items are added
        }
    });
});
