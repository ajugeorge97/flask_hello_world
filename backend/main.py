from flask import Flask, jsonify, request,send_file,send_from_directory
import pandas as pd
from flask_cors import CORS
import os

DATA_LOCATION = os.path.join(os.path.dirname(os.path.abspath(__file__)),"uploaded_data")
if not os.path.exists(DATA_LOCATION):
    os.makedirs(DATA_LOCATION)



app = Flask(__name__)
CORS(app)

@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Backend API!"})



@app.route("/uploads/<filename>")
def serve_image(filename):
    return send_from_directory(DATA_LOCATION, filename)

@app.route("/api/images",methods=["GET"])
def get_list_images():
    return jsonify({"images": os.listdir(DATA_LOCATION)})


@app.route("/api/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["image"]
    
    if request.values['filename']== "":
        return jsonify({"error": "No selected file"}), 400
    filename = request.values['filename'] +".png"
    filepath = os.path.join(DATA_LOCATION, filename)
    file.save(filepath)
    
    return jsonify({"message": "File uploaded successfully", "filename": filename})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)