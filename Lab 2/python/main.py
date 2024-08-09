from flask import Flask, render_template, request, redirect, session
import random
import string

app = Flask(__name__)
app.secret_key = "your_secret_key"

class Usuario:
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password
    
    def passwordValid(self, password):
        return self.password == password

class UserController:
    def __init__(self):
        self.userList = []
        self.generateUsers(5)
        self.newUsers()
    
    def generateUsers(self, cantidad):
        for i in range(cantidad):
            id = i + 1
            username = ''.join(random.choices(string.ascii_lowercase, k=8))
            password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))
            user = Usuario(id, username, password)
            self.userList.append(user)

    def newUsers(self):
            self.userList.append(Usuario(1, 'johnDoe', 'password123'))
            self.userList.append(Usuario(2, 'janeDoe', 'ilovejavascript'))
            self.userList.append(Usuario(3, 'admin', 'admin123'))
            self.userList.append(Usuario(4, 'user123', 'pass123'))
            self.userList.append(Usuario(5, 'testUser', 'testPassword'))
            self.userList.append(Usuario(6, 'ramiro', '123'))
        
    
    def getUsers(self):
        return self.userList
    
    def accessAllowed(self, username, password):
        for user in self.userList:
            if user.username == username and user.passwordValid(password):
                return True
        return False

controller = UserController()

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        if controller.accessAllowed(username, password):
            session["user"] = username
            return redirect("/dashboard")
        else:
            return render_template("login.html", error="Invalid username or password")
    return render_template("login.html")

@app.route("/dashboard")
def dashboard():
    if "user" in session:
        return render_template("dashboard.html", users=controller.getUsers())
    else:
        return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)