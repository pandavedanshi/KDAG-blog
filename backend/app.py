from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routers.users.auth import user_auth
from routers.posts.post_crud import post_crud
from routers.replies.handle_replies import reply_crud
import os

app = Flask(__name__)
load_dotenv()
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(user_auth, url_prefix='/user')
app.register_blueprint(post_crud, url_prefix='/')
app.register_blueprint(reply_crud, url_prefix='/reply')

@app.route('/', methods=['GET'])
def home():
    return "Hello World!!"