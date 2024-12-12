from flask import Flask, render_template, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint
from bson import ObjectId
from github import Github
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import json

kdsh2025 = Blueprint("kdsh2025", __name__)

load_dotenv()
MONGO_URI = os.getenv("GOOGLE_CLIENT_ID")


@kdsh2025.route("/check_star", methods=["GET"])
def check_star():
    try:
        from app import mongo

        data = request.get_json()
        user = data.get("gitHub_user")
        print(1)
        access_token = os.getenv("GITHUB_TOKEN")
        g = Github(access_token)
        print(2)
        repo_owner = "pathwaycom"
        repo_name = "llm-app"
        print(3)
        repo = g.get_repo(f"{repo_owner}/{repo_name}")
        print(4)
        print(repo)

        stargazers = repo.get_stargazers()
        print(5)
        print(stargazers)

        has_starred = any(user.login == user for user in stargazers)

        # Store the result in MongoDB
        # db = mongo.db  # Access the database
        # collection = db.starred_users  # Access the collection
        # collection.insert_one({"username": target_username, "starred": has_starred})

        if has_starred:
            result = f"User {user} has starred the repository!"
            print(result)
            return (
                jsonify(
                    {
                        "message": result,
                    }
                ),
                200,
            )
        else:
            result = f"User {user} has not starred the repository."
            print(result)
            return (
                jsonify(
                    {
                        "error": result,
                    }
                ),
                400,
            )

    except Exception as e:
        print(e)
        return (
            jsonify(
                {
                    "error": e,
                }
            ),
            400,
        )
