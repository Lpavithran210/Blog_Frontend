import {Box, CircularProgress, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Post from "../components/Post"
import { apiCall } from "../../utils/axios"

const AllBlogs = () => {
    const [postList, setPostList] = useState([])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
    const fetchPosts = async () => {
        try {
            setLoading(true)
            const res = await apiCall("get", "/blog/posts")
            setPostList(res.data)
            setLoading(false)
        }
        catch(e){
            console.log('Error', e)
        }
    }
    fetchPosts()
    },[])

    return (
        <>
        <Box>
            {isLoading ? <Box sx={{width: '100%', height: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box> : 
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                   <Post postList={postList}/>
                </Grid>
                <Grid item xs={0} md={4}></Grid>
            </Grid>}
        </Box>
        </>
    )
}

export default AllBlogs