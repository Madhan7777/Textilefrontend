import React, { useState } from 'react';
import { Button, TextField, Typography, Snackbar, Alert } from '@mui/material';
import CustomerHeader from './CustomerHeader';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.subject) errors.subject = 'Subject is required';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Simulate form submission
      setSnackbarMessage('Message sent successfully!');
      setSnackbarOpen(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="min-h-screen">
      <CustomerHeader/>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <Typography variant="h4" className="text-center mb-6">Contact Us</Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
          </div>
          <div>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
          </div>
          <div>
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              error={Boolean(formErrors.subject)}
              helperText={formErrors.subject}
            />
          </div>
          <div>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              error={Boolean(formErrors.message)}
              helperText={formErrors.message}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" variant="contained" color="primary">Send Message</Button>
          </div>
        </form>
      </div>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
    </div>
  );
};

export default ContactUs;
