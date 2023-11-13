from flask import Flask, render_template, jsonify
import time

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status', methods=['POST'])
def get_status():
    uptime = time.time()
    return jsonify({'status': 'success', 'uptime': uptime})

@app.route('/api/info', methods=['POST'])
def get_info():
    # Arbitrary metadata associated with the mock server
    metadata = {'version': '1.0', 'location': 'Greenhouse'}
    return jsonify({'status': 'success', 'metadata': metadata})

@app.route('/api/halt', methods=['POST'])
def halt_server():
    # Execute safe shutdown sequence (placeholder logic)
    shutdown_sequence()
    return jsonify({'status': 'success', 'message': 'Server is shutting down'})

def shutdown_sequence():
    # Placeholder for shutdown logic
    print("Shutting down...")

if __name__ == '__main__':
    app.run(debug=True)

