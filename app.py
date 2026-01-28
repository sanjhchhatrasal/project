from flask import Flask, jsonify
import random
import logging
from pythonjsonlogger import jsonlogger

app = Flask(__name__)
logHandler = logging.FileHandler("/tmp/flask-app.log")
formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(message)s')
logHandler.setFormatter(formatter)
app.logger.addHandler(logHandler)
app.logger.setLevel(logging.INFO)


@app.route('/')
def random_status():
    # Generate a random status code
    status_codes = [200, 201, 202, 400, 401, 403, 404, 500, 502, 503]
    status = random.choice(status_codes)
    
    # Log the status code
    app.logger.info("Returning status code", extra={"status_code": status})
    
    return jsonify({"status": status}), status

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
