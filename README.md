# catastrophe
## Roster: Alex Liu(project manager), Karen Li, Michelle Tang, Maggie Zhao

---

## What is the Exploding Kittens?

_Exploding Kittens_ is a gaming website for players to go against each other or a computer in a simple game of chance and tactics. The rules can be seen on the how to page of our site!

The official site for the game can be found [here](https://explodingkittens.com/).
You can visit our live site for our game [here](http://142.93.206.119).

## Video
A demo of our game _Exploding Kittens_ is available [here](https://www.youtube.com/watch?v=nXIXDYl5bws).

---

## Launch instructions

### How do I run this game online? (run on Apache2)

To host our game on your own droplet, you must first create a Digital Ocean account.
Then, create DigitalOcean droplet running ubuntu v18.04 x64.



But if you want to run our program locally you can continue to the steps below.

### How do I run this on my machine? (localhost)

When you are ready, go to your terminal and change your directory to where your would like to clone the repo, then run the below command:

```bash
git clone https://github.com/alexliu4/catastrophe.git
```

This will make a HTTPS clone of the repo. Another option is to download the ZIP folder after clicking `Clone or download` on GitHub, then extracting it to your desired location.
_This project requires the dependencies listed on the [Dependencies](../master/README.md/#dependencies) section in order to run. Please have them downloaded before continuing._

Now your program is ready to go! On your terminal, run the following commands:

```bash
cd path/to/project/dir/catastrophe/kittens
python app.py
```

This should cause the following to appear:

```bash
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Now go to your favorite browser and paste this into the URL:

```bash
http://127.0.0.1:500/
```

This will take you to the `localhost` where your can the project working in all of its glory!

In order to terminate the program, press <kbd> CTRL </kbd> + <kbd> C </kbd>. (This will close the server instance.)

To close your virtual environment, run the command `$ deactivate`.

---

## Dependencies

Although not one of the biggest projects, _catastrophe_ still uses quite a few modules. For a more exhaustive list, along with tested versions, see the [Requirements](../master/requirements.txt) plaintext file.

### **Download**

If you wish to download all of the modules listed below, you can do so easily. First, make sure that you have `Python`. Run the following in your terminal:

```bash
python --version
```

This should return the current version of Python installed on your computer. Please note that you will need **Python 3.0.0** or greater to run this project.

If you do not have Python, you can download the latest version [here](https://www.python.org/downloads/), which should come with `pip` installed.

To download the required modules, run the following commands:

```bash
cd path/to/cloned/repo
pip install -r < requirements.txt
```

This will change the current working directory to the cloned repo directory, then recursively install all the dependencies listed in the [requirements.txt](../master/requirements.txt) file located in the root of the repo directory. _Note: This assumes that you do not have a virtual environment to work in. If you do, please do activate it or create a new environment in order to keep your current versions._

More information about the packages are available on the bottom of the page along with instructions to download them individually.

---

### Final Steps

```
Open a web browser and navigate to the link http://127.0.0.1:5000/.

Then register if you are a new user or login if you are an existing user to play our game and have us save your stats.
Most importantly have fun on our site!
```

---

### Packages Required

- urllib

`urllib` has been used to get the JSON files from each of the APIs. It is used extensively and is an important part of the project. It is a standard library from Python and require no further action.

- pip

`pip` has been used to install all the extra modules like `flask` and `virtualenv`. Python (versions 2 to 2.7.9 or 3 and beyond) come with pip installed automatically.

- venv

`venv` is used to avoid collateral damage from running the program. In essence, it provides a buffer that protects your current computer state by on a seperate, isolated environment. If you are using Python 3.0.0 or higher, skip to the next step as `virtualenv` comes pre-installed. If you are using any Python distribution prior to 3.0.0, run the following in your terminal to create a virtual environment, replacing Name_Of_Environment with your desired name of the environment:

```bash
pip install virtualenv
virtualenv Name_Of_Environment
```

For Python3 or higher, run the following in your terminal, replacing Name_Of_Environment with your desired name of the environment:

```bash
python -m venv Name_Of_Environment
```

You can then activate the virtual environment by running the following in your terminal, again replacing Name_Of_Environment with your virtual environment name:

**For Linux/OS:**

```bash
. Name_Of_Environment/bin/activate
```

**For Windows:**

```bash
source Name_Of_Environment\Scripts\activate
```

- Python3

`Python3` is required to run this project. It is written in Python. If you do not have Python, you can [download it here.](https://www.python.org/downloads/) It is recommended to get the latest version (at the time of writing, it is 3.7.1).

- os

`os` is a simple library that is used to generate session keys for unique users. It is a standard library from Python and requires no further action.

- json

The `json` library is used to parse through the JSON files returned by the API calls. It is a standard library from Python and requires no further action.

- flask

`flask` is the library that runs the app and allows it to be hosted on `localhost`. It is required for the project to work correctly. In order to install flask,
run the following command:

```bash
pip install flask
```

- wheel

`wheel` is an important part of the app and goes hand in hand with `flask`. To install wheel, run the following command:

```bash
pip install wheel
```

- Jinja2

`jinja2` is used to set up templates for the multiple HTML files. It is required by `flask`. To install Jinja2, run the following command:

```bash
pip install jinja2
```

- passlib

`passlib` provides the password hashing and encrpyting services required to store passwords. It can be installed using the command below:

```bash
pip install passlib
```
