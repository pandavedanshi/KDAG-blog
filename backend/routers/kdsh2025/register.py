from github import Github
from dotenv import load_dotenv
import os
import csv
from flask import Blueprint, jsonify, request
import requests
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


# />>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
def get_starred_repositories(github_id):
    url = f"https://api.github.com/users/{github_id}/starred?per_page=100"
    all_starred_repositories = []

    try:
        access_token = os.getenv("GITHUB_TOKEN")
        if not access_token:
            return {"error": "GitHub token is missing."}

        headers = {
            "Authorization": f"token {access_token}",
            "Accept": "application/vnd.github+json",
        }

        while url:
            response = requests.get(url, headers=headers)
            if response.status_code == 404:
                print("error -- 404 -- ", github_id)
                return {"error": "GitHub user not found."}

            elif response.status_code == 403:
                return {"error": "Rate limit exceeded. Please try again later."}

            elif response.status_code == 200:
                print("200 -- proceeding with getting the rest of the urls")
                all_starred_repositories.extend(response.json())
                remaining = response.headers.get("X-RateLimit-Remaining")
                limit = response.headers.get("X-RateLimit-Limit")

                print("remaining : ", remaining)
                print("limit : ", limit)
                if "Link" in response.headers:
                    links = response.headers["Link"]
                    next_page_url = None
                    for link in links.split(","):
                        print("link ----- ", link)
                        if 'rel="next"' in link:
                            next_page_url = link.split(";")[0].strip().strip("<>")
                            break

                    url = next_page_url
                else:
                    url = None
            else:
                return {
                    "error": f"GitHub API responded with status code {response.status_code}"
                }
        return {"starred_repositories": all_starred_repositories}

    except requests.exceptions.Timeout:
        return {"error": "51:>> " + "Request timed out. Please try again."}
    except requests.exceptions.RequestException as e:
        return {"error": "50:>> " + f"Request failed: {str(e)}"}


def check_required_repositories(starred_repos):
    required_repos = ["pathway", "llm-app"]
    starred_repo_names = [
        repo["name"] for repo in starred_repos["starred_repositories"]
    ]
    missing_repos = [repo for repo in required_repos if repo not in starred_repo_names]

    return missing_repos


def check_repositories(gitHub_users):
    missing_repos_by_user = {}

    for github_id in gitHub_users:
        try:
            starred_repos = get_starred_repositories(github_id)
            if "error" in starred_repos:
                missing_repos_by_user[github_id] = "error"
                continue
            
            missing_repos = check_required_repositories(starred_repos)

            if not missing_repos:
                missing_repos_by_user[github_id] = "success"
            else:
                missing_repos_by_user[github_id] = missing_repos
        except Exception as e:
            print("check_repo : ", e)
            missing_repos_by_user[github_id] = f"error"

    return missing_repos_by_user


def check_starred_repositories(missing_repos_by_users):
    all_starred = True
    missing_repos_messages = []
    for github_id, missing_repos in missing_repos_by_users.items():
        if missing_repos == "success":
            continue
        elif missing_repos == "error":
            all_starred = False
            missing_repos_messages.append(
                f""" Please check the GitHub Id <{github_id}> ."""
            )
        else:
            repo_messages = [f'GitHub user <{github_id}> has not starred the "']
            repo_messages.append('", "'.join(missing_repos))
            repo_messages.append('" repository(s).')
            all_starred = False
            missing_repos_messages.append("".join(repo_messages))
    if all_starred:
        print("All users have starred the required repositories.")
        return "success"
    else:
        message = (
            " ".join(missing_repos_messages)
            + " Kindly star the repositories to successfully register your team!"
        )
        return message


@kdsh2025.route("/check_register", methods=["post"])
def check_multiple_stars():
    try:
        from app import mongo

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        num_members = len(data)

        if num_members < 2:
            return (
                jsonify({"error": "There must be at least 2 members in the team."}),
                400,
            )
        elif num_members > 5:
            return (
                jsonify({"error": "There can be a maximum of 5 members in the team."}),
                400,
            )

        # Check if all members have the same numMembers
        try:
            num_members_ = [member["numMembers"] for member in data]
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(set(num_members_)) != 1:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again. If you face this issue again Contact us at kdag.kgp@gmail.com. 11"
                    }
                ),
                400,
            )
        if not num_members == data[0]["numMembers"]:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again. If you face this issue again Contact us at kdag.kgp@gmail.com. 11"
                    }
                ),
                400,
            )

        # Check if all members have the same teamName
        try:
            team_names = [member["teamName"] for member in data]
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(set(team_names)) != 1:
            return (
                jsonify(
                    {
                        "error": "There was some error in the server. Please try again. If you face this issue again Contact us at kdag.kgp@gmail.com. 22"
                    }
                ),
                400,
            )

        # Check if there are duplicates in the extracted GitHub IDs
        try:
            gitHub_users = [member["GitHubID"] for member in data]
        except KeyError as e:
            return (
                jsonify({"error": f"Missing key: {str(e)} in one or more members."}),
                400,
            )
        if len(gitHub_users) != len(set(gitHub_users)):
            return (
                jsonify(
                    {
                        "error": "GitHub ID must be unique across all members. Duplicate found."
                    }
                ),
                400,
            )

        if not gitHub_users:
            return jsonify({"error": "GitHub users are required."}), 400
        for member in data:
            if not member.get("GitHubID"):
                return (
                    jsonify(
                        {
                            "error": f"GitHub ID for {member.get('firstname')} is missing."
                        }
                    ),
                    400,
                )

        missing_repos_by_users = check_repositories(gitHub_users)
        starred_users = check_starred_repositories(missing_repos_by_users)

        if starred_users != "success":
            return jsonify({"error": "55:>> " + starred_users}), 400

        elif starred_users == "success":
            print("The members have starred the github id")
            team_name = data[0]["teamName"]
            num_members = data[0]["numMembers"]

            # Step 1: Check if the team already exists
            existing_team = mongo.db.kdsh2025_teams.find_one({"teamName": team_name})
            if existing_team:
                return (
                    jsonify({"error": f"Team with name {team_name} already exists."}),
                    400,
                )

            # Step 2: Check if any GitHub IDs already exist in participants collection
            existing_participants = []
            for user in gitHub_users:
                existing_user = mongo.db.kdsh2025_participants.find_one(
                    {"GitHubID": user}
                )
                if existing_user:
                    existing_participants.append(user)

            if existing_participants:
                existing_participants_message = ", ".join(existing_participants)
                return (
                    jsonify(
                        {
                            "error": f"GitHub user(s) {existing_participants_message} already have registered."
                        }
                    ),
                    400,
                )
            # Step 3: Store data in participants collection
            participants_data = []
            for member in data:
                participants_data.append(
                    {
                        "isTeamLeader": member["isTeamLeader"],
                        "firstname": member["firstname"],
                        "lastname": member["lastname"],
                        "gender": member["gender"],
                        "mail": member["mail"],
                        "mobile": member["mobile"],
                        "college": member["college"],
                        "degree": member["degree"],
                        "YOS": member["YOS"],
                        "GitHubID": member["GitHubID"],
                        "teamName": team_name,
                        "numMembers": num_members,
                    }
                )
            try:
                mongo.db.kdsh2025_participants.insert_many(participants_data)
            except Exception as e:
                return (
                    jsonify({"error": "Failed to insert participants data: " + str(e)}),
                    500,
                )

            # Step 4: Store data in teams collection
            team_leader = next(member for member in data if member["isTeamLeader"])
            remaining_members = [
                member for member in data if not member["isTeamLeader"]
            ]

            team_data = {
                "teamName": team_name,
                "numMembers": num_members,
                "teamleader_github": team_leader["GitHubID"],
                "teamleader_email": team_leader["mail"],
                "members_github": [member["GitHubID"] for member in remaining_members],
                "members_email": [member["mail"] for member in remaining_members],
            }

            try:
                mongo.db.kdsh2025_teams.insert_one(team_data)
            except Exception as e:
                return (
                    jsonify({"error": "Failed to insert team data: " + str(e)}),
                    500,
                )

            # Step 5: Send success message
            return (
                jsonify(
                    {
                        "message": "Successfully registered your team for KDSH 2025!",
                        "registration": "success",
                    }
                ),
                200,
            )

    except Exception as e:
        print(f"error: 60  + {e}")
        return jsonify({"error": "1:>> " + str(e)}), 500
