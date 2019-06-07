
from flask import Flask, render_template, session, request, url_for, redirect, flash
from passlib.hash import md5_crypt
from util import db
import os


app = Flask(__name__)
app.secret_key = os.urandom(32)

@app.route("/")
def home():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template("login.html")

@app.route('/login')
def login():
    if 'user' in session:
        print("HELLOLOS")
        return redirect(url_for('game'))
    return render_template('login.html')

@app.route('/auth', methods = ["POST"])
def auth():
    if 'user' in session:
        return redirect(url_for('game'))
    '''Intermediate to authenticate login by user'''
    # # # Authenticate
    username_input = request.form.get("username")
    password_input = request.form.get("password")
    all_usernames = db.get_all_users()
    if username_input in all_usernames:
        # If the hashes match
        if md5_crypt.verify(password_input, all_usernames[username_input]):
            # Log them in
            session['user'] = username_input
            return redirect(url_for("game"))
        # Failed password and username match
        else:
            flash("Invalid password")
    else:
        # Username doesnt exist
        flash("Invalid username")
    return redirect(url_for("login"))

@app.route('/register', methods = ["GET", "POST"])
def register():
    if 'user' in session:
        return redirect(url_for('home'))
    '''Adding users to the database'''
    if request.form.get("reg_username") != None:
        r_username = request.form.get("reg_username")
        r_password = request.form.get("reg_password")
        check_pass = request.form.get("check_password")
        r_question = request.form.get("reg_question")
        r_answer = request.form.get("reg_answer")
        if r_username in db.get_all_users():
            flash("Username taken")
        elif r_password != check_pass:
            flash("Passwords do not match!")
        elif r_password.count(' ') != 0:
            flash("Password can not contain spaces")
        elif not r_username.isalnum():
            flash("Username should be alphanumeric")
        else:
            if request.form.get("reg_question") != None:
                session['user'] = r_username
                db.add_userFull(r_username, md5_crypt.encrypt(r_password), r_question, md5_crypt.encrypt(r_answer))
                return redirect(url_for("how"))
            else:
                session['user'] = r_username
                db.add_user(r_username, md5_crypt.encrypt(r_password))
                return redirect(url_for("home"))
    return render_template('register.html')

@app.route('/reset', methods = ["GET", "POST"])
def reset():
    if 'user' in session:
        return redirect(url_for('home'))
    '''To reset userpassword'''
    if request.form.get("reg_username") != None:
        r_username = request.form.get("reg_username")
        r_answer = request.form.get("reg_answer")
        r_password = request.form.get("reg_password")
        check_pass = request.form.get("check_password")
        all_usernames = db.qaDict() #Returns dict {user:answer_to_question}
        if r_username not in db.get_all_users():
            flash("Username not found")
        elif r_password != check_pass:
            flash("Passwords do not match!")
        elif r_password.count(' ') != 0:
            flash("Password can not contain spaces")
        elif not r_username.isalnum():
            flash("Username should be alphanumeric")
        else:
            session['user'] = r_username
            # checks the question and answer in the db
            if r_username in all_usernames:
                # if the hashes match
                if md5_crypt.verify(r_answer, all_usernames[r_username]):
                    # changes the user password
                    db.update_pass(r_username, md5_crypt.encrypt(r_password))
                    return redirect(url_for('home'))
                else:
                    flash("Error occurred")
    return render_template('reset.html')

@app.route('/leader', methods = ['GET'])
def leader():
    # if 'user' not in session:
    #     return redirect(url_for('login'))
    return render_template("leader.html", rankPercent = rankByPercent(), rankWin =rankByWins())

@app.route('/account', methods = ['GET'])
def account():
    tot = db.get_stat(session['user'])
    pic = picWhich(db.pic(session['user']))
    # print(db.pic(session['user']));
    # print(pic)
    if 'user' not in session:
        return redirect(url_for('login'))
    elif int(tot[1]) == 0:
        return redirect(url_for('error'))
    else:
        return render_template("account.html", user = calc(), photo = pic, rankP = userRanksP(session['user']) , rankW = userRanksW(session['user']) )

@app.route('/error', methods = ['GET'])
def error():
    return render_template("error.html")

# helper functions for leader and account
# calcuting values (loss and percentage) returns in a list
def calc():
    if 'user' in session:
        # print (session['user'])
        user = db.get_stat(session['user'])
        # print (user)
        user.append(int(user[1]) - int(user[0]))
        user.append(round (float(user[0]) / float(user[1]) * 100) )
    return user

# gets all users and their ranks and puts them in an ordered list
def ranker():
    ranked = [session['user']]
    if 'user' in session:
        # print (session['user'])
        users = db.ranks()
        for user in users:
            for i in range (0, len(ranked)):
                if int(users[user]) > int(ranked[i]):
                    ranked.insert(i, user)
                if i == (len(ranked)):
                    ranked.append(user)
    return ranked

# specific place of the user
def place():
    ans = 0
    ranked = ranker()
    print (len(ranked))
    for i in range (len(ranked)):
        print (ranked[i])
        if ranked[i] == session['user']:
            ans = i + 1
    return ans

def rankByPercent():
    fullStat = db.ranks()
    for person in fullStat:
        if (int(fullStat.get(person)[1])):
            percentage = (int((float(fullStat.get(person)[0]) / float(fullStat.get(person)[1])) * 100 ))
            fullStat[person] = percentage
    rank = (list(reversed(sorted(fullStat.items(), key = lambda kv:(kv[1], kv[0])))))
    return rank

def rankByWins():
    fullStat = db.ranks()
    # for person in fullStat:
    #     if (int(fullStat.get(person)[1])):
    #         percentage = (int((float(fullStat.get(person)[0]) / float(fullStat.get(person)[1])) * 100 ))
    #         fullStat[person] = percentage
    rank = (list(reversed(sorted(fullStat.items(), key = lambda kv:(kv[1], kv[0])))))
    return rank

def userRanksP(user):
    dict = rankByPercent()
    num = 1
    for entry in dict:
        if user == entry[0]:
            print ("found user" )
            return (num)
        num += 1
    return "none found"

def userRanksW(user):
    list = rankByWins()
    num = 1
    for entry in list:
        if user == entry[0]:
            return (num)
        num += 1
    return "none found"


# [('michelle', 50), ('michelle2', 33), ('michelle3', 20), ('maggie', 20), ('alex', 4)]

@app.route('/logout', methods = ['GET'])
def logout():
    if 'user' in session:
        session.pop('user')
    return redirect(url_for('home'))

@app.route('/game', methods = ['GET'])
def game():
    if 'user' not in session:
        return redirect(url_for('login'))
    return render_template("game.html")

@app.route('/how', methods = ['GET'])
def how():
    return render_template("how.html")

@app.route('/photo', methods = ['GET'])
def photo():
    return render_template("photo.html")

# helper functions to change photos
def picWhich(type):
    if (type == 0):
        return "./../static/images/profile.jpg"
    elif (type == 1):
        return "./../static/images/profile2.jpg"
    elif (type == 2):
        return "./../static/images/profile3.jpg"
    elif (type == 3):
        return "./../static/images/garfield.jpg"
    elif (type == 4):
        return "./../static/images/jediocto.jpg"
    elif (type == 5):
        return "./../static/images/nerdocto.png"
    elif (type == 6):
        return "./../static/images/profile4.gif"
    else:
        return "./../static/images/profile.jpg"


@app.route('/change', methods = ['GET'])
def change():
    if 'user' in session:
        # if pokemon_list:
        #    return redirect(url_for('home'))
        if 'profile' in request.args:
            name = request.args['profile'] # finds the option chosen
            image = picWhich(name) # converts numbeer option into string (path of image)
            # print(name)
            db.update_pic(session['user'], name) # updates the db photo calue
            # return to account now
            tot = db.get_stat(session['user'])
            pic = picWhich(db.pic(session['user']))
            return render_template("account.html", user = calc(), photo = pic, rankP = userRanksP(session['user']) , rankW = userRanksW(session['user']) )
    return redirect(url_for('home'))


if __name__ == "__main__":
    app.debug = True
    app.run()
