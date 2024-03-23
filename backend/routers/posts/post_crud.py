from flask import request, jsonify, Flask
from flask_jwt_extended import jwt_required, JWTManager
from flask import Blueprint
from bson import ObjectId
import base64
from flask_cors import CORS


app = Flask(__name__)
CORS(app, supports_credentials=True)
jwt = JWTManager(app)

post_crud = Blueprint("post_crud", __name__)


@post_crud.route("/create_post/<string:sid>", methods=["POST"])
@jwt_required()
def add_post(sid):
    try:
        from app import mongo

        users = mongo.db.users
        if not users.find_one(ObjectId(sid)):
            return jsonify({"message": "Invalid student id"}), 401
        # data = request.form.get()
        post_data = {}
        # post_data['message'] = data['message']
        post_data["message"] = request.form["message"]
        post_data["replies"] = []
        post_data["author_id"] = sid
        img_file = request.files.get("img")

        if not img_file:
            post_data["image"] = "No image attached"
        else:
            img_data = img_file.read()
            post_data["image"] = img_data
        posts = mongo.db.posts
        posts.insert_one(post_data)
        return jsonify({"message": "Post Created"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in posting"}), 500


# @post_crud.route('/get_posts', methods=['GET'])
# def get_posts():
#     try:
#         from app import mongo
#         posts = mongo.db.posts
#         users = mongo.db.users
#         all_posts_list = []
#         for post in posts.find():
#             all_posts_list.append({
#                 'message': post['message'],
#                 'author_name': users.find_one(ObjectId(post['author_id']))['f_name'] + " " + users.find_one(ObjectId(post['author_id']))['l_name'],
#                 'image':base64.b64encode(post['image']).decode('utf-8') if 'image' in post else None,
#                 'author_id': post['author_id'],
#                 'post_id': str(post['_id'])
#             })
#         return jsonify(
#             {"message": "All posts fetched"},
#             {"posts": all_posts_list}
#             ), 200
#     except Exception as error:
#         print(error)
#         return jsonify({"message": "Error in fetching posts (backend error message)"}), 500


@post_crud.route("/get_posts", methods=["GET"])
def get_posts():
    try:
        from app import mongo

        posts = mongo.db.posts
        users = mongo.db.users
        all_posts_list = []
        for post in posts.find():
            image_data = post["image"]
            if image_data:
                image_base64 = base64.b64encode(image_data).decode("utf-8")
            else:
                image_base64 = None
            all_posts_list.append(
                {
                    "message": post["message"],
                    "author_name": users.find_one(ObjectId(post["author_id"]))["f_name"]
                    + " "
                    + users.find_one(ObjectId(post["author_id"]))["l_name"],
                    "image": image_base64,
                    "author_id": post["author_id"],
                    "post_id": str(post["_id"]),
                }
            )
        return jsonify({"message": "All posts fetched", "posts": all_posts_list}), 200
    except Exception as error:
        print("Error fetching posts:", error)
        return (
            jsonify({"message": "Error in fetching posts (backend error message)"}),
            500,
        )


# @post_crud.route("/get_post/<string:pid>", methods=["GET"])
# def get_post(pid):
#     try:
#         from app import mongo

#         posts = mongo.db.posts
#         users = mongo.db.users
#         post = posts.find_one(ObjectId(pid))
#         if not post:
#             return jsonify({"message": "Invalid post id"})
#         reqd_post = {
#             "message": post["message"],
#             "author_name": users.find_one(ObjectId(post["author_id"]))["f_name"]
#             + " "
#             + users.find_one(ObjectId(post["author_id"]))["l_name"],
#             "author_id": post["author_id"],
#             "image": (
#                 base64.b64encode(post["image"]).decode("utf-8")
#                 if "image" in post
#                 else None
#             ),
#             "replies": post["replies"],
#         }
#         return jsonify({"message": "Post fetched"}, {"posts": reqd_post}), 200
#     except Exception as error:
#         print(error)
#         return jsonify({"message": "Error in fetching posts"}), 500


@post_crud.route("/get_post/<string:pid>", methods=["GET"])
def get_post(pid):
    try:
        from app import mongo

        posts = mongo.db.posts
        users = mongo.db.users
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Invalid post id"}), 404

        image_data = post["image"]
        if image_data:
            image_base64 = base64.b64encode(image_data).decode("utf-8")
        else:
            image_base64 = None

        reqd_post = {
            "message": post["message"],
            "author_name": users.find_one(ObjectId(post["author_id"]))["f_name"]
            + " "
            + users.find_one(ObjectId(post["author_id"]))["l_name"],
            "author_id": post["author_id"],
            "image": image_base64,
            "replies": post["replies"],
        }

        return jsonify({"message": "Post fetched", "post": reqd_post}), 200
    except Exception as error:
        print("Error fetching post:", error)
        return jsonify({"message": "Error in fetching post"}), 500
