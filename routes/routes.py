from flask import Blueprint, jsonify, render_template, redirect, request, url_for
from controllers.product import add_product, edit_product, delete_product
from models.product import Product

main = Blueprint('main', __name__)

@main.route('/productos', methods=['GET'])
def get_products():
    products = Product.get_all()
    return jsonify([product.data for product in products])

@main.route('/')
def home():
    products = Product.get_all()
    return render_template('index.html', products=products)

@main.route('/add_product', methods=['GET', 'POST'])
def add_product_view():
    if request.method == 'POST':
        add_product()
        return redirect(url_for('main.home'))
    return render_template('add_product.html')

@main.route('/edit_product/<int:id>', methods=['GET', 'POST'])
def edit_product_view(id):
    product = Product.find_by_id(id)
    if request.method == 'POST':
        edit_product(product)
        return redirect(url_for('main.home'))
    return render_template('edit_product.html', product=product)

@main.route('/productos/<int:id>', methods=['DELETE'])
def delete_product_api(id):
    product = Product.find_by_id(id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product.delete()
    return jsonify({'message': 'Product deleted successfully'}), 200


@main.route('/productos/compra', methods=['POST'])
def simulate_purchase_by_name():
    name = request.form.get('name')
    quantity = request.form.get('quantity')

    if not name or not quantity:
        return redirect(url_for('main.home'))  

    quantity_to_purchase = int(quantity)
    product = Product.query.filter_by(name=name).first()

    if not product or quantity_to_purchase > product.quantity:
        return redirect(url_for('main.home'))

    discount = 0.1 if quantity_to_purchase > 10 else 0
    total_price = quantity_to_purchase * product.price * (1 - discount)

    product.quantity -= quantity_to_purchase
    product.save()

    return redirect(url_for('main.home'))

@main.route('/productos/compra/<int:id>', methods=['GET', 'POST'])
def simulate_purchase_view(id):
    product = Product.find_by_id(id)
    if not product:
        return redirect(url_for('main.home', error="Product not found"))

    if request.method == 'POST':
        quantity = int(request.form.get('quantity', 0))
        if quantity > product.quantity:
            return render_template('purchase_product.html', product=product, error='Not enough stock available.')

        discount = 0.1 if quantity > 10 else 0
        total_price = quantity * product.price * (1 - discount)

        product.quantity -= quantity
        product.save()

        return render_template('purchase_product.html', product=product, success=True, total_price=total_price)

    return render_template('purchase_product.html', product=product)
