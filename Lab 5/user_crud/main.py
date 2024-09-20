from flask import Flask, request, jsonify
from user import db, User
from user_controller import create_api

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

api = create_api(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.authenticate(username, password)
    if user:
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "username": user.username
            }
        }), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test successful"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)