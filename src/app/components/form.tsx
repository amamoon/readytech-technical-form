'use client'
import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Divider, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Alert, CircularProgress } from '../../../node_modules/@mui/material/index';

export default function Form() {
    const initialState = {
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        age: '',
        isStudying: '',
        studyDetails: '',
        extraInfo: '',
    }
    const [formData, setFormData] = useState(initialState);

    const [errors, setErrors] = useState({
        emailError: '',
        ageError: '',
        firstNameError: '',
        middleNameError: '',
        lastNameError: '',
    });

    const [loading, setLoading] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState({ type: '', text: '' });

    // Simulate form submission
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault(); // Prevent form from actually submitting
        setLoading(true);

        // Simulate an async operation like an API call
        setTimeout(() => {
            console.log('Form data:', formData);
            // Handle form validation and submission here
            setLoading(false);
            setSubmissionMessage({ type: 'success', text: 'Form submitted successfully!' });
        }, 2000); // Simulate a 2 second delay
        setFormData(initialState);
    };

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    const handleChange = (field: string) => (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [`${field}Error`]: '' }));
        if (field === 'email') {
            setErrors((prev) => ({ ...prev, emailError: validateEmail(value) ? '' : 'Please enter a valid email.' }));
        }
        if (field === 'age') {
        const ageNum = parseInt(value, 10);
            setErrors((prev) => ({ ...prev, ageError: ageNum >= 18 && ageNum <= 100 ? '' : 'Age must be between 18 and 100.' }));
        }
        if (['firstName', 'lastName', 'middleName'].includes(field) && value.length > 50) {
            setErrors((prev) => ({ ...prev, [`${field}Error`]: 'Name must be less than 50 characters.' }));
        }
    };

    const boxStyle = {
        width: '50%', // The form will take 50% of the viewport width
        maxWidth: '500px', // Maximum width of the form for large screens
        display: 'flex',
        flexDirection: 'column',
        gap: 1, // Spacing between form elements
        border: 1,
        borderColor: 'divider',
        borderRadius: '4px',
        bgcolor: 'background.paper',
        boxShadow: 1,
        my: 2,
        '& > *': {
            marginBottom: 1, // Adds space between form elements
        },
        p:2
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: 'auto',
    };
    

    return (
        <Box component="form" sx={formStyle} onSubmit={handleSubmit}>
            <Box sx={boxStyle} >
                <Typography variant="h4" component="h1" gutterBottom>
                    Form title
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Form description
                </Typography>
            </Box>

            <Box sx={boxStyle}>
                <Typography variant="subtitle1" gutterBottom>
                    Personal Details
                </Typography>
                <TextField fullWidth label="First name" required inputProps={{ maxLength: 50 }} error={!!errors.firstNameError} helperText={errors.firstNameError} value={formData.firstName} onChange={handleChange('firstName')} />
                <TextField fullWidth label="Middle name" helperText={'Optional'} margin="normal" inputProps={{ maxLength: 50 }} error={!!errors.middleNameError} value={formData.middleName} onChange={handleChange('middleName')} />
                <TextField fullWidth label="Last name" margin="normal" required inputProps={{ maxLength: 50 }} error={!!errors.lastNameError} helperText={errors.lastNameError} value={formData.lastName} onChange={handleChange('lastName')} />
                <Divider />
                <TextField fullWidth label="Email" margin="normal" required type="email" error={!!errors.emailError} helperText={errors.emailError} value={formData.email} onChange={handleChange('email')} />
                <TextField fullWidth label="Age" margin="normal" required type="number" inputProps={{ min: 18, max: 100 }} error={!!errors.ageError} helperText={errors.ageError} value={formData.age} onChange={handleChange('age')} />
            </Box>

            <Box sx={boxStyle}>
                <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Are you currently studying?</FormLabel>
                <RadioGroup row name="studying" value={formData.isStudying} onChange={handleChange('isStudying')}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                </FormControl>
                {formData.isStudying === 'yes' && (
                    <>
                        <Typography variant="h5" component="h3">
                            Study Details
                        </Typography>
                        <TextField fullWidth label="Study details" margin="normal" multiline rows={4} value={formData.studyDetails} onChange={handleChange('studyDetails')} />
                    </>
                )}
            </Box>

            <Box sx={boxStyle}>
                <Typography variant="h5" component="h3">
                    Extra Information
                </Typography>
                <TextField fullWidth label="Extra information" margin="normal" multiline rows={4} value={formData.extraInfo} onChange={handleChange('extraInfo')} />
            </Box>

            <Box sx={boxStyle}>
                <Typography variant="h5" component="h3">
                    Complete Form
                </Typography>
                <Box sx={{
                    display: 'flex', // Use flexbox to lay out children inline
                    alignItems: 'center', // Align items vertically
                    justifyContent: 'flex-start', // Align items to the start of the container
                    gap: 2, // Creates space between items (using the theme's spacing scale)
                }}>
                    <Button variant="outlined" color="error" onClick={() => setFormData(initialState)} sx={{width: "100%"}}>Cancel</Button>
                    <Button type="submit" variant="outlined" color="success" onClick={() => console.log('Submit')} sx={{width: "100%"}}>
                        {loading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                </Box>
            </Box>
            {loading && (
                <Alert variant="filled" severity="success" sx={{ mt: 2, width: '100%' }}>
                    {submissionMessage.text}
                </Alert>
            )}
        </Box>
    );
}
