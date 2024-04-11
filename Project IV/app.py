from flask import Flask, render_template
import random
import paho.mqtt.client as mqtt

app = Flask(__name__)

# MQTT settings
mqtt_broker = "mqtt.example.com"  # Replace with your MQTT broker address
mqtt_topic = "sensors/data"  # Replace with your MQTT topic

# Dummy data for sensors
sensor_data = {
    'temperature': 25.0,
    'humidity': 60.0,
    'moisture': 40.0
}

# MQTT on_connect callback
def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code "+str(rc))
    client.subscribe(mqtt_topic)

# MQTT on_message callback
def on_message(client, userdata, msg):
    global sensor_data
    topic = msg.topic
    payload = msg.payload.decode("utf-8")
    print("Received message on topic {}: {}".format(topic, payload))
    # Update sensor_data based on received MQTT message
    # Example: if topic is "sensors/temperature", update temperature value in sensor_data
    # sensor_data['temperature'] = float(payload)

# MQTT client setup
mqtt_client = mqtt.Client()
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message
mqtt_client.connect(mqtt_broker, 1883, 60)

# Flask route to serve the dashboard
@app.route('/')
def dashboard():
    return render_template('dashboard.html', data=sensor_data)

# MQTT client loop to receive messages
mqtt_client.loop_start()

if __name__ == '__main__':
    app.run(debug=True)
    
    

