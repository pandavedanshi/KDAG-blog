from flask import Flask, render_template, request
from github import Github
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

@app.route('/', methods=['GET', 'POST'])
def check_star():
    if request.method == 'POST':
        target_username = request.form['username']

        try:
            access_token = os.getenv("GITHUB_TOKEN")
            g = Github(access_token)

            repo_owner = 'pathwaycom' 
            repo_name = 'llm-app'

            repo = g.get_repo(f"{repo_owner}/{repo_name}")
            stargazers = repo.get_stargazers()

            has_starred = any(user.login == target_username for user in stargazers)

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