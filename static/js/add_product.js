document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const nameInput = document.getElementById('name');
    const quantityInput = document.getElementById('quantity');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');

    nameInput.addEventListener('input', () => {
        const specialChars = /[^\w\s]/g; 
        if (specialChars.test(nameInput.value)) {
            nameInput.value = nameInput.value.replace(specialChars, ''); 
            showAlert('Product name cannot contain special characters.');
        }
    });

    [quantityInput, priceInput, stockInput].forEach(input => {
        input.addEventListener('input', () => {
            const invalidChars = /[^\d.]/g;
            if (invalidChars.test(input.value)) {
                input.value = input.value.replace(invalidChars, ''); 
                showAlert('Only numbers are allowed in this field.');
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const quantity = parseInt(quantityInput.value, 10);
        const price = parseFloat(priceInput.value);
        const stock = parseInt(stockInput.value, 10);

        if (!name || isNaN(quantity) || isNaN(price) || isNaN(stock)) {
            showAlert('All fields must be filled correctly.');
            return;
        }

        const product = { name, quantity, price, stock };

        addProduct(product);
    });

    function addProduct(product) {
        fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showAlert(data.error);
                } else {
                    showAlert('Product added successfully!');
                    window.location.href = '/'; 
                }
            })
            .catch(error => console.error('Error adding product:', error));
    }

    function showAlert(message) {
        const alertModal = document.getElementById('alert-modal');
        const alertMessage = document.getElementById('alert-message');

        alertMessage.textContent = message;
        alertModal.classList.add('visible');

        setTimeout(() => {
            alertModal.classList.remove('visible');
        }, 5000); 
    }
});
