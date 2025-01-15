import unittest
from flask import Flask, request
from unittest import TestCase
from unittest.mock import patch, MagicMock
from controllers.product import add_product, edit_product, delete_product
from models.product import Product
from app import create_app

class TestProductBackend(TestCase):
    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()

        self.client = self.app.test_client()

    def tearDown(self):
        self.app_context.pop()

    @patch('models.product.Product.save')
    def test_edit_product(self, mock_save):
        product = Product(name='Test', quantity=10, price=100.0, stock=50)
        with patch('models.product.Product.find_by_id') as mock_find_by_id:
            mock_find_by_id.return_value = product
            with self.client:
                response = self.client.post('/edit_product/1', data={
                    'name': 'Updated Product',
                    'quantity': '5',
                    'price': '120.0',
                    'stock': '40'
                })
                self.assertEqual(response.status_code, 302)
                self.assertEqual(product.name, 'Updated Product')
                self.assertEqual(int(product.quantity), 5)
                self.assertEqual(product.price, 120.0)
                self.assertEqual(product.stock, 40)
                mock_save.assert_called_once()


    @patch('models.product.Product.save')
    def test_delete_product(self, mock_save):
        product = MagicMock()
        product.delete.return_value = None
        delete_product(product) 
        product.delete.assert_called_once() 

if __name__ == "__main__":
    unittest.main()
