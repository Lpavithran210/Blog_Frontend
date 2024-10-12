import { Fragment, useEffect, useId, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiCall } from "../utils/axios";
import { login } from "../features/user";
import { Alert, Box, Button, Grow, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import MailIcon from '@mui/icons-material/Mail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';

const Signup = () => {
    const id = useId();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({})

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        
        setSnackbar({open: false, type: '', message: ''});
        
        if (!email || !password || !username) {
            return setSnackbar({ open: true, type: 'error', message: 'Please enter all the mandatory fields!' })
        }
        if (!emailRegex.test(email)) {
            return setSnackbar({ open: true, type: 'error', message: 'Invalid email format' })
        }
        if (!passwordRegex.test(password)) {
            return setSnackbar({ open: true, type: 'error', message: 'Password must contain 8 chars and must contain 1 number, 1 special character, 1 uppercase and 1 lowercase letter' })
        }
        try {
            const resultAction = await apiCall('post', '/user/signup', { username, email, password })
            if (resultAction.data.accessToken) {
                dispatch(login(resultAction.data))
                localStorage.setItem("userInfo", JSON.stringify(resultAction.data))
                localStorage.setItem('token', resultAction.data.accessToken)
                localStorage.setItem('loggedIn', true)
                navigate('/');
            }
        }
        catch (e) {
            console.log('Signup Error', e)
            return setSnackbar({ open: true, type: 'error', message: e.response.data.message })
        }
    }
    return (
        <Fragment>
            <Box sx={{ height: '100%', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
                    <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>Join Us Today</Typography>
                    <TextField
                        size="small"
                        fullWidth
                        label="Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                    <TextField
                        label="Email"
                        size="small"
                        fullWidth
                        sx={{ my: 2 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }
                        }}
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                        size="small"
                        sx={{ mb: 1 }}
                        fullWidth
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="contained" sx={{ backgroundColor: '#122620', margin: '20px 0', textTransform: 'capitalize' }} onClick={handleSubmit}>Sign Up</Button>
                    <Typography variant="body2">Already a member? <Link to='/signin'>Sign in here</Link></Typography>
                </Box>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={snackbar.open}
                autoHideDuration={2000}
                TransitionComponent={Grow}
                onClose={() => setSnackbar({ open: false, type: '', message: '' })}
            >
                <Alert onClose={() => setSnackbar({ open: false, type: '', message: '' })} severity={snackbar.type} sx={{ maxWidth: '500px', textAlign: 'left' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}

export default Signup