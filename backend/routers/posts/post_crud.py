from flask import request, jsonify
from flask_jwt_extended import jwt_required
from flask import Blueprint
from bson import ObjectId

post_crud = Blueprint('post_crud', __name__)

@post_crud.route('/create_post/<string:sid>', methods=['POST'])
@jwt_required()
def add_post(sid):
    try:
        from app import mongo
        users = mongo.db.users
        if not users.find_one(ObjectId(sid)):
            return jsonify({"message": "Invalid student id"}), 401
        data = request.get_json()
        post_data = {}
        post_data['message'] = data['message']
        post_data['replies'] = []
        post_data['student_id'] = sid
        posts = mongo.db.posts
        posts.insert_one(post_data)
        return jsonify({"message": "Post Created"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in posting"}), 500
    
@post_crud.route('/get_posts', methods=['GET'])
def get_post():
    try:
        from app import mongo
        posts = mongo.db.posts
        users = mongo.db.users
        all_posts_list = []
        for post in posts.find():
            all_posts_list.append({
                'message': post['message'],
                'author': users.find_one(ObjectId(post['student_id']))['f_name'] + " " + users.find_one(ObjectId(post['student_id']))['l_name'],
                'replies': post['replies']
            })
        return jsonify(
            {"message": "All posts fetched"},
            {"posts": all_posts_list}
            ), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in fetching posts"}), 500