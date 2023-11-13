Robotic Harvester Control Interface
Overview
This project simulates the interaction with a prototype robotic harvester through a web-based control interface. The system consists of a mock server (emulating the robot's server) developed using Python with Flask and a user-friendly front-end created using HTML, CSS, and JavaScript.

Features
Mock Robot Server:

Developed in Python using Flask framework.
API endpoint for processing HTTP POST requests.
Commands:
/status: Returns mock server's uptime.
/info: Provides arbitrary metadata.
/halt: Executes a safe shutdown sequence.
Operator’s Interface:

Simple and user-friendly front-end.
Functional buttons to dispatch commands to the server.
Asynchronous request handling using the Fetch API.
Setup
Server Side (Mock Robot Server)
Install dependencies:
pip install flask
Run the server:
python app.py
The server will be accessible at http://localhost:5000.

Client Side (Operator’s Interface)

Open the `templates/index.html` file in a web browser or deploy the `templates` directory to a web server.

Interact with the buttons to send commands to the mock server.

Additional Notes
Make sure Python is installed on your system.
