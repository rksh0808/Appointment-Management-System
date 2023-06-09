const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://appointment-booking-syst-d5f96-default-rtdb.firebaseio.com'
});

app.use(express.json());

// User Registration and Login Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Appointment Routes
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
