from github import Github
from dotenv import load_dotenv
import os
import csv
from flask import Blueprint, jsonify, request
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


# @kdsh2025.route("/check_register", methods=["get"])
# def check_multiple_stars():
#     try:
#         from app import mongo
#         from github import Github
#         import os

#         data = request.get_json()
#         if not data:
#             return jsonify({"error": "No data provided."}), 400

#         num_members = len(data)
#         if num_members < 2:
#             return (
#                 jsonify({"error": "There must be at least 2 members in the team."}),
#                 400,
#             )
#         elif num_members > 5:
#             return (
#                 jsonify({"error": "There can be a maximum of 5 members in the team."}),
#                 400,
#             )
#         if num_members != data[0]["numMembers"]:
#             return (
#                 jsonify(
#                     {
#                         # "error": "The data received is not for all members0000"
#                         "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 00"
#                     }
#                 ),
#                 400,
#             )

#         # Check if all members have the same numMembers
#         first_num_members = data[0]["numMembers"]
#         for member in data:
#             if member["numMembers"] != first_num_members:
#                 return (
#                     jsonify(
#                         {
#                             # "error": "The 'numMembers' value is inconsistent across members1111111."
#                             "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 11"
#                         }
#                     ),
#                     400,
#                 )

#         # Check if all members have the same teamName
#         first_team_name = data[0]["teamName"]
#         for member in data:
#             if member["teamName"] != first_team_name:
#                 return (
#                     jsonify(
#                         {
#                             # "error": "The 'teamName' value is inconsistent across members.222222222"
#                             "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 22"
#                         }
#                     ),
#                     400,
#                 )

#         gitHub_users = [member["GitHubID"] for member in data]
#         if not gitHub_users:
#             return jsonify({"error": "GitHub users are required."}), 400
#         for member in data:
#             if not member.get("GitHubID"):
#                 return (
#                     jsonify(
#                         {
#                             "error": f"GitHub ID for {member.get('firstname')} is missing."
#                         }
#                     ),
#                     400,
#                 )

#         access_token = os.getenv("GITHUB_TOKEN")
#         if not access_token:
#             return jsonify({"error": "GitHub token is missing."}), 400

#         g = Github(access_token)

#         repo_owner = "pathwaycom"
#         repo_name = "llm-app"
#         repo = g.get_repo(f"{repo_owner}/{repo_name}")

#         print("Importing all_starred users")
#         stargazers = repo.get_stargazers()
#         stargazer_logins = [starred_user.login for starred_user in stargazers]

#         not_starred_users = []
#         starred_users = []

#         for user in gitHub_users:
#             if user in stargazer_logins:
#                 starred_users.append(user)
#             else:
#                 not_starred_users.append(user)

#         if not_starred_users:
#             not_starred_message = ", ".join(not_starred_users)
#             result = f"The GitHub user(s) {not_starred_message} have not starred the repository, kindly star it to successfully register your team."
#             return jsonify({"error": result}), 400
#         # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
#         if starred_users:
#             print("The members have starred the github id")
#             team_name = data[0]["teamName"]
#             num_members = data[0]["numMembers"]

#             # Step 1: Check if the team already exists
#             existing_team = mongo.db.kdsh2025_teams.find_one({"teamName": team_name})
#             if existing_team:
#                 return (
#                     jsonify({"error": f"Team with name {team_name} already exists."}),
#                     400,
#                 )

#             # Step 2: Check if any GitHub IDs already exist in participants collection
#             existing_participants = []
#             for user in gitHub_users:
#                 existing_user = mongo.db.kdsh2025_participants.find_one(
#                     {"GitHubID": user}
#                 )
#                 if existing_user:
#                     existing_participants.append(user)

#             if existing_participants:
#                 existing_participants_message = ", ".join(existing_participants)
#                 return (
#                     jsonify(
#                         {
#                             "error": f"GitHub user(s) {existing_participants_message} already exist in the participants database."
#                         }
#                     ),
#                     400,
#                 )

#             # Step 3: Store data in participants collection
#             participants_data = []
#             for member in data:
#                 participants_data.append(
#                     {
#                         "isTeamLeader": member["isTeamLeader"],
#                         "firstname": member["firstname"],
#                         "lastname": member["lastname"],
#                         "gender": member["gender"],
#                         "mail": member["mail"],
#                         "mobile": member["mobile"],
#                         "college": member["college"],
#                         "degree": member["degree"],
#                         "YOS": member["YOS"],
#                         "GitHubID": member["GitHubID"],
#                         "teamName": team_name,
#                         "numMembers": num_members,
#                     }
#                 )
#             try:
#                 mongo.db.kdsh2025_participants.insert_many(participants_data)
#             except Exception as e:
#                 return (
#                     jsonify({"error": "Failed to insert participants data: " + str(e)}),
#                     500,
#                 )

#             # Step 4: Store data in teams collection
#             team_leader = next(member for member in data if member["isTeamLeader"])
#             remaining_members = [
#                 member for member in data if not member["isTeamLeader"]
#             ]

#             team_data = {
#                 "teamName": team_name,
#                 "numMembers": num_members,
#                 "teamleader_github": team_leader["GitHubID"],
#                 "teamleader_email": team_leader["mail"],
#                 "members_github": [member["GitHubID"] for member in remaining_members],
#                 "members_email": [member["mail"] for member in remaining_members],
#             }

#             try:
#                 mongo.db.kdsh2025_teams.insert_one(team_data)
#             except Exception as e:
#                 return jsonify({"error": "Failed to insert team data: " + str(e)}), 500

#             # Step 5: Send success message
#             return (
#                 jsonify(
#                     {"message": "Successfully registered your team for KDSH 2025!"}
#                 ),
#                 200,
#             )

#     except Exception as e:
#         print(f"Error: {e}")
#         return jsonify({"message": str(e)}), 500


STARGAZERS_CSV_LLM = os.path.join(os.path.dirname(__file__), 'llm-app.csv')
STARGAZERS_CSV_PATHWAY = os.path.join(os.path.dirname(__file__), 'pathway.csv')

def fetch_stargazers_from_github():
    """Fetch stargazers from GitHub and return as a list."""
    access_token = os.getenv("GITHUB_TOKEN")
    if not access_token:
        return jsonify({"error": "GitHub token is missing."}), 400
    g = Github(access_token)

    repo_owner = "pathwaycom"
    repo1_name = "llm-app"
    repo2_name = "pathway"

    repo1 = g.get_repo(f"{repo_owner}/{repo1_name}")
    repo2 = g.get_repo(f"{repo_owner}/{repo2_name}")
    print("Importing all_starred users for both repos")

    stargazers_llm = repo1.get_stargazers()
    stargazers_pathway = repo2.get_stargazers()

    combined_stargazers = set(
        [starred_user.login for starred_user in stargazers_llm] +
        [starred_user.login for starred_user in stargazers_pathway]
    )
    return list(combined_stargazers)


def read_stargazers_from_csv():
    """Read stargazers from the locally stored CSV file."""
    print("Reading stargazers from CSV")
    if not os.path.exists(STARGAZERS_CSV_LLM):
        print("CSV file does not exist. Returning empty list.")
        return []
    try:
        with open(STARGAZERS_CSV_LLM, mode="r") as file:
            reader = csv.reader(file)
            stargazers = [row[0] for row in reader if row]  
            print("Successfully read stargazers from CSV.")
            return stargazers
    except Exception as e:
        print(f"Error reading from CSV: {e}")
        return [] 


def write_stargazers_to_csv(stargazers):
    """Write stargazers to the CSV file."""
    print(f"Writing stargazers to CSV: {stargazers}")
    try:
        with open(STARGAZERS_CSV_LLM, mode="w", newline="") as file:
            writer = csv.writer(file)
            for user in stargazers:
                writer.writerow([user])
        print("Successfully wrote stargazers to CSV.")
    except Exception as e:
        print(f"Error writing to CSV: {e}")


@kdsh2025.route("/check_register", methods=["get"])
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
        if num_members != data[0]["numMembers"]:
            return (
                jsonify(
                    {
                        # "error": "The data received is not for all members0000"
                        "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 00"
                    }
                ),
                400,
            )

        # Check if all members have the same numMembers
        first_num_members = data[0]["numMembers"]
        for member in data:
            if member["numMembers"] != first_num_members:
                return (
                    jsonify(
                        {
                            # "error": "The 'numMembers' value is inconsistent across members1111111."
                            "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 11"
                        }
                    ),
                    400,
                )

        # Check if all members have the same teamName
        first_team_name = data[0]["teamName"]
        for member in data:
            if member["teamName"] != first_team_name:
                return (
                    jsonify(
                        {
                            # "error": "The 'teamName' value is inconsistent across members.222222222"
                            "error": "There was some error in the server. Please try again. If you face this issue again Contact us. 22"
                        }
                    ),
                    400,
                )

        gitHub_users = [member["GitHubID"] for member in data]
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

        current_stargazers = fetch_stargazers_from_github()
        cached_stargazers = read_stargazers_from_csv()
        stargazer_logins = cached_stargazers
        new_stargazers = set(current_stargazers) - set(cached_stargazers)
        unstarred_users = set(cached_stargazers) - set(current_stargazers)
        if new_stargazers or unstarred_users:
            write_stargazers_to_csv(current_stargazers)
            stargazer_logins = current_stargazers

        not_starred_users = []
        starred_users = []

        for user in gitHub_users:
            if user in stargazer_logins:
                starred_users.append(user)
            else:
                not_starred_users.append(user)

        if not_starred_users:
            not_starred_message = ", ".join(not_starred_users)
            result = f"The GitHub user(s) {not_starred_message} have not starred the repository, kindly star it to successfully register your team."
            return jsonify({"error": result}), 400
        # ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        if starred_users:
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
                            "error": f"GitHub user(s) {existing_participants_message} already exist in the participants database."
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
                return jsonify({"error": "Failed to insert team data: " + str(e)}), 500

            # Step 5: Send success message
            return (
                jsonify(
                    {"message": "Successfully registered your team for KDSH 2025!"}
                ),
                200,
            )

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"message": str(e)}), 500
