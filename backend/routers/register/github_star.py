from flask import Flask, render_template, request
from github import Github
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import json

app = Flask(__name__)

# Configure MongoDB URI (using environment variable)
app.config['MONGO_URI'] = os.getenv('MONGO_URI')

# Initialize PyMongo
mongo = PyMongo(app)

@app.route('/', methods=['GET', 'POST'])
def check_star():
    if request.method == 'POST':
        target_username = request.form['username']

        try:
            # Initialize Github with your token
            access_token = os.getenv("GITHUB_TOKEN")
            g = Github(access_token)

            # Repository details
            repo_owner = 'pathwaycom'
            repo_name = 'llm-app'

            # Get the repository and user
            repo = g.get_repo(f"{repo_owner}/{repo_name}")

            # Get list of stargazers
            stargazers = repo.get_stargazers()

            # Check if user is in stargazers
            has_starred = any(user.login == target_username for user in stargazers)

            # Store the result in MongoDB
            db = mongo.db  # Access the database
            collection = db.starred_users  # Access the collection
            collection.insert_one({"username": target_username, "starred": has_starred})

            if has_starred:
                result = f"User {target_username} has starred the repository!"
            else:
                result = f"User {target_username} has not starred the repository."

            return render_template('result.html', result=result)

        except Exception as e:
            return render_template('error.html', error=str(e))

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
    
