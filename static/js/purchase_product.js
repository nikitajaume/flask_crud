document.addEventListener('DOMContentLoaded', () => {
    const unitPrice = parseFloat(document.getElementById('unit-price').innerText);
    const quantityInput = document.getElementById('quantity');
    const totalPriceElement = document.getElementById('total-price');
    const discountMessage = document.getElementById('discount-message');

    quantityInput.addEventListener('input', () => {
        const quantity = parseInt(quantityInput.value) || 0;

        let totalPrice = quantity * unitPrice;
        if (quantity > 10) {
            totalPrice *= 0.9; 
            discountMessage.style.display = 'block'; 
        } else {
            discountMessage.style.display = 'none';
        }

        totalPriceElement.innerText = totalPrice.toFixed(2);
    });
});