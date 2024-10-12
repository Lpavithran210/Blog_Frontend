import { Box, Button, InputAdornment, TextField, Grid, Typography, Snackbar, Alert, Grow } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import { useEffect, useState } from "react";
import { apiCall } from './../utils/axios';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('')
    const [fbUrl, setFbUrl] = useState('')
    const [instaUrl, setInstaUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [youtubeUrl, setYoutubeUrl] = useState('')
    const [snackbar, setSnackbar] = useState({})

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const fetchUser = async () => {
        try {
            const res = await apiCall("get", `/user/${userInfo.name}`)
            const userData = res.data;
            setName(userData?.personal_info?.name)
            setEmail(userData?.personal_info?.email)
            setUserName(userData?.personal_info?.user_name)
            setBio(userData?.personal_info?.bio)
            setInstaUrl(userData?.social_links?.instagram)
            setFbUrl(userData?.social_links?.facebook)
            setYoutubeUrl(userData?.social_links?.youtube)
            setTwitterUrl(userData?.social_links?.twitter)
        } catch (e) {
            console.log("error", e)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const urlRegex = /^https:\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/;

        setSnackbar({open: false, type: '', message: ''});

        if (name.trim().length === 0) {
            return setSnackbar({open: true, type: 'error', message: 'Profile name is required'});
        }
        if (email.trim().length === 0) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a email'});
        }
        if (userName.trim().length === 0) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a username'});
        }
        if (!emailRegex.test(email)) {
            return setSnackbar({open: true, type: 'error', message: 'Invalid email'});
        }
        if (youtubeUrl.length > 0 && !urlRegex.test(youtubeUrl)) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a valid url'});
        }
        if (instaUrl.length > 0 && !urlRegex.test(instaUrl)) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a valid url'});
        }
        if (fbUrl.length > 0 && !urlRegex.test(fbUrl)) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a valid url'});
        }
        if (twitterUrl.length > 0 && !urlRegex.test(twitterUrl)) {
            return setSnackbar({open: true, type: 'error', message: 'Please enter a valid url'});
        }
        const data = {
            userId: userInfo.userId,
            name,
            email,
            bio,
            userName,
            fbUrl,
            instaUrl,
            twitterUrl,
            youtubeUrl
        }
        try {
            await apiCall('patch', '/user/update-profile', data)
            const updatedUserInfo = {
                    ...userInfo,
                    name,
                    email,
                    user_name: userName,
                    bio,
                    instagram: instaUrl,
                    facebook: fbUrl,
                    youtube: youtubeUrl,
                    twitter: twitterUrl
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setSnackbar({open: true, type: 'success', message: 'Updated successfully'})
            fetchUser()
        } catch (e) {
            setSnackbar({open: true, type: 'error', message: 'Something went wrong!'})
            console.log('Error', e)
        }
    }

    const handleBio = (e) => {
        const bioText = e.target.value;
        if (bioText.length <= 100) {
            setBio(bioText);
        }
    };

    return <>
        <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>Edit Profile</Typography>
        <Grid container spacing={3} sx={{ py: 1 }}>
            <Grid item xs={12} md={6}>
                <TextField size="small" label='Name' value={name} onChange={(e) => setName(e.target.value)} fullWidth slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField size="small" label='Email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
            <Grid item xs={12}>
                <TextField size="small" value={userName} onChange={(e) => setUserName(e.target.value)} fullWidth label="Username" slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <AlternateEmailIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
                <Typography variant="caption">Username will be visible to all users</Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField value={bio} onChange={(e) => handleBio(e)} multiline rows={4} size="small" fullWidth label="Bio" />
                <Typography sx={{ display: 'block', mt: 1, textAlign: "right" }} variant="caption">{100 - (bio ? bio.length : 0)} {100 - (bio ? bio.length : 0) === 1 ? 'character' : 'characters'} left</Typography>
            </Grid>
            <Grid item xs={12}><Typography variant="caption">Add Your Social Handles below</Typography></Grid>
            <Grid item xs={12} md={6}>
                <TextField value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} size="small" fullWidth label="Youtube" slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <YouTubeIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField value={instaUrl} onChange={(e) => setInstaUrl(e.target.value)} size="small" fullWidth label="Instagram" slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <InstagramIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField value={fbUrl} onChange={(e) => setFbUrl(e.target.value)} size="small" fullWidth label="Facebook" slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <FacebookRoundedIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} size="small" fullWidth label="Twitter" slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <XIcon fontSize="small" />
                            </InputAdornment>
                        ),
                    },
                }} />
            </Grid>
        </Grid>
        <Button variant="contained" onClick={handleSubmit} sx={{ textTransform: 'capitalize', backgroundColor: '#122620', mt: 2 }}>Update</Button>
        <Snackbar
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={snackbar.open}
            autoHideDuration={2000}
            TransitionComponent={Grow}
            onClose={() => setSnackbar({open: false, type: '', message: ''})}
        >
            <Alert onClose={() => setSnackbar({open: false, type: '', message: ''})} severity={snackbar.type} sx={{ maxWidth: '500px', textAlign: 'left' }}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    </>
}

export default EditProfile