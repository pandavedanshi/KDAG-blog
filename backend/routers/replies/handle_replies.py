from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint
from bson import ObjectId

reply_crud = Blueprint("reply_crud", __name__)


@reply_crud.route("/create_reply/<string:pid>", methods=["POST"])
@jwt_required()
def add_post(pid):
    try:
        from app import mongo

        data = request.get_json()
        posts = mongo.db.posts
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Not a valid post id"}), 401
        if not "level" in data:
            return jsonify({"message": "Level field absent"}), 400
        if not "message" in data:
            return jsonify({"message": "Message field absent"}), 400
        if not "author_id" in data:
            return jsonify({"message": "Author id field absent"}), 400
        if not "date" in data:
            return jsonify({"message": "Date field absent"}), 400
        level_str = data["level"]
        org_post = post
        if level_str == "":
            post["replies"].append(
                {
                    "level": str(len(post["replies"]) + 1),
                    "message": data["message"],
                    "author_id": data["author_id"],
                    "date": data["date"],
                    "show": True,
                    "replies": [],
                    "upvotes": 0,
                    "downvotes": 0,
                    "voters": [],
                    "voters_downvoted": [],
                }
            )
        else:
            level_str = level_str.split("/")
            for level in level_str:
                post = post["replies"][int(level) - 1]
            post["replies"].append(
                {
                    "level": data["level"] + "/" + str(len(post["replies"]) + 1),
                    "message": data["message"],
                    "author_id": data["author_id"],
                    "date": data["date"],
                    "show": True,
                    "replies": [],
                    "upvotes": 0,
                    "downvotes": 0,
                    "voters": [],
                    "voters_downvoted": [],
                }
            )
        posts.replace_one({"_id": ObjectId(pid)}, org_post)
        return jsonify({"message": "Replied"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in replying"}), 500


@reply_crud.route("/get_replies/<string:pid>", methods=["POST"])
def get_replies(pid):
    try:
        from app import mongo

        data = request.get_json()
        posts = mongo.db.posts
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Not a valid post id"}), 401
        if not "level" in data:
            return jsonify({"message": "Level field absent"}), 400
        level_str = data["level"]
        level_str = level_str.split("/")
        for level in level_str:
            post = post["replies"][int(level) - 1]
        imm_replies = []
        for reply in post["replies"]:
            imm_replies.append(
                {
                    "message": reply["message"],
                    "author_id": reply["author_id"],
                    "date": reply["date"],
                    "show": reply["show"],
                    "replies": reply["replies"],
                    "upvotes": reply["upvotes"],
                    "downvotes": reply["downvotes"],
                    "voters": reply["voters"],
                    "voters_downvoted": reply["voters_downvoted"],
                }
            )
        return jsonify({"message": "Success", "replies": imm_replies}), 200
    except Exception as error:
        print("Error ", error)
        return jsonify({"message": "Error in getting the replies"}), 500


@reply_crud.route("/delete_reply/<string:pid>", methods=["DELETE"])
@jwt_required()
def delete_reply(pid):
    try:
        from app import mongo

        data = request.get_json()
        posts = mongo.db.posts
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Not a valid post id"}), 401
        if not "level" in data:
            return jsonify({"message": "Level field absent"}), 400
        level_str = data["level"]
        org_post = post
        if level_str == "":
            return jsonify({"message": "Cannot delete root post"}), 400
        else:
            level_str = level_str.split("/")
            for level in level_str[:-1]:
                post = post["replies"][int(level) - 1]
            del post["replies"][int(level_str[-1]) - 1]
        posts.replace_one({"_id": ObjectId(pid)}, org_post)
        return jsonify({"message": "Reply deleted"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in deleting reply"}), 500


# @reply_crud.route("/add_vote_fields_reply11", methods=["POST"])
# def add_vote_fields():
#     try:
#         from app import mongo

#         posts = mongo.db.posts.find()

#         for post in posts:
#             for reply in post.get("replies", []):
#                 mongo.db.posts.update_one(
#                     {"_id": post["_id"], "replies.level": reply["level"]},
#                     {
#                         "$set": {
#                             "replies.$.upvotes": 0,  # Set default upvotes to 0
#                             "replies.$.downvotes": 0,  # Set default downvotes to 0
#                             "replies.$.voters": [],  # Set default voters array as empty
#                             "replies.$.voters_downvoted": [],  # Set default downvoters array as empty
#                         }
#                     },
#                 )

#         return (
#             jsonify({"message": "Vote fields added successfully/////////////////"}),
#             200,
#         )
#     except Exception as error:
#         print("Error:", error)
#         return (
#             jsonify({"message": "Error in adding vote fields/////////////////////"}),
#             500,
#         )


@reply_crud.route("/upvote/<string:pid>", methods=["POST"])
@jwt_required()
def upvote_post(pid):
    try:
        from app import mongo
        
        user_identity = get_jwt_identity()
        uid = user_identity["user_id"]
        data = request.get_json()

        post = mongo.db.posts.find_one({"_id": ObjectId(pid)})
        if not post:
            return jsonify({"message": "Invalid post ID"}), 404
        if "level" not in data:
            return jsonify({"message": "Level field absent"}), 400
        
        level_str = data["level"]
        levels = level_str.split("/")

        current_reply = post
        path = "replies"

        for i, level in enumerate(levels):
            level_index = int(level) - 1  
            if i == 0:
                current_reply = post["replies"][level_index]
                path = f"replies.{level_index}"
            else:
                current_reply = current_reply["replies"][level_index]
                path += f".replies.{level_index}"
            print(f"Current path: {path}")
        print(f"Final path: {path}")
        print(f"Current reply: {current_reply}")

        upvote_voters = current_reply.get("voters", [])
        downvote_voters = current_reply.get("voters_downvoted", [])
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
                    f"{path}.upvotes": changes["upvotes"],
                    f"{path}.downvotes": changes["downvotes"]
                },
                "$set": {
                    f"{path}.voters": changes["voters"],
                    f"{path}.voters_downvoted": changes["voters_downvoted"]
                }
            }
        )

        new_upvote_count = current_reply["upvotes"] + changes["upvotes"]
        new_downvote_count = current_reply["downvotes"] + changes["downvotes"]
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

@reply_crud.route("/downvote/<string:pid>", methods=["POST"])
@jwt_required()
def downvote_post(pid):
    try:
        from app import mongo
        
        user_identity = get_jwt_identity()
        uid = user_identity["user_id"]
        data = request.get_json()

        post = mongo.db.posts.find_one({"_id": ObjectId(pid)})
        if not post:
            return jsonify({"message": "Invalid post ID"}), 404
        if "level" not in data:
            return jsonify({"message": "Level field absent"}), 400
        
        level_str = data["level"]
        levels = level_str.split("/")

        current_reply = post
        path = "replies"

        for i, level in enumerate(levels):
            level_index = int(level) - 1  
            if i == 0:
                current_reply = post["replies"][level_index]
                path = f"replies.{level_index}"
            else:
                current_reply = current_reply["replies"][level_index]
                path += f".replies.{level_index}"
            print(f"Current path: {path}")
        print(f"Final path: {path}")
        print(f"Current reply: {current_reply}")

        upvote_voters = current_reply.get("voters", [])
        downvote_voters = current_reply.get("voters_downvoted", [])
        
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
                    f"{path}.upvotes": changes["upvotes"],
                    f"{path}.downvotes": changes["downvotes"]
                },
                "$set": {
                    f"{path}.voters": changes["voters"],
                    f"{path}.voters_downvoted": changes["voters_downvoted"]
                }
            }
        )

        new_upvote_count = current_reply["upvotes"] + changes["upvotes"]
        new_downvote_count = current_reply["downvotes"] + changes["downvotes"]
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
