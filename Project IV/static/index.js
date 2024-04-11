function updateSensorData() {
    $.ajax({
        url: '/update_data',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#temperature').text(data.temperature.toFixed(1) + ' °C');
            $('#humidity').text(data.humidity.toFixed(1) + ' %');
            $('#moisture').text(data.moisture.toFixed(1) + ' %');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching sensor data:', error);
        }
    });
}

// Update sensor data every 5 seconds
setInterval(updateSensorData, 5000);

// Initial data update
updateSensorData();

// Define variables to keep track of the state of each control
let lightState = false;
let fanState = false;
let pumpState = false;

// Function to update the button text and state
function updateButtonState(button, state) {
    if (state) {
        button.textContent = 'Turn Off';
    } else {
        button.textContent = 'Turn On';
    }
}

// Function to handle the click event for light control
document.getElementById('lightControl').addEventListener('click', function() {
    lightState = !lightState;
    updateButtonState(this, lightState);
    // Add logic here to control the light based on lightState
});

// Function to handle the click event for fan control
document.getElementById('fanControl').addEventListener('click', function() {
    fanState = !fanState;
    updateButtonState(this, fanState);
    // Add logic here to control the fan based on fanState
});

// Function to handle the click event for pump control
document.getElementById('pumpControl').addEventListener('click', function() {
    pumpState = !pumpState;
    updateButtonState(this, pumpState);
    // Add logic here to control the pump based on pumpState
});