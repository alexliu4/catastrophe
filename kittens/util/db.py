import sqlite3
DB = "data/accounts.db"
#DB = "/var/www/kittens/kittens/data/accounts.db"

def add_user(username, hashed_pass):
    '''adds users to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO users (username,password, win, total, picture)VALUES(?,?,0,0,0);"
    c.execute(command, (username, hashed_pass))
    db.commit()
    db.close()

def add_userFull(username, hashed_pass, question, hashed_ans, ):
    '''adds users to use table'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "INSERT INTO users (username,password, question, answer, win, total, picture)VALUES(?,?,?,?,0,0,0);"
    c.execute(command, (username, hashed_pass, question, hashed_ans))
    db.commit()
    db.close()

def update_pass(user, hashed_pass):
    '''resets users password'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    # command = "SELECT * FROM users;"
    # c.execute(command)
    # something = c.fetchall()
    # print(something)
    # print(user)
    # print(hashed_pass)
    command = "UPDATE users SET password ='" + hashed_pass + "'WHERE username ='" + user + "';"
    c.execute(command)
    # print("passwords updated")
    db.commit()
    db.close()

def qaDict():
    '''returns all the users and hashed answers in dict {user:answer}'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,answer from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users


def get_all_users():
    '''returns all the users and hashed passwords in dict {user:pass}'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,password from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users

def add_stat(user, win):
    '''adds stat to users account'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT win,total from users WHERE username ='" + user + "';"
    c.execute(command)
    games = c.fetchall()
    win = games[0] + 1
    total = games[1] + 1
    command = "UPDATE users SET win =" + win + ", total =" + total + "WHERE username ='" + user + "';"
    c.execute(command)
    # print("stats updated")
    db.commit()
    db.close()

def ranks():
    '''returns all the users and stats in dict { user:[win,total] }'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,win,total from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        list = [ str(item[1]), str(item[2])]
        users[item[0]] = list
    db.close()
    return users


def get_stat(user):
    '''returns the user and stats in a list'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT win,total from users " + "WHERE username ='" + user + "';"
    c.execute(command)
    info = c.fetchall()
    for item in info:
        user = [ str(item[0]), str(item[1])]
    db.close()
    return user

def pic():
    '''returns all the users and picture type in dict {user:pic}'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT username,picture from users;"
    c.execute(command)
    info = c.fetchall()
    users = {}
    for item in info:
        users[item[0]] = item[1]
    db.close()
    return users

def pic(user):
    '''returns picture type of a specific'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "SELECT picture from users WHERE username='" + user + "';"
    c.execute(command)
    pic = c.fetchall()
    db.close()
    return pic[0][0]

def update_pic(user, pic):
    '''resets users pic'''
    db = sqlite3.connect(DB)
    c = db.cursor()
    command = "UPDATE users SET picture ='" + pic + "' WHERE username ='" + user + "';"
    c.execute(command)
    db.commit()
    db.close()

# MAKE TABLES AND DATABASE IF THEY DONT EXIST
db = sqlite3.connect(DB)
c = db.cursor()
commands = []
commands += ["CREATE TABLE IF NOT EXISTS users(username TEXT, password TEXT, question TEXT, answer TEXT, win INT, total INT, picture INT)"]
# commands += ["CREATE TABLE IF NOT EXISTS pages(link TEXT, weather TEXT, comic TEXT)"]
for command in commands:
    c.execute(command)
