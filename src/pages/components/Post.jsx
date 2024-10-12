import { Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, Grow, Snackbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { apiCall } from "../../utils/axios";
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Post = ({ postList, showDelete = null, onPostDelete }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const [snackbar, setSnackbar] = useState({})
    const handleDeletePost = async (id) => {
        
        await apiCall('delete', `/blog/${id}`)
        setSnackbar({open: true, type: 'success', message: 'Blog deleted successfully'})
        setOpen(false)
        if (onPostDelete) {
            onPostDelete();
        }
    }
    const handlePost = async (id) => {
        navigate('/blog_detail', { state: id })
    }
    return <>
        {postList.length === 0 && <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 200px)' }}>
            <Typography variant="body1" fontWeight={500}>No blogs posted yet</Typography>
            <Button onClick={() => navigate('/')} variant="contained" sx={{ mt: 1, textTransform: 'capitalize', color: 'white', backgroundColor: '#122620' }} size="small">Back home</Button>
        </Box>}
        {postList.map((post, ind) => {
            const date = new Date(post.createdAt)
            const options = { day: 'numeric', month: 'short' };
            const formatedDate = date.toLocaleDateString('en-US', options)
            const handleViewProfile = (username) => navigate(`/profile/${username}`)

            return <Box key={ind} sx={{ borderBottom: '1px solid lightgrey', display: { xs: 'block', md: 'flex' }, gap: 2, alignItems: 'center', justifyContent: 'space-between', padding: "20px", margin: '10px' }}>
                <Box sx={{ marginBottom: { xs: 2, md: 0 } }}>
                    <Box sx={{ display: 'flex', cursor: 'pointer' }} gap={1} mb={2} onClick={() => handleViewProfile(post.author.personal_info.name)}>
                        <Avatar src={post.author?.personal_info?.profile_pic} sx={{ width: 24, height: 24 }} />
                        <Typography sx={{ fontSize: '14px' }}>{post.author?.personal_info?.name} @ {formatedDate}</Typography>
                    </Box>
                    <Typography fontWeight={'600'} sx={{ cursor: 'pointer' }} onClick={() => handlePost(post._id)}>{post.title}</Typography>
                    <Typography fontSize={'12px'} my={1}>{post.desc}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        {post.tags.map((item, index) => {
                            return <Typography key={index} fontSize={'12px'} p={1} bgcolor={'#e9e9e9'} borderRadius={'20px'} width={'max-content'} minWidth={'50px'} textAlign={'center'}>{item}</Typography>
                        })}
                    </Box>
                    {showDelete && <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} sx={{ mt: 3, textTransform: 'capitalize', boxShadow: 'none', '&:hover': { boxShadow: 'none' } }} onClick={() => setOpen(true)}>
                        Delete
                    </Button>}
                    <Dialog
                        maxWidth="sm"
                        sx={{ textAlign: 'center' }}
                        open={open}
                        onClose={() => setOpen(false)}>
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ margin: "auto" }}><ErrorOutlineIcon color="error" fontSize="large" /></Box>
                            <Typography variant="h6" fontWeight={500}>Are you sure?</Typography>
                            <DialogContent>
                                <DialogContentText sx={{ fontSize: '12px' }}>
                                    Do you really want to delete this blog? This<br />process cannot be undone
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, backgroundColor: '#c1c1c1', color: 'black', fontSize: '12px', textTransform: 'unset' }} onClick={() => setOpen(false)}>No, cancel</Button>
                                <Button variant="contained" color="error" sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' }, fontSize: '12px', textTransform: 'unset' }} onClick={() => handleDeletePost(post._id)} autoFocus>Yes, delete it!</Button>
                            </DialogActions>
                        </Box>
                    </Dialog>
                </Box>
                <img src={post.banner} width={100} height={100} style={{ objectFit: 'cover' }} />
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
            </Box>
        })}
    </>
}

export default Post