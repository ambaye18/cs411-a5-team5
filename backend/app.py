from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_marshmallow import Marshmallow
from flask_cors import CORS
from pyparsing import original_text_for

# db = SQLAlchemy()
# migrate = Migrate()
# ma = Marshmallow()
# cors = CORS()

def create_app():
    app = Flask(__name__, static_folder='../frontend/build/static', template_folder='../frontend/build')
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    # To use the application instances above, instantiate with an application:
    # db.init_app(app)
    # migrate.init_app(app, db)
    # ma.init_app(app)
    # cors.init_app(app, support_credentials=True, resources={r"/api/*": {"origins": "*"}})
    
    return app

