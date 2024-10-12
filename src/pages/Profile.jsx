import { useEffect, useState } from "react"
import Post from "./components/Post"
import axios from "axios"
import { Avatar, Box, Button, CircularProgress, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';
import { Link, useNavigate, useParams } from "react-router-dom"
import { apiCall } from "../utils/axios"

const Profile = () => {
    const navigate = useNavigate()
    const [postList, setPostList] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setLoading] = useState(false)
    const { username } = useParams();
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"))
    const fetchUser = async () => {
        try {
            setLoading(true)
            const res = await apiCall("get", `/user/${username || loggedUser.name}`)
            setUserInfo(res.data)
            const postRes = await apiCall("get", `/blog/personal-posts/${res?.data?._id || loggedUser.userId}`)
            setPostList(postRes.data)
            setLoading(false)
        } catch (e) {
            console.log("Error", e)
        }
    }
    
    useEffect(() => {
        fetchUser()
    }, [username])

    const dateFormat = (dates) => {
        if (!dates) return '-'
        const date = new Date(dates)
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options)
    }
    return <>
    {isLoading ? <Box sx={{ width: '100%', height: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box> :
        <Grid container spacing={2} >
            <Grid item xs={12} md={8} order={{ xs: 2, md: 1 }} sx={{ height: '100%', overflowY: 'auto' }}>
                <Post postList={postList} />
            </Grid>
            <Grid item xs={12} md={4} order={{ xs: 1, md: 2 }} sx={{ margin: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                <Box sx={{ maxWidth: {xs:'unset' ,md:'300px'}, mt: { xs: 0, md: 3 }, borderBottom: { xs: '1px solid #e9e9e9', md: 'none' }, pb: { xs: 2, md: 0 } }}>
                    <Avatar src={userInfo?.personal_info?.profile_pic} sx={{ width: 70, height: 70, margin: { xs: 'auto', md: 'unset' } }} />
                    <Typography variant="body1" fontWeight={500} mt={1}>@{userInfo?.personal_info?.user_name}</Typography>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize', mt: 1 }}>{userInfo?.personal_info?.name}</Typography>
                    <Typography variant="caption">{userInfo?.blogs?.length} {userInfo?.blogs?.length === 1 ? 'Blog' : 'Blogs'}</Typography>
                    {userInfo._id === loggedUser.userId && <Button onClick={() => navigate('/dashboard')} variant="contained" sx={{ display: 'block', mt: 2, textTransform: 'capitalize', color: 'white', backgroundColor: '#122620', mx: { xs: 'auto', md: 'unset' } }} size="small">View Blogs</Button>}
                    <Box sx={{ height: '30px' }} />
                    <Typography variant="caption" display={'block'}>{userInfo?.personal_info?.bio ? userInfo?.personal_info?.bio : 'Nothing to read here.'}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginY: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                        {userInfo?.social_links?.youtube && <Link to={userInfo?.social_links?.youtube} target="_blank"><YouTubeIcon sx={{ color: 'grey', "&:hover": { color: 'black' } }} /></Link>}
                        {userInfo?.social_links?.instagram && <Link to={userInfo?.social_links?.instagram} target="_blank"><InstagramIcon sx={{ color: 'grey', "&:hover": { color: 'black' } }} /></Link>}
                        {userInfo?.social_links?.facebook && <Link to={userInfo?.social_links?.facebook} target="_blank"><FacebookRoundedIcon sx={{ color: 'grey', "&:hover": { color: 'black' } }} /></Link>}
                        {userInfo?.social_links?.twitter && <Link to={userInfo?.social_links?.twitter} target="_blank"><XIcon sx={{ color: 'grey', "&:hover": { color: 'black' } }} /></Link>}
                    </Box>
                    <Typography variant="caption">Joined on {dateFormat(userInfo?.createdAt)}</Typography>
                </Box>
            </Grid>
        </Grid> }
    </>
}

export default Profile