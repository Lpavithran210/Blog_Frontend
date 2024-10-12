import { useEffect, useState } from "react"
import { apiCall } from "../../utils/axios"
import { useSelector } from "react-redux"
import Post from "../components/Post"
import { Box, CircularProgress, Typography } from "@mui/material"

const PersonalBlogs = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    
    const fetchPosts = async () => {
        try {
            setLoading(true)
            const res = await apiCall('get', `/blog/personal-posts/${userInfo.userId}`)
            setLoading(false)
            setPosts(res.data)
        } catch(e) {
            console.log("Error", e)
        }
    }
    
    useEffect(() => {
        fetchPosts()
    },[])
    return <>
        <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>Your blogs</Typography>
        {isLoading ? <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'center'}}><CircularProgress/></Box> : <Post postList={posts} showDelete={true} onPostDelete={fetchPosts} />}
    </>
}

export default PersonalBlogs