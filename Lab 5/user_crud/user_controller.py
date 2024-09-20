from flask_restful import Api, Resource
from user_repository import UserRepository

def create_api(app):
    api = Api(app)

    class UserResource(Resource):
        def get(self):
            users = UserRepository.get_all_users()
            return [{"id": user.id, "username": user.username, "password":user.password} for user in users]

        def post(self):
            data = app.request.get_json()
            new_user = UserRepository.create_user(data['username'], data['password'])
            return {"id": new_user.id, "username": new_user.username}

    class SingleUserResource(Resource):
        def get(self, user_id):
            user = UserRepository.get_user_by_id(user_id)
            if user is None:
                return {"message": "User not found"}, 404
            return {"id": user.id, "username": user.username}

        def put(self, user_id):
            data = app.request.get_json()
            user = UserRepository.update_user(user_id, data.get('username'), data.get('password'))
            if user is None:
                return {"message": "User not found"}, 404
            return {"id": user.id, "username": user.username}

        def delete(self, user_id):
            user = UserRepository.delete_user(user_id)
            if user is None:
                return {"message": "User not found"}, 404
            return {"message": "User deleted successfully"}

    api.add_resource(UserResource, '/users')
    api.add_resource(SingleUserResource, '/users/<int:user_id>')

    return api
