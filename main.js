// main.js
document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert('An error occurred during registration');
    }
  });
  
  document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const token = data.token;
      // Store the token in local storage or cookies for future API requests
      alert('Login successful');
    } catch (error) {
      console.error(error);
      alert('An error occurred during login');
    }
  });
  
  document.getElementById('create-appointment').addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const user = document.getElementById('appointment-user').value;
    const status = document.getElementById('appointment-status').value;
    const token = ''; // Get the token from local storage or cookies
  
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ date, time, user, status }),
      });
      const data = await response.json();
      const appointmentId = data.id;
      alert(`Appointment created successfully with ID: ${appointmentId}`);
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the appointment');
    }
  });
  
  // Fetch and display all appointments
  async function fetchAppointments() {
    const token = ''; // Get the token from local storage or cookies
  
    try {
      const response = await fetch('/api/appointments', {
        headers: {
          Authorization: token,
        },
      });
      const data = await response.json();
      const appointments = data.appointments;
      const appointmentsList = document.getElementById('appointments-list');
      appointmentsList.innerHTML = '';
  
      for (const appointmentId in appointments) {
        const appointment = appointments[appointmentId];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <span>Date: ${appointment.date}</span>
          <span>Time: ${appointment.time}</span>
          <span>User: ${appointment.user}</span>
          <span>Status: ${appointment.status}</span>
        `;
        appointmentsList.appendChild(listItem);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching appointments');
    }
  }
  
  fetchAppointments();
  