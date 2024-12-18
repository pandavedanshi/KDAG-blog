from flask import Blueprint, jsonify, request

kdsh2025_mod = Blueprint("kdsh2025_mod", __name__)

def serialize_document(doc):
    """Converts MongoDB documents to JSON-serializable format."""
    if not doc:
        return None
    doc["_id"] = str(doc["_id"]) 
    return doc

@kdsh2025_mod.route("/get_participant_mod", methods=["GET"])
def check_participants():
    try:
        from app import mongo
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        user = data.get("github_id")
        if not user:
            return jsonify({"error": "GitHub ID is required."}), 400
        existing_user = mongo.db.kdsh2025_participants.find_one({"GitHubID": user})
        if existing_user:
            serialized_user = serialize_document(existing_user)
            return jsonify({"message": f"{user} already exists in the database", "user": serialized_user}), 200
        else:
            return jsonify({"message": f"{user} DOES NOT exist in the database"}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@kdsh2025_mod.route("/get_team_mod", methods=["GET"])
def check_team():
    try:
        from app import mongo
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided."}), 400

        team_name = data.get("team_name")
        if not team_name:
            return jsonify({"error": "Team name is required."}), 400
        existing_team = mongo.db.kdsh2025_teams.find_one({"teamName": team_name})
        if existing_team:
            serialized_team = serialize_document(existing_team)
            return jsonify({"message": f"{team_name} already EXISTS.", "team": serialized_team}), 200
        else:
            return jsonify({"message": f"{team_name} DOES NOT exist."}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
