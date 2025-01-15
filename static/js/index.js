document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-list');
    const modal = document.getElementById('modal');
    const confirmDelete = document.getElementById('confirm-delete');
    const cancelDelete = document.getElementById('cancel-delete');
    const noProductsMessage = document.getElementById('no-products');
    let productToDelete = null;

    document.getElementById('checkbox').addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    function fetchProducts() {
        fetch('/productos')
            .then(response => response.json())
            .then(products => {
                renderProducts(products);
            })
            .catch(err => console.error('Error fetching products:', err));
    }

    function renderProducts(products) {
        productGrid.innerHTML = '';

        if (products.length === 0) {
            noProductsMessage.classList.remove('hidden');
            return;
        }

        noProductsMessage.classList.add('hidden');

        products.forEach(product => {
            const productCard = `
                <div class="card" data-id="${product.id}">
                    <div class="card-image-container">
                        <img src="/static/img/default.png" alt="${product.name}" class="primary-image">
                        <img src="/static/img/default2.png" alt="${product.name}" class="secondary-image">
                    </div>
                    <div class="card-content">
                        <h3>${product.name}</h3>
                        <p>Price: ${product.price}€</p>
                        <p class="quantity">Quantity: ${product.quantity}</p>
                        <p>Stock: ${product.stock}</p>
                    </div>
                    <div class="card-actions">
                        <a href="/edit_product/${product.id}" class="btn btn-kind-bobcat">Edit</a>
                        <a href="/productos/compra/${product.id}" class="btn btn-buy">Buy</a>
                        <button class="btn btn-tidy-falcon" onclick="showDeleteModal(${product.id})">Delete</button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });
    }

    function filterProducts() {
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

        fetch('/productos')
            .then(response => response.json())
            .then(products => {
                const filteredProducts = products.filter(product =>
                    product.price >= minPrice && product.price <= maxPrice
                );
                renderProducts(filteredProducts);
            })
            .catch(err => console.error('Error filtering products:', err));
    }

    document.getElementById('min-price').addEventListener('input', filterProducts);
    document.getElementById('max-price').addEventListener('input', filterProducts);

    window.showDeleteModal = (id) => {
        productToDelete = id;
        modal.classList.remove('hidden');
        modal.classList.add('visible');
    };

    confirmDelete.addEventListener('click', () => {
        if (productToDelete) {
            fetch(`/productos/${productToDelete}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        fetchProducts(); 
                        productToDelete = null;
                        modal.classList.remove('visible');
                        modal.classList.add('hidden');
                    } else {
                        console.error('Error deleting product:', response.statusText);
                    }
                })
                .catch(err => console.error('Error deleting product:', err));
        }
    });

    cancelDelete.addEventListener('click', () => {
        productToDelete = null;
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    });

    fetchProducts();
});
