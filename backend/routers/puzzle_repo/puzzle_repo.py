# posts.py
from flask import Blueprint, jsonify, request, Flask
import pandas as pd
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

puzzle_repo = Blueprint("puzzle_repo", __name__)
load_dotenv()


@puzzle_repo.route('/create_new_collection', methods=['POST'])
def create_new_collection():
    from app import mongo
    try:

        csv_file_path = os.path.join(os.path.dirname(__file__), 'data.csv')
        df = pd.read_csv(csv_file_path)
        df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
        df = df.dropna(subset=['Question_Number'])

        puzzles = mongo.db.puzzles

        if df.empty:
            return jsonify({"error": "Empty CSV file"}), 400

        puzzles.insert_many(df.to_dict('records'))
        return jsonify({"message": "CSV uploaded and data stored successfully!"}), 200

    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"error": str(e)}), 500
    
