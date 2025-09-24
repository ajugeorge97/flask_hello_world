from flask import Flask, render_template_string,render_template

import requests
import os

app = Flask(__name__)
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5001")


@app.route("/")
def index():

    return render_template('index.html',backend_url=BACKEND_URL)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)