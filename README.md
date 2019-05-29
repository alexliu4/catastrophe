# catastrophe
## Roster: Alex Liu(project manager), Karen Li, Michelle Tang, Maggie Zhao

---

## What is the Exploding Kittens?

_Exploding Kittens_ is a gaming website for players to go against each other or a computer in a simple game of chance and tactics.

## How do I run this on my machine?

When you are ready, go to your terminal and change your directory to where your would like to clone the repo, then run the below command:

```bash
git clone https://github.com/PGreatness/import-Greatness.git
```

This will make a HTTPS clone of the repo. Another option is to download the ZIP folder after clicking `Clone or download` on GitHub, then extracting it to your desired location.
_This project requires the dependencies listed on the [Dependencies](../master/README.md/#dependencies) section in order to run. Please have them downloaded before continuing._

In order to make use of _The Daily Bugle_, you will need the API keys for the APIs that require one. So far, you will need **2** API keys.
For these, the links to get the API keys are listed below:

- [DarkSky API](https://darksky.net/dev)
- [New York Times](https://developer.nytimes.com/)

Before we delve into the explanation, it is imperative that you are in the correct build. Open a terminal and run the following command to go to the distribution build.

```bash
cd path/to/repo/The/ Daily/ Bugle/distr/
```

This build has a `keys.json` file located in `data/API_Keys`. Open a terminal in the `data/API_Keys` folder and run these commands to replace the placeholders with your API Keys. Remember to activate your `virtual environment` to aviod any collatoral damage.

```bash
source path/to/virtual/environment/Scripts/activate #for Windows
. path/to/virtual/environment/bin/activate #for Linux/OS

nano keys.json
```

From there, enter your API keys by overwriting the placeholder, `Your_DarkSky_API_Key` overwritten by your DarkSky API key and `Your_NYTimes_API_Key` overwritten by your New York Times API Key. **The quotation marks("") are required and must not be deleted.**

If you do not have either of the keys, look at the subsection below to on how to get the keys.

### **For DarkSky API**

[Click here to go to the DarkSky API](https://darksky.net/dev)

Click on `Sign Up`, and register for an account. After this, you should be given an API key. Copy this key into your clipboard and go to the terminal.

Run the following command to open the JSON file.

```bash
nano keys.json
```

With the JSON file open, replace `Your_DarkSky_API_Key` with your DarkSky API key.

```bash
{
    "Weather" : "Your_DarkSky_API_Key"
}
```

### **For New York Times API**

[Click here to go the New York Times API](https://developer.nytimes.com/)

Click on `Get API Key` in the top right corner. Fill out the required information and, where it asks for the API, select `Top Stories`. **_This is a very important part since The Daily Bugle will not work without the correct API selected._**

Afterwards, click on `Create API Key`. Your API key should appear in your email shortly. Copy the API and go back to the terminal to execute this command.

```bash
nano keys.json
```

Your JSON file should look like this at this point:

```bash
{
    "Weather" : "Your_DarkSky_API_Key"
}
```

Replace `Your_NYTimes_API_Key` with your New York Times API key. **Remember that the quotation marks("") are required and should not be deleted.**

```bash
{
    "Weather" : "Your_DarkSky_API_Key",
    "News" : "Your_NYTimes_API_Key"
}
```

_It is important to note that the order in which the `Weather` and `News` appear is irrelevant._

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

---

## Dependencies

Although not one of the biggest projects, _catastrophe_ still uses quite a few modules. For a more exhaustive list, along with tested versions, see the [Requirements](../master/requirements.txt) plaintext file.

### **Recursive Download**

If you wish to download all of the modules listed below, you can do so easily. First, make sure that you have `Python`. Run the following in your terminal:

```bash
python --version
```

This should return the current version of Python installed on your computer. Please note that you will need **Python 3.0.0** or greater to run this project.

If you do not have Python, you can download the latest version [here](https://www.python.org/downloads/), which should come with `pip` installed.

To recursively download the required modules, run the following commands:

```bash
cd path/to/cloned/repo
pip install -r < requirements.txt
```

This will change the current working directory to the cloned repo directory, then recursively install all the dependencies listed in the [requirements.txt](../master/requirements.txt) file located in the root of the repo directory. _Note: This assumes that you do not have a virtual environment to work in. If you do, please do activate it or create a new environment in order to keep your current versions._

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

- Datetime

`Datetime` is a Python library used to get the current date and time. This is used to set limits on refreshes to avoid rate limits being exceeded. It can be installed with the following command:

```bash
pip install datetime
```
