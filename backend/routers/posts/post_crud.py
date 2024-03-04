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
        post_data['author_id'] = sid
        posts = mongo.db.posts
        posts.insert_one(post_data)
        return jsonify({"message": "Post Created"}), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in posting"}), 500
    
@post_crud.route('/get_posts', methods=['GET'])
def get_posts():
    try:
        from app import mongo
        posts = mongo.db.posts
        users = mongo.db.users
        all_posts_list = []
        for post in posts.find():
            all_posts_list.append({
                'message': post['message'],
                'author_name': users.find_one(ObjectId(post['author_id']))['f_name'] + " " + users.find_one(ObjectId(post['author_id']))['l_name'],
                'author_id': post['author_id'],
                'replies': post['replies']
            })
        return jsonify(
            {"message": "All posts fetched"},
            {"posts": all_posts_list}
            ), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in fetching posts"}), 500
    
@post_crud.route('/get_post/<string:pid>', methods=['GET'])
def get_post(pid):
    try:
        from app import mongo
        posts = mongo.db.posts
        users = mongo.db.users
        post = posts.find_one(ObjectId(pid))
        if not post:
            return jsonify({"message": "Invalid post id"})
        reqd_post = {
            'message': post['message'],
            'author_name': users.find_one(ObjectId(post['author_id']))['f_name'] + " " + users.find_one(ObjectId(post['author_id']))['l_name'],
            'author_id': post['author_id'],
            'replies': post['replies']
        }
        return jsonify(
            {"message": "Post fetched"},
            {"posts": reqd_post}
            ), 200
    except Exception as error:
        print(error)
        return jsonify({"message": "Error in fetching posts"}), 500