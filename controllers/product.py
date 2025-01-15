import re
from flask import redirect, request, url_for
from models.product import Product

def add_product():
    name = request.form.get('name')
    quantity = int(request.form.get('quantity'))
    price = float(request.form.get('price'))
    stock = int(request.form.get('stock'))

    if re.search(r'[@#$%^&]', name):
        return redirect(url_for('main.home', error="Name contains invalid characters"))

    existing_product = Product.query.filter_by(name=name).first()
    if existing_product:
        if existing_product.price != price or existing_product.stock != stock:
            return redirect(url_for(
                'main.home',
                error="Product exists with different attributes (price or stock)"
            ))
        if existing_product.quantity + quantity > existing_product.stock:
            return redirect(url_for(
                'main.home',
                error="Total quantity exceeds the maximum stock limit"
            ))

        existing_product.quantity += quantity
        existing_product.save()
        return existing_product

    product = Product(name=name, quantity=quantity, price=price, stock=stock)
    product.save()
    return product


def edit_product(product):
    product.name = request.form.get('name')
    product.quantity = request.form.get('quantity')
    product.price = request.form.get('price')
    product.stock = request.form.get('stock')
    product.save()
    return product

def delete_product(product):
    product.delete()
