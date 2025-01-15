# MiraNikita - Backend Application

This project is a Flask-based web application designed for managing products in a MySQL database. 
It uses SQLAlchemy for ORM (Object Relational Mapping) and Flask for the web framework. 
The application allows users to add, edit, delete, and purchase products. 
The backend is powered by Flask, MySQL, and SQLAlchemy.

## Features

- **Product Management**: Add, edit, and delete products in the inventory.
- **Product Purchase**: Simulate purchasing a product with stock management and automatic price discounts for bulk purchases.
- **Database Integration**: MySQL is used to store product data, with SQLAlchemy managing database interactions.
- **Flask Backend**: Handles requests, routes, and serves HTML templates for interacting with the product data.

## Prerequisites

- Python 3.x
- MySQL Database (local or remote)
- `pip` for installing dependencies

## Installation

Follow these steps to set up the project on your local machine.


### 1. Set Up a Virtual Environment

It is highly recommended to use a virtual environment for Python dependencies. Run the following commands to create and activate a virtual environment:

On Windows:
python -m venv venv
venv\Scripts\activate

On Mac/Linux
python3 -m venv venv
source venv/bin/activate

### 2. Install Dependencies
pip install flask
pip install flask-restful flask-SQLAlchemy flask-Migrate
python -m pip install pymysql

### 3. Run project
delete migrations folder
flask db init
flask db upgrade
python app.py

### 4. More info (if needed)
# Install db
docker run -d --name test-mysql -e MYSQL_ROOT_PASSWORD=nikita -p 3307:3306 mysql   ( to start a new empty server with docker )
Conexion mysql --host=127.0.0.1 --port=3307 -u root -pnikita

# Create db from mysql console
CREATE DATABASE pruebatecnica_nikita;
SHOW DATABASES;
USE pruebatecnica_nikita;

# Command that will only be used once to create the db and responds to this code in the app.py
flask create-db

# Run app
python3 app.py and open browser http://127.0.0.1:5000

# Disconnect app from linux when it is up, we list first the apps with the port in use 5000 and then we kill with the process number...
sudo netstat -tulnp | grep :5000
kill -9 3515149