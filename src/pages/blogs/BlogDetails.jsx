import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { apiCall } from "../../utils/axios";

const BlogDetails = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const [data, setData] = useState({})
    const [isLoading, setLoading] = useState(false)
    const id = location.state

    async function FetchDetails() {
        setLoading(true)
        const res = await apiCall('get', `/blog/${id}`)
        setData(res.data)
        setLoading(false)
    }
    useEffect(() => {
        FetchDetails()
    },[id])
    const FormatDate = (data) => {
        const date = new Date(data)
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options)
    }
    return <> {isLoading ? <Box sx={{width: '100%', height: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><CircularProgress /></Box> : <Box sx={{maxWidth: '800px', px:2, mx:'auto'}}>
        <img src={data?.banner} width={"100%"} height={"400px"} style={{objectFit: 'cover', margin: '20px 0'}}/>
        <Typography variant="h4" fontWeight={600}>{data?.title}</Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', py:2, borderBottom: '1px solid #e9e9e9', mt:2}}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap:1, cursor: 'pointer'}} onClick={() => navigate(`/profile/${data?.author?.personal_info?.name}`)}>
                <Avatar sx={{width: '40px', height: '40px'}} src={data?.author?.personal_info?.profile_pic}/>
                <Box>
                    <Typography variant="body2" fontWeight={500} textTransform={'capitalize'}>{data?.author?.personal_info?.name}</Typography>
                    <Typography variant="body2">@{data?.author?.personal_info?.user_name}</Typography>
                </Box>
            </Box>
            <Typography variant="caption" color="#8d8d8d">Published on {FormatDate(data?.createdAt)}</Typography>
        </Box>
        <Box sx={{
            my:2,
            '& img': {
            width: '100%',
        }}}
            dangerouslySetInnerHTML={{ __html: data?.content }}
        />
    </Box>}
    </>
}

export default BlogDetails