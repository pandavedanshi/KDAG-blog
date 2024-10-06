from flask import request, jsonify,Blueprint
import bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_header,
    get_jwt_identity,
)
from bson import ObjectId

user_auth = Blueprint("user_auth", __name__)










import requests
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests


REDIRECT_URI = "http://localhost:3000/google-auth/callback"; 




@user_auth.route("/auth/google/callback", methods=["POST"])
def google_callback():
    try:
        data = request.get_json()
        code = data.get('code')

        # Exchange the authorization code for an access token
        token_response = requests.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "redirect_uri": REDIRECT_URI,
                "scope" : "email",
                "grant_type": "authorization_code",
            },
        )

        token_response_data = token_response.json()

        if token_response.status_code != 200:
            return jsonify({"error": "Failed to obtain access token", "details": token_response_data}), 400

        access_token = token_response_data.get("access_token")
        refresh_token = token_response_data.get("refresh_token")
        id_token_str = token_response_data.get("id_token")

        if id_token_str:
            id_info = id_token.verify_oauth2_token(id_token_str, google_requests.Request(), GOOGLE_CLIENT_ID)
            print('User info from Google:', id_info)
        else:
            return jsonify({"error": "Failed to obtain ID token"}), 400

        # Here, you would typically save or update user info in your database
        # e.g., mongo.db.users.update_one({"email": id_info["email"]}, {"$set": user_data}, upsert=True)

        return jsonify({
            "message": "Authentication successful",
            "user_info": id_info,
            "refresh_token": refresh_token,
            "access_token": access_token
        }), 200

    except Exception as e:
        print("Error in Google OAuth callback:", e)
        return jsonify({"error": "An error occurred during the authentication process."}), 500












@user_auth.route("/signup", methods=["POST"])
def user_signup():
    try:
        from app import mongo

        data = request.get_json()
        user_data = {}
        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]
        for key in reqd_fields:
            user_data[key] = data[key]
        hashed_password = bcrypt.hashpw(
            data["password"].encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")
        user_data["password"] = hashed_password

        user_data["is_admin"] = False
        user_data["active"] = False
        users = mongo.db.users
        if users.find_one({"username": data["username"]}):
            return jsonify({"message": "Please choose a different username"}), 500
        users.insert_one(user_data)
        return jsonify({"message": "Signup successful"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in signing up"}), 500


# /////////////////////////////////////////////////////////////////////////////////////////
# @user_auth.route("/add_fields_to_users", methods=["POST"])
# def add_fields_to_users():
#     try:
#         from app import mongo
#         mongo.db.users.update_many(
#             {},
#             {
#                 "$set": {
#                     "is_admin": False,  # Set default value for is_admin
#                     "active": True      # Set default value for active
#                 }
#             }
#         )
#         return jsonify({"message": "Fields added to all users successfully!"}), 200
#     except Exception as error:
#         print(f"Error updating users: {error}")
#         return jsonify({"message": "Error updating users"}), 500
# /////////////////////////////////////////////////////////////////////////////////////////

@user_auth.route("/login", methods=["POST"])
def user_login():
    try:
        from app import mongo

        data = request.get_json()
        users = mongo.db.users
        user = users.find_one({"username": data["username"]})
        if user and bcrypt.checkpw(
            data["password"].encode("utf-8"), user["password"].encode("utf-8")
        ):
            if not user.get("active", False):
                return (
                    jsonify(
                        {
                            "message": "Account has not been activated. Please contact support."
                        }
                    ),
                    403,
                )
            token_identity = {
                "username": data["username"],
                "user_id": str(user["_id"]) if user["_id"] else None,
            }
            if user.get("is_admin", False):
                token_identity["is_admin"] = True

            access_token = create_access_token(
                identity=token_identity, expires_delta=False
            )

            return (
                jsonify(
                    {"message": "Logged in successfully", "access_token": access_token}
                ),
                200,
            )

        else:
            return jsonify({"message": "Invalid credentials"}), 401

    except Exception as error:
        print(error)
        return jsonify({"message": "Error in logging in"}), 500


@user_auth.route("/profile/<string:uid>", methods=["GET"])
def profile(uid):
    try:
        from app import mongo

        users = mongo.db.users
        user = users.find_one(ObjectId(uid))
        if not user:
            return jsonify({"message": "No such user exists"}), 401

        user_info = {
            key: value
            for key, value in user.items()
            if key != "_id" and key != "password" and key != "phone"
        }
        return jsonify(user_info), 200
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


@user_auth.route("/profile_self/<string:uid>", methods=["GET"])
@jwt_required()
def profile_self(uid):
    try:
        from app import mongo

        users = mongo.db.users
        user = users.find_one(ObjectId(uid))
        if not user:
            return jsonify({"message": "No such user exists"}), 401
        if not user.get("active", False):
            return (
                jsonify(
                    {
                        "message": "Account has not been activated. Please contact support."
                    }
                ),
                403,
            )
        user_info = {key: value for key, value in user.items() if key != "_id"}
        user_info["password"] = user["password"]

        return jsonify(user_info), 200
    except Exception as error:
        print("Error in getting profile ", error)
        return jsonify({"message": "Error in fetching profile"}), 500


@user_auth.route("/edit_profile/<string:uid>", methods=["PUT"])
@jwt_required()
def edit_profile(uid):
    try:
        from app import mongo

        users = mongo.db.users
        data = request.get_json()
        current_user = get_jwt_identity()
        user = users.find_one({"_id": ObjectId(uid)})
        if not user:
            return jsonify({"message": "No such user exists"}), 401

        reqd_fields = ["username", "f_name", "l_name", "email", "phone", "college"]

        updated_data = {key: user.get(key) for key in reqd_fields}

        for key in reqd_fields:
            if data.get(key) is not None:
                updated_data[key] = data[key]

        users.update_one({"_id": ObjectId(uid)}, {"$set": updated_data})

        updated_user = users.find_one({"_id": ObjectId(uid)})

        updated_user["_id"] = str(updated_user["_id"])

        return (
            jsonify({"message": "Profile edited successfully", "user": updated_user}),
            200,
        )
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in profile editing"}), 500
