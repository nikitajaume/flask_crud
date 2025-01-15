from flask import Flask
from flask.cli import with_appcontext
from config import Config
from extensions import db, migrate
from routes.routes import main
import click

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)

    app.register_blueprint(main)

    return app

@click.command("create-db")
@with_appcontext
def create_db():
    """Create initial db."""
    db.create_all()
    click.echo("¡Database created successfully!")

app = create_app()
app.cli.add_command(create_db)

if __name__ == "__main__":
    app = create_app()
    app.run('127.0.0.1', 5000)
