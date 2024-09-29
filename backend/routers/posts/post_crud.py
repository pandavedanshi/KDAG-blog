from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint
from bson import ObjectId
import base64

post_crud = Blueprint("post_crud", __name__)


@post_crud.route("/create_post/<string:sid>", methods=["POST"])
@jwt_required()
def add_post(sid):
    try:
        from app import mongo

        users = mongo.db.users
        if not users.find_one(ObjectId(sid)):
            return jsonify({"message": "Invalid student id"}), 401

        post_data = request.get_json()
        if not post_data:
            return jsonify({"message": "No JSON data received"}), 400

        post_data["replies"] = []
        post_data["author_id"] = sid
        post_data["upvotes"] = 0
        post_data["downvotes"] = 0
        post_data["voters"] = []
        post_data["voters_downvoted"] = []

        img_file = request.files.get("img")

        if not img_file:
            post_data["image"] = None
        else:
            img_data = img_file.read()
            post_data["image"] = img_data

        posts = mongo.db.posts
        posts.insert_one(post_data)

        return jsonify({"message": "Post Created"}), 200
    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "Error in posting"}), 500


# ///////////////////////////////////////////////////////////////////////////////////////////
# @post_crud.route("/add_vote_fields", methods=["POST"])
# def add_vote_fields():
#     try:
#         from app import mongo

#         # Update all documents in the posts collection
#         mongo.db.posts.update_many(
#             {},
#             {
#                 "$set": {
#                     "upvotes": 0,      # Set default upvotes to 0
#                     "downvotes": 0,    # Set default downvotes to 0
#                     "voters": []       # Set default voters array as empty
#                 }
#             }
#         )
#         return jsonify({"message": "Vote fields added successfully---------------123!"}), 200
#     except Exception as error:
#         print("Error:", error)
#         return jsonify({"message": "Error in adding vote fields-----------------123"}), 500
# /////////////////////////////////////////////////////////////////////////////////////////////


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
                    "replies": len(post["replies"]),
                    "author_id": post["author_id"],
                    "date": post["date"],
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
            "date": post["date"],
            "image": image_base64,
            "replies": post["replies"],
            "upvotes": post["upvotes"],
            "downvotes": post["downvotes"],
            "voters": post["voters"],
            "voters_downvoted": post["voters_downvoted"],
        }

        return jsonify({"message": "Post fetched", "post": reqd_post}), 200
    except Exception as error:
        print("Error fetching post:", error)
        return jsonify({"message": "Error in fetching post"}), 500


@post_crud.route("/delete_post/<string:pid>/<string:uid>", methods=["DELETE"])
@jwt_required()
def delete_post(pid, uid):
    try:
        from app import mongo

        posts = mongo.db.posts
        users = mongo.db.users
        user_id = ObjectId(uid)

        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Invalid post id"}), 404

        post_user = ObjectId(post["author_id"])

        user = users.find_one({"_id": user_id})
        if not user:
            return jsonify({"message": "User not found"}), 404

        is_admin = user.get("is_admin", False)

        if user_id != post_user and not is_admin:
            return (
                jsonify({"message": "You are not authorized to delete this post"}),
                402,
            )

        posts.delete_one({"_id": ObjectId(pid)})
        return jsonify({"message": "Post deleted successfully"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in deleting posts"}), 500


@post_crud.route("/upvote/<string:pid>", methods=["POST"])
@jwt_required()
def upvote_post(pid):
    try:
        from app import mongo
        
        user_identity = get_jwt_identity()
        uid = user_identity["user_id"]

        post = mongo.db.posts.find_one({"_id": ObjectId(pid)})
        if not post:
            return jsonify({"message": "Invalid post ID"}), 404

        upvote_voters = post.get("voters", [])
        downvote_voters = post.get("voters_downvoted", [])

        changes = {
            "upvotes": 0,
            "downvotes": 0,
            "voters": upvote_voters.copy(),
            "voters_downvoted": downvote_voters.copy(),
        }

        if uid in upvote_voters:
            changes["upvotes"] -= 1
            changes["voters"].remove(uid)
        else:
            if uid in downvote_voters:
                changes["downvotes"] -= 1
                changes["voters_downvoted"].remove(uid)
            changes["upvotes"] += 1
            changes["voters"].append(uid)

        mongo.db.posts.update_one(
            {"_id": ObjectId(pid)},
            {
                "$inc": {
                    "upvotes": changes["upvotes"],
                    "downvotes": changes["downvotes"]
                },
                "$set": {
                    "voters": changes["voters"],
                    "voters_downvoted": changes["voters_downvoted"]
                }
            }
        )

        new_upvote_count = post["upvotes"] + changes["upvotes"]
        new_downvote_count = post["downvotes"] + changes["downvotes"]
        new_voters = changes["voters"]
        new_voters_downvoted = changes["voters_downvoted"]

        return jsonify(
            {
                "message": "Post upvoted successfully",
                "newUpvoteCount": new_upvote_count,
                "newDownvoteCount": new_downvote_count,
                "new_voters": new_voters,
                "new_voters_downvoted": new_voters_downvoted,
            }   
        ), 200

    except Exception as error:
        print(f"Error during upvoting: {error}")
        return jsonify({"message": "Error during upvoting"}), 500


@post_crud.route("/downvote/<string:pid>", methods=["POST"])
@jwt_required()
def downvote_post(pid):
    try:
        from app import mongo

        user_identity = get_jwt_identity()
        uid = user_identity["user_id"]

        post = mongo.db.posts.find_one({"_id": ObjectId(pid)})
        if not post:
            return jsonify({"message": "Invalid post ID"}), 404

        upvote_voters = post.get("voters", [])
        downvote_voters = post.get("voters_downvoted", [])

        changes = {
            "upvotes": 0,
            "downvotes": 0,
            "voters": upvote_voters.copy(),
            "voters_downvoted": downvote_voters.copy(),
        }

        if uid in downvote_voters:
            changes["downvotes"] -= 1
            changes["voters_downvoted"].remove(uid)
        else:
            if uid in upvote_voters:
                changes["upvotes"] -= 1
                changes["voters"].remove(uid)
            changes["downvotes"] += 1
            changes["voters_downvoted"].append(uid)

        mongo.db.posts.update_one(
            {"_id": ObjectId(pid)},
            {
                "$inc": {
                    "upvotes": changes["upvotes"],
                    "downvotes": changes["downvotes"]
                },
                "$set": {
                    "voters": changes["voters"],
                    "voters_downvoted": changes["voters_downvoted"]
                }
            }
        )
        
        new_downvote_count = post["downvotes"] + changes["downvotes"]
        new_upvote_count = post["upvotes"] + changes["upvotes"]
        new_voters = changes["voters"]
        new_voters_downvoted = changes["voters_downvoted"]

        return jsonify(
            {
                "message": "Post downvoted successfully",
                "newUpvoteCount": new_upvote_count,
                "newDownvoteCount": new_downvote_count,
                "new_voters": new_voters,
                "new_voters_downvoted": new_voters_downvoted,
            }
        ), 200

    except Exception as error:
        print(f"Error during downvoting: {error}")
        return jsonify({"message": "Error during downvoting"}), 500
