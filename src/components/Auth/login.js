import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Login = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            setOpenSnackbar(true);
        } else {
            console.log('Logging in with:', { email, password });
            setEmail('');
            setPassword('');
            handleClose(); // Close the dialog on successful login
        }
    };

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Apna School</DialogTitle>
            <DialogContent>
                <Container maxWidth="xs">
                    <Box my={2}>
                        <Typography variant="h5" component="h2" textAlign="center" gutterBottom>
                            Login
                        </Typography>

                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Login
                            </Button>
                        </form>

                        <Snackbar
                            open={openSnackbar}
                            autoHideDuration={3000}
                            onClose={handleSnackbarClose}
                            message={errorMessage}
                        />
                    </Box>
                </Container>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
