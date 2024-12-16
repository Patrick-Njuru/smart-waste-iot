// Import MQTT.js via CDN
const mqtt = require('mqtt'); // Only needed for Node.js backend, not required in the browser

// MQTT Configuration
const brokerURL = 'ws://broker.hivemq.com:8000/mqtt'; // MQTT broker
const topic = 'dustbin/level';
const client = mqtt.connect(brokerURL);

// Initialize dustbin level
let dustbinLevel = 0;

// MQTT connection and message handling
client.on('connect', () => {
    console.log('Connected to MQTT Broker');
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Failed to subscribe to topic:', err);
        }
    });
});

client.on('message', (receivedTopic, message) => {
    if (receivedTopic === topic) {
        const data = JSON.parse(message.toString());
        updateDustbinLevel(data.level);
    }
});

// Update dustbin level on the UI
function updateDustbinLevel(level) {
    const levelPercentage = Math.min(Math.max(level, 0), 100); // Ensure 0–100 range
    document.getElementById('dustbin-level').textContent = `${levelPercentage}%`;
    const levelBar = document.getElementById('level-bar');
    levelBar.style.width = `${levelPercentage}%`;

    // Change bar color based on level
    if (levelPercentage > 80) {
        levelBar.style.backgroundColor = '#FF5722'; // Red for full
        Swal.fire('Warning', 'The dustbin is almost full!', 'warning');
    } else if (levelPercentage > 50) {
        levelBar.style.backgroundColor = '#FFC107'; // Yellow for almost full
    } else {
        levelBar.style.backgroundColor = '#4CAF50'; // Green for normal
    }
}

// Simulate sending notification
async function sendNotification() {
    Swal.fire('Notification Set', 'You will be notified when the bin is full.', 'success');
}

// Simulate ordering bin emptying
async function orderBinEmptying() {
    Swal.fire('Order Placed', 'Your request for bin emptying has been submitted.', 'success');
}

// Simulate M-Pesa payment
async function makePayment() {
    Swal.fire('Payment', 'Redirecting to M-Pesa for payment...', 'info');
}
