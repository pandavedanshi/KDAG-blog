from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routers.users.auth import user_auth
from routers.posts.post_crud import post_crud
from routers.replies.handle_replies import reply_crud
from routers.puzzle_repo.puzzle_repo import puzzle_repo
from routers.kdsh2025.register import kdsh2025
from routers.kdsh2025_mod.kdsh2025_mod import kdsh2025_mod

import os

app = Flask(__name__)
load_dotenv()
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
mongo = PyMongo(app)
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(user_auth, url_prefix="/user")
app.register_blueprint(post_crud, url_prefix="/")
app.register_blueprint(reply_crud, url_prefix="/reply")
app.register_blueprint(puzzle_repo, url_prefix="/puzzle_repo")
app.register_blueprint(kdsh2025, url_prefix="/kdsh2025")
app.register_blueprint(kdsh2025_mod, url_prefix="/kdsh2025_mod")



@app.route("/", methods=["GET"])
def home():
    return "Hello World!!"












# from flask import Flask
# from flask_pymongo import PyMongo
# from dotenv import load_dotenv
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS
# from routers.users.auth import user_auth
# from routers.posts.post_crud import post_crud
# from routers.replies.handle_replies import reply_crud
# from routers.puzzle_repo.puzzle_repo import puzzle_repo
# from routers.kdsh2025.register import kdsh2025
# from routers.kdsh2025_mod.kdsh2025_mod import kdsh2025_mod
# import os

# app = Flask(__name__)

# load_dotenv()
# app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
# mongo = PyMongo(app)
# app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY")
# jwt = JWTManager(app)
# CORS(app)

# app.register_blueprint(user_auth, url_prefix="/user")
# app.register_blueprint(post_crud, url_prefix="/")
# app.register_blueprint(reply_crud, url_prefix="/reply")
# app.register_blueprint(puzzle_repo, url_prefix="/puzzle_repo")
# app.register_blueprint(kdsh2025, url_prefix="/kdsh2025")
# app.register_blueprint(kdsh2025_mod, url_prefix="/kdsh2025_mod")


# @app.route("/", methods=["GET"])
# def home():
#     return "Hello World!!"


# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)
