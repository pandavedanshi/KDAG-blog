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

        if not user:
            return jsonify({"error": "GitHub user is required."}), 400

        access_token = os.getenv("GITHUB_TOKEN")
        if not access_token:
            return jsonify({"error": "GitHub token is missing."}), 400
        g = Github(access_token)

        repo_owner = "pathwaycom"
        repo_name = "llm-app"
        repo = g.get_repo(f"{repo_owner}/{repo_name}")

        stargazers = repo.get_stargazers()

        has_starred = False
        for starred_user in stargazers:
            print(starred_user.login)
            if starred_user.login == user:
                has_starred = True
                break

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
                    "message": e,
                }
            ),
            200,
        )
